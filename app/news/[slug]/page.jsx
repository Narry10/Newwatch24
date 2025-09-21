import { notFound } from "next/navigation";
import { firestore } from "@/configs/firebaseAdmin";

export const revalidate = 60;

async function getAdminPostDetail(slug) {
  const db = firestore();
  const ref = db.collection("postDetails").doc(slug);
  const snap = await ref.get();

  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}

export default async function Page({ params }) {
  const { slug } = await params;
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
