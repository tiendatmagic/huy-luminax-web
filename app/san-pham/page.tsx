"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string | null;
  regular_price: string | null;
  featured_image: string | null;
  short_description: string | null;
  category?: ProductCategory;
}

export default function SanPham() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch danh mục và sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          fetch("/api/public/product-categories"),
          fetch("/api/public/products"),
        ]);

        if (catsRes.ok) {
          const catsData = await catsRes.json();
          setCategories(catsData);
        }

        if (prodsRes.ok) {
          const prodsData = await prodsRes.json();
          setProducts(prodsData);
        }
      } catch (err) {
        console.error("Lỗi lấy dữ liệu client sản phẩm:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lắng nghe thay đổi URL để cập nhật bộ lọc danh mục
  useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get("category") || "all";
        setFilter(cat);
        setCurrentPage(1);
      }
    };

    handleLocationChange();

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleCategoryChange = (slug: string) => {
    setFilter(slug);
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      const newUrl = slug && slug !== "all" ? `/san-pham?category=${slug}` : "/san-pham";
      window.history.pushState({}, "", newUrl);
    }
  };

  // Lọc sản phẩm
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category?.slug === filter);

  const formatVnd = (val: string | null) => {
    if (!val) return "Liên hệ B2B";
    const num = parseFloat(val);
    if (isNaN(num) || num === 0) return "Liên hệ B2B";
    return num.toLocaleString("vi-VN") + " đ";
  };

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-grow pt-32 md:pt-36 lg:pt-40">
        <section className="py-10 px-6 max-w-7xl mx-auto relative">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="floating-blob w-80 h-80 bg-primary/10 top-12 left-10 blur-3xl opacity-50"></div>
          </div>

          <div className="relative z-10 text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                Sản Phẩm &amp; Dịch Vụ
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-headline font-black text-deep-navy">
              Sản Phẩm Nổi Bật
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Các giải pháp chất tẩy rửa sinh học sạch và hóa chất công nghiệp
              chuẩn tinh khiết được R&amp;D và QA tự động bằng AI.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wider shadow-sm transition-all duration-300 cursor-pointer border ${
                filter === "all"
                  ? "bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white border-transparent"
                  : "bg-white/60 hover:bg-white text-on-surface-variant border-outline-variant/35"
              }`}
            >
              TẤT CẢ
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wider shadow-sm transition-all duration-300 cursor-pointer border ${
                  filter === cat.slug
                    ? "bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white border-transparent"
                    : "bg-white/60 hover:bg-white text-on-surface-variant border-outline-variant/35"
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-sm font-bold text-deep-navy">
                Đang tải danh sách sản phẩm...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center text-on-surface-variant font-semibold text-sm">
              Không tìm thấy sản phẩm nào trong danh mục này.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {currentProducts.map((product) => (
                  <article
                    key={product.id}
                    className="glass-premium glowing-card border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group hover:-translate-y-2"
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
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                          <span className="material-symbols-outlined text-4xl">
                            image
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <button
                            type="button"
                            onClick={() => handleCategoryChange(product.category?.slug || "")}
                            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all cursor-pointer border border-transparent"
                          >
                            {product.category?.name || "Chưa phân loại"}
                          </button>
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

                        <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 leading-relaxed font-medium">
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
                ))}
              </div>

              {/* Phân trang công khai */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center pt-12 relative z-10">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 200, behavior: "smooth" });
                      }}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full border border-outline-variant/35 bg-white/60 hover:bg-white text-on-surface hover:text-primary flex items-center justify-center shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 cursor-pointer"
                      title="Trang trước"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">west</span>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 200, behavior: "smooth" });
                        }}
                        className={`w-10 h-10 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                          currentPage === page
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "border border-outline-variant/35 bg-white/60 hover:bg-white text-on-surface hover:text-primary"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                        window.scrollTo({ top: 200, behavior: "smooth" });
                      }}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full border border-outline-variant/35 bg-white/60 hover:bg-white text-on-surface hover:text-primary flex items-center justify-center shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 cursor-pointer"
                      title="Trang sau"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">east</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
