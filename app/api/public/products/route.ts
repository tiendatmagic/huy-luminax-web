import { NextRequest, NextResponse } from "next/server";
 
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured") || "";
 
    let url = `${process.env.LARAVEL_API_URL}/api/public/products`;
    const params = [];
    if (category) params.push(`category=${category}`);
    if (featured) params.push(`featured=${featured}`);
    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }
 
    const res = await fetch(url, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Public products fetch error:", err);
    return NextResponse.json({ message: "Không thể lấy danh sách sản phẩm" }, { status: 500 });
  }
}
