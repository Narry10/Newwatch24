import { NextResponse } from "next/server";
import { firestore } from "@/configs/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { slugify } from "@/helpers/slugify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Chỉ minh hoạ quyền admin bằng x-api-key; đổi sang auth thực tế của bạn
export async function POST(req) {
  try {
    const db = firestore();
    const body = await req.json();

    // ---- 1) Nhận các field user cung cấp ----
    const rawTitle = (body.title || "").trim();
    const rawSlug = (body.slug || "").trim();
    const subtitle = (body.subtitle || "").trim();
    const featuredImageUrl = (body.featuredImageUrl || "").trim();
    const category = (body.category || "").trim();
    const status = (body.status || "draft").trim(); // 'published' | 'draft' | 'archived' ...
    const createdBy = (body.createdBy || "admin").trim();

    if (!rawTitle)
      return NextResponse.json(
        { success: false, error: "title is required" },
        { status: 400 }
      );
    if (!status)
      return NextResponse.json(
        { success: false, error: "status is required" },
        { status: 400 }
      );

    // ---- 2) Chuẩn hoá slug do user nhập (hoặc sinh từ title nếu trống) ----
    const safeSlug = slugify(rawSlug || rawTitle);

    // Đảm bảo slug duy nhất
    const dup = await db
      .collection("posts")
      .where("slug", "==", safeSlug)
      .limit(1)
      .get();
    if (!dup.empty) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 409 }
      );
    }

    // ---- 3) Tự gán các field còn lại ở server ----
    const now = FieldValue.serverTimestamp();

    // publishAt: Nếu client KHÔNG gửi, tự set = now khi status = 'published', ngược lại để null
    // (Nếu client có gửi publishAt thì bạn có thể cho phép; ở yêu cầu này ta tự gán hoàn toàn.)
    const publishAt = status === "published" ? now : null;

    const doc = {
      // bắt buộc/được user nhập
      title: rawTitle,
      slug: safeSlug,
      subtitle,
      featuredImageUrl,
      category,
      status,
      createdBy,

      // tự gán
      isFeatured: false,
      publishAt,
      unpublishAt: null,
      lastVersionId: now,
      updatedBy: createdBy,

      createdAt: now,
      updatedAt: now,
    };

    const ref = await db.collection("posts").add(doc);
    const snap = await ref.get();

    // Đưa timestamp về ISO khi trả response
    const toIso = (v) =>
      v?.toDate?.() instanceof Date ? v.toDate().toISOString() : null;
    const d = snap.data();
    const data = {
      id: ref.id,
      ...d,
      publishAt: toIso(d.publishAt),
      unpublishAt: toIso(d.unpublishAt),
      createdAt: toIso(d.createdAt),
      updatedAt: toIso(d.updatedAt),
    };

    return NextResponse.json(
      { success: true, id: ref.id, data },
      { status: 201 }
    );
  } catch (err) {
    console.error("[posts create] error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.status || 500 }
    );
  }
}
