// Mock database service for development
// This allows testing without a real PostgreSQL server

const mockUsers = [
  {
    id: '1',
    email: 'student@demo.com',
    password: '$2a$12$xyz...hashed...password', // password123
    fullName: 'Demo Student',
    role: 'STUDENT',
    schoolId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'admin@demo.com',
    password: '$2a$12$xyz...hashed...password', // password123
    fullName: 'Demo Admin',
    role: 'SCHOOL_ADMIN',
    schoolId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockSchools = [
  {
    id: '1',
    name: 'Demo School',
    shortCode: 'DEMO001',
    email: 'school@demo.com',
    phoneNumber: '+234 XXX XXX XXXX',
    address: '123 Education Street',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    logoUrl: null,
    bannerUrl: null,
    primaryColor: '#2563eb',
    secondaryColor: '#1e293b',
    maxStudents: 1000,
    isActive: true,
    subscriptionTier: 'free',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockExams = [
  {
    id: '1',
    schoolId: '1',
    title: 'Mathematics Final Exam',
    description: 'Final examination for Mathematics',
    duration: 120,
    totalQuestions: 50,
    totalMarks: 100,
    passingMarks: 40,
    status: 'PUBLISHED',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockDb = {
  users: {
    findUnique: async (query) => {
      if (query.where.email) {
        return mockUsers.find(u => u.email === query.where.email) || null
      }
      return mockUsers.find(u => u.id === query.where.id) || null
    },
    create: async (data) => {
      const newUser = {
        ...data.data,
        id: String(mockUsers.length + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockUsers.push(newUser)
      return newUser
    },
    findMany: async (query) => {
      return mockUsers.filter(u => u.schoolId === query.where?.schoolId)
    },
    update: async (query) => {
      const user = mockUsers.find(u => u.id === query.where.id)
      if (user) {
        Object.assign(user, query.data)
        user.updatedAt = new Date()
      }
      return user
    },
  },
  schools: {
    findUnique: async (query) => {
      if (query.where.shortCode) {
        return mockSchools.find(s => s.shortCode === query.where.shortCode) || null
      }
      return mockSchools.find(s => s.id === query.where.id) || null
    },
    create: async (data) => {
      const newSchool = {
        ...data.data,
        id: String(mockSchools.length + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockSchools.push(newSchool)
      return newSchool
    },
    findMany: async () => {
      return mockSchools
    },
  },
  exams: {
    findMany: async (query) => {
      return mockExams.filter(e => e.schoolId === query.where?.schoolId)
    },
    findUnique: async (query) => {
      return mockExams.find(e => e.id === query.where.id) || null
    },
    create: async (data) => {
      const newExam = {
        ...data.data,
        id: String(mockExams.length + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockExams.push(newExam)
      return newExam
    },
  },
  student: {
    findUnique: async (query) => {
      // Mock student data
      return {
        id: '1',
        userId: '1',
        schoolId: '1',
        studentId: 'STU001',
        isActive: true,
      }
    },
  },
  teacher: {
    findUnique: async (query) => {
      return {
        id: '1',
        userId: query.where.userId,
        schoolId: '1',
        employeeId: 'EMP001',
        isActive: true,
      }
    },
  },
  $disconnect: async () => {
    // Mock disconnect
  },
}

export default mockDb
