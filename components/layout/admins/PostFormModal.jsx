"use client";

import { useState, useEffect } from "react";

const CATEGORIES = ["sports", "movie", "lifestyle", "fashion", "business"];
const STATUSES = ["draft", "published"];

export function PostFormModal({
  open,
  onClose,
  initial,
  submitting,
  onSubmit,
}) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    status: "draft",
    featuredImageUrl: "",
    publishAt: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        slug: initial.slug || "",
        content: initial.content || "",
        category: initial.category || "",
        status: initial.status || "draft",
        featuredImageUrl: initial.featuredImageUrl || "",
        publishAt: initial.publishAt ? initial.publishAt.split("T")[0] : "",
      });
    } else {
      setForm({
        title: "",
        slug: "",
        content: "",
        category: "",
        status: "draft",
        featuredImageUrl: "",
        publishAt: "",
      });
    }
  }, [initial, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initial ? "Edit Post" : "Create New Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              rows={6}
              className="w-full border rounded px-3 py-2"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Featured Image URL
            </label>
            <input
              type="url"
              className="w-full border rounded px-3 py-2"
              value={form.featuredImageUrl}
              onChange={(e) =>
                setForm({ ...form, featuredImageUrl: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Publish Date
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={form.publishAt}
              onChange={(e) => setForm({ ...form, publishAt: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
