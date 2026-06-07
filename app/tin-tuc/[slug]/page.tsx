"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function DetailTinTuc() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/public/posts/${slug}`);
        if (!res.ok) {
          throw new Error("Không tìm thấy bài viết.");
        }
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message || "Lỗi tải bài viết.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen relative bg-[#faf8ff]">
        <Header />
        <main className="flex-grow pt-36 pb-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-sm font-bold text-deep-navy">Đang tải nội dung bài viết...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen relative bg-[#faf8ff]">
        <Header />
        <main className="flex-grow pt-36 pb-20 px-6 max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-2xl font-headline font-black text-deep-navy">Rất tiếc, không tìm thấy bài viết!</h1>
          <p className="text-sm text-on-surface-variant font-medium">Bài viết bạn đang tìm kiếm có thể đã bị gỡ bỏ hoặc đường dẫn không chính xác.</p>
          <Link href="/tin-tuc" className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all">
            <ArrowLeft className="w-4 h-4" /> Quay lại Tin tức
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#faf8ff] selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-grow pt-32 md:pt-36 lg:pt-40 pb-20">
        <article className="max-w-4xl mx-auto px-6 space-y-8">
          {/* Back button */}
          <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách tin tức
          </Link>

          {/* Category & Date */}
          <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
            {post.category && (
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-[5px] uppercase">
                {post.category.name}
              </span>
            )}
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4" />
              {new Date(post.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>

          {/* Title & Excerpt */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black text-deep-navy leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed font-semibold italic border-l-4 border-primary pl-4">
                {post.excerpt}
              </p>
            )}
          </div>



          {/* HTML Content */}
          <div 
            className="prose prose-slate max-w-none pt-4 text-deep-navy font-medium text-xs sm:text-sm md:text-base leading-relaxed space-y-6 ql-editor-view"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}
