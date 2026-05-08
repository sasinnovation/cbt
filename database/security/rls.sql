-- ============================================
-- PHASE 17: SUPABASE ROW LEVEL SECURITY (RLS)
-- CRITICAL SAAS ISOLATION LAYER
-- ============================================

-- ENABLE RLS ON CORE TABLES
alter table schools enable row level security;
alter table exams enable row level security;
alter table questions enable row level security;
alter table results enable row level security;
alter table payments enable row level security;

-- SCHOOL ISOLATION POLICY
create policy "school_isolation"
on schools
for all
using (id = auth.jwt() ->> 'school_id');

-- EXAMS ISOLATION
create policy "exam_isolation"
on exams
for all
using (school_id = auth.jwt() ->> 'school_id');

-- RESULTS ISOLATION
create policy "results_isolation"
on results
for all
using (school_id = auth.jwt() ->> 'school_id');
