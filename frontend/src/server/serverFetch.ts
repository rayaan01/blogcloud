import type { CustomResponse } from '@/types'
import { headers as NextHeaders } from 'next/headers'

declare let process: {
    env: {
        NEXT_PUBLIC_GATEWAY_URL: string
    }
}

const postFetch = async ({
    path,
    body
}: {
    path: string,
    body: Record<string, unknown>
}): Promise<CustomResponse | undefined> => {
    try {
        const url = new URL(path, process.env.NEXT_PUBLIC_GATEWAY_URL)
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                cookie: NextHeaders().get('cookie') as string
            }
        })
        return response
    } catch (err) {
        return undefined
    } 
}

const getFetch = async ({
    path,
    queryParams
}: {
    path: string,
    queryParams?: Record<string, string>
}): Promise<CustomResponse | undefined> => {
    try {
        const url = new URL(path, process.env.NEXT_PUBLIC_GATEWAY_URL)
        let { href } = url
        if (queryParams) {
            href += '?'
            for (const [key, value] of Object.entries(queryParams)) {
                href += `${key}=${value}`
            }
        }
        const response = await fetch(href, {
            headers: {
                cookie: NextHeaders().get('cookie') as string
            }
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const serverFetch = {
    post: postFetch,
    get: getFetch
}