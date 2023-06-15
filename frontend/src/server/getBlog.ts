import type { Blog } from '@/types'
import { serverFetch } from './serverFetch'

export const getBlog = async (id: string): Promise<Blog | undefined> => {
    const response = await serverFetch.get({
        path: '/blog',
        queryParams: {
            id
        }
    })
    if (response && response.ok) {
        const { status, data } = await response.json()
        if (status === 'success') return data as Blog
    }
}