import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const res = await fetch(`${process.env.LARAVEL_API_URL}/api/public/posts/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: res.status });
    }

    const post = await res.json();

    // Map relative image URL to absolute URL if needed
    if (post && post.image && post.image.startsWith("/")) {
      post.image = `${process.env.LARAVEL_API_URL}${post.image}`;
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error("Public post detail fetch error:", err);
    return NextResponse.json({ message: "Không thể lấy chi tiết bài viết" }, { status: 500 });
  }
}
