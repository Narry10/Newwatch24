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
    posts: data?.posts || [],
    totalItems: data?.total || 0,
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
    post: data,
    isLoading,
    isError: error,
    mutate,
  };
}

// ---- Create ----
async function createPostRequest(url, { arg }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export function useCreatePost() {
  return useSWRMutation('/api/posts/create', createPostRequest);
}

// ---- Update ----
async function updatePostRequest(url, { arg }) {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export function useUpdatePost(id) {
  return useSWRMutation(
    id ? `/api/posts/${id}` : null,
    updatePostRequest
  );
}

// ---- Delete ----
async function deletePostRequest(url) {
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
  return res.json();
}

export function useDeletePost(id) {
  return useSWRMutation(
    id ? `/api/posts/${id}` : null,
    deletePostRequest
  );
}
