// app/api/postDetails/[slug]/route.js
import { firestore } from "@/configs/firebaseAdmin";
import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";
export const revalidate = 3600; // TTL mặc định cho route-level (fallback)

const toIso = (v) => (v?.toDate?.() instanceof Date ? v.toDate().toISOString() : v ?? null);

const getPostDetails = (slug) =>
  unstable_cache(
    async () => {
      const db = firestore();
     
      const ref = db.collection("postDetails").doc(slug);
      const snap = await ref.get();
      if (!snap.exists) return null;

   
      const data = snap.data();
      return {
        id: snap.id,
        content: data.content ?? "",
        createdAt: toIso(data.createdAt),
        updatedAt: toIso(data.updatedAt),
      };
    },
    // cache key
    [`postDetails:${slug}`],
    // TTL + tag để invalidation
    { revalidate: 3600, tags: [`postDetails:${slug}`] }
  )();

export async function GET(_req, { params }) {
  const { slug } = params;
  const doc = await getPostDetails(slug);
  if (!doc) {
    // Cache 404 rất ngắn để tránh spam read
    return NextResponse.json({ error: "Post not found" }, {
      status: 404,
      headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" },
    });
  }

  // CDN cache ngắn + SWR dài hơn (giảm read khi nóng)
  return NextResponse.json(doc, {
    status: 200,
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}


export async function PATCH(req, { params }) {
  try {
    const { slug } = params;
    const body = await req.json();

    const db = firestore();
    const ref = db.collection("postDetails").doc(slug);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const data = {};
    if (typeof body.content === "string") data.content = body.content.trim();
    data.updatedAt = FieldValue.serverTimestamp();

    await ref.update(data);

    // Invalidate cache ngay sau update
    revalidateTag(`postDetails:${slug}`);

    const updated = await ref.get();
    const x = updated.data();
    const toIso = (v) => (v?.toDate?.() instanceof Date ? v.toDate().toISOString() : v ?? null);

    return NextResponse.json({
      success: true,
      id: updated.id,
      data: {
        content: x.content ?? "",
        createdAt: toIso(x.createdAt),
        updatedAt: toIso(x.updatedAt),
      },
    });
  } catch (err) {
    console.error("[postDetails PATCH] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { slug } = params;

    const db = firestore();
    const ref = db.collection("postDetails").doc(slug);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    await ref.delete();

    // Invalidate cache ngay sau delete
    revalidateTag(`postDetails:${slug}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[postDetails DELETE] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
