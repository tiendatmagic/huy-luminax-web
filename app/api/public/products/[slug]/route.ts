import { NextRequest, NextResponse } from "next/server";
 
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const res = await fetch(`${process.env.LARAVEL_API_URL}/api/public/products/${slug}`, {
      cache: "no-store",
    });
 
    if (!res.ok) {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm" }, { status: 404 });
    }
 
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Public product detail fetch error:", err);
    return NextResponse.json({ message: "Không thể lấy thông tin sản phẩm" }, { status: 500 });
  }
}
