"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-6 pt-32 md:pt-36 lg:pt-40 pb-10 bg-gradient-to-br from-surface via-surface-container-low to-surface">
      {/* Ambient Floating Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="floating-blob w-80 h-80 bg-primary/10 top-12 left-10 blur-3xl opacity-50"
          style={{ animationDuration: "16s" }}
        ></div>
        <div
          className="floating-blob w-[450px] h-[450px] bg-secondary/15 right-[-100px] top-[-50px] blur-[100px] opacity-60"
          style={{ animationDuration: "20s", animationDelay: "-3s" }}
        ></div>
        <div
          className="floating-blob w-96 h-96 bg-secondary-container/10 bottom-10 left-[20%] blur-[85px] opacity-50"
          style={{ animationDuration: "18s", animationDelay: "-7s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
        {/* Cột trái: Tiêu đề */}
        <div className="lg:col-span-7 space-y-6 text-left reveal active">
          {/* Badge Tiên phong kỷ nguyên mới đồng bộ */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
            <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
              Tiên Phong Kỷ Nguyên Mới
            </span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl lg:text-[56px] lg:leading-[1.15] font-extrabold text-deep-navy tracking-tight">
            Hội Tụ Trí Tuệ Nhân Tạo &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-vibrant-blue to-secondary-container drop-shadow-sm">
              Tinh Hoa Hóa Mỹ Phẩm
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-xl leading-relaxed font-medium">
            Huy Luminax cam kết mang đến những sản phẩm tiêu dùng và hóa
            chất cơ bản an toàn, thuần khiết nhất, được tối ưu hóa độ chính
            xác tuyệt đối nhờ hệ thống phân tích dữ liệu AI tiên tiến.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#fields"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#0072ff]/15 hover:shadow-[#0072ff]/25 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group shine-effect cursor-pointer text-center"
            >
              <span>KHÁM PHÁ SẢN PHẨM</span>
              <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
            <a
              href="#technology"
              className="inline-flex items-center justify-center border border-primary/30 hover:border-primary text-primary px-8 py-4 rounded-full font-bold text-sm bg-white/40 hover:bg-primary/5 transition-all duration-300 backdrop-blur-md cursor-pointer text-center"
            >
              <span>VỀ CÔNG NGHỆ AI</span>
            </a>
          </div>
        </div>

        {/* Cột phải: Mockup thiết bị trong suốt bóng bẩy */}
        <div className="lg:col-span-5 relative reveal active">
          {/* Ambient Glow behind image */}
          <div
            className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-vibrant-blue/20 rounded-[2.5rem] blur-3xl opacity-40 animate-pulse"
            style={{ animationDuration: "5s" }}
          ></div>
          {/* Premium Glass Container */}
          <div className="glass-premium rounded-[2.5rem] p-4 relative overflow-hidden shadow-2xl shadow-deep-navy/5 transform hover:-translate-y-2 transition-all duration-500 hover:shadow-primary/10">
            <div className="flex items-center gap-1.5 pb-3 px-2 border-b border-white/20 mb-3 opacity-60">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
              <Image
                alt="AI Fusion lab microchip and drops"
                className="object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCimm9lyfO7ZaBzxraDr8AaY7PC4XJ_AyhKyfxOK8F4wbq2gR_9Pv1_Nex8_gZe-mpcsZrjIDuInkQ-RzFMf9LwL5sOtUu5ED4FQoaqqwceh6iZAnD_WqMoI7uFuXGpIeZZfGsEQFywEYDVde4iPBaR6F4hU1dl4-Zm90Z_uutxmi5JtAd4diVMK4Av4bN448Pl-XciqDdKoBQOm7K7-_lDfL7v8ZpDUgY0-TIlP5otISIrTwuVRXedXJS2meLpdYd_Y0iXAzyU0Lw"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            {/* Floating Interactive Badge (sonar wave) */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-xl flex items-center gap-4 z-20 hover:scale-105 transition-transform duration-300 select-none">
              <div className="w-12 min-w-[48px] h-12 bg-primary/10 p-3 rounded-full relative">
                <div className="sonar-wave text-primary"></div>
                <span className="material-symbols-outlined text-primary text-2xl">
                  trending_up
                </span>
              </div>
              <div>
                <p className="font-bold text-sm text-deep-navy">
                  Độ Tinh Khiết AI
                </p>
                <p className="text-xs font-semibold text-primary">
                  99.998% Chuẩn Xác
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
