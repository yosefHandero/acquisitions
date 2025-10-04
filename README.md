# Acquisitions — Docker + Neon Local/Cloud
Testing
This repo is dockerized for two environments:

- Development: Uses Neon Local (proxy container) to create ephemeral branches automatically, and the app connects to Postgres at neon-local:5432 inside the compose network.
- Production: Connects directly to your Neon Cloud database URL (no Neon Local proxy).

Prerequisites

- Docker Desktop
- Neon API key and Project ID (for development Neon Local)
- An existing Neon database and (optionally) a parent branch for ephemeral branches

Environment files
This repo includes example env files. Copy and edit them (they’re gitignored):

- cp .env.development.example .env.development
- cp .env.production.example .env.production

Important variables

- Development (Neon Local):
  - DATABASE_URL=postgres://neon:npg@neon-local:5432/<your_db>?sslmode=require
  - NEON_API_KEY, NEON_PROJECT_ID, PARENT_BRANCH_ID
- Production (Neon Cloud):
  - DATABASE_URL=postgres://...neon.tech... (from Neon Console)

Local development (Neon Local)

1. Create and fill .env.development
   - Set NEON_API_KEY, NEON_PROJECT_ID
   - Set PARENT_BRANCH_ID to enable ephemeral branches (recommended). Omit BRANCH_ID in that case.
   - Set DATABASE_URL to point at neon-local. Example:
     postgres://neon:npg@neon-local:5432/acquisitions_dev?sslmode=require

2. Start the stack
   - docker compose --env-file ./.env.development -f docker-compose.dev.yml up --build
   - App: http://localhost:${PORT:-3000}
   - Neon Local listens on localhost:5432 for external tools; inside the compose network it’s neon-local:5432.

3. How ephemeral branches work
   - With PARENT_BRANCH_ID set, Neon Local will create a new branch at container start and delete it on stop.
   - To persist branches per Git branch, uncomment the volumes in docker-compose.dev.yml as per comments. This creates a .neon_local/ folder (already gitignored).

4. Node serverless driver note (@neondatabase/serverless)
   - This app already configures serverless driver to go through Neon Local in development:
     src/config/database.js sets neonConfig.fetchEndpoint, disables websockets, and uses fetch pooling when NODE_ENV=development.
   - Ensure NODE_ENV=development is set in the dev container (provided by docker-compose.dev.yml via the dev image target). No changes required in your code for dev.

5. Running Drizzle tasks inside the container (optional)
   - Example: docker compose --env-file ./.env.development -f docker-compose.dev.yml exec app npm run db:migrate

Production (Neon Cloud)

1. Create and fill .env.production
   - Set DATABASE_URL to your Neon Cloud URL from the Neon Console (contains neon.tech host).

2. Build and run
   - docker compose --env-file ./.env.production -f docker-compose.prod.yml up -d --build

3. Notes
   - There is no Neon Local proxy in production. The app connects directly to Neon Cloud using DATABASE_URL.
   - Secrets are supplied via environment variables; do not hardcode credentials in code or compose files.

How DATABASE_URL switches between environments

- Dev: .env.development sets DATABASE_URL to neon-local (postgres://neon:npg@neon-local:5432/...). docker-compose.dev.yml loads this file for both neon-local and app.
- Prod: .env.production sets DATABASE_URL to your neon.tech connection string. docker-compose.prod.yml loads this file for the app only.

Ports

- App listens on PORT (default 3000). Host port is bound to the same by default.
- Neon Local maps container 5432 to host 5432.

Troubleshooting

- If you see SSL/certificate issues in dev, Neon Local uses a self-signed cert. The serverless driver configuration in src/config/database.js routes DB over HTTP fetch, which avoids TLS issues. If you use the pg Postgres driver instead, set sslmode=require and consider allowing self-signed certs in dev.
- If Neon Local can’t create branches, verify NEON_API_KEY, NEON_PROJECT_ID, and PARENT_BRANCH_ID.

Security and git hygiene

- .env.\* and .neon_local/ are in .gitignore. Keep real secrets out of version control.

Useful commands (PowerShell)

- Dev up (foreground):
  docker compose --env-file ./.env.development -f docker-compose.dev.yml up --build
- Dev down (remove):
  docker compose --env-file ./.env.development -f docker-compose.dev.yml down
- Prod up (detached):
  docker compose --env-file ./.env.production -f docker-compose.prod.yml up -d --build
- Prod logs:
  docker compose --env-file ./.env.production -f docker-compose.prod.yml logs -f app
