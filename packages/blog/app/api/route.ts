import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const take = searchParams.get('take')
    const skip = searchParams.get('skip')
    const category = searchParams.get('category')
    const posts = await prisma.post.findMany({
        orderBy: {
            created_at: 'desc'
        },
        include: {
            categories: true,
        },
        take: take ? Number(take) : 20,
        skip: skip ? Number(skip) : 0,
        where: {
            status: true,
            categories: category ? {
                some: {
                    name: {
                        equals: category
                    }
                }
            } : undefined
        }
    })
    const total = await prisma.post.count({ where: { status: true } })
    return NextResponse.json({
        data: posts,
        total: total
    })
}