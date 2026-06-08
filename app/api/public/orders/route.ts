import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/public/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Public orders POST error:", error);
    return NextResponse.json(
      { message: "Không thể kết nối đến máy chủ API." },
      { status: 500 }
    );
  }
}
