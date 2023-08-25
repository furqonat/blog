import {PrismaClient} from '@prisma/client'

const EXTERNAL_DATA_URL = 'https://byfurqon.com/post'
const prisma = new PrismaClient()

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://byfurqon.com/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
     </url>
     <url>
       <loc>https://byfurqon.com/about</loc>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://byfurqon.com/post</loc>
       <changefreq>hourly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://byfurqon.com/privacy</loc>
       <changefreq>weekly</changefreq>
        <priority>1.0</priority>
     </url>
     ${posts
        .map(({slug}) => {
            return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
           <changefreq>hourly</changefreq>
           <lastmod>${new Date()}</lastmod>
           <priority>0.7</priority>
       </url>
     `
        })
        .join('')}
   </urlset>
 `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({res}) {
    // We make an API call to gather the URLs for our site
    const posts = await prisma.post.findMany({where: {status: true}})

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts)

    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

export default SiteMap
