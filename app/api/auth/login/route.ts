import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { username, password, remember } = await req.json();

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Đăng nhập thất bại", errors: data.errors },
        { status: response.status }
      );
    }

    const { token, user } = data;
    const cookieStore = await cookies();

    // Thiết lập cookie HTTP-Only lưu trữ token
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}), // Ghi nhớ 7 ngày
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { message: "Không thể kết nối đến máy chủ API." },
      { status: 500 }
    );
  }
}
