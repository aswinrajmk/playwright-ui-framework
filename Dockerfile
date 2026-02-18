FROM mcr.microsoft.com/playwright:v1.50.0-noble

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Default: run all tests on chromium
CMD ["npx", "playwright", "test", "--project=chromium"]
