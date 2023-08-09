import { PrismaClient } from "@prisma/client";
import { MetadataRoute } from "next";
const prisma = new PrismaClient()
export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
    const post = await prisma.post.findMany({ where: { status: true } })
    const pages = [{
        url: 'https://byfurqon.com/post',
        lastModified: new Date(),
    }, {
        url: 'https://byfurqon.com/about',
        lastModified: new Date(),
    }, {
        url: 'https://byfurqon.com',
        lastModified: new Date(),
    }]
    const posts = post.map((item) => { return { url: `https://byfurqon.com/post/${item.slug}`, lastModified: new Date() } })
    return [
        ...pages,
        ...posts,
    ]
}