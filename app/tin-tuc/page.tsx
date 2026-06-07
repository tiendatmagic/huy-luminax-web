"use client";
 
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Calendar, Image as ImageIcon } from "lucide-react";
 
interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  category?: Category;
  excerpt: string | null;
  image: string | null;
  created_at: string;
}
 
export default function TinTuc() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/public/posts");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Lỗi lấy bài viết:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);
 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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
                Thông Tin Mới Nhất
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-headline font-black text-deep-navy">
              Tin Tức &amp; Sự Kiện
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Cập nhật những thông tin công nghệ, chiến lược hợp tác phát triển bền vững và dòng sản phẩm mới nhất từ Huy Luminax.
            </p>
          </div>
 
          {/* Loading state */}
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 relative z-10">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-sm font-bold text-deep-navy">Đang tải danh sách bài viết...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center text-on-surface-variant font-bold text-sm relative z-10">
              Hiện chưa có bài viết nào. Vui lòng quay lại sau!
            </div>
          ) : (
            /* News List Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {currentPosts.map((news) => (
                <article
                  key={news.id}
                  className="glass-premium glowing-card shadow-lg shadow-deep-navy/5 border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group hover:-translate-y-2"
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
                        <span
                          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase text-primary bg-primary/10 border border-primary/10"
                        >
                          {news.category?.name || "Tin tức"}
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(news.created_at).toLocaleDateString("vi-VN")}
                        </span>
                      </div>

                      {/* Tiêu đề bài viết */}
                      <h3 className="font-headline text-base sm:text-lg font-bold text-deep-navy transition-colors leading-snug mb-3 line-clamp-2">
                        <Link href={`/tin-tuc/${news.slug}`} className="hover:text-primary transition-colors block cursor-pointer">
                          {news.title}
                        </Link>
                      </h3>

                      {/* Trích dẫn */}
                      <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 leading-relaxed font-medium">
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
              ))}
            </div>
          )}

          {/* Phân trang công khai */}
          {!isLoading && totalPages > 1 && (
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
        </section>
      </main>
 
      <Footer />
    </div>
  );
}
