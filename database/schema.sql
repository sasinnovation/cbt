-- ============================================
-- CBT SAAS DATABASE SCHEMA (SAFE ADDITION ONLY)
-- ============================================

-- NOTE: This file does NOT affect runtime
-- It is only for Supabase setup

create table schools (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamp default now()
);

create table users (
  id uuid primary key,
  email text unique,
  role text
);

create table students (
  id uuid primary key,
  user_id uuid
);

create table exams (
  id uuid primary key default gen_random_uuid(),
  title text
);

create table questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid,
  question text
);
