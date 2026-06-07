import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
 
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
 
    if (!token) {
      return NextResponse.json({ message: "Chưa xác thực" }, { status: 401 });
    }
 
    const formData = await req.formData();
    const file = formData.get("image");
 
    if (!file) {
      return NextResponse.json({ message: "Không tìm thấy hình ảnh để tải lên." }, { status: 400 });
    }
 
    const laravelFormData = new FormData();
    laravelFormData.append("image", file);
 
    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/products/upload-image`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: laravelFormData,
    });
 
    const data = await response.json();
    if (data && data.url && data.url.startsWith("/")) {
      data.url = `${process.env.LARAVEL_API_URL}${data.url}`;
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Product upload image error:", error);
    return NextResponse.json({ message: "Không thể kết nối đến máy chủ API." }, { status: 500 });
  }
}
