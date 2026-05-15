# CBT System Comprehensive Workflow Test - PowerShell Version
# Tests: Student registration → Exam submission → Result export

$API_URL = "http://localhost:3000/api"
$SETUP_KEY = "CBT_SETUP_2024"

$TESTS_PASSED = 0
$TESTS_FAILED = 0

# Helper function for API calls
function Call-API {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Data,
        [string]$Token
    )
    
    $headers = @{
        "Content-Type" = "application/json"
    }
    
    if ($Token) {
        $headers["Authorization"] = "Bearer $Token"
    }
    
    try {
        $uri = "$API_URL$Endpoint"
        
        if ($Method -eq "GET") {
            $response = Invoke-RestMethod -Uri $uri -Method GET -Headers $headers -ErrorAction Stop
        } else {
            $response = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $Data -ErrorAction Stop
        }
        
        return $response | ConvertTo-Json
    } catch {
        return "ERROR: $($_.Exception.Message)"
    }
}

# Test result printer
function Print-Result {
    param(
        [string]$TestName,
        [string]$Result
    )
    
    if ($Result -eq "PASS") {
        Write-Host "✓ PASS: $TestName" -ForegroundColor Green
        $global:TESTS_PASSED++
    } else {
        Write-Host "✗ FAIL: $TestName" -ForegroundColor Red
        $global:TESTS_FAILED++
    }
}

Write-Host "`n=== CBT SYSTEM COMPREHENSIVE TEST ===`n" -ForegroundColor Yellow

# ============================================
# STEP 1: CREATE SUPER ADMIN
# ============================================
Write-Host "Step 1: Super Admin Creation" -ForegroundColor Yellow

$superAdminData = @{
    email = "superadmin@cbt.test"
    password = "SecurePass123!"
    fullName = "Super Admin"
    setupKey = $SETUP_KEY
} | ConvertTo-Json

$superAdminResponse = Call-API POST "/admin/super-admin" $superAdminData ""
$superAdminObj = $superAdminResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($superAdminObj.superAdmin.id) {
    Print-Result "Super Admin Created" "PASS"
    $superAdminId = $superAdminObj.superAdmin.id
} else {
    Print-Result "Super Admin Created" "FAIL"
    Write-Host "Response: $superAdminResponse" -ForegroundColor Gray
}

# Login as Super Admin
$loginData = @{
    email = "superadmin@cbt.test"
    password = "SecurePass123!"
} | ConvertTo-Json

$loginResponse = Call-API POST "/auth/login" $loginData ""
$loginObj = $loginResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($loginObj.token) {
    Print-Result "Super Admin Login" "PASS"
    $superAdminToken = $loginObj.token
} else {
    Print-Result "Super Admin Login" "FAIL"
    Write-Host "Response: $loginResponse" -ForegroundColor Gray
}

# ============================================
# STEP 2: CREATE SCHOOL
# ============================================
Write-Host "`nStep 2: School Creation" -ForegroundColor Yellow

$schoolData = @{
    name = "Test School"
    shortCode = "TEST001"
} | ConvertTo-Json

$schoolResponse = Call-API POST "/school" $schoolData $superAdminToken
$schoolObj = $schoolResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($schoolObj.school.id) {
    Print-Result "School Created" "PASS"
    $schoolId = $schoolObj.school.id
} else {
    Print-Result "School Created" "FAIL"
    Write-Host "Response: $schoolResponse" -ForegroundColor Gray
}

# ============================================
# STEP 3: CREATE SCHOOL ADMIN
# ============================================
Write-Host "`nStep 3: School Admin Creation" -ForegroundColor Yellow

$adminData = @{
    email = "admin@school.test"
    password = "AdminPass123!"
    fullName = "School Admin"
    schoolId = $schoolId
} | ConvertTo-Json

$adminResponse = Call-API POST "/admin/admins" $adminData $superAdminToken
$adminObj = $adminResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($adminObj.admin.id) {
    Print-Result "School Admin Created" "PASS"
} else {
    Print-Result "School Admin Created" "FAIL"
    Write-Host "Response: $adminResponse" -ForegroundColor Gray
}

