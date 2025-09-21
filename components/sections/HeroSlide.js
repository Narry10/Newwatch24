import Link from "next/link";
import { useFormattedDate } from "@/hooks/useFormattedDate";

export default function HeroSlide({ post }) {
  const formattedDate = useFormattedDate(post.publishAt);

  return (
    <div className="hero-card">
      <div className="hero-card-img">
        <img src={post.featuredImageUrl} alt={post.title} />
      </div>
      <div className="hero-card-body">
        <Link href={`/news/${post.slug}`} className="hero-category">
          {post.category}
        </Link>
        <h3 className="hero-title">
          <Link href={`/news/${post.slug}`}>{post.title}</Link>
        </h3>
        <ul className="hero-meta">
          <li>
            by{" "}
            <Link href={`/news/${post.slug}`}>
              {post.createdBy || "admin"}
            </Link>
          </li>
          <li>{formattedDate}</li>
        </ul>
      </div>
    </div>
  );
}