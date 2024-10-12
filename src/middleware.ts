import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const isLogin = request.cookies.get('account_id');

    if (!isLogin) {
        if (request.nextUrl.pathname.includes('/admin') || request.nextUrl.pathname.includes('/tools-page')  ) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Nếu có cookie hoặc không phải trang admin, cho phép truy cập
    return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware cho các trang admin
export const config = {
    matcher: '',
};