# Login as Admin
$adminLoginData = @{
    email = "admin@school.test"
    password = "AdminPass123!"
} | ConvertTo-Json

$adminLoginResponse = Call-API POST "/auth/login" $adminLoginData ""
$adminLoginObj = $adminLoginResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($adminLoginObj.token) {
    Print-Result "School Admin Login" "PASS"
    $adminToken = $adminLoginObj.token
} else {
    Print-Result "School Admin Login" "FAIL"
}

# ============================================
# STEP 4: CREATE TEACHER
# ============================================
Write-Host "`nStep 4: Teacher Creation" -ForegroundColor Yellow

$teacherData = @{
    email = "teacher@school.test"
    password = "TeacherPass123!"
    fullName = "Test Teacher"
    schoolId = $schoolId
    department = "Science"
} | ConvertTo-Json

$teacherResponse = Call-API POST "/admin/teachers" $teacherData $adminToken
$teacherObj = $teacherResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($teacherObj.teacher.id) {
    Print-Result "Teacher Created" "PASS"
} else {
    Print-Result "Teacher Created" "FAIL"
    Write-Host "Response: $teacherResponse" -ForegroundColor Gray
}

# Login as Teacher
$teacherLoginData = @{
    email = "teacher@school.test"
    password = "TeacherPass123!"
} | ConvertTo-Json

$teacherLoginResponse = Call-API POST "/auth/login" $teacherLoginData ""
$teacherLoginObj = $teacherLoginResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($teacherLoginObj.token) {
    Print-Result "Teacher Login" "PASS"
    $teacherToken = $teacherLoginObj.token
} else {
    Print-Result "Teacher Login" "FAIL"
}

# ============================================
# STEP 5: CREATE STUDENTS
# ============================================
Write-Host "`nStep 5: Student Creation (Multiple)" -ForegroundColor Yellow

$student1Data = @{
    email = "student1@school.test"
    password = "StudentPass123!"
    fullName = "Student One"
    schoolId = $schoolId
    studentNo = "STU001"
} | ConvertTo-Json

$student1Response = Call-API POST "/admin/students" $student1Data $adminToken
$student1Obj = $student1Response | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($student1Obj.student.id) {
    Print-Result "Student 1 Created" "PASS"
    $student1Id = $student1Obj.student.id
} else {
    Print-Result "Student 1 Created" "FAIL"
}

$student2Data = @{
    email = "student2@school.test"
    password = "StudentPass123!"
    fullName = "Student Two"
    schoolId = $schoolId
    studentNo = "STU002"
} | ConvertTo-Json

$student2Response = Call-API POST "/admin/students" $student2Data $adminToken
$student2Obj = $student2Response | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($student2Obj.student.id) {
    Print-Result "Student 2 Created" "PASS"
    $student2Id = $student2Obj.student.id
} else {
    Print-Result "Student 2 Created" "FAIL"
}

# ============================================
# STEP 6: CREATE CLASSROOM
# ============================================
Write-Host "`nStep 6: Classroom Creation" -ForegroundColor Yellow

$classroomData = @{
    name = "Science Class 1"
    schoolId = $schoolId
} | ConvertTo-Json

$classroomResponse = Call-API POST "/admin/classrooms" $classroomData $adminToken
$classroomObj = $classroomResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($classroomObj.classRoom.id) {
    Print-Result "Classroom Created" "PASS"
    $classroomId = $classroomObj.classRoom.id
} else {
    Print-Result "Classroom Created" "FAIL"
}

# ============================================
# STEP 7: ASSIGN STUDENTS TO CLASSROOM
# ============================================
Write-Host "`nStep 7: Assign Students to Classroom" -ForegroundColor Yellow

$assign1Data = @{
    studentId = $student1Id
    classRoomId = $classroomId
} | ConvertTo-Json

$assign1Response = Call-API POST "/admin/assign-student" $assign1Data $adminToken
if ($assign1Response -like "*success*") {
    Print-Result "Student 1 Assigned to Classroom" "PASS"
} else {
    Print-Result "Student 1 Assigned to Classroom" "FAIL"
}

