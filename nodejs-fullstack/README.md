# Node.js Fullstack Template

This is a comprehensive Node.js fullstack template designed to kickstart your web development projects. It provides a solid foundation with a monorepo setup, backend API, and documentation.

## Documentation

You can [check out the documentation here](https://docs.betalyfe.com.ng/docs/index.html) (Note: This link is a placeholder from the example. Please update it with your project's actual documentation link.)

## Development

### Step 1: Copy Environment Variables

- Copy `.env.example` -> `.env`
- Copy `.env.development.example` -> `.env.development`

```bash
cp .env.example .env
cp .env.development.example .env.development
```

### Step 2: Install and Setup direnv

- Head over to [direnv.net](https://direnv.net) and follow the [installation guide](https://direnv.net/docs/installation.html) and the [hook setup guide](https://direnv.net/docs/hook.html).
- After following those guides, you should have the `direnv` CLI tool available on your machine.
- Run `direnv allow` in the project root to load environment variables into your shell.

```bash
direnv allow
```

### Step 3: Install Dependencies

```bash
# Be sure to run this at the project root
pnpm install
```

**NOTE**: It's `pnpm` **NOT** `npm`

### Step 4: Running the local setup

```bash
# Be sure to run this at the project root
pnpm dev
```

NOTE:
- webapp runs on port `3000`
- docs runs on port `3001`
- backend runs on port `5000`

These are configured in `.env.${ENVIRONMENT}` (which should be `.env.development` on your local machine)

## Contribution

Checkout [Contribution guidelines](./CONTRIBUTION.md).
