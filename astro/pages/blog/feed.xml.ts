import rss from '@astrojs/rss'
import { getImage } from 'astro:assets'
import { readFile, stat } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'

import { getBlogPosts } from '../../lib/blog'

const siteDescription =
  'Brains & Beards is an unpretentious mobile studio that solves business problems through a mix of design and technology.'

const escapeCdata = (value: string) => value.replaceAll(']]>', ']]]]><![CDATA[>')

const plainTextExcerpt = (body: string) => {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return text.length > 140 ? `${text.slice(0, 137).trimEnd()}…` : text
}

const imageFilename = async (filePath: string) => {
  const source = await readFile(filePath, 'utf8')
  return source.match(/^image:\s*["']?([^"'\n]+?)["']?\s*$/m)?.[1]
}

export async function GET(context: { site?: URL }) {
  const posts = (await getBlogPosts()).slice(0, 15)

  return rss({
    title: 'Brains & Beards Insights',
    description: siteDescription,
    site: context.site ?? 'https://brainsandbeards.com',
    trailingSlash: true,
    xmlns: {
      dc: 'http://purl.org/dc/elements/1.1/',
      atom: 'http://www.w3.org/2005/Atom',
      media: 'http://search.yahoo.com/mrss/',
      webfeeds: 'http://webfeeds.org/rss/1.0'
    },
    customData: `
      <image>
        <url>https://brainsandbeards.com/favicon.ico</url>
        <title>Brains &amp; Beards Insights</title>
        <link>https://brainsandbeards.com</link>
      </image>
      <generator>Astro</generator>
      <atom:link href="https://brainsandbeards.com/blog/feed.xml" rel="self" type="application/rss+xml" />
      <category>Technology</category>
      <category>Programming</category>
      <webfeeds:logo>https://brainsandbeards.com/favicon.ico</webfeeds:logo>
      <webfeeds:cover image="https://brainsandbeards.com/static/a0fa7ff82c8900c764ad1d0678a8d1de/b8661/hero-bicycle.png" />
      <webfeeds:accentColor>FFDE1A</webfeeds:accentColor>
    `,
    items: await Promise.all(
      posts.map(async post => {
        const body = post.body ?? ''
        const author = post.data.author ?? 'Brains&Beards'
        const link = `${post.data.path.replace(/\/$/, '')}/`
        const customData = [
          `<guid isPermaLink="false">https://brainsandbeards.com${link}</guid>`,
          `<dc:creator><![CDATA[${escapeCdata(author)}]]></dc:creator>`,
          `<media:content><![CDATA[${escapeCdata(body)}]]></media:content>`
        ].join('')

        if (!post.data.image || !post.filePath) {
          return {
            title: post.data.title,
            description: plainTextExcerpt(body),
            pubDate: post.data.date,
            link,
            customData
          }
        }

        const thumbnail = await getImage({
          src: post.data.image,
          width: 280,
          height: 200,
          fit: 'cover',
          position: 'center',
          format: 'jpg',
          quality: 90
        })
        const filename = await imageFilename(post.filePath)
        const sourceImage = filename && join(process.cwd(), dirname(post.filePath), filename)
        const imageSize = sourceImage ? (await stat(sourceImage)).size : 0
        const imageType = filename ? `image/${extname(filename).slice(1)}` : 'image/jpeg'

        return {
          title: post.data.title,
          description: plainTextExcerpt(body),
          pubDate: post.data.date,
          link,
          customData,
          enclosure: {
            url: thumbnail.src,
            length: imageSize,
            type: imageType
          }
        }
      })
    )
  })
}
