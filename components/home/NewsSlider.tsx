"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import useDragScroll from "@/hooks/useDragScroll";

export default function NewsSlider() {
  const [newsAndEvents, setNewsAndEvents] = useState<any[]>([]);
  const newsSliderRef = useRef<HTMLDivElement>(null);

  useDragScroll(newsSliderRef, [newsAndEvents]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/public/posts");
        if (res.ok) {
          const data = await res.json();
          setNewsAndEvents(data.slice(0, 8));
        }
      } catch (err) {
        console.error("Lỗi lấy tin tức trang chủ:", err);
      }
    };
    fetchNews();
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    if (newsSliderRef.current) {
      const scrollAmount = 412; // Card 380px + gap 32px
      newsSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="news" className="py-10 px-6 max-w-7xl mx-auto relative reveal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              Thông Tin Mới Nhất
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
            Tin tức &amp; Sự kiện
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed font-semibold">
            Cập nhật những thông tin công nghệ, sản phẩm mới và chiến lược
            phát triển bền vững từ Huy Luminax.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto group">
        {/* Nút Trái */}
        <button
          onClick={() => scrollSlider("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/70 hover:bg-white text-on-surface hover:text-primary hidden md:flex items-center justify-center shadow-lg backdrop-blur-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 active:scale-90 cursor-pointer"
          title="Trước"
        >
          <span className="material-symbols-outlined font-bold">west</span>
        </button>

        {/* Horizontal Slider container */}
        <div
          ref={newsSliderRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth active:cursor-grabbing cursor-grab select-none"
        >
          {newsAndEvents.length > 0 ? (
            [...newsAndEvents, ...newsAndEvents, ...newsAndEvents].map(
              (news, idx) => (
                <article
                  key={`${news.id || "news"}-${idx}`}
                  className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] snap-start glass-premium glowing-card shadow-lg shadow-deep-navy/5 border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group hover:-translate-y-2"
                >
                  {/* Ảnh bài viết */}
                  <Link
                    href={`/tin-tuc/${news.slug}`}
                    className="relative h-56 bg-surface-container overflow-hidden block cursor-pointer"
                  >
                    {news.image ? (
                      <Image
                        alt={news.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-700 w-full h-full"
                        src={news.image}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/20 flex flex-col items-center justify-center text-primary/40">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase text-primary bg-primary/10 border border-primary/10">
                          {news.category?.name || "Tin tức"}
                        </span>
                        <span className="text-xs text-on-surface-variant font-semibold">
                          {new Date(news.created_at).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </div>

                      {/* Tiêu đề bài viết */}
                      <h3 className="font-headline text-base sm:text-lg font-bold text-deep-navy transition-colors leading-snug mb-3 line-clamp-2">
                        <Link
                          href={`/tin-tuc/${news.slug}`}
                          className="hover:text-primary transition-colors block cursor-pointer"
                        >
                          {news.title}
                        </Link>
                      </h3>

                      {/* Trích dẫn */}
                      <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed font-semibold">
                        {news.excerpt || "Xem chi tiết bài viết..."}
                      </p>
                    </div>

                    {/* Xem chi tiết */}
                    <div className="mt-6 pt-4 border-t border-black/5">
                      <Link
                        href={`/tin-tuc/${news.slug}`}
                        className="inline-flex items-center text-xs font-bold text-primary gap-1 hover:gap-2 transition-all cursor-pointer"
                      >
                        Xem chi tiết{" "}
                        <span className="material-symbols-outlined text-sm font-bold">
                          east
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ),
            )
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-xs font-semibold text-on-surface-variant">
                Đang tải tin tức...
              </p>
            </div>
          )}
        </div>

        {/* Nút Xem tất cả */}
        <div className="flex justify-center pt-10 relative z-10">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center justify-center border border-primary/30 hover:border-primary text-primary px-8 py-3.5 rounded-full font-bold text-xs tracking-wider bg-white/40 hover:bg-primary/5 hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            XEM TẤT CẢ TIN TỨC
            <span className="material-symbols-outlined ml-2 text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
        {/* Nút Phải */}
        <button
          onClick={() => scrollSlider("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/70 hover:bg-white text-on-surface hover:text-primary hidden md:flex items-center justify-center shadow-lg backdrop-blur-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 active:scale-90 cursor-pointer"
          title="Sau"
        >
          <span className="material-symbols-outlined font-bold">east</span>
        </button>
      </div>
    </section>
  );
}
