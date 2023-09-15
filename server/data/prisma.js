import { PrismaClient } from '@prisma/client'

let prisma = null

prisma = new PrismaClient()


export default prisma