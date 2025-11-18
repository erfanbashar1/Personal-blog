import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET
const token = import.meta.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  throw new Error('Missing Sanity environment variables')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getPosts() {
  const posts = await client.fetch(`
    *[_type == "post" && !draft] | order(pubDatetime desc) {
      _id,
      title,
      slug,
      author,
      description,
      pubDatetime,
      modDatetime,
      featured,
      draft,
      tags,
      content
    }
  `)
  return posts
}

export async function getPost(slug: string) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug && !draft][0] {
      _id,
      title,
      slug,
      author,
      description,
      pubDatetime,
      modDatetime,
      featured,
      draft,
      tags,
      content
    }
  `, {slug})
  return post
}

export async function getFeaturedPosts() {
  const posts = await client.fetch(`
    *[_type == "post" && featured && !draft] | order(pubDatetime desc) {
      _id,
      title,
      slug,
      description,
      pubDatetime,
    }
  `)
  return posts
}
