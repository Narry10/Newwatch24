import { carouselMock } from "./carouselMock";
import { Carousel } from "./interface";


export class CarouselService {
  private items: Carousel[];

  constructor(initial?: Carousel[]) {
    this.items = (initial ?? carouselMock).map((c) => ({ ...c }));
  }

  /**
   * Lấy tất cả carousel (bao gồm cả active & inactive),
   * sort theo priority ASC rồi updateAt DESC,
   * có hỗ trợ phân trang.
   */
  getAll(page = 1, limit = 50) {
    let arr = [...this.items];
    const totalItems = arr.length;

    // sort: priority ASC -> updateAt DESC
    arr.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return +new Date(b.updateAt) - +new Date(a.updateAt);
    });

    // paginate
    const start = (page - 1) * limit;
    const items = arr.slice(start, start + limit);

    return { items, totalItems };
  }
}

export const carouselService = new CarouselService();
