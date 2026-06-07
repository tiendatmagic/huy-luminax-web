import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Chưa xác thực" },
        { status: 401 }
      );
    }

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/user`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Không thể lấy thông tin người dùng" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("User route error:", error);
    return NextResponse.json(
      { message: "Không thể kết nối đến máy chủ API." },
      { status: 500 }
    );
  }
}
