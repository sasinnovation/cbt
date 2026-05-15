import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

export default async function seedExam() {
  try {
    console.log('🌱 Starting database seeding...')

    // Create a test school
    const school = await prisma.school.upsert({
      where: { shortCode: 'TEST_SCHOOL' },
      update: {},
      create: {
        name: 'Test High School',
        shortCode: 'TEST_SCHOOL',
        address: '123 Test Street, Test City',
        principal: 'Dr. Test Principal',
        motto: 'Excellence in Testing',
      },
    })

    console.log('✅ School created:', school.name)

    // Create super admin
    const superAdminPassword = await hash('admin123', 12)
    const superAdmin = await prisma.user.upsert({
      where: { email: 'superadmin@test.com' },
      update: {},
      create: {
        email: 'superadmin@test.com',
        password: superAdminPassword,
        fullName: 'Super Administrator',
        role: 'SUPER_ADMIN',
      },
    })

    console.log('✅ Super admin created:', superAdmin.email)

    // Create school admin
    const adminPassword = await hash('admin123', 12)
    const schoolAdmin = await prisma.user.upsert({
      where: { email: 'admin@test.com' },
      update: {},
      create: {
        email: 'admin@test.com',
        password: adminPassword,
        fullName: 'School Administrator',
        role: 'ADMIN',
      },
    })

    console.log('✅ School admin created:', schoolAdmin.email)

    // Create teacher
    const teacherPassword = await hash('teacher123', 12)
    const teacherUser = await prisma.user.upsert({
      where: { email: 'teacher@test.com' },
      update: {},
      create: {
        email: 'teacher@test.com',
        password: teacherPassword,
        fullName: 'John Teacher',
        role: 'TEACHER',
      },
    })

    const teacher = await prisma.teacher.upsert({
      where: { userId: teacherUser.id },
      update: {},
      create: {
        userId: teacherUser.id,
        schoolId: school.id,
        employeeNo: 'TCH001',
        department: 'Mathematics',
      },
    })

    console.log('✅ Teacher created:', teacherUser.email)

    // Create classrooms
    const classroom1 = await prisma.classRoom.upsert({
      where: { id: 'class-ss1-a' },
      update: {},
      create: {
        id: 'class-ss1-a',
        name: 'SS1 - Class A',
        schoolId: school.id,
      },
    })

    const classroom2 = await prisma.classRoom.upsert({
      where: { id: 'class-ss2-a' },
      update: {},
      create: {
        id: 'class-ss2-a',
        name: 'SS2 - Class A',
        schoolId: school.id,
      },
    })

    console.log('✅ Classrooms created')

    // Create subjects
    const mathSubject = await prisma.subject.upsert({
      where: { id: 'subject-math' },
      update: {},
      create: {
        id: 'subject-math',
        name: 'Mathematics',
        code: 'MATH',
        schoolId: school.id,
        classRoomId: classroom1.id,
      },
    })

    const englishSubject = await prisma.subject.upsert({
      where: { id: 'subject-english' },
      update: {},
      create: {
        id: 'subject-english',
        name: 'English Language',
        code: 'ENG',
        schoolId: school.id,
        classRoomId: classroom1.id,
      },
    })

    console.log('✅ Subjects created')

    // Create students
    const studentUsers = []
    const students = []

    for (let i = 1; i <= 10; i++) {
      const studentPassword = await hash('student123', 12)
      const studentUser = await prisma.user.upsert({
        where: { email: `student${i}@test.com` },
        update: {},
        create: {
          email: `student${i}@test.com`,
          password: studentPassword,
          fullName: `Student ${i}`,
          role: 'STUDENT',
        },
      })

      const student = await prisma.student.upsert({
        where: { userId: studentUser.id },
        update: {},
        create: {
          userId: studentUser.id,
          schoolId: school.id,
          studentNo: `STU${i.toString().padStart(3, '0')}`,
          classRoomId: i <= 5 ? classroom1.id : classroom2.id,
        },
      })

      studentUsers.push(studentUser)
      students.push(student)
    }

    console.log('✅ Students created')

    // Create a sample exam
    const exam = await prisma.exam.upsert({
      where: { id: 'exam-math-001' },
      update: {},
      create: {
        id: 'exam-math-001',
        title: 'Mathematics Mid-Term Exam',
        description: 'Comprehensive mathematics assessment covering algebra and geometry',
        schoolId: school.id,
        createdById: teacher.id,
        subjectId: mathSubject.id,
        duration: 60, // 60 minutes
        totalMarks: 50,
        status: 'PUBLISHED',
        questions: {
          create: [
            {
              content: 'What is 2 + 2?',
              marks: 5,
              type: 'MULTIPLE_CHOICE',
              options: {
                create: [
                  { text: '3', isCorrect: false },
                  { text: '4', isCorrect: true },
                  { text: '5', isCorrect: false },
                  { text: '6', isCorrect: false },
                ],
              },
            },
            {
              content: 'Solve for x: 2x + 3 = 7',
              marks: 10,
              type: 'MULTIPLE_CHOICE',
              options: {
                create: [
                  { text: 'x = 1', isCorrect: false },
                  { text: 'x = 2', isCorrect: true },
                  { text: 'x = 3', isCorrect: false },
                  { text: 'x = 4', isCorrect: false },
                ],
              },
            },
            {
              content: 'What is the area of a circle with radius 5?',
              marks: 15,
              type: 'MULTIPLE_CHOICE',
              options: {
                create: [
                  { text: '25π', isCorrect: true },
                  { text: '10π', isCorrect: false },
                  { text: '5π', isCorrect: false },
                  { text: '100π', isCorrect: false },
                ],
              },
            },
            {
              content: 'Simplify: (x² - 4)/(x - 2)',
              marks: 20,
              type: 'MULTIPLE_CHOICE',
              options: {
                create: [
                  { text: 'x + 2', isCorrect: true },
                  { text: 'x - 2', isCorrect: false },
                  { text: 'x² - 4', isCorrect: false },
                  { text: 'Cannot be simplified', isCorrect: false },
                ],
              },
            },
          ],
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    })

    console.log('✅ Sample exam created with', exam.questions.length, 'questions')

    // Create sample results for some students
    for (let i = 0; i < 5; i++) {
      const student = students[i]
      const score = Math.floor(Math.random() * 41) + 10 // Random score between 10-50
      const percentage = (score / exam.totalMarks) * 100

      let grade = 'F'
      if (percentage >= 70) grade = 'A'
      else if (percentage >= 60) grade = 'B'
      else if (percentage >= 50) grade = 'C'

      // Create exam submission
      const submission = await prisma.examSubmission.create({
        data: {
          studentId: student.id,
          examId: exam.id,
          answers: JSON.stringify({
            [exam.questions[0].id]: exam.questions[0].options.find(o => o.isCorrect)?.id,
            [exam.questions[1].id]: exam.questions[1].options.find(o => o.isCorrect)?.id,
            [exam.questions[2].id]: exam.questions[2].options.find(o => o.isCorrect)?.id,
            [exam.questions[3].id]: exam.questions[3].options.find(o => o.isCorrect)?.id,
          }),
          score,
          totalMarks: exam.totalMarks,
          percentage,
          grade,
          timeSpent: Math.floor(Math.random() * 50) + 10, // Random time between 10-60 minutes
          status: 'SUBMITTED',
        },
      })

      // Create result record
      await prisma.result.create({
        data: {
          studentId: student.id,
          examId: exam.id,
          schoolId: school.id,
          score,
          totalMarks: exam.totalMarks,
          percentage,
          grade,
          answers: submission.answers,
          timeSpent: submission.timeSpent,
          status: 'COMPLETED',
        },
      })
    }

    console.log('✅ Sample results created for 5 students')

    console.log('🎉 Database seeding completed successfully!')
    console.log('')
    console.log('📋 Test Accounts:')
    console.log('Super Admin: superadmin@test.com / admin123')
    console.log('School Admin: admin@test.com / admin123')
    console.log('Teacher: teacher@test.com / teacher123')
    console.log('Students: student1@test.com to student10@test.com / student123')
    console.log('')
    console.log('🏫 School: Test High School (TEST_SCHOOL)')

    return true
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

