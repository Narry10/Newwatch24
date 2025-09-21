import { NextResponse } from 'next/server';
import { firestore } from '@/configs/firebaseAdmin';

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    const db = firestore();
    const { searchParams } = new URL(req.url);

    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50);
    const category = (searchParams.get('category') || '').trim();

    const offset = (page - 1) * limit;

    // Base filter
    let base = db.collection('posts').where('status', '==', 'published');
    if (category) {
      base = base.where('category', '==', category);
    }

    // ---- total count (aggregation) ----
    const agg = await base.count().get();   // ✅ Admin SDK style
    const totalItems = agg.data().count || 0;

    // ---- query data ----
    let q = base
      .orderBy('publishAt', 'desc')
      .orderBy('__name__', 'desc')
      .offset(offset)
      .limit(limit);

    const snap = await q.get();

    const toIso = (v) =>
      v?.toDate?.() instanceof Date ? v.toDate().toISOString() : v ?? null;

    const items = snap.docs.map((d) => {
      const x = d.data();
      return {
        id: d.id,
        ...x,
        createdAt: toIso(x.createdAt),
        updatedAt: toIso(x.updatedAt),
        publishAt: toIso(x.publishAt),
      };
    });

    return NextResponse.json({
      success: true,
      items,
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (err) {
    console.error('[api/posts/category] error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch posts by category',
        message: err?.message ?? 'Unknown error',
      },
      { status: 500 }
    );
  }
}
