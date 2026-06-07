"use client";
 
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
 
// Dữ liệu sản phẩm mẫu
const productsList = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRiBlanPWi75t_h7nc83wNQIlbzV-0mJ_y5f5hi20L8LtPH_jN9olZlqIFzn_1k2pjOGFW5GErWuH-GFNFn5mFtvIsmHoMQxzCE-kVhJvHrqsFpT1XY_3uPV42fPPFNAreZrynUrQhSy_z1OysST6APtdFe43QdNEjUWywNoQlO6vXL-IDUBUorhfrc5RQhIl_6rnbUt6Koo5eb7gHxMFdJKsi3v9btNo6ahm0bbRyiZxGkp7_S66cr-iaXaNOS_-Quddjh8z0jZM",
    category: "tissue",
    categoryLabel: "Khăn giấy",
    badgeStyle: "text-accent-pink bg-accent-pink/10",
    title: "Khăn Giấy Tre Cao Cấp Luminax",
    description: "Kháng khuẩn tự nhiên bằng công nghệ Nano Bạc, siêu mềm mại, tự phân hủy thân thiện môi trường.",
    price: "45.000 đ",
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCnslKeUvNUDg3a95-mFuMoImpxBm3K-oZaBsEAKq6NR94Au5rglRZTNuCNHk4xL0qmTiqAI8oo2Oup1vFydS4axSmkulR-zNR8VadalPuoENGIUA1pNpi8bL8z3egpIg30B7XKmecRKr6GHk9zq0Finw5LX73XC-f1hjr0_8guS47X96rqHjYZP1bPvVUKvhl_CRIz1eF3gNFB2xAphqw2FLsOT08hWQsLOtnlgOIlzvDJEmytU8TpwMObriI8ZeBMSz6aG8fi_4",
    category: "chemicals",
    categoryLabel: "Hóa chất B2B",
    badgeStyle: "text-primary bg-primary/10",
    title: "Dung Dịch Phân Tách Phân Tử Luminax AI",
    description: "Độ tinh khiết đạt 99.998% đã qua phân tích dữ liệu thời gian thực cho sản xuất công nghiệp B2B.",
    price: "Liên hệ B2B",
  },
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4LULR9Dd7aHRfCy7ZSlRRdJ_XPo2pXc6mmdZa32yEa8k70PuzSoTd147zXtfxy2mFitzHbTFkcA7ttwLtuMvCGVKtpnm8x7HU93lga8IMyVh7VriDmZcG-KlFuC7K23t2mrcPlbsSo7AoiQZIRlrOceo8pk1MnPyT9g_go5KnlMDYM4wuk2pd56Je61CM5dOebSy1z8FZEIUrEj5i1QMIoKCj8jJo0SiLgWGxCTc9YPjVDK--znnkEGmxS6ZJE8imfqx5gl5hLyc",
    category: "cosmetics",
    categoryLabel: "Hóa mỹ phẩm",
    badgeStyle: "text-accent-purple bg-accent-purple/10",
    title: "Nước Rửa Tay Kháng Khuẩn Quang Phổ",
    description: "Công thức sinh học tự nhiên, diệt sạch 99.9% vi khuẩn, giữ ẩm da tay nhờ chiết xuất nha đam.",
    price: "32.000 đ",
  },
  {
    id: 4,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYcnAKbpA9-sxYQOqzmIHHfahOv0RxBOjja0sDw0njkspnlFZ8RywCCtP0RAdTrKqEGLTxWj6icIZPZkPztBUwSbtSxRRdwbX8KH_MM8koIEMbqHCcOjry4GbBZKEFYAtXv4qGIralusalY-UNCkyJ_L-M0Otr8v1Xi1cApCz4_23F3bQoMLtNObzanwL6jwYXI5azLwKJKux9BrlUVOa2Jlj4ffRfK7jUVgAsofNOmsB_W4-do1pPpJlEHDDZxVc_zverLoSM4kA",
    category: "tissue",
    categoryLabel: "Khăn giấy",
    badgeStyle: "text-accent-green bg-accent-green/10",
    title: "Khăn Giấy Ướt Kháng Khuẩn Nano",
    description: "Làm từ sợi tự nhiên, không cồn, không paraben, an toàn tối đa cho da bé nhạy cảm.",
    price: "28.000 đ",
  },
];
 
export default function SanPham() {
  const [filter, setFilter] = useState("all");
 
  const filteredProducts =
    filter === "all"
      ? productsList
      : productsList.filter((p) => p.category === filter);
 
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
              Hệ Sinh Thái Sản Phẩm
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Các giải pháp chất tẩy rửa sinh học sạch và hóa chất công nghiệp chuẩn tinh khiết được R&amp;D và QA tự động bằng AI.
            </p>
          </div>
 
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
            {[
              { id: "all", label: "Tất cả" },
              { id: "tissue", label: "Khăn giấy" },
              { id: "chemicals", label: "Hóa chất B2B" },
              { id: "cosmetics", label: "Hóa mỹ phẩm" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wider shadow-sm transition-all duration-300 cursor-pointer border ${
                  filter === btn.id
                    ? "bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white border-transparent"
                    : "bg-white/60 hover:bg-white text-on-surface-variant border-outline-variant/35"
                }`}
              >
                {btn.label.toUpperCase()}
              </button>
            ))}
          </div>
 
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="glass-premium glowing-card border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group cursor-pointer hover:-translate-y-2"
              >
                <div className="relative h-56 bg-surface-container overflow-hidden">
                  <Image
                    alt={product.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    src={product.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase ${product.badgeStyle}`}
                      >
                        {product.categoryLabel}
                      </span>
                      <span className="text-sm font-black text-primary">
                        {product.price}
                      </span>
                    </div>
                    <h3 className="font-headline text-base sm:text-lg font-bold text-deep-navy group-hover:text-primary transition-colors leading-snug mb-3">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 leading-relaxed font-medium">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-primary gap-1 group-hover:gap-2 transition-all pt-4">
                    Xem chi tiết{" "}
                    <span className="material-symbols-outlined text-sm font-bold">
                      east
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
 
      <Footer />
    </div>
  );
}
