import { NextResponse } from "next/server";
 
export async function GET() {
  try {
    const res = await fetch(`${process.env.LARAVEL_API_URL}/api/public/product-categories`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Public product categories fetch error:", err);
    return NextResponse.json({ message: "Không thể lấy danh sách danh mục sản phẩm" }, { status: 500 });
  }
}
