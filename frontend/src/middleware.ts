import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE } from './utils/constants'
import { isAuthorized } from './core/isAuthorized'

export const middleware = async (request: NextRequest): Promise<NextResponse | undefined> => {
    const { pathname } = new URL(request.url)
    const cookie = request.cookies.get(AUTH_COOKIE)
    const authorized = await isAuthorized(cookie)

    switch (pathname) {
        case '/home':
        case '/profile':
        case '/blog':
            if (!authorized) return NextResponse.redirect(new URL('/login', request.url))
            break

        case '/signup':
        case '/login':
            if (authorized) return NextResponse.redirect(new URL('/home', request.url))
            break
    }
}

export const config = {
    matcher: ['/home', '/login', '/signup', '/profile', '/blog']
}