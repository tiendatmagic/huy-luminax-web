"use client";
 
import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
 
export default function CongNghe() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/20 selection:text-primary">
      <Header />
 
      <main className="flex-grow pt-32 md:pt-36 lg:pt-40">
        {/* Core AI Section */}
        <section className="py-10 px-6 max-w-7xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="floating-blob w-96 h-96 bg-primary/10 top-12 left-10 blur-3xl opacity-50"></div>
          </div>
 
          <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary glow-effect animate-ping"></span>
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  Mạng Nơ-ron Đang Huấn Luyện
                </span>
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl font-black text-deep-navy leading-tight">
                Luminax Core AI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-vibrant-blue to-secondary-container">
                  Học Máy Chuyên Sâu
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                Hệ thống lõi Luminax AI sử dụng các mô hình học máy chuyên biệt (Deep Learning Neural Networks) để phân tích hàng triệu điểm dữ liệu từ các cảm biến vật lý đặt tại dây chuyền sản xuất hóa chất và khăn giấy.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                Hệ thống có khả năng tự động tối ưu hóa tỷ lệ pha trộn nước, dung dịch Nano bạc và hóa chất thô dựa trên chất lượng đầu vào biến đổi theo thời gian thực. Đảm bảo độ tinh khiết tối ưu và giảm thiểu lượng hao phí nguyên năng lượng xuống mức tối đa.
              </p>
            </div>
 
            {/* Visual AI Network Card */}
            <div className="lg:col-span-7 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-container to-vibrant-blue rounded-[2.5rem] blur-3xl opacity-20"></div>
              <div className="glass-premium rounded-[2.5rem] p-4 relative overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
                  <Image
                    alt="Luminax AI Neural Network Analysis"
                    className="object-cover opacity-90"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOZVcjh6cialVqi4yWU1d0Scn8FkYHCfwXy0PMUEA9zmrbdCP5v3Bm5EvRzuUPNc64t0STsmE7hiSaNn4C2R-Ql-T2934-0C6pgGisxIe7qrxzNS8JVUOKD3kDZVZRHcz4_WYpiW3vRWUNNfs09A_X3SI_eJzj0fGdfCOCcPK99NpavqeGqLzDIhX17ZqxFmScwtKVLqN2dOiAMLbxHTT_DKk-mwF98dcqcujyn00Sm9wXJ8aVhqyZ14tPhBoCDdEsmpvISbfx3tU"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* Specs Grid */}
        <section className="bg-gradient-to-br from-surface to-surface-container-low py-10 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                Cấu Trúc Kỹ Thuật
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
              Thông Số Kỹ Thuật Hệ Thống (V1.2)
            </h2>
          </div>
 
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-premium rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  developer_board
                </span>
                <h3 className="font-bold text-lg text-deep-navy mb-2">Framework Học Máy</h3>
                <p className="text-sm text-on-surface-variant font-medium">
                  PyTorch Core v2.1 được tối ưu hóa khả năng tính toán song song đa luồng.
                </p>
              </div>
            </div>
 
            <div className="glass-premium rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  speed
                </span>
                <h3 className="font-bold text-lg text-deep-navy mb-2">Độ Trễ Phản Hồi (Inference)</h3>
                <p className="text-sm text-on-surface-variant font-medium">
                  Độ trễ xử lý các khung hình QA Computer Vision nhỏ hơn 12ms trên mỗi sản phẩm.
                </p>
              </div>
            </div>
 
            <div className="glass-premium rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  memory
                </span>
                <h3 className="font-bold text-lg text-deep-navy mb-2">Thiết Bị Edge AI</h3>
                <p className="text-sm text-on-surface-variant font-medium">
                  Tích hợp trực tiếp phần cứng Jetson Orin Nano tại mỗi cảm biến camera dây chuyền.
                </p>
              </div>
            </div>
 
            <div className="glass-premium rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  cloud_sync
                </span>
                <h3 className="font-bold text-lg text-deep-navy mb-2">Đồng Bộ Dữ Liệu Cloud</h3>
                <p className="text-sm text-on-surface-variant font-medium">
                  Đồng bộ log sự kiện thời gian thực lên AWS S3 và Route API an toàn.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
 
      <Footer />
    </div>
  );
}
