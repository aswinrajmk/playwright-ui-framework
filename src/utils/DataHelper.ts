import * as fs from "fs";
import * as path from "path";

export class DataHelper {
  static loadJson<T>(filePath: string): T {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const raw = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(raw) as T;
  }

  static randomString(length = 8): string {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }

  static randomEmail(): string {
    return `test_${this.randomString(6)}@example.com`;
  }

  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
