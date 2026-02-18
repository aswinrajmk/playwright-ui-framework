import { APIRequestContext } from "@playwright/test";
import { logger } from "@utils/Logger";

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
  ): Promise<{
    status: number;
    data: T;
  }> {
    logger.info(`GET ${endpoint}`);
    const response = await this.request.get(endpoint, { params });
    const data = await response.json();
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), data };
  }

  async post<T>(
    endpoint: string,
    body: unknown,
  ): Promise<{
    status: number;
    data: T;
  }> {
    logger.info(`POST ${endpoint}`);
    const response = await this.request.post(endpoint, {
      data: body,
    });
    const data = await response.json();
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), data };
  }

  async put<T>(
    endpoint: string,
    body: unknown,
  ): Promise<{
    status: number;
    data: T;
  }> {
    logger.info(`PUT ${endpoint}`);
    const response = await this.request.put(endpoint, {
      data: body,
    });
    const data = await response.json();
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), data };
  }

  async patch<T>(
    endpoint: string,
    body: unknown,
  ): Promise<{
    status: number;
    data: T;
  }> {
    logger.info(`PATCH ${endpoint}`);
    const response = await this.request.patch(endpoint, {
      data: body,
    });
    const data = await response.json();
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), data };
  }

  async delete(endpoint: string): Promise<{ status: number }> {
    logger.info(`DELETE ${endpoint}`);
    const response = await this.request.delete(endpoint);
    logger.info(`Response: ${response.status()}`);
    return { status: response.status() };
  }
}
