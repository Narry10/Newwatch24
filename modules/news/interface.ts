export interface PostMeta {
  id: string; // UUID
  slug: string;
  title: string;
  subtitle?: string;

  featuredImageUrl?: string;

  category?: string;

  status: "draft" | "published" | "archived";
  isFeatured?: boolean;

  publishAt?: string;
  unpublishAt?: string;

  lastVersionId?: string;

  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostDetail {
  id: string;
  postId: string;
  version: number;

  isDraft: boolean;
  isLive: boolean;

  titleOverride?: string;

  contentJson: any; // tiptap JSON schema
  contentHtml?: string; // cache render
  contentText?: string; // plain text cho search

  toc?: Array<{
    id: string;
    text: string;
    level: number;
  }>;

  embeds?: Array<{
    // youtube, tweet, v.v
    type: string;
    url: string;
  }>;

  imageAssets?: Array<{
    // ảnh inline trong bài
    url: string;
    alt?: string;
    caption?: string;
    credit?: string;
  }>;

  footnotes?: Array<{ id: string; text: string }>;

  contentHash?: string;
  changedSummary?: string;

  editorId: string;
  createdAt: Date;
}

export interface Post {
  meta: PostMeta;
  detail: PostDetail;
}

export enum Category {
  ALL = "",
  MOVIE = "movie",
  SPORTS = "sports",
  LIFESTYLE = "lifestyle",
  FASHION = "fashion",
  BUSINESS = "business",
  NEWS = "news",
}

export const categories = [
  { slug: Category.ALL, name: "All" },
  { slug: Category.NEWS, name: "News" },
  { slug: Category.SPORTS, name: "Sports" },
  { slug: Category.MOVIE, name: "Movie" },
  { slug: Category.LIFESTYLE, name: "Lifestyle" },
  { slug: Category.BUSINESS, name: "Business" },
];
