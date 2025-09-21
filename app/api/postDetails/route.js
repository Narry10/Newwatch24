import { NextResponse } from "next/server";
import { firestore } from "@/configs/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/postDetails
 * Body: { slug: string, content: string }
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const slug = (body.slug || "").trim();
    const content = (body.content || "").trim();

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    const db = firestore();
    const ref = db.collection("postDetails").doc(slug);
    const snap = await ref.get();
    if (snap.exists) {
      return NextResponse.json(
        { success: false, error: "Post detail already exists" },
        { status: 409 }
      );
    }

    const data = {
      slug,
      content,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await ref.set(data);
    const created = await ref.get();
    const x = created.data();

    const toIso = (v) =>
      v?.toDate?.() instanceof Date ? v.toDate().toISOString() : v ?? null;

    return NextResponse.json({
      success: true,
      id: created.id,
      data: {
        ...x,
        createdAt: toIso(x.createdAt),
        updatedAt: toIso(x.updatedAt),
      },
    });
  } catch (err) {
    console.error("[postDetails POST] error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
