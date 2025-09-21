// components/layout/Sidebar.js
import Link from "next/link";
import { categories as baseCategories } from "@/modules/news/interface";

// Hàm băm rất nhẹ để tạo số ổn định 1..50 từ slug/name
function seededCount(seed) {
  let h = 2166136261; // FNV-1a-ish
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const n = (h >>> 0) % 50; // 0..49
  return n + 1;             // 1..50
}

const categories = Object.values(baseCategories).map((cat) => ({
  ...cat,
  count: seededCount(cat.slug || cat.name || "all"),
}));

export default function Sidebar({
  isSidebar,
  handleSidebar,
  isMobileMenu,
  handleMobileMenu,
}) {
  return (
    <>
      <div id="sidebar-area" className="sidebar-area">
        <button className="sidebar-trigger close" onClick={handleSidebar}>
          <i className="la la-close" />
        </button>
        <div className="sidebar-content">
          <div className="site-logo">
            <Link href="/">
              <img className="logo-3" src="/assets/img/logo/logo-3.png" alt="logo" />
            </Link>
          </div>

          <div className="sidebar-greeting" style={{}}>
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
                        {cat.name} <span>({cat.count})</span>
                      </h4>
                      <i className="las la-arrow-right" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
      {isSidebar && <div id="sidebar-overlay" onClick={handleSidebar} />}
    </>
  );
}
