import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function POST(request: Request) {
  const { title, content, status } = request.body


}