import type { CustomResponse } from '@/types'

declare let process: {
    env: {
        NEXT_PUBLIC_GATEWAY_URL: string
    }
}

export const postFetch = async ({
    path,
    body
}: {
    path: string,
    body: Record<string, unknown>
}): Promise<CustomResponse | undefined> => {
    try {
        const url = process.env.NEXT_PUBLIC_GATEWAY_URL + path
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const getFetch = async ({
    path,
    queryParams
}: {
    path: string,
    queryParams?: Record<string, unknown>
}): Promise<CustomResponse | undefined> => {
    try {
        let url = process.env.NEXT_PUBLIC_GATEWAY_URL + path
        if (queryParams) {
            url += '?'
            for (const [key, value] of Object.entries(queryParams)) {
                url += `${key}=${value}`
            }
        }
        const response = await fetch(url)
        return response
    }
    catch (err) {
        return undefined
    }
}