"use client";

import Loading from "@/app/loading";
import Pagination from "@/components/elements/Pagination";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useLatestPosts } from "@/hooks/useLatestPosts";
import CategoryTag from "../elements/CategoryTag";

const LIMIT = 10; // phải trùng với limit cố định trong useLatestPosts()

export default function NewsPostContent() {
  const [page, setPage] = useState(1);

  // Gọi 1 lần, dùng mặc định trong hook
  const { posts, total, isLoading, isError } = useLatestPosts();

  const totalPages = useMemo(() => {
    const t = Number(total) || 0;
    return Math.max(1, Math.ceil(t / LIMIT));
  }, [total]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading posts</div>;
  if (!posts || posts.length === 0) return <Loading />;

  return (
    <div className="col-lg-8">
      <div className="news-post-wrap">
        <div className="section-heading mb-4">
          <h3 className="section-title title-border">
            <span>Latest Posts</span>
          </h3>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="post-card news-post">
            <div className="post-thumb">
              <Link href={`/news/${post.slug}`}>
                <img
                  src={post.featuredImageUrl}
                  alt={post.title}
                  onError={(e) => {
                    e.currentTarget.src = "";
                  }}
                />
              </Link>
            </div>
            <div className="post-content">
              <CategoryTag category={post.category || "News"} />
              <h3 className="title">
                <Link href={`/news/${post.slug}`}>{post.title}</Link>
              </h3>

              <ul className="post-list">
                <li className="author">
                  by{" "}
                  <span>
                    <Link href={`/news/${post.slug}`}>
                      {post.createdBy || "Admin"}
                    </Link>
                  </span>
                </li>
                <li className="date">
                  {new Date(
                    post.publishAt || post.createdAt
                  ).toLocaleDateString("en-US")}
                </li>
              </ul>
              <p>{post.subtitle}</p>
              <Link href={`/news/${post.slug}`} className="news-post-btn">
                <i className="las la-arrow-right" />
              </Link>
            </div>
          </div>
        ))}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
