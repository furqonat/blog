import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

type CategoryBody = {
  name: string
}
export async function PUT(request: Request, params: { params: { id: string } }) {
  const { title, slug, content, status, categories } = await request.json()
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: params.params.id
    },
    include: {
      categories: true
    }
  })
  // if category is not undefined or null
  console.log(categories)
  if (categories) {
    // delete all connected category
    await prisma.category.deleteMany({
      where: {
        post: {
          every: {
            id: params.params.id,
          }
        }
      }
    })
    // loop all category body
    for (const category of (categories as CategoryBody[])) {
      // search all category that equal to category.name
      const data = await prisma.category.findFirst({
        where: {
          name: {
            equals: category.name
          }
        }
      })
      // if category is null we create new category and connect to post
      if (!data) {
        await prisma.post.update({
          where: {
            id: params.params.id
          },
          data: {
            categories: {
              create: {
                name: category.name
              }
            }
          }
        })
        // outerwise we connect the category
      } else {
        await prisma.post.update({
          where: {
            id: params.params.id
          },
          data: {
            categories: {
              connect: {
                id: data.id
              }
            }
          }
        })
      }
    }
  }

  const result = await prisma.post.update({
    where: {
      id: params.params.id
    },
    data: {
      title: title ? title : post.title,
      slug: slug ? slug : post.slug,
      content: content ? content : post.content,
      status: status,
    }
  })

  console.log(result.status)

  if (!result) {
    return NextResponse.json({ message: "Error while updating a data" })
  }

  return NextResponse.json({ message: "Sukses update data", result: result.id })
}