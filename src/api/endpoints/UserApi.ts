import { ApiClient } from "@api/ApiClient";
import { ApiUser, ApiPost } from "@data/types";

export class UserApi {
  constructor(private readonly client: ApiClient) {}

  async getUsers() {
    return this.client.get<ApiUser[]>("users");
  }

  async getUserById(id: number) {
    return this.client.get<ApiUser>(`users/${id}`);
  }

  async getPosts() {
    return this.client.get<ApiPost[]>("posts");
  }

  async getPostById(id: number) {
    return this.client.get<ApiPost>(`posts/${id}`);
  }

  async getPostsByUserId(userId: number) {
    return this.client.get<ApiPost[]>(`posts?userId=${userId}`);
  }

  async createPost(payload: Omit<ApiPost, "id">) {
    return this.client.post<ApiPost>("posts", payload);
  }

  async updatePost(id: number, payload: ApiPost) {
    return this.client.put<ApiPost>(`posts/${id}`, payload);
  }

  async patchPost(id: number, payload: Partial<ApiPost>) {
    return this.client.patch<ApiPost>(`posts/${id}`, payload);
  }

  async deletePost(id: number) {
    return this.client.delete(`posts/${id}`);
  }
}
