import type { Blog } from '@/types'

export const getUserBlogs = async (cookie: string): Promise<Blog[]> => {
    const url = new URL('/my/blogs', process.env.NEXT_PUBLIC_GATEWAY_URL as string)
    const response = await fetch(url, {
        headers: {
            'cookie': cookie
        }
    })
    const blogs = await response.json() as Blog[]
    return blogs
}