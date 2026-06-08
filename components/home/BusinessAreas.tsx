"use client";

import React from "react";

const businessAreasData = [
  {
    id: "ai-tech",
    icon: "memory",
    badge: "Core Tech",
    badgeColor: "text-primary bg-primary/10 border-primary/20",
    title: "AI & Công Nghệ",
    description:
      "Phát triển các mô hình học máy chuyên sâu để dự đoán chất lượng vật liệu, tối ưu hóa công thức hóa học và tự động hóa quy trình sản xuất thông minh với độ chuẩn xác tuyệt đối.",
    gradient: "from-primary/20 via-transparent to-transparent",
    hoverShadow: "hover:shadow-primary/10",
  },
  {
    id: "chemicals",
    icon: "science",
    badge: "B2B Solutions",
    badgeColor: "text-accent-green bg-accent-green/10 border-accent-green/20",
    title: "Hóa Chất Cơ Bản",
    description:
      "Cung cấp nguồn nguyên liệu hóa chất tinh khiết cao cho công nghiệp sản xuất, với độ ổn định được kiểm chứng hoàn toàn bằng phân tích dữ liệu thời gian thực tiên tiến.",
    gradient: "from-accent-green/20 via-transparent to-transparent",
    hoverShadow: "hover:shadow-accent-green/10",
  },
  {
    id: "tissue",
    icon: "spa",
    badge: "Consumer",
    badgeColor: "text-accent-pink bg-accent-pink/10 border-accent-pink/20",
    title: "Sản Phẩm Tiêu Dùng",
    description:
      "Dòng sản phẩm khăn giấy cao cấp: siêu mềm mại, kháng khuẩn tự nhiên và cực kỳ an toàn cho làn da nhạy cảm, đã qua xử lý khử trùng quang phổ rộng.",
    gradient: "from-accent-pink/20 via-transparent to-transparent",
    hoverShadow: "hover:shadow-accent-pink/10",
  },
];

export default function BusinessAreas() {
  return (
    <section id="fields" className="py-10 px-6 max-w-7xl mx-auto relative reveal">
      <div className="text-center mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
          <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
            Hệ Sinh Thế Toàn Diện
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
          Lĩnh Vực Hoạt Động
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-medium">
          Sản phẩm đa dạng kết hợp công nghệ hiện đại, đáp ứng những nhu cầu
          khắt khe của doanh nghiệp và đời sống.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {businessAreasData.map((area) => (
          <div
            key={area.id}
            className="glass-premium glowing-card rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group cursor-pointer relative overflow-hidden"
          >
            {/* Background Subtle Gradient Glow */}
            <div
              className={`absolute -right-20 -top-20 w-44 h-44 bg-gradient-to-br ${area.gradient} rounded-full blur-3xl pointer-events-none opacity-40`}
            ></div>

            <div>
              {/* Icon with custom hover animation */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center mb-8 border border-primary/10 transition-all duration-500 ease-out group-hover:rotate-12 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl font-fill">
                  {area.icon}
                </span>
              </div>
              <div className="mb-4">
                <span
                  className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider ${area.badgeColor}`}
                >
                  {area.badge}
                </span>
              </div>
              <h3 className="text-xl sm:text-headline-md text-deep-navy font-bold mb-3">
                {area.title}
              </h3>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 font-medium">
                {area.description}
              </p>
            </div>

            <div className="pt-4 mt-2 relative z-10 flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
                Giải pháp
              </span>
              <span className="text-sm font-black text-primary group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1">
                Chi tiết{" "}
                <span className="material-symbols-outlined text-base">
                  east
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
