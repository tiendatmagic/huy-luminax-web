"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
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
  sku: string | null;
  price: string | null;
  regular_price: string | null;
  featured_image: string | null;
  gallery: string[] | null;
  short_description: string | null;
  description: string | null;
  stock_status: string;
  category?: ProductCategory;
  related_products?: Product[];
}

interface Setting {
  company_phone?: string;
  social_zalo?: string;
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Setting>({});

  // Fetch chi tiết sản phẩm và settings hotline
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const [prodRes, settingsRes] = await Promise.all([
          fetch(`/api/public/products/${slug}`),
          fetch("/api/public/settings"),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProduct(prodData);
          if (prodData.featured_image) {
            setActiveImage(prodData.featured_image);
          } else if (prodData.gallery && prodData.gallery.length > 0) {
            setActiveImage(prodData.gallery[0]);
          }
        } else {
          // Redirect về danh sách sản phẩm nếu không tìm thấy
          router.push("/san-pham");
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setSettings(settingsData);
        }
      } catch (err) {
        console.error("Lỗi lấy chi tiết sản phẩm:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, router]);

  const formatVnd = (val: string | null) => {
    if (!val) return "Liên hệ B2B";
    const num = parseFloat(val);
    if (isNaN(num) || num === 0) return "Liên hệ B2B";
    return num.toLocaleString("vi-VN") + " đ";
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-36 pb-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-sm font-bold text-deep-navy">
            Đang tải chi tiết sản phẩm...
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Tạo danh sách tất cả các ảnh bao gồm ảnh đại diện và thư viện ảnh
  const allImages: string[] = [];
  if (product.featured_image) allImages.push(product.featured_image);
  if (product.gallery && Array.isArray(product.gallery)) {
    product.gallery.forEach((img) => {
      if (img && !allImages.includes(img)) {
        allImages.push(img);
      }
    });
  }

  const contactPhone = settings.company_phone || "0987.654.321";
  const zaloPhone = settings.social_zalo || "0987654321";
  const zaloLink = `https://zalo.me/${zaloPhone.replace(/[^0-9]/g, "")}`;

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/20 selection:text-primary bg-[#faf8ff]">
      <Header />

      <main className="flex-grow pt-32 md:pt-36 lg:pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {/* Nút quay lại */}
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            QUAY LẠI HỆ SINH THÁI
          </Link>

          {/* Phần thông tin chính sản phẩm */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Cột trái: Gallery ảnh (5 cột trên màn hình rộng) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-black/5">
                {activeImage ? (
                  <Image
                    alt={product.name}
                    src={activeImage}
                    fill
                    className="object-cover transition-all duration-300"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <span className="material-symbols-outlined text-6xl">
                      image
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex flex-wrap gap-2.5">
                  {allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        activeImage === imgUrl
                          ? "border-primary ring-2 ring-primary/10 shadow-sm"
                          : "border-black/10 hover:border-primary/50"
                      }`}
                    >
                      <Image
                        alt=""
                        src={imgUrl}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cột phải: Chi tiết và Mua hàng (7 cột trên màn hình rộng) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {product.category ? (
                    <Link
                      href={`/san-pham?category=${product.category.slug}`}
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase text-primary bg-primary/10 border border-primary/15 hover:bg-primary hover:text-white transition-all cursor-pointer"
                    >
                      {product.category.name}
                    </Link>
                  ) : (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase text-primary bg-primary/10 border border-primary/15">
                      Chưa phân loại
                    </span>
                  )}
                  {product.sku && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase text-on-surface-variant/70 bg-slate-100 border border-slate-200">
                      SKU: {product.sku}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-headline font-black text-deep-navy leading-tight">
                  {product.name}
                </h1>

                {/* Giá tiền */}
                <div className="flex items-baseline gap-4 py-1.5 border-y border-black/5">
                  <span className="text-2xl sm:text-3xl font-black text-primary">
                    {formatVnd(product.price)}
                  </span>
                  {product.regular_price &&
                    parseFloat(product.regular_price) > 0 && (
                      <span className="text-xs sm:text-sm line-through text-on-surface-variant/60 font-semibold">
                        {formatVnd(product.regular_price)}
                      </span>
                    )}
                  {product.stock_status !== "instock" && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-700 border border-red-200 rounded-full uppercase ml-2">
                      Tạm hết hàng
                    </span>
                  )}
                </div>

                {/* Mô tả ngắn */}
                {product.short_description && (
                  <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                    {product.short_description}
                  </p>
                )}
              </div>

              {/* Hành động đặt hàng & tư vấn */}
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${contactPhone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-primary/20 hover:shadow-primary/45 transition-all text-center"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    GỌI HOTLINE: {contactPhone}
                  </a>
                  <a
                    href={zaloLink}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-600/40 transition-all text-center"
                  >
                    <span>Chat Zalo Tư Vấn</span>
                  </a>
                </div>

                {/* Các nhãn cam kết chất lượng */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-bold text-on-surface-variant/80 pt-4 border-t border-black/5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                    <span>Cam kết chất lượng 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary shrink-0" />
                    <span>Giao hàng B2B toàn quốc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Hỗ trợ R&amp;D tối ưu hóa</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tab: Mô tả chi tiết */}
          {product.description && (
            <section className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-deep-navy border-b border-black/5 pb-3 mb-5">
                Mô tả chi tiết sản phẩm
              </h2>
              <div
                className="prose prose-slate max-w-none text-on-surface-variant font-medium text-xs sm:text-sm md:text-base leading-relaxed space-y-6 ql-editor-view"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </section>
          )}

          {/* Phần: Sản phẩm liên quan */}
          {product.related_products && product.related_products.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-lg font-black text-deep-navy text-center sm:text-left">
                Sản phẩm liên quan
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {product.related_products.map((related) => (
                  <Link
                    href={`/san-pham/${related.slug}`}
                    key={related.id}
                    className="glass-premium glowing-card border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group cursor-pointer hover:-translate-y-2 bg-white"
                  >
                    <div className="relative h-48 bg-surface-container overflow-hidden">
                      {related.featured_image ? (
                        <Image
                          alt={related.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          src={related.featured_image}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                          <span className="material-symbols-outlined text-3xl">
                            image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded text-primary bg-primary/10">
                            {related.category?.name || "Chưa phân loại"}
                          </span>
                          <span className="text-xs font-black text-primary">
                            {formatVnd(related.price)}
                          </span>
                        </div>
                        <h4 className="font-headline text-sm font-bold text-deep-navy group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-1">
                          {related.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          {related.short_description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center text-[11px] font-bold text-primary gap-1 group-hover:gap-2 transition-all pt-2 border-t border-black/5">
                        Xem chi tiết &rarr;
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
