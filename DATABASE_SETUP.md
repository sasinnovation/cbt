# Database Setup Guide

## Quick Start

### 1. PostgreSQL Setup

```bash
# Install PostgreSQL if not already installed
# On Windows: Download from https://www.postgresql.org/download/windows/
# On Mac: brew install postgresql
# On Linux: sudo apt-get install postgresql

# Start PostgreSQL service
pg_ctl -D "C:\Program Files\PostgreSQL\16\data" start  # Windows
# Or on Mac/Linux:
sudo service postgresql start
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE cbt;

# Create user (optional, for security)
CREATE USER cbt_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE cbt TO cbt_user;

# Exit psql
\q
```

### 3. Configure Environment

Create `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cbt"
# Or if using custom user:
# DATABASE_URL="postgresql://cbt_user:your_secure_password@localhost:5432/cbt"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Prisma
PRISMA_DATABASE_URL=$DATABASE_URL
```

### 4. Run Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate deploy

# Or create a new migration from schema changes
npx prisma migrate dev --name init_complete_schema

# Run seed script to populate demo data
npx prisma db seed
```

### 5. Verify Setup

```bash
# Open Prisma Studio to view database
npx prisma studio

# You should see:
# - School table with "Demo Secondary School"
# - User table with student and teacher accounts
# - Exam table with demo math exam
# - Questions and Options
# - Sample results
```

## Database Schema

### Core Models

- **User**: Authentication and basic user info
- **School**: School/institution information
- **Student**: Student profile linked to User
- **Teacher**: Teacher profile linked to User
- **Exam**: Exam configuration and metadata
- **Question**: Individual exam questions
- **Option**: Multiple choice options for questions
- **ExamSubmission**: Student exam submissions and answers
- **Result**: Calculated grades and scores
- **Session**: Exam session tracking
- **AuditLog**: System audit trail
- **AnalyticsEvent**: Usage analytics

## Demo Data

The seed script creates:

- **School**: Demo Secondary School (DSS)
- **Student Account**: student@demo.com / password123
- **Teacher Account**: teacher@demo.com / password123
- **Demo Exam**: "Mathematics - Basic Arithmetic" (10 questions, 100 marks, 30 min)
- **Sample Results**: Student exam submission with 85% score

## Troubleshooting

### Connection Issues

```bash
# Test connection
psql -h localhost -U postgres -d cbt -c "SELECT version();"

# Check PostgreSQL is running
# Windows: tasklist | findstr postgres
# Mac/Linux: ps aux | grep postgres
```

### Migration Issues

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Create new migration from schema changes
npx prisma migrate dev --name describe_changes

# Check migration status
npx prisma migrate status
```

### Seed Issues

```bash
# Run seed manually
npx prisma db seed

# Or directly run seed script
ts-node prisma/seed.ts
```

## Environment Variables Reference

```env
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/cbt"
JWT_SECRET="your-jwt-secret-key"

# Optional (has defaults)
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"

# Prisma
PRISMA_DATABASE_URL=$DATABASE_URL
```

## Production Checklist

- [ ] Use strong PostgreSQL password
- [ ] Change JWT_SECRET to strong random key
- [ ] Use environment-specific database
- [ ] Enable SSL for database connection
- [ ] Set NODE_ENV to "production"
- [ ] Use connection pooling (PgBouncer)
- [ ] Enable database backups
- [ ] Review and update seed script for production
