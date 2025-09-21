"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useAdminPostDetail,
  useCreatePostDetail,
  useUpdatePostDetail,
  useDeletePostDetail,
} from "@/hooks/useAdminPostDetail";

const cls = (...xs) => xs.filter(Boolean).join(" ");

export default function AdminPostDetailPage() {
  const { slug } = useParams() ?? {};
  const router = useRouter();

  const { detail, isLoading, isError, mutate } = useAdminPostDetail(slug);
  const { trigger: createDetail, isMutating: creating } = useCreatePostDetail();
  const { trigger: updateDetail, isMutating: updating } = useUpdatePostDetail(slug);
  const { trigger: deleteDetail, isMutating: deleting } = useDeletePostDetail(slug);

  const [content, setContent] = useState("");
  const [tab, setTab] = useState("split"); // ✅ mặc định Split
  const [dirty, setDirty] = useState(false);

  const exists = !!detail;
  const saving = creating || updating;
  
  // preload content
  useEffect(() => {
    if (detail) setContent(detail.content || "");
  }, [detail]);

  const stats = useMemo(() => {
    const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const words = text ? text.split(" ").length : 0;
    return { chars: content.length, words };
  }, [content]);

  const handleSave = async () => {
    if (exists) {
      await updateDetail({ content });
    } else {
      await createDetail({ slug, content });
    }
    await mutate();
    setDirty(false);
  };

  const handleDelete = async () => {
    if (!exists) return;
    if (!confirm("Delete this detail?")) return;
    await deleteDetail();
    await mutate();
    setContent("");
    router.push("/admin/list");
  };

  if (!slug) {
    return <div className="p-6 text-red-600">Missing slug in URL.</div>;
  }

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-800 text-white border-b border-gray-700 p-8 rounded">
        <div className="flex items-center justify-between px-1 py-3 ">
          <div>
            <h1 className="text-lg font-semibold text-white">
              Post Detail · <span className="font-mono">{slug}</span>
            </h1>
            <p className="text-xs text-gray-300">
              {isLoading
                ? "Loading…"
                : exists
                ? "Editing existing content"
                : "New detail (not saved)"}
              {dirty && <span className="ml-2 text-amber-400">• Unsaved</span>}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/admin/list")}
              className="px-3 py-2 text-sm rounded bg-gray-600 hover:bg-gray-500"
            >
              ← Back
            </button>
            <a
              href={`/news/${slug}`}
              target="_blank"
              className="px-3 py-2 text-sm rounded bg-gray-700 hover:bg-gray-600"
            >
              View
            </a>
            {exists && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={cls(
                  "px-3 py-2 text-sm rounded",
                  deleting ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
                )}
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className={cls(
                "px-3 py-2 text-sm rounded text-white",
                saving ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {exists ? (saving ? "Saving…" : "Save (⌘/Ctrl+S)") : (saving ? "Creating…" : "Create")}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-2 border-t border-gray-700">
          {["edit", "preview", "split"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cls(
                "px-3 py-2 text-sm rounded-t",
                tab === t
                  ? "bg-gray-900 text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-300 hover:text-white"
              )}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
          <div className="ml-auto text-xs text-gray-400">
            {stats.words} words · {stats.chars} chars
          </div>
        </div>
      </div>

      {/* Main */}
      {tab !== "split" ? (
        <div className="mt-4">
          {tab === "edit" && (
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setDirty(true);
              }}
              className="w-full min-h-[70vh] border rounded p-3 font-mono text-sm leading-5 resize-y"
            />
          )}
          {tab === "preview" && (
            <div
              className="prose max-w-none bg-white p-4 rounded shadow mt-4"
              dangerouslySetInnerHTML={{ __html: content || "<p>(empty)</p>" }}
            />
          )}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setDirty(true);
            }}
            className="w-full min-h-[75vh] border rounded p-3 font-mono text-sm leading-5 resize-y"
          />
          <div
            className="prose max-w-none bg-white p-4 rounded shadow overflow-auto"
            dangerouslySetInnerHTML={{ __html: content || "<p>(empty)</p>" }}
          />
        </div>
      )}
    </div>
  );
}
