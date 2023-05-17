import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { TOKEN } from './utils/constants';

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get(TOKEN)
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: '/home',
};