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
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

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
          <p className="text-sm font-bold text-deep-navy">
            Đang tải nội dung bài viết...
          </p>
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
          <h1 className="text-2xl font-headline font-black text-deep-navy">
            Rất tiếc, không tìm thấy bài viết!
          </h1>
          <p className="text-sm text-on-surface-variant font-medium">
            Bài viết bạn đang tìm kiếm có thể đã bị gỡ bỏ hoặc đường dẫn không
            chính xác.
          </p>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all"
          >
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
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover hover:gap-3 transition-all"
          >
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

          {/* Social Share Section */}
          <div className="border-t border-b border-black/5 py-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-deep-navy">
                Chia sẻ bài viết:
              </span>
              <div className="flex items-center gap-2">
                {/* Facebook Share */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1877f2]/10 hover:bg-[#1877f2] hover:text-white text-[#1877f2] flex items-center justify-center transition-all duration-300"
                  title="Chia sẻ lên Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Twitter / X Share */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(post.title || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/5 hover:bg-black hover:text-white text-black flex items-center justify-center transition-all duration-300"
                  title="Chia sẻ lên Twitter / X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300 relative group cursor-pointer"
                  title="Sao chép liên kết"
                >
                  <svg
                    className="w-4 h-4 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  {isCopied && (
                    <span className="absolute bottom-full mb-2 px-2 py-1 bg-deep-navy text-white text-[10px] font-bold rounded shadow-lg whitespace-nowrap animate-fade-in">
                      Đã sao chép!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Quay lại danh sách tin tức */}
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover transition-all"
            >
              Xem các bài viết khác <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </article>

        {/* Related Posts Section */}
        {post.related_posts && post.related_posts.length > 0 && (
          <div className="max-w-6xl mx-auto px-6 mt-16 pt-16 border-t border-black/5 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-headline font-black text-deep-navy">
                Bài viết liên quan
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-on-surface-variant/70">
                Những tin tức & chia sẻ công nghệ khác từ Huy Luminax
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {post.related_posts.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/tin-tuc/${related.slug}`}
                  className="group flex flex-col bg-white border border-black/5 rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/25 transition-all duration-300 cursor-pointer"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] bg-black/5 overflow-hidden w-full">
                    {related.image ? (
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-primary/30" />
                      </div>
                    )}
                    {related.category && (
                      <span className="absolute top-4 left-4 text-[9px] font-mono font-bold px-2 py-0.5 bg-white/90 backdrop-blur-sm text-primary rounded-[4px] uppercase shadow-sm">
                        {related.category.name}
                      </span>
                    )}
                  </div>

                  {/* Content container */}
                  <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-on-surface-variant/70">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(related.created_at).toLocaleDateString(
                          "vi-VN",
                        )}
                      </div>
                      <h3 className="font-headline font-black text-sm sm:text-base text-deep-navy group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {related.title}
                      </h3>
                      {related.excerpt && (
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed font-medium">
                          {related.excerpt}
                        </p>
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Đọc tiếp <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
