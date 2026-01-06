# Agent Guidelines for NodeJS Fullstack Template

This document provides essential information for AI agents working within the `nodejs-fullstack` codebase.

## 1. Project Overview

This is a TypeScript/Node.js monorepo managed by `nx` and `pnpm`. The primary application is a backend service.

## 2. Essential Commands

All commands should be run using `pnpm` in the root directory. `nx` orchestrates commands across projects within the monorepo.

-   **Install Dependencies**:
    ```bash
    pnpm install
    ```
-   **Development Mode**: Starts all projects in development mode.
    ```bash
    pnpm dev
    ```
-   **Build All Projects**: Builds all applications and packages.
    ```bash
    pnpm build
    ```
-   **Build Specific Projects**:
    ```bash
    pnpm build:backend   # Builds only the backend application
    pnpm build:docs      # Builds only the documentation application
    ```
-   **Start Specific Projects**:
    ```bash
    pnpm start:backend   # Starts the backend application
    pnpm start:docs      # Starts the documentation application
    ```
-   **Lint Code**: Runs `biome` linter across all projects.
    ```bash
    pnpm lint
    ```
-   **Type Check**: Runs TypeScript type checking across all projects.
    ```bash
    pnpm typecheck
    ```
-   **Run Tests**: Executes tests for all projects (uses `vitest` for backend).
    ```bash
    pnpm test
    ```

## 3. Code Organization and Structure

The codebase follows a monorepo structure with applications under `apps/` and shared packages under `packages/`.

-   **`apps/`**: Contains standalone applications.
    -   `apps/backend/`: The main Node.js/TypeScript backend service.
    -   `apps/frontend/`: The frontend application.
    -   `apps/docs/`: Documentation application.
-   **`packages/`**: Contains shared libraries and utilities.
    -   `packages/api/`: Shared API definitions or client-side generation.
    -   `packages/domain/`: Core business logic, domain models, and shared types.
    -   `packages/vite-plugin-stylex/`: Custom Vite plugin.

### Backend (`apps/backend/src/`) Structure

The backend is organized by features, with a layered architecture within each feature:

-   **`features/<feature-name>/`**: Contains all code related to a specific feature (e.g., `auth`, `config`, `mailer`, `storage`).
    -   **`route/`**: Defines API endpoints and their handlers (e.g., `SendSignInOtpEndpoint.ts`).
    -   **`service/`**: Implements business logic and orchestrates operations.
    -   **`repository/`**: Handles data access logic, interacting with the database.
    -   **`middleware/`**: Contains Express.js or similar middleware (e.g., `AuthenticationMiddleware.ts`).
    -   **`cron.ts`**: For scheduled tasks.
-   **`types.ts`**: Global or shared type definitions.
-   **`bootstrap.ts`**: Application startup and initialization logic.
-   **`app.ts`**: Main application entry point.

## 4. Naming Conventions and Style Patterns

-   **Language**: TypeScript is the primary language.
-   **Formatting & Linting**: `biome` is used to enforce code style.
    -   Indent style: 2 spaces.
    -   Quote style: Single quotes.
    -   Semicolons: As needed (not strictly enforced at end of statements).
    -   Trailing commas: None.
    -   Line width: 80 characters.
-   **TypeScript Specifics**:
    -   `noExplicitAny` rule is `off` in `biome.json`, so agents should be mindful of type safety even when `any` is allowed.
    -   PascalCase for type names, interfaces, enums, and classes.
    -   camelCase for variables, functions, and object properties.

## 5. Testing Approach

-   **Framework**: `vitest` is used for testing, particularly within the `apps/backend` project.
-   **Test Location**: Tests for a project are typically found in a `tests/` directory within that project (e.g., `apps/backend/tests/`).
-   **Running Tests**: Use `pnpm test` from the root to run all tests or `nx test <project-name>` for specific projects.

## 6. Important Gotchas and Non-Obvious Patterns

-   **NX Monorepo Management**: Always use `pnpm` and `nx` commands for running scripts, building, testing, and linting, as they correctly handle inter-project dependencies and caching.
-   **Database Interactions**: The backend uses `Kysely` for type-safe SQL query building and database migrations, as indicated by `kysely.config.ts` and `features/database/kysely/` files. Database schema and migration management are handled through this.
-   **Environment Variables**: Configuration relies on `.env.*.example` files, which should be replicated as `.env` files for local development. Configuration is likely loaded via `features/config/`.
