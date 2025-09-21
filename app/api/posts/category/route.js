// app/api/posts/category/route.js
import { NextResponse } from 'next/server';
import { firestore, FieldPath } from '@/configs/firebaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function enc(t) { return Buffer.from(JSON.stringify(t)).toString('base64url'); }
function dec(s) {
  if (!s) return null;
  try { return JSON.parse(Buffer.from(s, 'base64url').toString()); }
  catch { return null; }
}

export async function GET(req) {
  try {
    const db = firestore();
    const { searchParams } = new URL(req.url);

    const limRaw = searchParams.get('limit') ?? '10';
    const limNum = parseInt(limRaw, 10);
    const limit  = Math.min(Math.max(Number.isFinite(limNum) ? limNum : 10, 1), 50);

    const category = (searchParams.get('category') || '').trim();
    const pageToken = dec(searchParams.get('pageToken'));

    // base query
    let q = db.collection('posts')
      .where('status', '==', 'published');

    if (category) q = q.where('category', '==', category);

    // order để ổn định cursor
    q = q.orderBy('publishAt', 'desc')
         .orderBy(FieldPath.documentId(), 'desc')
         .limit(limit);

    if (pageToken?.publishAtMs && pageToken?.id) {
      q = q.startAfter(new Date(pageToken.publishAtMs), pageToken.id);
    }

    const snap = await q.get();
    const toIso = (ts) => (ts?.toDate?.() ? ts.toDate().toISOString() : null);

    const items = snap.docs.map(d => {
      const x = d.data();
      return {
        id: d.id,
        ...x,
        createdAt: toIso(x.createdAt),
        updatedAt: toIso(x.updatedAt),
        publishAt: toIso(x.publishAt),
      };
    });

    const last = snap.docs.at(-1);
    const nextPageToken = last ? enc({
      publishAtMs:
        last.get('publishAt')?.toDate?.()?.getTime() ??
        last.get('createdAt')?.toDate?.()?.getTime() ??
        Date.now(),
      id: last.id,
    }) : null;

    // với infinite scroll không cần count()
    return NextResponse.json({ success: true, items, nextPageToken });
  } catch (err) {
    const msg = String(err?.message || err);
    if (msg.includes('The query requires an index')) {
      return NextResponse.json(
        { success: false, error: 'Missing Firestore index (status==, category==?, publishAt desc, documentId desc).' },
        { status: 400 }
      );
    }
    console.error('[api/posts/category] error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
