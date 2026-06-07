import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Chưa xác thực" }, { status: 401 });
    }

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/categories`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Categories GET error:", error);
    return NextResponse.json({ message: "Không thể kết nối đến máy chủ API." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Chưa xác thực" }, { status: 401 });
    }

    const body = await req.json();

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Categories POST error:", error);
    return NextResponse.json({ message: "Không thể kết nối đến máy chủ API." }, { status: 500 });
  }
}
