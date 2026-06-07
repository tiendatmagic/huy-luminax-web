import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Cố gắng vào trang quản trị (/admin/dashboard hoặc các trang con khác) mà không có token
  if (pathname.startsWith("/admin/") && pathname !== "/admin" && !token) {
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Đã có token mà cố truy cập trang đăng nhập (/admin)
  if (pathname === "/admin" && token) {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Chỉ chạy middleware trên các route bắt đầu bằng /admin
export const config = {
  matcher: ["/admin/:path*"],
};
