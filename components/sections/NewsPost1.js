import { Suspense } from "react";
import SidebarRightServer from "../layout/SidebarRight";
import NewsPostContent from "../layout/NewsPostContent";

function SidebarSkeleton() {
  return <div className="sidebar-skeleton">Loading sidebar...</div>;
}

export default function NewsPost1() {
  return (
    <section className="news-post-area padding pt-0 mt-30">
      <div className="container">
        <div className="row">
          {/* Main content (client) */}
          <NewsPostContent limit={5} />
          {/* Sidebar (server) */}
          <div className="col-lg-4">
            <Suspense fallback={<SidebarSkeleton />}>
              <SidebarRightServer />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
