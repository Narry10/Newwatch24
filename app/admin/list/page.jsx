"use client";

import { PostFormModal } from "@/components/layout/admins/PostFormModal";
import {
  useAdminPost,
  useAdminPosts,
  useCreatePost,
  useDeletePost,
  useUpdatePost,
} from "@/hooks/useAdminPost";
import { useLatestPosts } from "@/hooks/useLatestPosts";
import dayjs from "dayjs";
import Link from "next/link";
import { useMemo, useState } from "react";

const CATEGORIES = ["sports", "movie", "lifestyle", "fashion", "business"];
const STATUSES = ["draft", "published"];
const classNames = (...xs) => xs.filter(Boolean).join(" ");

export default function AdminListPage() {
  // Lấy list + mutate để refetch
  const { posts, total: totalItems, isLoading, isError, mutate } = useLatestPosts({
    limit: 20,
  });

  // UI state
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("publish_desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // CRUD hooks
  const { trigger: createPost, isMutating: creating } = useCreatePost();
  const { trigger: updatePost, isMutating: updating } = useUpdatePost(editingId || "");
  const { trigger: _deleteUnused } = useDeletePost(null); // không dùng trực tiếp

  // Optional: fetch detail để có dữ liệu chính xác nhất; nhưng ta ưu tiên data từ list để fill form instant
  const { post: editingPostFallback } = useAdminPost(editingId || undefined);

  // Lấy item ngay từ list (instant), fallback qua hook chi tiết nếu cần
  const selectedFromList = useMemo(
    () => posts?.find((p) => p.id === editingId),
    [posts, editingId]
  );
  const initialForModal = selectedFromList || (editingId ? editingPostFallback : null);

  // Lọc/sắp xếp client-side cho dashboard
  const filtered = useMemo(() => {
    let arr = posts || [];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.slug?.toLowerCase().includes(q)
      );
    }
    if (status) arr = arr.filter((p) => p.status === status);
    if (category) arr = arr.filter((p) => p.category === category);

    switch (sort) {
      case "publish_desc":
        arr = [...arr].sort(
          (a, b) =>
            new Date(b.publishAt || b.createdAt || 0) -
            new Date(a.publishAt || a.createdAt || 0)
        );
        break;
      case "publish_asc":
        arr = [...arr].sort(
          (a, b) =>
            new Date(a.publishAt || a.createdAt || 0) -
            new Date(b.publishAt || b.createdAt || 0)
        );
        break;
      case "title_asc":
        arr = [...arr].sort((a, b) =>
          (a.title || "").localeCompare(b.title || "")
        );
        break;
      case "title_desc":
        arr = [...arr].sort((a, b) =>
          (b.title || "").localeCompare(a.title || "")
        );
        break;
    }
    return arr;
  }, [posts, query, status, category, sort]);

  // Actions
  const openCreate = () => {
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (id) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (editingId) {
        await updatePost(form);    // update item
      } else {
        await createPost(form);    // create item
      }
      await mutate();               // 👈 refetch list ngay sau khi thành công
    } finally {
      // Reset form/modal state
      setModalOpen(false);
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this post?");
    if (!ok) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    await mutate();
  };

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard · Posts</h1>
          <p className="text-gray-500">
            Manage articles — create, edit, publish, remove.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          + New Post
        </button>
      </div>

      {/* Toolbar */}
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <input
          placeholder="Search title or slug…"
          className="border rounded px-3 py-2 md:col-span-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-500">
          {isLoading ? "Loading…" : `${filtered.length} / ${totalItems} items`}
        </div>
        <select
          className="border rounded px-3 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="publish_desc">Newest → Oldest</option>
          <option value="publish_asc">Oldest → Newest</option>
          <option value="title_asc">Title A → Z</option>
          <option value="title_desc">Title Z → A</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Publish</th>
              <th className="p-3 text-left w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filtered || []).map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-3">
                  <img
                    src={p.featuredImageUrl || ""}
                    onError={(e) => { e.currentTarget.src = ""; }}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-gray-500">{p.slug}</div>
                </td>
                <td className="p-3">{p.category || "-"}</td>
                <td className="p-3">
                  <span
                    className={classNames(
                      "px-2 py-1 rounded text-xs",
                      p.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  {p.publishAt ? dayjs(p.publishAt).format("YYYY-MM-DD") : "-"}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openEdit(p.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    <Link href={`/admin/news/${p.slug}`}>
                      View
                    </Link>
                 
                  </div>
                </td>
              </tr>
            ))}

            {!isLoading && filtered.length === 0 && (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={6}>
                  No posts match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal (create/edit) */}
      <PostFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingId(null); // 👈 reset sau khi đóng
        }}
        initial={editingId ? { id: editingId, ...initialForModal } : null} // 👈 truyền data item vào form
        submitting={creating || updating}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
