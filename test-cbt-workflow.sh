#!/bin/bash
# CBT System Comprehensive Workflow Test
# Tests: Student registration → Exam submission → Result export

API_URL="http://localhost:3000/api"
SETUP_KEY="CBT_SETUP_2024"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function for API calls
call_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local token=$4
    
    if [ -z "$token" ]; then
        curl -s -X $method "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data"
    else
        curl -s -X $method "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data"
    fi
}

# Test result printer
print_result() {
    local test_name=$1
    local result=$2
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✓ PASS${NC}: $test_name"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}: $test_name"
        ((TESTS_FAILED++))
    fi
}

echo -e "${YELLOW}=== CBT SYSTEM COMPREHENSIVE TEST ===${NC}\n"

# ============================================
# STEP 1: CREATE SUPER ADMIN
# ============================================
echo -e "${YELLOW}Step 1: Super Admin Creation${NC}"

SUPER_ADMIN_RESPONSE=$(call_api POST "/admin/super-admin" \
    "{\"email\":\"superadmin@cbt.test\",\"password\":\"SecurePass123!\",\"fullName\":\"Super Admin\",\"setupKey\":\"$SETUP_KEY\"}" \
    "")

SUPER_ADMIN_ID=$(echo $SUPER_ADMIN_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$SUPER_ADMIN_ID" ]; then
    print_result "Super Admin Created" "PASS"
else
    print_result "Super Admin Created" "FAIL"
    echo "Response: $SUPER_ADMIN_RESPONSE"
fi

# Login as Super Admin
LOGIN_RESPONSE=$(call_api POST "/auth/login" \
    "{\"email\":\"superadmin@cbt.test\",\"password\":\"SecurePass123!\"}" \
    "")

SUPER_ADMIN_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$SUPER_ADMIN_TOKEN" ]; then
    print_result "Super Admin Login" "PASS"
else
    print_result "Super Admin Login" "FAIL"
    echo "Response: $LOGIN_RESPONSE"
fi

# ============================================
# STEP 2: CREATE SCHOOL
# ============================================
echo -e "\n${YELLOW}Step 2: School Creation${NC}"

SCHOOL_RESPONSE=$(call_api POST "/school" \
    "{\"name\":\"Test School\",\"shortCode\":\"TEST001\"}" \
    "$SUPER_ADMIN_TOKEN")

SCHOOL_ID=$(echo $SCHOOL_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$SCHOOL_ID" ]; then
    print_result "School Created" "PASS"
else
    print_result "School Created" "FAIL"
    echo "Response: $SCHOOL_RESPONSE"
fi

# ============================================
# STEP 3: CREATE SCHOOL ADMIN
# ============================================
echo -e "\n${YELLOW}Step 3: School Admin Creation${NC}"

ADMIN_RESPONSE=$(call_api POST "/admin/admins" \
    "{\"email\":\"admin@school.test\",\"password\":\"AdminPass123!\",\"fullName\":\"School Admin\",\"schoolId\":\"$SCHOOL_ID\"}" \
    "$SUPER_ADMIN_TOKEN")

ADMIN_ID=$(echo $ADMIN_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$ADMIN_ID" ]; then
    print_result "School Admin Created" "PASS"
else
    print_result "School Admin Created" "FAIL"
    echo "Response: $ADMIN_RESPONSE"
fi

# Login as Admin
ADMIN_LOGIN=$(call_api POST "/auth/login" \
    "{\"email\":\"admin@school.test\",\"password\":\"AdminPass123!\"}" \
    "")

ADMIN_TOKEN=$(echo $ADMIN_LOGIN | grep -o '"token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$ADMIN_TOKEN" ]; then
    print_result "School Admin Login" "PASS"
else
    print_result "School Admin Login" "FAIL"
fi

# ============================================
# STEP 4: CREATE TEACHER
# ============================================
echo -e "\n${YELLOW}Step 4: Teacher Creation${NC}"

TEACHER_RESPONSE=$(call_api POST "/admin/teachers" \
    "{\"email\":\"teacher@school.test\",\"password\":\"TeacherPass123!\",\"fullName\":\"Test Teacher\",\"schoolId\":\"$SCHOOL_ID\",\"department\":\"Science\"}" \
    "$ADMIN_TOKEN")

TEACHER_ID=$(echo $TEACHER_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$TEACHER_ID" ]; then
    print_result "Teacher Created" "PASS"
else
    print_result "Teacher Created" "FAIL"
    echo "Response: $TEACHER_RESPONSE"
fi

# Login as Teacher
TEACHER_LOGIN=$(call_api POST "/auth/login" \
    "{\"email\":\"teacher@school.test\",\"password\":\"TeacherPass123!\"}" \
    "")

TEACHER_TOKEN=$(echo $TEACHER_LOGIN | grep -o '"token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$TEACHER_TOKEN" ]; then
    print_result "Teacher Login" "PASS"
else
    print_result "Teacher Login" "FAIL"
fi

# ============================================
# STEP 5: CREATE STUDENTS
# ============================================
echo -e "\n${YELLOW}Step 5: Student Creation (Multiple)${NC}"

STUDENT1_RESPONSE=$(call_api POST "/admin/students" \
    "{\"email\":\"student1@school.test\",\"password\":\"StudentPass123!\",\"fullName\":\"Student One\",\"schoolId\":\"$SCHOOL_ID\",\"studentNo\":\"STU001\"}" \
    "$ADMIN_TOKEN")

STUDENT1_ID=$(echo $STUDENT1_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$STUDENT1_ID" ]; then
    print_result "Student 1 Created" "PASS"
else
    print_result "Student 1 Created" "FAIL"
fi

STUDENT2_RESPONSE=$(call_api POST "/admin/students" \
    "{\"email\":\"student2@school.test\",\"password\":\"StudentPass123!\",\"fullName\":\"Student Two\",\"schoolId\":\"$SCHOOL_ID\",\"studentNo\":\"STU002\"}" \
    "$ADMIN_TOKEN")

STUDENT2_ID=$(echo $STUDENT2_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$STUDENT2_ID" ]; then
    print_result "Student 2 Created" "PASS"
else
    print_result "Student 2 Created" "FAIL"
fi

# ============================================
# STEP 6: CREATE CLASSROOM
# ============================================
echo -e "\n${YELLOW}Step 6: Classroom Creation${NC}"

CLASSROOM_RESPONSE=$(call_api POST "/admin/classrooms" \
    "{\"name\":\"Science Class 1\",\"schoolId\":\"$SCHOOL_ID\"}" \
    "$ADMIN_TOKEN")

CLASSROOM_ID=$(echo $CLASSROOM_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$CLASSROOM_ID" ]; then
    print_result "Classroom Created" "PASS"
else
    print_result "Classroom Created" "FAIL"
fi

# ============================================
# STEP 7: ASSIGN STUDENTS TO CLASSROOM
# ============================================
echo -e "\n${YELLOW}Step 7: Assign Students to Classroom${NC}"

ASSIGN1=$(call_api POST "/admin/assign-student" \
    "{\"studentId\":\"$STUDENT1_ID\",\"classRoomId\":\"$CLASSROOM_ID\"}" \
    "$ADMIN_TOKEN")

if echo $ASSIGN1 | grep -q "success"; then
    print_result "Student 1 Assigned to Classroom" "PASS"
else
    print_result "Student 1 Assigned to Classroom" "FAIL"
fi

ASSIGN2=$(call_api POST "/admin/assign-student" \
    "{\"studentId\":\"$STUDENT2_ID\",\"classRoomId\":\"$CLASSROOM_ID\"}" \
    "$ADMIN_TOKEN")

if echo $ASSIGN2 | grep -q "success"; then
    print_result "Student 2 Assigned to Classroom" "PASS"
else
    print_result "Student 2 Assigned to Classroom" "FAIL"
fi

# ============================================
# STEP 8: CREATE EXAM
# ============================================
echo -e "\n${YELLOW}Step 8: Exam Creation${NC}"

EXAM_DATA='{
  "title": "Biology Mid-term Exam",
  "description": "First mid-term examination",
  "duration": 3600,
  "totalMarks": 100,
  "questions": [
    {
      "content": "What is photosynthesis?",
      "type": "MULTIPLE_CHOICE",
      "marks": 5,
      "options": [
        {"text": "Process of making food", "isCorrect": true},
        {"text": "Process of digestion", "isCorrect": false},
        {"text": "Process of respiration", "isCorrect": false},
        {"text": "Process of excretion", "isCorrect": false}
      ]
    },
    {
      "content": "What is the powerhouse of the cell?",
      "type": "MULTIPLE_CHOICE",
      "marks": 5,
      "options": [
        {"text": "Nucleus", "isCorrect": false},
        {"text": "Mitochondria", "isCorrect": true},
        {"text": "Ribosome", "isCorrect": false},
        {"text": "Lysosome", "isCorrect": false}
      ]
    }
  ]
}'

EXAM_RESPONSE=$(call_api POST "/admin/exams" "$EXAM_DATA" "$TEACHER_TOKEN")

EXAM_ID=$(echo $EXAM_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$EXAM_ID" ]; then
    print_result "Exam Created" "PASS"
else
    print_result "Exam Created" "FAIL"
    echo "Response: $EXAM_RESPONSE"
fi

# ============================================
# STEP 9: STUDENT LOGIN AND VIEW EXAMS
# ============================================
echo -e "\n${YELLOW}Step 9: Student Views Available Exams${NC}"

STUDENT1_LOGIN=$(call_api POST "/auth/login" \
    "{\"email\":\"student1@school.test\",\"password\":\"StudentPass123!\"}" \
    "")

STUDENT1_TOKEN=$(echo $STUDENT1_LOGIN | grep -o '"token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$STUDENT1_TOKEN" ]; then
    print_result "Student 1 Login" "PASS"
else
    print_result "Student 1 Login" "FAIL"
fi

EXAMS_LIST=$(call_api GET "/exam/list" "" "$STUDENT1_TOKEN")
if echo $EXAMS_LIST | grep -q "success"; then
    print_result "Student Views Exam List" "PASS"
else
    print_result "Student Views Exam List" "FAIL"
fi

# ============================================
# STEP 10: STUDENT SUBMITS EXAM
# ============================================
echo -e "\n${YELLOW}Step 10: Student Submits Exam${NC}"

SUBMISSION_DATA='{
  "examId": "'$EXAM_ID'",
  "answers": {
    "question1": "option1",
    "question2": "option2"
  },
  "timeSpent": 1800
}'

SUBMIT_RESPONSE=$(call_api POST "/exam/submit" "$SUBMISSION_DATA" "$STUDENT1_TOKEN")

if echo $SUBMIT_RESPONSE | grep -q "success"; then
    print_result "Exam Submission Successful" "PASS"
    SUBMISSION_ID=$(echo $SUBMIT_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
else
    print_result "Exam Submission Successful" "FAIL"
    echo "Response: $SUBMIT_RESPONSE"
fi

# ============================================
# STEP 11: STUDENT VIEWS RESULTS
# ============================================
echo -e "\n${YELLOW}Step 11: Student Views Results${NC}"

RESULTS_LIST=$(call_api GET "/results/list" "" "$STUDENT1_TOKEN")
if echo $RESULTS_LIST | grep -q "success"; then
    print_result "Student Views Results" "PASS"
else
    print_result "Student Views Results" "FAIL"
fi

# ============================================
# STEP 12: TEACHER EXPORTS RESULTS
# ============================================
echo -e "\n${YELLOW}Step 12: Teacher Exports Exam Results${NC}"

EXPORT_RESPONSE=$(call_api GET "/results/export?examId=$EXAM_ID&format=csv" "" "$TEACHER_TOKEN")
if echo $EXPORT_RESPONSE | grep -q "Student"; then
    print_result "Results Export (CSV)" "PASS"
else
    print_result "Results Export (CSV)" "FAIL"
fi

# ============================================
# STEP 13: ADMIN VIEWS DASHBOARD
# ============================================
echo -e "\n${YELLOW}Step 13: Admin Dashboard${NC}"

DASHBOARD=$(call_api GET "/admin/dashboard" "" "$ADMIN_TOKEN")
if echo $DASHBOARD | grep -q "success"; then
    print_result "Admin Views Dashboard" "PASS"
else
    print_result "Admin Views Dashboard" "FAIL"
fi

# ============================================
# SUMMARY
# ============================================
echo -e "\n${YELLOW}=== TEST SUMMARY ===${NC}"
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
    exit 0
else
    echo -e "${RED}✗ SOME TESTS FAILED${NC}"
    exit 1
fi
