// hooks/useCategoryPostsInfinite.js
import useSWRInfinite from 'swr/infinite';
const fetcher = (u) => fetch(u).then((r) => r.json());

export function useCategoryPostsInfinite({ category = '', limit = 10 } = {}) {
  const getKey = (index, prev) => {
    if (prev && !prev.nextPageToken) return null; // hết trang
    const params = new URLSearchParams();
    params.set('limit', String(limit));
    if (category) params.set('category', category);
    if (index > 0 && prev?.nextPageToken) params.set('pageToken', prev.nextPageToken);
    return `/api/posts/category?${params.toString()}`;
  };

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite(getKey, fetcher, {
      revalidateOnFocus: false,
      dedupingInterval: 1000,   // giảm nguy cơ gọi lặp khi render lại
      shouldRetryOnError: true,
      errorRetryCount: 3,
    });

  const pages = data || [];
  const posts = pages.flatMap((p) => p?.items || []);
  const nextPageToken = pages.at(-1)?.nextPageToken ?? null;

  return {
    posts,
    nextPageToken,
    isLoading: isLoading || (size > 0 && isValidating && !data),
    isError: error,
    loadMore: () => setSize((s) => s + 1),
    hasMore: Boolean(nextPageToken),
  };
}
