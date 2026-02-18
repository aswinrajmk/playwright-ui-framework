# Playwright UI Framework

Enterprise-grade test automation framework built with **Playwright + TypeScript**.

## Architecture

```
├── src/
│   ├── api/                  # API client & endpoint wrappers
│   │   ├── ApiClient.ts      # Generic HTTP methods (GET/POST/PUT/PATCH/DELETE)
│   │   └── endpoints/        # Domain-specific API classes
│   ├── components/           # Reusable UI components (Header, CartItem)
│   ├── config/               # Environment configuration
│   ├── data/                 # Test data & TypeScript types
│   ├── fixtures/             # Playwright fixtures (base, auth, api)
│   ├── pages/                # Page Object Model classes
│   └── utils/                # Logger, DataHelper, WaitHelper
├── tests/
│   ├── ui/                   # UI test specs (login, inventory, cart, checkout)
│   └── api/                  # API test specs
├── environments/             # Per-environment .env files (dev, staging, prod)
├── Dockerfile                # Containerized test execution
├── docker-compose.yml        # Multi-service Docker setup
└── .github/workflows/        # CI/CD pipeline
```

## Key Patterns

| Pattern | Implementation |
|---------|---------------|
| **POM (Component-based)** | `BasePage` → Page classes embed reusable `Component` classes (Header, CartItem) |
| **Custom Fixtures** | `base.fixture` (page objects), `auth.fixture` (pre-logged-in), `api.fixture` (API client) |
| **Multi-Environment** | `ENV=staging npm run test` loads `environments/staging.env` |
| **API Testing** | `ApiClient` wraps Playwright's `APIRequestContext`; endpoint classes for domain logic |
| **Allure Reports** | Built into `playwright.config.ts`; CI auto-deploys to GitHub Pages |

## Quick Start

```bash
# Install
npm install
npx playwright install --with-deps

# Run all tests (chromium)
npm test

# Run by type
npm run test:ui
npm run test:api

# Run by browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run with UI mode
npx playwright test --ui

# Debug
npm run test:debug
```

## Multi-Environment

```bash
# Run against specific environment
npm run test:dev
npm run test:staging
npm run test:prod

# Or directly
ENV=staging npx playwright test
```

Each environment file (`environments/*.env`) configures:
- `BASE_URL`, `API_BASE_URL`
- `TIMEOUT`, `RETRIES`, `WORKERS`
- `HEADLESS`, `SCREENSHOT_ON_FAILURE`, `VIDEO_ON_FAILURE`, `TRACE_ON_FAILURE`

## Docker

```bash
# Chromium only
docker compose up playwright

# All browsers
docker compose up playwright-all-browsers

# API tests only
docker compose up playwright-api

# Specific environment
ENV=staging docker compose up playwright
```

## Reports

```bash
# Playwright HTML report
npm run report

# Allure
npm run allure:report
```

## CI/CD (GitHub Actions)

The workflow runs on push/PR to `main`/`develop`:
- **Matrix strategy**: Chromium, Firefox, WebKit in parallel
- **API tests**: Separate lightweight job
- **Allure report**: Auto-generated and deployed to GitHub Pages
- **Manual trigger**: Pick environment and browser from the Actions UI

## Test Targets

| Type | Target | What's Covered |
|------|--------|---------------|
| UI | [SauceDemo](https://www.saucedemo.com) | Login, inventory, cart, checkout, product detail, sorting |
| API | [JSONPlaceholder](https://jsonplaceholder.typicode.com) | CRUD operations, filtering, partial updates |

## Adding New Tests

1. **New page?** Create `src/pages/MyPage.ts` extending `BasePage`, add to `base.fixture.ts`
2. **New component?** Create `src/components/MyComponent.ts`, compose into page objects
3. **New API endpoint?** Create `src/api/endpoints/MyApi.ts` using `ApiClient`, add to `api.fixture.ts`
4. **New test?** Create `tests/ui/my-feature.spec.ts` importing from the appropriate fixture
