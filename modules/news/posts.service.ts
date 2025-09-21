import type { PostMeta } from "./interface";
import { mockData } from "./mockData";

class PostsService {
  private posts: PostMeta[];

  constructor() {
    this.posts = mockData as PostMeta[];
  }

  getAll(page: number, limit: number, category?: string) {
    let all = this.posts.filter((p) => p.status === "published");
    if (category) {
      all = all.filter((p) => p.category === category);
    }
    const items = all.slice((page - 1) * limit, page * limit);
    return {
      items,
      totalItems: all.length,
    };
  }

  getById(id: string): PostMeta | undefined {
    return this.posts.find((post) => post.id === id);
  }

  getLastNews(page = 1, limit = 6): PostMeta[] {
    return mockData;
  }

  getTrendingNews(page = 1, limit = 6): PostMeta[] {
    const trending = this.posts
      .filter((p) => p.status === "published")
      .slice(0, 5);

    return trending;
  }

  getFeatured(page = 1, limit = 4): PostMeta[] {
    const featured = this.posts
      .filter((p) => p.isFeatured && p.status === "published")
      .sort(
        (a, b) =>
          new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime()
      );

    return this.paginate(featured, page, limit);
  }

  getByCategory(categoryId: string, page = 1, limit = 6): PostMeta[] {
    const filtered = this.posts
      .filter((p) => p.category === categoryId && p.status === "published")
      .sort(
        (a, b) =>
          new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime()
      );

    return this.paginate(filtered, page, limit);
  }

  searchByKeyword(keyword: string, page = 1, limit = 10): PostMeta[] {
    const lower = keyword.toLowerCase();
    const matched = this.posts
      .filter((p) => p.status === "published")

      .sort(
        (a, b) =>
          new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime()
      );

    return this.paginate(matched, page, limit);
  }

  private paginate<T>(arr: T[], page: number, limit: number): T[] {
    const start = (page - 1) * limit;
    return arr.slice(start, start + limit);
  }
}

export const postsService = new PostsService();
