'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

// Fetcher cơ bản
const fetcher = (url) => fetch(url).then((r) => r.json());

// ---- List posts ----
export function useAdminPosts({ page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams({ page, limit });
  const { data, error, isLoading, mutate } = useSWR(
    `/api/posts?${params}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    posts: data?.items || [],
    totalItems: data?.totalItems || 0,
    totalPages: data?.totalPages || 1,
    isLoading,
    isError: error,
    mutate,
  };
}

// ---- Single post by id ----
export function useAdminPost(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/posts/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    post: data?.data || null,
    isLoading,
    isError: error,
    mutate,
  };
}

// ---- Create ----
export function useCreatePost() {
  return useSWRMutation('/api/posts/create', async (url, { arg }) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(arg),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  });
}

// ---- Update ----
export function useUpdatePost(id) {
  return useSWRMutation(id ? `/api/posts/${id}` : null, async (url, { arg }) => {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json', 'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      body: JSON.stringify(arg),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  });
}

// ---- Delete ----
export function useDeletePost(id) {
  return useSWRMutation(id ? `/api/posts/${id}` : null, async (url) => {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  });
}
