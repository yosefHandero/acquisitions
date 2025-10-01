#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting Acquisition App in Development Mode"
echo "================================================"

# 1) sanity checks
if [ ! -f .env.development ]; then
  echo "❌ .env.development missing"; exit 1
fi
if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker Desktop not running"; exit 1
fi
mkdir -p .neon_local
grep -q ".neon_local/" .gitignore 2>/dev/null || { echo ".neon_local/" >> .gitignore; echo "✅ Added .neon_local/ to .gitignore"; }

echo "📦 Building and starting development containers..."
docker compose -f docker-compose.dev.yml up -d --build

# 2) wait for DB, then migrate
echo "⏳ Waiting for neon-local to be healthy..."
until [ "$(docker inspect -f '{{.State.Health.Status}}' neon-local)" = "healthy" ]; do sleep 1; done

echo "📜 Applying latest schema with Drizzle..."
npm run db:migrate

echo ""
echo "🎉 Development environment started!"
echo "   Application: http://localhost:3000"
echo "   Database:   postgres://neon:npg@localhost:5432/neondb"
echo "   To stop:    docker compose -f docker-compose.dev.yml down -v"
