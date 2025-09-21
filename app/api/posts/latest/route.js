import { firestore } from '@/configs/firebaseAdmin';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
// ===== Helpers =====
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

    // Giới hạn cứng để tránh lạm dụng
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50);

    // Token phân trang dạng { publishAtMs: number, id: string }
    const pageToken = decodeToken(searchParams.get('pageToken'));

    // Query: chỉ lấy bài published, orderBy publishAt desc + __name__ desc để tránh trùng timestamp
    let q = db
      .collection('posts')
      .where('status', '==', 'published') // nếu bạn muốn chỉ public
      .orderBy('publishAt', 'desc')
      .orderBy('__name__', 'desc')
      .limit(limit);

    if (pageToken?.publishAtMs && pageToken?.id) {
      q = q.startAfter(new Date(pageToken.publishAtMs), pageToken.id);
    }

    const snap = await q.get();
    const docs = snap.docs;

    const data = docs.map((doc) => {
      const d = doc.data();
      const publishAt = d.publishAt?.toDate?.() ?? null;
      const createdAt = d.createdAt?.toDate?.() ?? null;
      const updatedAt = d.updatedAt?.toDate?.() ?? null;

      return {
        id: doc.id,
        title: d.title || '',
        slug: d.slug || '',
        category: d.category || '',
        createdBy: d.createdBy || 'admin',
        featuredImageUrl: d.featuredImageUrl || '',
        subtitle: d.subtitle || '',
        status: d.status || 'draft',
        publishAt: publishAt ? publishAt.toISOString() : null,
        createdAt: createdAt ? createdAt.toISOString() : null,
        updatedAt: updatedAt ? updatedAt.toISOString() : null,
      };
    });

    // Tạo nextPageToken từ doc cuối theo cùng thứ tự orderBy
    const last = docs.at(-1);
    const nextPageToken = last
      ? encodeToken({
          publishAtMs:
            last.get('publishAt')?.toDate?.()?.getTime() ??
            last.get('createdAt')?.toDate?.()?.getTime() ??
            Date.now(),
          id: last.id,
        })
      : null;

    return NextResponse.json({
      success: true,
      data,
      total: undefined, // nếu cần total, nên precompute vào 1 doc khác (counter)
      nextPageToken,
    });
  } catch (err) {
    console.error('[posts/latest] error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
