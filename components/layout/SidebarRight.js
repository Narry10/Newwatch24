// app/(news)/_components/SidebarRightServer.jsx
import Link from "next/link";
import { categories as baseCategories } from "@/modules/news/interface";
import TrendingPostsContent from "./TrendingPostsContent";

export const revalidate = 60;

// Đếm ổn định 1..50 dựa theo slug/name (tránh Math.random() gây hydration mismatch)
function seededCount(seed) {
  let h = 2166136261; // FNV-1a-ish
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 50 + 1;
}

const categories = Object.values(baseCategories).map((cat) => ({
  ...cat,
  count: seededCount(cat.slug || cat.name || "all"),
}));

export default async function SidebarRightServer() {
  return (
    <div className="trending-post-wrap">
      {/* Categories */}
      <div className="categorie-wrap">
        <div className="section-heading mb-30">
          <h3 className="section-title title-border">
            <span>Categories</span>
          </h3>
        </div>
        <ul className="categorie-list">
          {categories.map((cat) => (
            <li key={cat.slug || "all"}>
              <Link href={`/categories?category=${encodeURIComponent(cat.slug)}`}>
                <h4 className="list-title">
                  {cat.name} <span>{cat.count}</span>
                </h4>
                <i className="las la-arrow-right" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Trending (client-side) */}
      <div className="section-heading mb-30 mt-30">
        <h3 className="section-title title-border">
          <span>Trending Posts</span>
        </h3>
      </div>
      <TrendingPostsContent />
    </div>
  );
}
