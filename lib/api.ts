import axios, { AxiosError } from "axios";
import type { ApiResponse, Memory, MemoryCategory } from "@/types/memory";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Normalizes any axios/network error into a plain, readable message
// so components can just show err.message without knowing axios internals.
function toReadableError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const backendMessage = axiosErr.response?.data?.message;
    if (backendMessage) return new Error(backendMessage);
    if (axiosErr.request && !axiosErr.response) {
      return new Error("Can't reach the server. Is the backend running?");
    }
  }
  return error instanceof Error ? error : new Error("Something went wrong");
}

export async function fetchMemories(category?: MemoryCategory): Promise<Memory[]> {
  try {
    const res = await client.get<ApiResponse<Memory[]>>("/memories", {
      params: category ? { category } : {},
    });
    return res.data.data;
  } catch (err) {
    throw toReadableError(err);
  }
}

export async function fetchMemoryById(id: string): Promise<Memory> {
  try {
    const res = await client.get<ApiResponse<Memory>>(`/memories/${id}`);
    return res.data.data;
  } catch (err) {
    throw toReadableError(err);
  }
}

export interface CreateMemoryPayload {
  title: string;
  caption?: string;
  location?: string;
  date?: string;
  category: MemoryCategory;
  image: File;
  accessCode?: string;
}

export async function createMemory(
  payload: CreateMemoryPayload,
  onProgress?: (percent: number) => void
): Promise<Memory> {
  try {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("caption", payload.caption || "");
    formData.append("location", payload.location || "");
    if (payload.date) formData.append("date", payload.date);
    formData.append("category", payload.category);
    formData.append("image", payload.image);

    const res = await client.post<ApiResponse<Memory>>("/memories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(payload.accessCode ? { "x-access-code": payload.accessCode } : {}),
      },
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
          onProgress(Math.round((evt.loaded * 100) / evt.total));
        }
      },
    });
    return res.data.data;
  } catch (err) {
    throw toReadableError(err);
  }
}

export async function deleteMemory(id: string, accessCode?: string): Promise<void> {
  try {
    await client.delete(`/memories/${id}`, {
      headers: accessCode ? { "x-access-code": accessCode } : {},
    });
  } catch (err) {
    throw toReadableError(err);
  }
}
