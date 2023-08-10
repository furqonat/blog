import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
export async function POST(request: Request) {
  const { title } = await request.json()

  const post = await prisma.post.create({
    data: {
      title: title.trim(),
      slug: (title as string).toLowerCase().trim().split(" ").join("-")
    }
  })

  if (!post) {
    return NextResponse.json({ message: 'unable create post' })
  }
  return NextResponse.json({ message: 'success create post', id: post.id })
}