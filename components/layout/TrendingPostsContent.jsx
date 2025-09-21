'use client';

import Link from 'next/link';
import { useLatestPosts } from '@/hooks/useLatestPosts';
import Loading from '@/app/loading';

export default function TrendingPostsContent() {
  const { posts = [], isLoading, isError } = useLatestPosts();

  if (isError) return null;
  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
      {posts.map((post, index) => {
        const formattedDate = new Date(post.createdAt).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        return (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="list-post-card flex gap-2 max-w-full"
          >
            <div className="post-img w-full">
              <img
                src={post.featuredImageUrl || '/assets/img/blog/post-1.jpg'}
                alt={post.title}
                className="w-full h-[100px] object-cover rounded-lg"
              />
            </div>

            <div className="post-content flex flex-col gap-2">
              <span className="card-btn bg-red">#{index + 1} Ranking</span>
              <h3 className="title text-base sm:text-lg">{post.title}</h3>
              <ul className="post-list flex items-center gap-2 text-sm text-gray-500">
                <li className="date flex items-center gap-1">
                  <i className="las la-calendar" />
                  {formattedDate}
                </li>
                <i className="las la-arrow-right" />
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
