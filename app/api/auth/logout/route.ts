import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (token) {
      // Gọi Laravel API để thu hồi token
      try {
        await fetch(`${process.env.LARAVEL_API_URL}/api/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
      } catch (apiError) {
        console.error("Laravel API logout failed:", apiError);
      }
    }

    // Xoá cookie
    cookieStore.delete("admin_token");

    return NextResponse.json({ success: true, message: "Đăng xuất thành công" });
  } catch (error: any) {
    console.error("Logout route error:", error);
    // Vẫn xoá cookie cục bộ trong mọi trường hợp
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return NextResponse.json({ success: true, message: "Đăng xuất cục bộ thành công" });
  }
}
