import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export default function PostCard({
  featuredImageUrl,
  title,
  slug,
  publishAt,
  commentsCount,
  categorySlug = "news",
  categoryName = "Hot news",
}) {
  return (
    <Link className="card-post" href={`/news/${slug}`}>
      <div className="card-post-thumb">
        <img
          src={featuredImageUrl || "/assets/img/blog/post-1.jpg"}
          alt={title}
        />
        <span className="card-post-badge">{categoryName}</span>
      </div>

      <div className="card-post-body">
        <h3 className="card-post-title">{title}</h3>
        <ul className="card-post-meta">
          <li className="date">
            {new Date(publishAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </li>
          <li>
            <i className="las la-comments" /> {commentsCount || 1000}
          </li>
        </ul>
      </div>
    </Link>
  );
}

PostCard.propTypes = {
  featuredImageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  publishAt: PropTypes.string,
  commentsCount: PropTypes.number,
  categorySlug: PropTypes.string,
  categoryName: PropTypes.string,
};
