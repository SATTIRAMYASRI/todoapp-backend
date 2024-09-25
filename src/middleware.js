import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(req) {
    const verify = getCookie('loggedIn', { req });
    const url = req.nextUrl.pathname; // Get the current path

    // Redirect to login if not authenticated and trying to access the root
    if (!verify && url === '/') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Redirect to home if authenticated and trying to access login or signup
    if (verify && (url === '/login' || url === '/signup')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next(); // Allow the request to continue
}
