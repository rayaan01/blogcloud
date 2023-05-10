import { cookies } from 'next/headers'
// import jwt from 'json-web-token'

export const isAuthorized = (): boolean => {
    const cookie = cookies().get('authorization')
    if (!cookie) {
        return false
    }

    const token = cookie?.value
    return true
}