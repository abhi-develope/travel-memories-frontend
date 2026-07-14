export type MemoryCategory = "us" | "her";

export interface Memory {
  _id: string;
  title: string;
  caption: string;
  location: string;
  date: string;
  category: MemoryCategory;
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
