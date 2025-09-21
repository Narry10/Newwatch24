"use client";

import { useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  useAdminPosts,
  useAdminPost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from "@/hooks/useAdminPost";

// ——— small helpers ———
const CATEGORIES = ["sports", "movie", "lifestyle", "fashion", "business"];
const STATUSES = ["draft", "published"];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

// ——— Modal Form (Create / Edit) ———
export function PostFormModal({ open, onClose, initial, onSubmit, submitting }) {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    subtitle: "",
    featuredImageUrl: "",
    category: "",
    status: "draft",
    createdBy: "admin",
  });

  useEffect(() => {
    if (open) {
      setForm({
        slug: initial?.slug || "",
        title: initial?.title || "",
        subtitle: initial?.subtitle || "",
        featuredImageUrl: initial?.featuredImageUrl || "",
        category: initial?.category || "",
        status: initial?.status || "draft",
        createdBy: initial?.createdBy || "admin",
      });
    }
  }, [open, initial]);

  if (!open) return null;

  const canSubmit =
    form.title.trim() &&
    form.category.trim() &&
    form.status.trim() &&
    form.createdBy.trim();

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl shadow-xl">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {initial?.id ? "Edit Post" : "New Post"}
          </h3>
          <button
            onClick={onClose}
            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        <form
          className="p-5 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onSubmit(form);
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Slug (user input)
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.slug}
                onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
                placeholder="optional"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={form.subtitle}
              onChange={(e) => setForm((s) => ({ ...s, subtitle: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={form.featuredImageUrl}
              onChange={(e) =>
                setForm((s) => ({ ...s, featuredImageUrl: e.target.value }))
              }
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.category}
                onChange={(e) =>
                  setForm((s) => ({ ...s, category: e.target.value }))
                }
                required
              >
                <option value="">— Select —</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status *</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.status}
                onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
                required
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Created by *</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.createdBy}
                onChange={(e) =>
                  setForm((s) => ({ ...s, createdBy: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={!canSubmit || submitting}
              className={classNames(
                "px-4 py-2 rounded text-white",
                submitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
