import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

type CategoryBody = {
  name: string;
};

export async function PUT(request: Request, params: { params: { id: string } }) {
  const { title, slug, content, status, categories } = await request.json();

  const updateData: any = {
    title: title ?? undefined,
    slug: slug ?? undefined,
    content: content ?? undefined,
    status: status,
  };

  // Update categories
  if (categories) {
    const existingCategories = await prisma.category.findMany({
      where: {
        name: {
          in: (categories as CategoryBody[]).map(category => category.name),
        },
      },
    });

    const categoryIdMap = new Map();

    for (const existingCategory of existingCategories) {
      categoryIdMap.set(existingCategory.name, existingCategory.id);
    }

    const categoryConnectIds: string[] = [];

    for (const category of categories as CategoryBody[]) {
      if (categoryIdMap.has(category.name)) {
        categoryConnectIds.push(categoryIdMap.get(category.name));
      } else {
        const newCategory = await prisma.category.create({
          data: {
            name: category.name,
            post: {
              connect: {
                id: params.params.id,
              },
            },
          },
        });

        categoryIdMap.set(category.name, newCategory.id);
        categoryConnectIds.push((newCategory.id));
      }
    }

    updateData.categories = {
      set: categoryConnectIds.map(id => ({ id })),
    };
  }

  // Update post
  const result = await prisma.post.update({
    where: {
      id: params.params.id,
    },
    data: updateData,
  });

  if (!result) {
    return NextResponse.json({ message: "Error while updating data" });
  }

  return NextResponse.json({ message: "Success update data", result: result.id });
}
