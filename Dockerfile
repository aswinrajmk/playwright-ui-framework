# ╔══════════════════════════════════════════════════════════════════════════╗
# ║  Stage 1 — deps                                                         ║
# ║  Lightweight Node image — installs dependencies only.                   ║
# ║  No browsers needed here; keeps this layer lean and cacheable.          ║
# ╚══════════════════════════════════════════════════════════════════════════╝
FROM node:22-slim AS deps

WORKDIR /build

# Copy lockfiles first — Docker cache busts only when these change
COPY package.json package-lock.json ./

# --ignore-scripts: prevents postinstall scripts from running (security)
# --prefer-offline: use cache when available
RUN npm ci --ignore-scripts --prefer-offline

# ╔══════════════════════════════════════════════════════════════════════════╗
# ║  Stage 2 — runner                                                       ║
# ║  Official Playwright image with all browsers pre-installed.             ║
# ║  Runs as non-root pwuser (UID 1000) — least privilege principle.        ║
# ╚══════════════════════════════════════════════════════════════════════════╝
FROM mcr.microsoft.com/playwright:v1.58.2-noble AS runner

# OCI standard labels for image metadata
LABEL org.opencontainers.image.title="playwright-ui-framework" \
      org.opencontainers.image.description="Enterprise Playwright + TypeScript test automation" \
      org.opencontainers.image.source="https://github.com/aswinrajmk/playwright-ui-framework"

# Opt out of Playwright telemetry
ENV PLAYWRIGHT_TELEMETRY_DISABLED=1 \
    # Prevents npm from printing update notifications (cleaner CI logs)
    NO_UPDATE_NOTIFIER=1 \
    # Node produces cleaner stack traces in CI
    NODE_ENV=test

WORKDIR /app

# Copy node_modules from deps stage — chown to pwuser immediately
COPY --from=deps --chown=pwuser:pwuser /build/node_modules ./node_modules

# Copy source — .dockerignore ensures secrets and generated files are excluded
COPY --chown=pwuser:pwuser . .

# Give pwuser ownership of /app itself so it can rmdir/mkdir entries when
# bind-mounts overlay the output subdirs (removing a dir requires write on parent)
RUN chown pwuser:pwuser /app \
    && mkdir -p test-results allure-results playwright-report allure-report

# Drop root — run as the non-root pwuser provided by the official image
USER pwuser

# Verify the setup looks correct at build time
RUN node --version && npx playwright --version

# Default: run full test suite (override per service in docker-compose.yml)
CMD ["npx", "playwright", "test"]
