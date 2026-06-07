"use client";
 
import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
 
// Dữ liệu tin tức
const newsAndEvents = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCnslKeUvNUDg3a95-mFuMoImpxBm3K-oZaBsEAKq6NR94Au5rglRZTNuCNHk4xL0qmTiqAI8oo2Oup1vFydS4axSmkulR-zNR8VadalPuoENGIUA1pNpi8bL8z3egpIg30B7XKmecRKr6GHk9zq0Finw5LX73XC-f1hjr0_8guS47X96rqHjYZP1bPvVUKvhl_CRIz1eF3gNFB2xAphqw2FLsOT08hWQsLOtnlgOIlzvDJEmytU8TpwMObriI8ZeBMSz6aG8fi_4",
    badge: "Công nghệ",
    badgeStyle: "text-primary bg-primary/10",
    date: "20/05/2026",
    title: "Luminax AI đạt cột mốc 1.4 triệu Epochs trong huấn luyện",
    description:
      "Bước nhảy vọt trong tối ưu quy trình phân tách phân tử giúp nâng cao năng lực sản xuất hóa chất và nâng cao hiệu quả chuỗi cung ứng công nghiệp B2B.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYcnAKbpA9-sxYQOqzmIHHfahOv0RxBOjja0sDw0njkspnlFZ8RywCCtP0RAdTrKqEGLTxWj6icIZPZkPztBUwSbtSxRRdwbX8KH_MM8koIEMbqHCcOjry4GbBZKEFYAtXv4qGIralusalY-UNCkyJ_L-M0Otr8v1Xi1cApCz4_23F3bQoMLtNObzanwL6jwYXI5azLwKJKux9BrlUVOa2Jlj4ffRfK7jUVgAsofNOmsB_W4-do1pPpJlEHDDZxVc_zverLoSM4kA",
    badge: "Sự kiện",
    badgeStyle: "text-secondary bg-secondary/10",
    date: "15/05/2026",
    title: "Hợp tác chiến lược phát triển hóa chất xanh bền vững",
    description:
      "Ký kết thỏa thuận hợp tác nghiên cứu vật liệu phân hủy sinh học ứng dụng trong công nghiệp sản xuất giấy tiêu dùng an toàn cho sức khỏe cộng đồng.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4LULR9Dd7aHRfCy7ZSlRRdJ_XPo2pXc6mmdZa32yEa8k70PuzSoTd147zXtfxy2mFitzHbTFkcA7ttwLtuMvCGVKtpnm8x7HU93lga8IMyVh7VriDmZcG-KlFuC7K23t2mrcPlbsSo7AoiQZIRlrOceo8pk1MnPyT9g_go5KnlMDYM4wuk2pd56Je61CM5dOebSy1z8FZEIUrEj5i1QMIoKCj8jJo0SiLgWGxCTc9YPjVDK--znnkEGmxS6ZJE8imfqx5gl5hLyc",
    badge: "Sản phẩm",
    badgeStyle: "text-accent-pink bg-accent-pink/10",
    date: "10/05/2026",
    title: "Ra mắt dòng sản phẩm khăn giấy kháng khuẩn cao cấp mới",
    description:
      "Sản phẩm khăn giấy sợi tre tự nhiên tích hợp công nghệ Nano bạc kháng khuẩn đạt chuẩn kiểm nghiệm quốc tế siêu mềm mại.",
  },
];
 
export default function TinTuc() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/20 selection:text-primary">
      <Header />
 
      <main className="flex-grow pt-32">
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
 
          {/* News List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {newsAndEvents.map((news, idx) => (
              <article
                key={idx}
                className="glass-premium glowing-card border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group cursor-pointer hover:-translate-y-2"
              >
                <div className="relative h-56 bg-surface-container overflow-hidden">
                  <Image
                    alt={news.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    src={news.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase ${news.badgeStyle}`}
                      >
                        {news.badge}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {news.date}
                      </span>
                    </div>
                    <h3 className="font-headline text-base sm:text-lg font-bold text-deep-navy group-hover:text-primary transition-colors leading-snug mb-3">
                      {news.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 leading-relaxed font-medium">
                      {news.description}
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
