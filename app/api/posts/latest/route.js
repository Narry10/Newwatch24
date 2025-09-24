import { firestore, FieldPath } from '@/configs/firebaseAdmin';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 60;

function encodeToken(t) {
  return Buffer.from(JSON.stringify(t)).toString('base64url');
}
function decodeToken(s) {
  if (!s) return null;
  try {
    return JSON.parse(Buffer.from(s, 'base64url').toString());
  } catch {
    return null;
  }
}

export async function GET(req) {
  try {
    const db = firestore();
    const { searchParams } = new URL(req.url);

    // ✅ Clamp & fallback an toàn cho limit
    const limitRaw = searchParams.get('limit') ?? '10';
    const parsed = parseInt(limitRaw, 10);
    const limit = Math.min(Math.max(Number.isFinite(parsed) ? parsed : 10, 1), 50);

    const pageToken = decodeToken(searchParams.get('pageToken'));

    let q = db
      .collection('posts')
      .where('status', '==', 'published')
      .orderBy('publishAt', 'desc')
      .orderBy(FieldPath.documentId(), 'desc')
      .limit(limit);

    if (pageToken?.publishAtMs && pageToken?.id) {
      q = q.startAfter(new Date(pageToken.publishAtMs), pageToken.id);
    }

    const snap = await q.get();
    const data = snap.docs.map((doc) => {
      const d = doc.data();
      const toIso = (ts) => (ts?.toDate?.() ? ts.toDate().toISOString() : null);
      return {
        id: doc.id,
        title: d.title || '',
        slug: d.slug || '',
        category: d.category || '',
        createdBy: d.createdBy || 'admin',
        featuredImageUrl: d.featuredImageUrl || '',
        subtitle: d.subtitle || '',
        status: d.status || 'draft',
        publishAt: toIso(d.publishAt),
        createdAt: toIso(d.createdAt),
        updatedAt: toIso(d.updatedAt),
      };
    });
    
    const last = snap.docs.at(-1);
    const nextPageToken = last
      ? encodeToken({
          publishAtMs:
            last.get('publishAt')?.toDate?.()?.getTime() ??
            last.get('createdAt')?.toDate?.()?.getTime() ??
            Date.now(),
          id: last.id,
        })
      : null;

    return NextResponse.json({ success: true, data, nextPageToken });
  } catch (err) {
    const msg = String(err?.message || err);

    // ✅ Báo rõ nếu thiếu index Firestore
    if (msg.includes('The query requires an index')) {
      console.error('[posts/latest] missing index:', msg);
      return NextResponse.json(
        { success: false, error: 'Missing Firestore composite index for (status==, publishAt desc, documentId desc).' },
        { status: 400 }
      );
    }

    console.error('[posts/latest] error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
