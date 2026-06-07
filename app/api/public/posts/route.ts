import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.LARAVEL_API_URL}/api/public/posts`, {
      cache: "no-store",
    });
    const data = await res.json();

    // Map relative image URLs to absolute URLs
    const mappedData = Array.isArray(data)
      ? data.map((post: any) => {
          if (post.image && post.image.startsWith("/")) {
            return {
              ...post,
              image: `${process.env.LARAVEL_API_URL}${post.image}`,
            };
          }
          return post;
        })
      : data;

    return NextResponse.json(mappedData);
  } catch (err) {
    console.error("Public posts fetch error:", err);
    return NextResponse.json({ message: "Không thể lấy danh sách bài viết" }, { status: 500 });
  }
}
