# TypeScript Backend Template Documentation

## Overview

This is a production-ready TypeScript backend template built with Express.js. It provides a structured foundation for building RESTful APIs with proper configuration, middleware setup, and development tools.

## Project Structure

```
typescript-backend-template/
├── dist/                    # Compiled JavaScript output
├── src/                     # TypeScript source code
│   ├── config.ts           # Environment configuration
│   ├── index.ts            # Application entry point
│   ├── middlewares/        # Custom middleware implementations
│   │   ├── corsMw.ts       # CORS middleware
│   │   ├── notFound.ts     # 404 handler middleware
│   │   └── options.ts      # OPTIONS method handler
│   └── server/             # Server configuration
│       ├── baseRouter.ts   # Base router definition
│       └── serverConfig.ts # Server configuration setup
├── package.json            # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with:

```env
PORT=3000
ACCEPTED_ORIGINS=http://localhost:3001,http://localhost:3002
```

- `PORT`: Server port (default: 3000)
- `ACCEPTED_ORIGINS`: Comma-separated list of allowed CORS origins

### TypeScript Configuration (`tsconfig.json`)

Key configuration options:

- **Target**: ES2016 for modern JavaScript features
- **Module**: CommonJS for Node.js compatibility
- **OutDir**: `./dist` for compiled output
- **Strict**: Enabled for comprehensive type checking
- **ESModuleInterop**: Enabled for better CommonJS/ES module compatibility
- **NoUnusedLocals**: Enabled to catch unused variables

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd typescript-backend-template
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (see Configuration section)

4. Development mode:

```bash
npm run dev
```

5. Production build:

```bash
npm run build
npm start
```

## Available Scripts

| Script             | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `npm run dev`      | Start development server with hot reload using ts-node-dev |
| `npm run build`    | Compile TypeScript to JavaScript                           |
| `npm start`        | Run the compiled application from dist/                    |
| `npm run tsc`      | TypeScript compiler                                        |
| `npm run tsc:init` | Initialize TypeScript configuration                        |

## API Architecture

### Server Configuration

The server is configured in `src/server/serverConfig.ts` which:

- Disables `x-powered-by` header for security
- Adds JSON body parsing middleware
- Configures CORS with allowed origins
- Sets up allowed HTTP methods for OPTIONS requests
- Registers base routes
- Adds 404 middleware for unmatched routes

### Middlewares

#### 1. CORS Middleware (`corsMw.ts`)

- Configurable allowed origins from environment
- Supports credentials (cookies, authentication headers)
- Pre-configured for common HTTP methods
- Custom error handling for disallowed origins

#### 2. Options Method Handler (`options.ts`)

- Handles OPTIONS requests for CORS preflight
- Configurable allowed methods per route
- Returns proper headers for CORS preflight

#### 3. 404 Handler (`notFound.ts`)

- Catches all unhandled routes
- Returns consistent JSON error format

### Routing

Base router structure in `src/server/baseRouter.ts`:

- Base URL configurable via `url` property
- Express Router instance for route organization
- Default welcome message at base URL

## Usage Examples

### Adding New Routes

1. Create a new router file:

```typescript
// src/routes/users.ts
import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.json({ users: [] });
});

usersRouter.post("/", (req, res) => {
  // Handle user creation
  res.status(201).json({ message: "User created" });
});
```

2. Update base router:

```typescript
// src/server/baseRouter.ts
import { Router } from "express";
import { usersRouter } from "../routes/users";

export const baseRouter = {
  url: "/api",
  router: Router(),
};

baseRouter.router.use("/users", usersRouter);
```

### Customizing CORS Configuration

```typescript
// In your route or middleware setup
import { corsMw } from "./middlewares/corsMw";

// Use default configuration (from environment)
app.use(corsMw());

// Or with custom origins
app.use(corsMw({ acceptedOrigins: ["https://example.com"] }));
```

## Dependencies

### Production Dependencies

- **express@5.2.1**: Web framework for Node.js
- **cors@2.8.5**: CORS middleware for Express
- **dotenv@17.2.3**: Environment variable management

### Development Dependencies

- **typescript@5.9.3**: TypeScript compiler
- **ts-node-dev@2.0.0**: Development server with hot reload
- **@types/express@5.0.6**: TypeScript definitions for Express
- **@types/node@25.0.3**: TypeScript definitions for Node.js
- **@types/cors@2.8.19**: TypeScript definitions for CORS

## Best Practices Implemented

### Security

- CORS properly configured with allowed origins
- `x-powered-by` header disabled
- Environment variables for sensitive configuration
- TypeScript strict mode enabled

### Development

- Hot reload during development
- Clear separation of configuration and application logic
- Consistent error handling
- Pre-configured build process

### Code Quality

- TypeScript for type safety
- ESLint-ready configuration
- Modular architecture
- Consistent coding patterns

## Extending the Template

### Adding Database Support

1. Install database driver (e.g., `pg` for PostgreSQL)
2. Create database configuration in `src/config.ts`
3. Add database connection logic
4. Create data models and repositories

### Adding Authentication

1. Install authentication library (e.g., `jsonwebtoken`, `bcrypt`)
2. Create auth middleware
3. Implement user routes and controllers
4. Add protected route middleware

### Adding Testing

1. Install testing framework (e.g., `jest`, `supertest`)
2. Create `__tests__` directory
3. Configure test scripts in `package.json`
4. Write unit and integration tests

## Troubleshooting

### Common Issues

1. **Port already in use**: Change `PORT` in `.env` file
2. **CORS errors**: Ensure `ACCEPTED_ORIGINS` includes your frontend URL
3. **TypeScript compilation errors**: Run `npm run build` to see detailed errors
4. **Missing dependencies**: Run `npm install` to ensure all packages are installed

### Debugging

- Use `console.log` for basic debugging
- Consider adding `morgan` for HTTP request logging
- Use Node.js debugger for complex issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run build` to ensure no TypeScript errors
5. Submit a pull request
