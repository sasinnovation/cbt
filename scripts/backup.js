import { prisma } from '../lib/prisma'
import fs from 'fs'

async function backup() {
  const today = new Date()
  today.setHours(0,0,0,0)

  const data = await prisma.examSubmission.findMany({
    where: {
      createdAt: {
        gte: today
      }
    }
  })

  fs.writeFileSync(
    'backup-today.json',
    JSON.stringify(data, null, 2)
  )

  console.log('Backup complete')
}

backup()
