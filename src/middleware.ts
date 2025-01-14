import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const cookie = cookies();
    const loggedIn = cookie.get('account_id')?.value
    const saveUrl = request.url;
    
    // if (!loggedIn) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware cho các trang admin
export const config = {
    // matcher: ['/admin/:path*','/tools-page/:path*','/search/:path*'],
};