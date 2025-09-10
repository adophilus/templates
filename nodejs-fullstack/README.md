# Node.js Fullstack Template

This is a comprehensive Node.js fullstack template designed to kickstart your web development projects. It provides a solid foundation with a monorepo setup, backend API, and documentation.

## Development

### Installing Dependencies

```bash
pnpm install
```

### Environment Variables
This project uses direnv to manage environment variables. To get started:
- Copy `.env.example` to `.env`.
```bash
cp .env.example .env
```
- Copy `.env.${environment}.example` to `.env.${environment}`.
```bash
cp .env.development.example .env
```
- Make sure direnv is allowed in this project folder.
```bash
direnv allow
```

And you should be good to go.

### Contributing

```bash
pnpm dev
```
