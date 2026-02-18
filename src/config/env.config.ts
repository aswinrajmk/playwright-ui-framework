import * as dotenv from "dotenv";
import * as path from "path";

const ENV = process.env.ENV || "dev";

dotenv.config({
  path: path.resolve(process.cwd(), `environments/${ENV}.env`),
});

// Fallback to root .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const envConfig = {
  ENV,
  BASE_URL: process.env.BASE_URL || "https://www.saucedemo.com",
  API_BASE_URL:
    process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com",
  TIMEOUT: Number(process.env.TIMEOUT) || 30000,
  RETRIES: Number(process.env.RETRIES) || 1,
  WORKERS: Number(process.env.WORKERS) || 2,
  HEADLESS: process.env.HEADLESS !== "false",
  SCREENSHOT_ON_FAILURE: process.env.SCREENSHOT_ON_FAILURE !== "false",
  VIDEO_ON_FAILURE: process.env.VIDEO_ON_FAILURE === "true",
  TRACE_ON_FAILURE: process.env.TRACE_ON_FAILURE !== "false",

  // Auth
  STANDARD_USER: process.env.STANDARD_USER || "standard_user",
  STANDARD_PASSWORD: process.env.STANDARD_PASSWORD || "secret_sauce",
};
