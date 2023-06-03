import { jwtVerify } from 'jose'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const isAuthorized = async (cookie: RequestCookie | undefined): Promise<boolean> => {
    try {
        if (!cookie) {
            return false
        }
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET as string)
        await jwtVerify(cookie.value, secret)
        return true
    } catch (err) {
        return false
    }
}