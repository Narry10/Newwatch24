"use client";

import Layout from "@/components/layout/Layout";
import PostCard from "@/components/elements/PostCard";
import { useSearchParams, useRouter } from "next/navigation";

import Loading from "@/app/loading";
import { useCategoryPostsInfinite } from "@/hooks/useCategorys";

const categories = [
  { slug: "", name: "All" },
  { slug: "sports", name: "Sports" },
  { slug: "movie", name: "Movie" },
  { slug: "lifestyle", name: "Lifestyle" },
  { slug: "fashion", name: "Fashion" },
  { slug: "business", name: "Business" },
];

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";

  const { posts, loadMore, hasMore, isLoading, isValidating } =
    useCategoryPostsInfinite({ category, limit: 11 });

  const handleCategoryChange = (slug) => {
    router.push(`/categories?category=${slug}`);
  };

  return (
    <Layout breadcrumbTitle={category ? `Category: ${category}` : "Blog"}>
      <section className="post-layout-1 padding">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`cat-chip ${
                  cat.slug === category ? "is-active" : ""
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Posts */}
          {isLoading && <Loading />}
          <div className="posts-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                featuredImageUrl={post.featuredImageUrl}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                author={post.author}
                publishAt={post.publishAt || post.createdAt}
                commentsCount={post.commentsCount}
                categorySlug={post.categorySlug}
                categoryName={post.categoryName}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                disabled={isValidating}
                className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                {isValidating ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
