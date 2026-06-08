"use client";

import React from "react";
import Image from "next/image";

export default function SpecsBento() {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto relative reveal">
      <div className="mb-20 text-center lg:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
          <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
            Ứng Dụng &amp; Kỹ Thuật
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
          Ứng Dụng &amp; Kỹ Thuật
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed font-medium">
          Sức mạnh tính toán của AI được tích hợp trực tiếp vào dây chuyền
          sản xuất hiện tại, mang lại sự tinh khiết tuyệt đối và hiệu năng
          vượt trội.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Card 1: Mixing Precision */}
        <div className="md:col-span-7 glass-premium glowing-card rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-500 cursor-pointer">
          <div>
            <div className="flex items-center gap-3 mb-6 text-primary">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl font-fill">
                  science
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold text-deep-navy">
                Tỉ Lệ Pha Chế Hóa Chất
              </h3>
            </div>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
              Model AI phân tích chất lượng nước đầu vào theo thời gian thực
              và tự động điều chỉnh công thức pha trộn hóa chất. Đảm bảo
              dung dịch đạt chuẩn an toàn môi trường và tính hiệu quả tối đa
              trước khi đưa vào dây chuyền tẩy trắng mô xơ.
            </p>
          </div>
          <div className="pt-6 mt-6">
            <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-1">
              Độ chính xác đo lường
            </p>
            <p className="text-3xl font-black text-primary tracking-tight">
              99.998%
            </p>
          </div>
        </div>

        {/* Card 2: Defect Detection */}
        <div className="md:col-span-5 glass-premium glowing-card rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-3 mb-6 text-accent-pink">
              <div className="w-12 h-12 rounded-xl bg-accent-pink/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">
                  policy
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold text-deep-navy">
                Computer Vision QA
              </h3>
            </div>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium mb-6">
              Quét bề mặt khăn giấy với tốc độ 2000 khung hình/giây. Phát
              hiện mọi điểm đen, lỗ thủng hoặc xơ tơi dù là nhỏ nhất (cỡ
              micromet).
            </p>
          </div>
          <div className="w-full mt-2">
            <div className="w-full h-2.5 bg-primary/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent-pink to-accent-purple w-[98%] animate-[pulse_2s_infinite]"></div>
            </div>
            <div className="flex justify-between items-center mt-3 text-xs font-mono text-on-surface-variant font-bold">
              <span>Tỉ lệ quét tin cậy</span>
              <span className="text-accent-pink font-extrabold">98%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Data Image Graphic */}
        <div className="md:col-span-4 rounded-3xl overflow-hidden h-[320px] relative group border border-white/40 p-0.5 bg-gradient-to-br from-primary/30 to-accent-pink/30">
          <div className="relative w-full h-full rounded-[23px] overflow-hidden">
            <Image
              alt="Biểu đồ phân tích dữ liệu"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7w9s3OmnKqYuNAPOK-rSpLUq74lkiU3CY-KEp5ANYaCgo3m_oxZO8CQ6XFh3kliGLf-6O6dr7mDaEZi_3ACDSLF5p_jlA6Viou-q0sPKhOMyL5RqlymH-Gia6J-6p8WiOEC3X9CfQrxP0ZkxxXTib8PVdpmmDNHH0pSJaoaO8unjMfDQoga0uh96FtZNUNOepaBcmMolEWpWOPPfPYjUWM-vDDbbjXXbiJMbn2OD9l_99XmxFaqtbH8I51n29iiLvYwaVSFUdsWs"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-headline text-xl font-bold text-white mb-1">
                Dữ Liệu Khối
              </h3>
              <p className="text-xs font-mono font-bold text-accent-purple uppercase tracking-wider">
                Xử lý 2TB dữ liệu / ngày
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Architecture Tech Specs */}
        <div className="md:col-span-8 glass-premium rounded-3xl p-8 flex flex-col justify-center border border-white/45 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl font-fill">
                memory
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold text-deep-navy">
              Kiến Trúc Kỹ Thuật (V1.2)
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <div className="p-5 bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group/item">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <span className="material-symbols-outlined text-xl">
                  developer_board
                </span>
                <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                  Framework
                </span>
              </div>
              <div className="text-sm font-bold text-on-surface">
                PyTorch Core v2.1
              </div>
              <div className="text-[11px] text-on-surface-variant/80 mt-1 font-semibold">
                Tối ưu song song
              </div>
            </div>

            <div className="p-5 bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group/item">
              <div className="flex items-center gap-2 mb-3 text-accent-pink">
                <span className="material-symbols-outlined text-xl">
                  speed
                </span>
                <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                  Inference
                </span>
              </div>
              <div className="text-sm font-bold text-on-surface">
                &lt; 12ms
              </div>
              <div className="text-[11px] text-on-surface-variant/80 mt-1 font-semibold">
                Phản hồi siêu tốc
              </div>
            </div>

            <div className="p-5 bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group/item">
              <div className="flex items-center gap-2 mb-3 text-accent-purple">
                <span className="material-symbols-outlined text-xl">
                  memory
                </span>
                <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                  Edge Device
                </span>
              </div>
              <div className="text-sm font-bold text-on-surface">
                Jetson Orin Nano
              </div>
              <div className="text-[11px] text-on-surface-variant/80 mt-1 font-semibold">
                Xử lý biên AI
              </div>
            </div>

            <div className="p-5 bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group/item">
              <div className="flex items-center gap-2 mb-3 text-accent-green">
                <span className="material-symbols-outlined text-xl">
                  cloud_sync
                </span>
                <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                  Cloud Sync
                </span>
              </div>
              <div className="text-sm font-bold text-on-surface">
                AWS S3 / Route
              </div>
              <div className="text-[11px] text-on-surface-variant/80 mt-1 font-semibold">
                Đồng bộ real-time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
