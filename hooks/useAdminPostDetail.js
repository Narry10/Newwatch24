"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const fetcher = (url) => fetch(url).then((r) => r.json());

// ---- GET by slug ----
export function useAdminPostDetail(slug) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `/api/postDetails/${slug}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (data?.error) {
    return {
      detail: null,
      isLoading,
      isError: error,
      mutate,
    };
  }

  return {
    detail: data || null,
    isLoading,
    isError: error,
    mutate,
  };
}

// ---- CREATE ----
export function useCreatePostDetail() {
  return useSWRMutation("/api/postDetails", async (url, { arg }) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(arg),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  });
}

export function useUpdatePostDetail(slug) {
  return useSWRMutation(
    slug ? `/api/postDetails/${encodeURIComponent(slug)}` : null,
    async (url, { arg = {} }) => {
      if (typeof arg !== "object") throw new Error("Invalid payload");
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(arg),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }
  );
}

export function useDeletePostDetail(slug) {
  return useSWRMutation(
    slug ? `/api/postDetails/${encodeURIComponent(slug)}` : null,
    async (url) => {
      const res = await fetch(url, { method: "DELETE", cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      return res.json(); // or return { success: true } if API responds 204
    }
  );
}
