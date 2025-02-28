#!/bin/bash
set -e

echo "Listing files in /app for debugging..."
ls -la /app

echo "Checking specific files in /app/src..."
ls -la /app/src || echo "/app/src not found"
ls -la /app/src/config/databaseConfig.js || echo "databaseConfig.js not found"
ls -la /app/.sequelizerc || echo ".sequelizerc not found"

echo "DB_URI: $DB_URI" # Debugging

echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h db -p 5432 -U ghalyabr -d kanbanDB; do
  echo "PostgreSQL not ready yet, waiting..."
  sleep 1
done
echo "PostgreSQL is ready!"

echo "Running migrations..."
  npx sequelize-cli db:migrate || { echo "Migration failed"; exit 1; }

echo "Running seeders..."
npx sequelize-cli db:seed:all || { echo "Seeder failed"; exit 1; }

echo "Starting server..."
node /app/cmd/index.js