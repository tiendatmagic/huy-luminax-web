"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import useDragScroll from "@/hooks/useDragScroll";

export default function ProductsSlider() {
  const [products, setProducts] = useState<any[]>([]);
  const productsSliderRef = useRef<HTMLDivElement>(null);

  useDragScroll(productsSliderRef, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/public/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.slice(0, 8));
        }
      } catch (err) {
        console.error("Lỗi lấy sản phẩm trang chủ:", err);
      }
    };
    fetchProducts();
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    if (productsSliderRef.current) {
      const scrollAmount = 412; // Card 380px + gap 32px
      productsSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const formatVnd = (val: string | null) => {
    if (!val) return "Liên hệ B2B";
    const num = parseFloat(val);
    if (isNaN(num) || num === 0) return "Liên hệ B2B";
    return num.toLocaleString("vi-VN") + " đ";
  };

  return (
    <section id="products" className="py-10 px-6 max-w-7xl mx-auto relative reveal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              Tinh Hoa Hóa Mỹ Phẩm
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
            Sản phẩm nổi bật
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed font-semibold">
            Khám phá Sản Phẩm Nổi Bật sạch và giải pháp công nghệ cao được
            phát triển &amp; kiểm chứng bởi Luminax AI.
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
          ref={productsSliderRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth active:cursor-grabbing cursor-grab select-none"
        >
          {products.length > 0 ? (
            [...products, ...products, ...products].map((product, idx) => {
              let badgeStyle = "text-primary bg-primary/10";
              if (product.category?.slug === "tissue") {
                badgeStyle = "text-accent-pink bg-accent-pink/10";
              } else if (product.category?.slug === "cosmetics") {
                badgeStyle = "text-accent-purple bg-accent-purple/10";
              }

              return (
                <article
                  key={idx}
                  className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] snap-start glass-premium glowing-card border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group hover:-translate-y-2"
                >
                  {/* Ảnh sản phẩm - có link */}
                  <Link
                    href={`/san-pham/${product.slug}`}
                    className="relative h-56 bg-surface-container overflow-hidden block cursor-pointer"
                  >
                    {product.featured_image ? (
                      <Image
                        alt={product.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        src={product.featured_image}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <span className="material-symbols-outlined text-3xl">
                          image
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase ${badgeStyle}`}
                        >
                          {product.category?.name || "Chưa phân loại"}
                        </span>
                        <span className="text-sm font-black text-primary">
                          {formatVnd(product.price)}
                        </span>
                      </div>

                      {/* Tiêu đề - có link */}
                      <h3 className="font-headline text-base sm:text-lg font-bold text-deep-navy transition-colors leading-snug mb-3 line-clamp-2">
                        <Link
                          href={`/san-pham/${product.slug}`}
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          {product.name}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed font-semibold">
                        {product.short_description}
                      </p>
                    </div>

                    {/* Xem chi tiết - có link */}
                    <div className="mt-6 pt-4 border-t border-black/5">
                      <Link
                        href={`/san-pham/${product.slug}`}
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
              );
            })
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-xs font-semibold text-on-surface-variant">
                Đang tải sản phẩm...
              </p>
            </div>
          )}
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
