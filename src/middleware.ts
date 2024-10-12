import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const isLogin = request.cookies.get('accountId');

    // Kiểm tra nếu URL là trang admin và cookie không tồn tại
    if (request.nextUrl.pathname.startsWith('/sssss') && !isLogin) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Nếu có cookie hoặc không phải trang admin, cho phép truy cập
    return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware cho các trang admin
export const config = {
    matcher: '',
};