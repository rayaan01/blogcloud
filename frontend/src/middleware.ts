import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('authorization')
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: '/home',
};