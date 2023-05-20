import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE } from './utils/constants'

export const middleware = (request: NextRequest): NextResponse | undefined => {
    const { pathname } = new URL(request.url)
    const token = request.cookies.get(AUTH_COOKIE)

    switch (pathname) {
        case '/home':
            if (!token) return NextResponse.redirect(new URL('/login', request.url))
            break

        case '/signup':
        case '/login':
            if (token) return NextResponse.redirect(new URL('/home', request.url))
            break
    }
}

export const config = {
    matcher: ['/home', '/login', '/signup']
}