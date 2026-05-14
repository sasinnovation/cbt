const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createUser(email, password, fullName, role) {

  const existing = await prisma.user.findUnique({
    where: { email }
  })

  if (existing) {
    console.log(`✅ ${email} already exists`)
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
      role
    }
  })

  console.log(`✅ Created ${role}: ${email}`)
}

async function main() {

  await createUser(
    'admin@cbt.com',
    'admin123',
    'Super Admin',
    'SUPER_ADMIN'
  )

  await createUser(
    'admin@demo.com',
    'password123',
    'School Admin',
    'SCHOOL_ADMIN'
  )

  await createUser(
    'student@demo.com',
    'password123',
    'Demo Student',
    'STUDENT'
  )

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
