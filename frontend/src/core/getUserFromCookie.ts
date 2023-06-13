import type { Cookies, UserContext } from '@/types'
import { parse } from 'cookie'

export const getUserFromCookie = (cookie: string): UserContext => {
    const { token } = parse(cookie) as Cookies
    const tokenPayload = Buffer.from(token.split('.')[1], 'base64').toString()
    const user = JSON.parse(tokenPayload) as UserContext
    return user
}