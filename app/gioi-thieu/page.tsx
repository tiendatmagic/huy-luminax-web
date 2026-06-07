"use client";
 
import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
 
export default function GioiThieu() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/20 selection:text-primary">
      <Header />
 
      <main className="flex-grow pt-32 md:pt-36 lg:pt-40">
        {/* Intro Hero Section */}
        <section className="relative py-10 px-6 max-w-7xl mx-auto overflow-hidden">
          {/* Ambient Floating Blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="floating-blob w-80 h-80 bg-primary/10 top-12 left-10 blur-3xl opacity-50"></div>
            <div className="floating-blob w-96 h-96 bg-secondary/10 bottom-10 right-10 blur-3xl opacity-50"></div>
          </div>
 
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  Hành Trình Vươn Tầm
                </span>
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl font-black text-deep-navy leading-tight">
                Câu Chuyện Về <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-vibrant-blue to-secondary-container">
                  Huy Luminax
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                CÔNG TY TNHH HUY LUMINAX ra đời với khát vọng kiến tạo một hệ sinh thái sản phẩm tiêu dùng sạch, an toàn kết hợp nghiên cứu hóa sinh xanh bền vững. Bằng việc tiên phong ứng dụng trí tuệ nhân tạo Luminax AI vào tự động hóa và phân tích dữ liệu, chúng tôi cam kết kiểm soát độ tinh khiết tối đa trên từng đơn vị sản phẩm.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                Hành trình của chúng tôi bắt đầu từ Nha Trang - Khánh Hòa, nơi hội tụ nguồn lực hóa sinh tiềm năng và định hướng phát triển công nghệ cao. Với đội ngũ chuyên gia tận tụy, chúng tôi đang không ngừng hoàn thiện chuỗi giá trị từ nghiên cứu R&amp;D đến tay người tiêu dùng B2B và B2C.
              </p>
            </div>
 
            {/* Visual Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-vibrant-blue/10 rounded-[2rem] blur-2xl opacity-40"></div>
              <div className="glass-premium rounded-[2rem] p-4 relative overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    alt="Huy Luminax Office and Laboratory working setup"
                    className="object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRiBlanPWi75t_h7nc83wNQIlbzV-0mJ_y5f5hi20L8LtPH_jN9olZlqIFzn_1k2pjOGFW5GErWuH-GFNFn5mFtvIsmHoMQxzCE-kVhJvHrqsFpT1XY_3uPV42fPPFNAreZrynUrQhSy_z1OysST6APtdFe43QdNEjUWywNoQlO6vXL-IDUBUorhfrc5RQhIl_6rnbUt6Koo5eb7gHxMFdJKsi3v9btNo6ahm0bbRyiZxGkp7_S66cr-iaXaNOS_-Quddjh8z0jZM"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* Core Values Section */}
        <section className="bg-gradient-to-br from-surface to-surface-container-low py-10 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                Định Hướng Phát Triển
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Những nguyên tắc nền tảng định hình văn hóa làm việc và cam kết của Huy Luminax đối với xã hội.
            </p>
          </div>
 
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="glass-premium glowing-card rounded-[2rem] p-8 hover:shadow-2xl transition-all duration-500 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl font-fill">
                  verified
                </span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">Chất Lượng Tuyệt Đối</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Độ tinh khiết và an toàn được kiểm tra nghiêm ngặt thông qua các thiết bị Edge AI và Computer Vision tự động theo thời gian thực.
              </p>
            </div>
            {/* Value 2 */}
            <div className="glass-premium glowing-card rounded-[2rem] p-8 hover:shadow-2xl transition-all duration-500 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">
                  eco
                </span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">Phát Triển Xanh</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Ưu tiên sử dụng nguyên liệu sinh học tự nhiên, quy trình xử lý không rác thải và thân thiện tuyệt đối với môi trường.
              </p>
            </div>
            {/* Value 3 */}
            <div className="glass-premium glowing-card rounded-[2rem] p-8 hover:shadow-2xl transition-all duration-500 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">
                  psychology
                </span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">Sáng Tạo Đột Phá</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Nghiên cứu sâu rộng và liên tục cải tiến quy trình hóa sinh bằng việc áp dụng các mô hình Machine Learning thế hệ mới.
              </p>
            </div>
          </div>
        </section>
      </main>
 
      <Footer />
    </div>
  );
}