# ============================================
# STEP 8: CREATE EXAM
# ============================================
Write-Host "`nStep 8: Exam Creation" -ForegroundColor Yellow

$examData = @{
    title = "Biology Mid-term Exam"
    description = "First mid-term examination"
    duration = 3600
    totalMarks = 100
    questions = @(
        @{
            content = "What is photosynthesis?"
            type = "MULTIPLE_CHOICE"
            marks = 5
            options = @(
                @{ text = "Process of making food"; isCorrect = $true },
                @{ text = "Process of digestion"; isCorrect = $false },
                @{ text = "Process of respiration"; isCorrect = $false },
                @{ text = "Process of excretion"; isCorrect = $false }
            )
        },
        @{
            content = "What is the powerhouse of the cell?"
            type = "MULTIPLE_CHOICE"
            marks = 5
            options = @(
                @{ text = "Nucleus"; isCorrect = $false },
                @{ text = "Mitochondria"; isCorrect = $true },
                @{ text = "Ribosome"; isCorrect = $false },
                @{ text = "Lysosome"; isCorrect = $false }
            )
        }
    )
} | ConvertTo-Json -Depth 10

$examResponse = Call-API POST "/admin/exams" $examData $teacherToken
$examObj = $examResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($examObj.exam.id) {
    Print-Result "Exam Created" "PASS"
    $examId = $examObj.exam.id
} else {
    Print-Result "Exam Created" "FAIL"
    Write-Host "Response: $examResponse" -ForegroundColor Gray
}

# ============================================
# STEP 9: STUDENT LOGIN AND VIEW EXAMS
# ============================================
Write-Host "`nStep 9: Student Views Available Exams" -ForegroundColor Yellow

$student1LoginData = @{
    email = "student1@school.test"
    password = "StudentPass123!"
} | ConvertTo-Json

$student1LoginResponse = Call-API POST "/auth/login" $student1LoginData ""
$student1LoginObj = $student1LoginResponse | ConvertFrom-Json -ErrorAction SilentlyContinue

if ($student1LoginObj.token) {
    Print-Result "Student 1 Login" "PASS"
    $student1Token = $student1LoginObj.token
} else {
    Print-Result "Student 1 Login" "FAIL"
}

$examsList = Call-API GET "/exam/list" "" $student1Token
if ($examsList -like "*success*") {
    Print-Result "Student Views Exam List" "PASS"
} else {
    Print-Result "Student Views Exam List" "FAIL"
}

# ============================================
# STEP 10: STUDENT SUBMITS EXAM
# ============================================
Write-Host "`nStep 10: Student Submits Exam" -ForegroundColor Yellow

$submissionData = @{
    examId = $examId
    answers = @{
        "question1" = "option1"
        "question2" = "option2"
    }
    timeSpent = 1800
} | ConvertTo-Json

$submitResponse = Call-API POST "/exam/submit" $submissionData $student1Token
if ($submitResponse -like "*success*") {
    Print-Result "Exam Submission Successful" "PASS"
} else {
    Print-Result "Exam Submission Successful" "FAIL"
    Write-Host "Response: $submitResponse" -ForegroundColor Gray
}

# ============================================
# STEP 11: STUDENT VIEWS RESULTS
# ============================================
Write-Host "`nStep 11: Student Views Results" -ForegroundColor Yellow

$resultsList = Call-API GET "/results/list" "" $student1Token
if ($resultsList -like "*success*") {
    Print-Result "Student Views Results" "PASS"
} else {
    Print-Result "Student Views Results" "FAIL"
}

# ============================================
# SUMMARY
# ============================================
Write-Host "`n=== TEST SUMMARY ===" -ForegroundColor Yellow
Write-Host "Tests Passed: $TESTS_PASSED" -ForegroundColor Green
Write-Host "Tests Failed: $TESTS_FAILED" -ForegroundColor Red

if ($TESTS_FAILED -eq 0) {
    Write-Host "`n✓ ALL TESTS PASSED!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n✗ SOME TESTS FAILED" -ForegroundColor Red
    exit 1
}
