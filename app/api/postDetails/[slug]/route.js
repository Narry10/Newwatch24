// app/api/postDetails/[slug]/route.js
import { NextResponse } from "next/server";
import { firestore, FieldValue } from "@/configs/firebaseAdmin";

export async function GET(req, { params }) {
  try {
    const { slug } = await params; // Await params
    const db = firestore();

    // Truy cập thẳng document = slug
    const ref = db.collection("postDetails").doc(slug);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { id: snap.id, ...snap.data() },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


/**
 * PATCH /api/postDetails/:slug
 */
export async function PATCH(req, { params }) {
  try {
    const { slug } = await params; // Await params
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
    const updated = await ref.get();
    const x = updated.data();

    const toIso = (v) =>
      v?.toDate?.() instanceof Date ? v.toDate().toISOString() : v ?? null;

    return NextResponse.json({
      success: true,
      id: updated.id,
      data: {
        ...x,
        createdAt: toIso(x.createdAt),
        updatedAt: toIso(x.updatedAt),
      },
    });
  } catch (err) {
    console.error("[postDetails PATCH] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/**
 * DELETE /api/postDetails/:slug
 */
export async function DELETE(req, { params }) {
  try {
    const { slug } = await params; // Await params

    const db = firestore();
    const ref = db.collection("postDetails").doc(slug);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    await ref.delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[postDetails DELETE] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
