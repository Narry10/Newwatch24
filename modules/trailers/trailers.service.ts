// /modules/trailers/trailers.service.ts
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc as fsDoc,
  query,
  orderBy,
  limit as qLimit,
  startAfter,
  getCountFromServer,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/configs/firebase";
import type { Trailer } from "./interface";
import { TrailerMock } from "./trailerMock";

export class TrailersService {
  private static instance: TrailersService;
  private readonly collectionName = "trailers";

  private constructor() {}

  static getInstance(): TrailersService {
    if (!TrailersService.instance) {
      TrailersService.instance = new TrailersService();
    }
    return TrailersService.instance;
  }

  /**
   * Helper: chuẩn hoá giá trị date -> Timestamp
   */
  private toTimestamp(input?: any): Timestamp | undefined {
    if (!input) return undefined;
    if (input instanceof Timestamp) return input;
    if (input instanceof Date) return Timestamp.fromDate(input);
    // string -> Date -> Timestamp
    const d = new Date(input);
    return isNaN(d.getTime()) ? undefined : Timestamp.fromDate(d);
  }

  /**
   * Lấy danh sách trailers theo page/pageSize (desc theo `date`)
   * - Firestore không hỗ trợ skip/offset native — ta dùng startAfter lặp qua các trang trước.
   * - Với page nhỏ (1–5) đây là cách đơn giản & dễ hiểu.
   * - Trả về total bằng count API, chính xác hơn snapshot.size.
   */
  // async getAll(limit = 10): Promise<{ items: Trailer[]; total: number }> {
  //     try {
  //         const colRef = collection(db, this.collectionName);
  //         const totalSnap = await getCountFromServer(query(colRef));
  //         const total = totalSnap.data().count;

  //         // Lấy danh sách trailer theo limit, orderBy date desc
  //         const qRef = query(colRef, orderBy("date", "desc"), qLimit(limit));
  //         const snapshot = await getDocs(qRef);
  //         const items = snapshot.docs.map((d) => ({
  //             id: d.id,
  //             ...d.data(),
  //         })) as Trailer[];

  //         console.log("DB",items);

  //         return { items, total };
  //     } catch (error) {
  //         console.error("Error fetching trailers:", error);
  //         return { items: [], total: 0 };
  //     }
  // }

  async getAll(limit = 10): Promise<{ items: Trailer[]; total: number }> {
    const items = TrailerMock.slice(0, limit);
    const total = TrailerMock.length;
    return { items, total };
  }

  /**
   * Tạo mới trailer
   * - Dùng serverTimestamp cho createdAt
   * - Nếu truyền `date` dạng string/Date -> convert Timestamp để orderBy hoạt động tốt
   */
  async create(data: Omit<Trailer, "id">): Promise<string | null> {
    try {
      const colRef = collection(db, this.collectionName);

      const payload: Record<string, any> = {
        ...data,
        createdAt: serverTimestamp(),
      };

      // Chuẩn hoá date
      if (data.date) {
        const ts = this.toTimestamp((data as any).date);
        if (ts) payload.date = ts;
      } else if ((data as any).dateISO) {
        const ts = this.toTimestamp((data as any).dateISO);
        if (ts) payload.date = ts;
      }

      const docRef = await addDoc(colRef, payload);
      return docRef.id;
    } catch (error) {
      console.error("Error creating trailer:", error);
      return null;
    }
  }

  /**
   * Cập nhật trailer
   * - Tự thêm updatedAt = serverTimestamp
   * - Không đụng createdAt
   * - Nếu có `date` string -> convert Timestamp
   */
  async update(id: string, data: Partial<Trailer>): Promise<boolean> {
    try {
      const docRef = fsDoc(db, this.collectionName, id);

      const payload: Record<string, any> = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      if (data.date) {
        const ts = this.toTimestamp((data as any).date);
        if (ts) payload.date = ts;
      } else if ((data as any).dateISO) {
        const ts = this.toTimestamp((data as any).dateISO);
        if (ts) payload.date = ts;
      }

      await updateDoc(docRef, payload);
      return true;
    } catch (error) {
      console.error("Error updating trailer:", error);
      return false;
    }
  }
}

export const trailersService = TrailersService.getInstance();
