const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {

const email = '[admin@test.com](mailto:admin@test.com)'
const password = '123456'

const existing = await prisma.user.findUnique({
where: { email }
})

if (existing) {
console.log('TEST USER ALREADY EXISTS')
return
}

const hashedPassword = await bcrypt.hash(password, 12)

await prisma.user.create({
data: {
email,
password: hashedPassword,
role: 'SUPER_ADMIN'
}
})

console.log('TEST USER CREATED')
console.log('EMAIL: admin@test.com')
console.log('PASSWORD: 123456')
}

main()
.catch(console.error)
.finally(async () => {
  await prisma.$disconnect()
})
