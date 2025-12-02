# How to Start the Backend

## Prerequisites

1. **PostgreSQL Database** - Make sure you have PostgreSQL installed and running
2. **Node.js** - Version 18+ recommended
3. **npm** - Comes with Node.js

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following to `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

# JWT Secret (use a strong random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Port (optional, defaults to 3000)
PORT=3000
```

**Important**: Replace the `DATABASE_URL` with your actual PostgreSQL connection string.

Example:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/clientonboard?schema=public"
```

### 3. Run Database Migrations

Since we added new models (OnboardingSubmission, FileUpload, ProjectStatus), you need to create and run a migration:

```bash
npx prisma migrate dev --name add_onboarding_features
```

This will:
- Create a new migration file
- Apply it to your database
- Regenerate Prisma Client

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Create Uploads Directory

The backend needs an `uploads/` directory for file storage:

```bash
mkdir uploads
```

### 6. Start the Backend

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode** (build first, then start):
```bash
npm run build
npm start
```

## Verify It's Working

Once started, you should see:
```
Server running on port 3000
```

Test the health endpoint:
```bash
curl http://localhost:3000/api/health
```

You should get:
```json
{"status":"running!!"}
```

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `pg_isready` or check your PostgreSQL service
- Verify `DATABASE_URL` is correct
- Make sure the database exists

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 3001)
- Or kill the process using port 3000

### Migration Errors
- Make sure your database is empty or you're okay with schema changes
- Check Prisma schema is valid: `npx prisma validate`
- Reset database if needed: `npx prisma migrate reset` (⚠️ deletes all data)

### Missing Dependencies
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

## Quick Start (All Commands)

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (edit with your database info)
echo 'DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
PORT=3000' > .env

# 3. Run migrations
npx prisma migrate dev --name add_onboarding_features

# 4. Generate Prisma client
npx prisma generate

# 5. Create uploads directory
mkdir -p uploads

# 6. Start server
npm run dev
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `JWT_SECRET` | Yes | Secret key for JWT tokens | `my-super-secret-key-123` |
| `PORT` | No | Server port (default: 3000) | `3000` |

## Next Steps

Once the backend is running:
1. Start the frontend: `cd frontend && npm run dev`
2. Test the API endpoints
3. Create your first user account via the frontend

