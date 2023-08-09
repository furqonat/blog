import { PrismaClient } from '@prisma/client'
import PageClient from './page.client'
type Props = {
  params: {
    id: string
  }
}

const prisma = new PrismaClient()
export default async function Page(props: Props) {
  const { id } = props.params

  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      categories: true,
    },
  })
  return <PageClient post={post} />
}
