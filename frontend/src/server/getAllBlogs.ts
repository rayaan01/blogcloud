import type { Blog } from "@/types"
import { serverFetch } from "./serverFetch"

export const getAllBlogs = async () => {
    const response = await serverFetch.get({
        path: '/blogs',
    })
    if (response && response.ok) {
        const { status, data } = await response.json()
        if (status === 'success') return data as Blog[]
    }
}