import { PrismaClient, category } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

const uniqueCategory = (arr: category[], prop: keyof category): category[] =>
  arr.filter((item, index, self) => self.findIndex(i => i[prop] === item[prop]) === index);

export async function GET() {
  const categories = await prisma.category.findMany()
  const result = uniqueCategory(categories, 'name')
  return NextResponse.json(result)
}