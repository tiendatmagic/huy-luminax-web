"use client";

import React from "react";
import Image from "next/image";

export default function AiTechnology() {
  return (
    <>
      {/* AI Bio Detail Section */}
      <section className="py-10 bg-gradient-to-br from-surface to-surface-container-low px-6 reveal relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="floating-blob w-80 h-80 bg-primary/5 top-1/2 left-[80%]"
            style={{ animationDuration: "22s", animationDelay: "-5s" }}
          ></div>
          <div
            className="floating-blob w-96 h-96 bg-vibrant-blue/5 bottom-[-50px] left-[-100px]"
            style={{ animationDuration: "18s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 md:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-primary glow-effect animate-ping"></span>
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                Độ Tinh Khiết Chuẩn Xác
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl font-black text-deep-navy leading-tight">
              Sự Tinh Khiết Được <br />
              Định Hình Bởi Dữ Liệu
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
              Trong một thế giới vận hành nhanh chóng, chúng tôi tin rằng sự
              an toàn không nên là một lựa chọn ngẫu nhiên. Bằng cách tích hợp
              Trí tuệ Nhân tạo vào cốt lõi quá trình nghiên cứu và sản xuất,
              Huy Luminax đảm bảo mọi giọt hóa chất cơ bản và mỗi tờ khăn giấy
              đều đạt tiêu chuẩn chất lượng nghiêm ngặt nhất.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
              Chúng tôi không chỉ sản xuất; chúng tôi dự đoán, phân tích và
              hoàn thiện. Từ việc kiểm soát vi sinh vật trong môi trường phòng
              thí nghiệm đến tối ưu hóa chuỗi cung ứng, AI là người gác cổng
              đáng tin cậy của chúng tôi.
            </p>
          </div>

          {/* Premium Glass Container Image on Left */}
          <div className="relative md:order-1 reveal active">
            <div className="absolute -inset-4 bg-gradient-to-r from-secondary-container/10 to-primary-container/20 rounded-[2rem] blur-2xl opacity-40"></div>
            <div className="glass-premium rounded-[2rem] p-4 relative overflow-hidden shadow-2xl group border border-white/45">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  alt="AI Laboratory apparatus with charts and technical data representation"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8R4iSqG1jd22hPiplOl2PGuYw_pUZ69l7EfmyFbnA7U-Ps86M6DkNYKLJ4-oX1x3vV9DY5Qlgu86PjhutpSJw9kuwLcZHENl63-nqV12B4Mufcd_hcsQgHlcHTq6FeFoIirSbVD8teoeyiINy_ikHDKPBgNVIvEG2Oh9Ja9rAr4LTdlUC7bMlShFX-dhXUr1Kr9dNAwynWvPwN_4hy2TuNrY9Y77nAzcxkjCBQKQ6Erx90z9L9LSosnD4HVfClNDc1CkPSG-zOFg"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Neural Network Section */}
      <section
        id="technology"
        className="py-10 bg-gradient-to-br from-surface via-surface-container-low to-surface px-6 reveal relative overflow-hidden"
      >
        {/* Ambient Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="floating-blob w-[500px] h-[500px] bg-primary/10 top-[-100px] left-[10%]"
            style={{ animationDuration: "25s" }}
          ></div>
          <div
            className="floating-blob w-80 h-80 bg-vibrant-blue/15 bottom-12 right-10"
            style={{ animationDuration: "18s", animationDelay: "-4s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary glow-effect animate-ping"></span>
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  Mạng Nơ-ron Đang Huấn Luyện
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-5xl font-black text-deep-navy leading-tight">
                Hệ thống lõi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-vibrant-blue to-secondary-container">
                  Luminax AI
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
                Chúng tôi đang phát triển một mô hình AI chuyên biệt, học hỏi
                từ hàng triệu điểm dữ liệu trong quy trình sản xuất hóa chất
                và khăn giấy. Mục tiêu: đạt độ tinh khiết tối đa và tự động
                hóa chuỗi cung ứng với độ chính xác đến từng micro-giây.
              </p>
              <div className="flex gap-8 pt-4">
                <div className="flex flex-col border-l-3 border-primary pl-4">
                  <span className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Epochs Hoàn Thành
                  </span>
                  <span className="font-headline text-3xl font-black text-primary">
                    1,402,890
                  </span>
                </div>
                <div className="flex flex-col border-l-3 border-secondary pl-4">
                  <span className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Độ Lệch Chuẩn
                  </span>
                  <span className="font-headline text-3xl font-black text-secondary">
                    ±0.001%
                  </span>
                </div>
              </div>
            </div>

            {/* Graphic neural network card */}
            <div className="lg:col-span-7 relative reveal active">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-container to-vibrant-blue rounded-[2.5rem] blur-3xl opacity-20 animate-pulse"></div>
              <div className="glass-premium rounded-[2.5rem] p-4 relative overflow-hidden shadow-2xl shadow-deep-navy/5 transform hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-center gap-1.5 pb-3 px-2 border-b border-white/20 mb-3 opacity-60">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
                  <Image
                    alt="Luminax AI Neural Network Visualization"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOZVcjh6cialVqi4yWU1d0Scn8FkYHCfwXy0PMUEA9zmrbdCP5v3Bm5EvRzuUPNc64t0STsmE7hiSaNn4C2R-Ql-T2934-0C6pgGisxIe7qrxzNS8JVUOKD3kDZVZRHcz4_WYpiW3vRWUNNfs09A_X3SI_eJzj0fGdfCOCcPK99NpavqeGqLzDIhX17ZqxFmScwtKVLqN2dOiAMLbxHTT_DKk-mwF98dcqcujyn00Sm9wXJ8aVhqyZ14tPhBoCDdEsmpvISbfx3tU"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute top-6 left-6 z-10">
                    <span className="font-mono text-xs font-bold text-primary bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-primary/20 shadow-md">
                      Live Data Stream
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
