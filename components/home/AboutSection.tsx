"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="intro" className="py-10 px-6 max-w-7xl mx-auto relative reveal">
      {/* Ambient Blob */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="floating-blob w-72 h-72 bg-primary/5 -bottom-10 left-[-50px]"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Cột trái: Grid ảnh lồng ghép parallax */}
          <div className="relative grid grid-cols-2 gap-4 group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl shadow-xl transform translate-y-8 group-hover:translate-y-12 group-hover:scale-[1.02] transition-all duration-700 ease-out border border-white/20">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  alt="Professional web design team working"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRiBlanPWi75t_h7nc83wNQIlbzV-0mJ_y5f5hi20L8LtPH_jN9olZlqIFzn_1k2pjOGFW5GErWuH-GFNFn5mFtvIsmHoMQxzCE-kVhJvHrqsFpT1XY_3uPV42fPPFNAreZrynUrQhSy_z1OysST6APtdFe43QdNEjUWywNoQlO6vXL-IDUBUorhfrc5RQhIl_6rnbUt6Koo5eb7gHxMFdJKsi3v9btNo6ahm0bbRyiZxGkp7_S66cr-iaXaNOS_-Quddjh8z0jZM"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl transform -translate-y-4 group-hover:-translate-y-8 group-hover:scale-[1.02] transition-all duration-700 ease-out border border-white/20">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  alt="Modern workspace setup"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8R4iSqG1jd22hPiplOl2PGuYw_pUZ69l7EfmyFbnA7U-Ps86M6DkNYKLJ4-oX1x3vV9DY5Qlgu86PjhutpSJw9kuwLcZHENl63-nqV12B4Mufcd_hcsQgHlcHTq6FeFoIirSbVD8teoeyiINy_ikHDKPBgNVIvEG2Oh9Ja9rAr4LTdlUC7bMlShFX-dhXUr1Kr9dNAwynWvPwN_4hy2TuNrY9Y77nAzcxkjCBQKQ6Erx90z9L9LSosnD4HVfClNDc1CkPSG-zOFg"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 group-hover:scale-110 transition-transform duration-700"></div>
          </div>

          {/* Cột phải: Nội dung */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                Hành Trình &amp; Phát Triển
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy leading-tight">
              Về Huy Luminax
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
              CÔNG TY TNHH HUY LUMINAX là đơn vị tiên phong trong việc tích
              hợp nghiên cứu hóa sinh và ứng dụng trí tuệ nhân tạo. Chúng
              tôi không chỉ cung cấp sản phẩm tiêu dùng và công nghiệp thông
              thường, chúng tôi cung cấp giải pháp công nghệ toàn diện và
              bền vững.
            </p>

            {/* Experience Stats Counters */}
            <div className="grid grid-cols-3 gap-4 py-4 my-6">
              <div>
                <p className="text-3xl font-extrabold text-primary">10+</p>
                <p className="text-xs text-on-surface-variant font-bold mt-1">
                  Dòng sản phẩm
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-primary">
                  99.9%
                </p>
                <p className="text-xs text-on-surface-variant font-bold mt-1">
                  Khử khuẩn quang phổ
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-primary">100%</p>
                <p className="text-xs text-on-surface-variant font-bold mt-1">
                  Hài lòng tuyệt đối
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact-section"
                className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-wider shadow-md shadow-[#0072ff]/20 hover:shadow-lg hover:shadow-[#0072ff]/30 transition-all flex items-center gap-2 shine-effect cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">
                  call
                </span>
                LIÊN HỆ NGAY
              </a>
              <Link
                href="/gioi-thieu"
                className="border border-outline-variant text-on-surface hover:text-primary px-8 py-3.5 rounded-full font-bold text-xs tracking-wider hover:bg-surface-variant transition-all flex items-center gap-2 shadow-sm bg-white/40 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">
                  info
                </span>
                TÌM HIỂU THÊM
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
