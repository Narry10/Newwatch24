// app/api/posts/[id]/route.js
import { NextResponse } from "next/server";
import { firestore } from "@/configs/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { slugify } from "@/helpers/slugify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const revalidate = 0;

// helper
const toIso = (v) =>
  v?.toDate?.() instanceof Date ? v.toDate().toISOString() : v ?? null;

/**
 * GET /api/posts/:id
 */
export async function GET(req, context) {
  try {
    const { params } = await context; // ✅ PHẢI await
    const { id } = params; // ✅ CHỈ DÙNG id

    const db = firestore();
    const ref = db.collection("posts").doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    const data = snap.data();

    return NextResponse.json({
      success: true,
      id: snap.id,
      data: {
        ...data,
        publishAt: toIso(data.publishAt),
        unpublishAt: toIso(data.unpublishAt),
        createdAt: toIso(data.createdAt),
        updatedAt: toIso(data.updatedAt),
      },
    });
  } catch (err) {
    console.error("[posts GET] error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.status || 500 }
    );
  }
}

/**
 * PATCH /api/posts/:id
 */
export async function PATCH(req,  { params }) {
  try {

    const { id } = params;

    const db = firestore();
    const ref = db.collection("posts").doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const old = snap.data();

    const data = {};
    const getStr = (v) => (typeof v === "string" ? v.trim() : undefined);

    const title = getStr(body.title);
    const subtitle = getStr(body.subtitle);
    const featuredImageUrl = getStr(body.featuredImageUrl);
    const category = getStr(body.category);
    const status = getStr(body.status);
    const updatedBy =
      getStr(body.updatedBy) || getStr(body.createdBy) || "admin";
    const isFeatured =
      typeof body.isFeatured === "boolean" ? body.isFeatured : undefined;

    if (title !== undefined) data.title = title;
    if (subtitle !== undefined) data.subtitle = subtitle;
    if (featuredImageUrl !== undefined)
      data.featuredImageUrl = featuredImageUrl;
    if (category !== undefined) {
      data.category = category;
      data.categorySlug = slugify(category || "");
    }
    if (status !== undefined) data.status = status;
    if (isFeatured !== undefined) data.isFeatured = isFeatured;

    // slug logic
    if (body.slug !== undefined) {
      const newSlug = slugify(String(body.slug || ""));
      if (!newSlug) {
        return NextResponse.json(
          { success: false, error: "Invalid slug" },
          { status: 400 }
        );
      }
      // kiểm tra trùng slug trên doc KHÁC
      const dup = await db
        .collection("posts")
        .where("slug", "==", newSlug)
        .limit(1)
        .get();
      if (!dup.empty && dup.docs[0].id !== id) {
        // ✅ so sánh với id, KHÔNG dùng params.id
        return NextResponse.json(
          { success: false, error: "Slug already exists" },
          { status: 409 }
        );
      }
      data.slug = newSlug;
    } else if (title !== undefined && !old.slug) {
      data.slug = slugify(title);
    }

    // thời gian publish/unpublish
    if (body.publishAt !== undefined)
      data.publishAt = body.publishAt ? new Date(body.publishAt) : null;
    if (body.unpublishAt !== undefined)
      data.unpublishAt = body.unpublishAt ? new Date(body.unpublishAt) : null;

    // nếu set published mà chưa có publishAt → gán server time
    if (status === "published" && data.publishAt === undefined) {
      const currentPublishAt =
        old.publishAt?.toDate?.() ?? old.publishAt ?? null;
      if (!currentPublishAt) data.publishAt = FieldValue.serverTimestamp();
    }

    data.updatedBy = updatedBy;
    data.updatedAt = FieldValue.serverTimestamp();

    await ref.update(data);
    const updated = await ref.get();
    const x = updated.data();

    return NextResponse.json({
      success: true,
      id: updated.id,
      data: {
        ...x,
        publishAt: toIso(x.publishAt),
        unpublishAt: toIso(x.unpublishAt),
        createdAt: toIso(x.createdAt),
        updatedAt: toIso(x.updatedAt),
      },
    });
  } catch (err) {
    console.error("[posts PATCH] error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.status || 500 }
    );
  }
}

/**
 * DELETE /api/posts/:id
 */
export async function DELETE(req, context) {
  try {
    const { params } = await context; // ✅ PHẢI await
    const { id } = params; // ✅ CHỈ DÙNG id

    const db = firestore();
    const ref = db.collection("posts").doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    await ref.delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[posts DELETE] error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.status || 500 }
    );
  }
}
