import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
export async function PUT(request: Request, params: { params: { id: string } }) {
  const { status  } = await request.json()
  console.log(status, params.params.id)
  const result = await prisma.post.update({
    where: {
      id: params.params.id
    },
    data: {
      status: status
    }
  })

  console.log(result.status)

  if (!result) {
    return NextResponse.json({ message: "Error while updating a data" })
  }

  return NextResponse.json({ message: "Sukses update data", result: result.id })
}