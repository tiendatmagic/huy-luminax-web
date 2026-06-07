import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Chưa xác thực" }, { status: 401 });
    }

    const body = await req.json();

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Cập nhật thông tin thất bại", errors: data.errors },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Profile route error:", error);
    return NextResponse.json(
      { message: "Không thể kết nối đến máy chủ API." },
      { status: 500 }
    );
  }
}
