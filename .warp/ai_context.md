# Acquisitions API - Project Context

## Technology Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js v5.1.0
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM v0.44.5
- **Authentication**: JWT with bcrypt
- **Logging**: Winston
- **Validation**: Zod
- **Linting**: ESLint v9.36.0
- **Formatting**: Prettier v3.6.2

## Project Structure

```
src/
├── app.js              # Express app configuration
├── index.js            # Application entry point
├── server.js           # Server setup
├── config/
│   ├── database.js     # Database configuration
│   └── logger.js       # Winston logger setup
├── controllers/        # Route handlers
│   └── auth.controller.js
├── models/             # Drizzle ORM models
│   └── user.model.js
├── routes/             # Express routes
│   └── auth.routes.js
├── services/           # Business logic
│   └── auth.service.js
├── utils/              # Helper functions
│   ├── cookies.js
│   ├── format.js
│   └── jwt.js
└── validations/        # Zod validation schemas
    └── auth.validation.js
```

## Path Mapping

The project uses import maps for clean imports:

- `#src/*` → `./src/*`
- `#config/*` → `./src/config/*`
- `#controllers/*` → `./src/controllers/*`
- `#middleware/*` → `./src/middleware/*`
- `#models/*` → `./src/models/*`
- `#routes/*` → `./src/routes/*`
- `#services/*` → `./src/services/*`
- `#utils/*` → `./src/utils/*`
- `#validations/*` → `./src/validations/*`

## Available Scripts

- `npm run dev` - Start development server with --watch
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format with Prettier
- `npm run format:check` - Check formatting
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Drizzle Studio

## Database

- Using Neon PostgreSQL serverless database
- Drizzle ORM for type-safe database operations
- Migration files in `drizzle/` directory
- Database configuration in `src/config/database.js`

## Security & Middleware

- Helmet for security headers
- CORS enabled
- Cookie parser for session management
- Morgan for HTTP request logging
- JWT authentication
- Bcrypt for password hashing

## Logging

- Winston logger configured in `src/config/logger.js`
- Logs stored in `logs/combined.log` and `logs/error.log`

## Environment

- Uses `.env` file for environment variables
- Type: ES Module (package.json has "type": "module")

## Common Development Patterns

- Controllers handle HTTP requests/responses
- Services contain business logic
- Models define database schemas
- Validations use Zod for input validation
- JWT utilities in `src/utils/jwt.js`
- Consistent error handling and logging
