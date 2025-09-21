import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useLatestPosts({ limit = 10 } = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/posts/latest?limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    posts: data?.data || [],
    total: data?.total || 0,
    isLoading,
    isError: error,
    mutate
  };
}
