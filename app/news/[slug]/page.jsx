// app/news/[slug]/page.jsx
import { notFound } from "next/navigation";
import { firestore } from "@/configs/firebaseAdmin";

export const revalidate = 60;

async function getAdminPostDetail(slug) {
  const db = firestore();
  const snap = await db.collection("postDetails").doc(slug).get();
  if (!snap.exists) return null;
  const data = snap.data() || {};
  return { id: snap.id, ...data };
}

// Parse meta JSON trong comment: <!-- meta: { ... } -->
function extractMetaFromHtml(html) {
  const m = html.match(/<!--\s*meta:\s*({[\s\S]*?})\s*-->/i);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

// Trả OG/Twitter meta ở SSR để crawler thấy
export async function generateMetadata({ params }) {
  const { slug } = params;
  const detail = await getAdminPostDetail(slug);
  if (!detail?.content) return {};

  const meta = extractMetaFromHtml(detail.content) || {};
  const title = meta.title || slug;
  const description = meta.description || "";
  const ogImage = meta.image || "https://newswatch24.com/_og/default.jpg";
  
  return {
    title,
    description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: "article",
      url: `https://newswatch24.com/news/${slug}`,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = params;
  const detail = await getAdminPostDetail(slug);
  const html = detail?.content;
  if (!html) notFound();

  return (
    <main className="container mx-auto max-w-3xl py-8">
      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
