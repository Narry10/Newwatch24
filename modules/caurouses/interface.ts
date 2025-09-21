export interface Carousel {
  id: string;           // UUID
  slug?: string;        // liên kết tới Post (tuỳ chọn)
  postId?: string;      // hoặc liên kết theo id Post
  img: string;          // ảnh override cho hero/card
  active: boolean;      // bật/tắt
  priority: number;     // độ ưu tiên (số càng nhỏ càng ưu tiên)
  createdAt: string;   
  updateAt: string;
}
