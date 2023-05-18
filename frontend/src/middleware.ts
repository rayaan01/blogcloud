import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { TOKEN } from './utils/constants';

export const middleware = (request: NextRequest) => {
    const { pathname } = new URL(request.url)
    const token = request.cookies.get(TOKEN)

    switch (pathname) {
        case '/home':
            if (!token) return NextResponse.redirect(new URL('/login', request.url));
            break

        case '/signup':
        case '/login':
            if (token) return NextResponse.redirect(new URL('/home', request.url));
            break
    }
}

export const config = {
    matcher: ['/home', '/login', '/signup'],
};