"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dữ liệu mẫu lĩnh vực hoạt động
const businessAreas = [
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
      "Bước nhảy vọt trong tối ưu quy trình phân tách phân tử giúp nâng cao năng lực sản xuất hóa chất.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYcnAKbpA9-sxYQOqzmIHHfahOv0RxBOjja0sDw0njkspnlFZ8RywCCtP0RAdTrKqEGLTxWj6icIZPZkPztBUwSbtSxRRdwbX8KH_MM8koIEMbqHCcOjry4GbBZKEFYAtXv4qGIralusalY-UNCkyJ_L-M0Otr8v1Xi1cApCz4_23F3bQoMLtNObzanwL6jwYXI5azLwKJKux9BrlUVOa2Jlj4ffRfK7jUVgAsofNOmsB_W4-do1pPpJlEHDDZxVc_zverLoSM4kA",
    badge: "Sự kiện",
    badgeStyle: "text-secondary bg-secondary/10",
    date: "15/05/2026",
    title: "Hợp tác chiến lược phát triển hóa chất xanh bền vững",
    description:
      "Ký kết thỏa thuận hợp tác nghiên cứu vật liệu phân hủy sinh học ứng dụng trong công nghiệp tiêu dùng.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4LULR9Dd7aHRfCy7ZSlRRdJ_XPo2pXc6mmdZa32yEa8k70PuzSoTd147zXtfxy2mFitzHbTFkcA7ttwLtuMvCGVKtpnm8x7HU93lga8IMyVh7VriDmZcG-KlFuC7K23t2mrcPlbsSo7AoiQZIRlrOceo8pk1MnPyT9g_go5KnlMDYM4wuk2pd56Je61CM5dOebSy1z8FZEIUrEj5i1QMIoKCj8jJo0SiLgWGxCTc9YPjVDK--znnkEGmxS6ZJE8imfqx5gl5hLyc",
    badge: "Sản phẩm",
    badgeStyle: "text-accent-pink bg-accent-pink/10",
    date: "10/05/2026",
    title: "Ra mắt dòng sản phẩm khăn giấy kháng khuẩn cao cấp mới",
    description:
      "Sản phẩm khăn giấy sợi tre tự nhiên tích hợp công nghệ Nano bạc kháng khuẩn đạt chuẩn kiểm nghiệm quốc tế.",
  },
];

// Dữ liệu sản phẩm mẫu (demo giao diện)
const productsList = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRiBlanPWi75t_h7nc83wNQIlbzV-0mJ_y5f5hi20L8LtPH_jN9olZlqIFzn_1k2pjOGFW5GErWuH-GFNFn5mFtvIsmHoMQxzCE-kVhJvHrqsFpT1XY_3uPV42fPPFNAreZrynUrQhSy_z1OysST6APtdFe43QdNEjUWywNoQlO6vXL-IDUBUorhfrc5RQhIl_6rnbUt6Koo5eb7gHxMFdJKsi3v9btNo6ahm0bbRyiZxGkp7_S66cr-iaXaNOS_-Quddjh8z0jZM",
    badge: "Khăn giấy",
    badgeStyle: "text-accent-pink bg-accent-pink/10",
    title: "Khăn Giấy Tre Cao Cấp Luminax",
    description:
      "Kháng khuẩn tự nhiên bằng công nghệ Nano Bạc, siêu mềm mại, tự phân hủy thân thiện môi trường.",
    price: "45.000 đ",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCnslKeUvNUDg3a95-mFuMoImpxBm3K-oZaBsEAKq6NR94Au5rglRZTNuCNHk4xL0qmTiqAI8oo2Oup1vFydS4axSmkulR-zNR8VadalPuoENGIUA1pNpi8bL8z3egpIg30B7XKmecRKr6GHk9zq0Finw5LX73XC-f1hjr0_8guS47X96rqHjYZP1bPvVUKvhl_CRIz1eF3gNFB2xAphqw2FLsOT08hWQsLOtnlgOIlzvDJEmytU8TpwMObriI8ZeBMSz6aG8fi_4",
    badge: "Hóa chất B2B",
    badgeStyle: "text-primary bg-primary/10",
    title: "Dung Dịch Phân Tách Phân Tử Luminax AI",
    description:
      "Độ tinh khiết đạt 99.998% đã qua phân tích dữ liệu thời gian thực cho sản xuất công nghiệp B2B.",
    price: "Liên hệ",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4LULR9Dd7aHRfCy7ZSlRRdJ_XPo2pXc6mmdZa32yEa8k70PuzSoTd147zXtfxy2mFitzHbTFkcA7ttwLtuMvCGVKtpnm8x7HU93lga8IMyVh7VriDmZcG-KlFuC7K23t2mrcPlbsSo7AoiQZIRlrOceo8pk1MnPyT9g_go5KnlMDYM4wuk2pd56Je61CM5dOebSy1z8FZEIUrEj5i1QMIoKCj8jJo0SiLgWGxCTc9YPjVDK--znnkEGmxS6ZJE8imfqx5gl5hLyc",
    badge: "Hóa mỹ phẩm",
    badgeStyle: "text-accent-purple bg-accent-purple/10",
    title: "Nước Rửa Tay Kháng Khuẩn Quang Phổ",
    description:
      "Công thức sinh học tự nhiên, diệt sạch 99.9% vi khuẩn, giữ ẩm da tay nhờ chiết xuất nha đam.",
    price: "32.000 đ",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYcnAKbpA9-sxYQOqzmIHHfahOv0RxBOjja0sDw0njkspnlFZ8RywCCtP0RAdTrKqEGLTxWj6icIZPZkPztBUwSbtSxRRdwbX8KH_MM8koIEMbqHCcOjry4GbBZKEFYAtXv4qGIralusalY-UNCkyJ_L-M0Otr8v1Xi1cApCz4_23F3bQoMLtNObzanwL6jwYXI5azLwKJKux9BrlUVOa2Jlj4ffRfK7jUVgAsofNOmsB_W4-do1pPpJlEHDDZxVc_zverLoSM4kA",
    badge: "Tiêu dùng",
    badgeStyle: "text-accent-green bg-accent-green/10",
    title: "Khăn Giấy Ướt Kháng Khuẩn Nano",
    description:
      "Làm từ sợi tự nhiên, không cồn, không paraben, an toàn tối đa cho da bé nhạy cảm.",
    price: "28.000 đ",
  },
];

// Dữ liệu câu hỏi thường gặp
const faqsList = [
  {
    question: "Luminax AI giúp ích gì trong sản xuất?",
    answer:
      "Hệ thống AI phân tích hàng triệu điểm dữ liệu theo thời gian thực để tối ưu hóa công thức hóa học, giảm thiểu sai sót con người và đảm bảo độ tinh khiết đạt mức 99.998% trong suốt quá trình vận hành dây chuyền.",
  },
  {
    question: "Sản phẩm tiêu dùng có thực sự an toàn không?",
    answer:
      "Hoàn toàn an toàn. Mọi sản phẩm khăn giấy và hóa chất gia dụng của Huy Luminax đều trải qua quy trình diệt khuẩn quang phổ rộng và được kiểm chứng tự động bởi hệ thống Computer Vision QA trước khi đóng gói.",
  },
  {
    question: "Làm thế nào để trở thành đối tác của Huy Luminax?",
    answer:
      "Quý khách có thể liên hệ trực tiếp qua mục 'Liên hệ công tác' ở chân trang hoặc điền thông tin gửi về bộ phận kinh doanh qua email liên hệ để nhận báo giá chi tiết và các giải pháp B2B tùy chỉnh phù hợp.",
  },
  {
    question: "Công nghệ AI có làm tăng giá thành sản phẩm?",
    answer:
      "Không, ngược lại việc tối ưu hóa bằng AI giúp giảm thiểu tối đa lãng phí nguyên liệu và năng lượng tiêu thụ, cho phép chúng tôi tối ưu chi phí và cung cấp sản phẩm chất lượng cao với mức giá cạnh tranh nhất.",
  },
];

export default function Home() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const newsSliderRef = useRef<HTMLDivElement>(null);
  const productsSliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    if (ref.current) {
      const scrollAmount = 380;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.08,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
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
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  Tiên Phong Kỷ Nguyên Mới
                </span>
              </div>
              <h1 className="font-headline text-3xl sm:text-5xl lg:text-[56px] lg:leading-[1.15] font-extrabold text-deep-navy tracking-tight">
                Hội Tự Trí Tuệ Nhân Tạo &amp; <br />
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

        {/* Intro / About General Section */}
        <section
          id="intro"
          className="py-10 px-6 max-w-7xl mx-auto relative reveal"
        >
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
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                    Hành Trình &amp; Phát Triển
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy leading-tight">
                  Về Huy Luminax
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
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
                    <p className="text-xs text-on-surface-variant font-medium mt-1">
                      Dòng sản phẩm
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-primary">
                      99.9%
                    </p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">
                      Khử khuẩn quang phổ
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-primary">100%</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">
                      Hài lòng tuyệt đối
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="#contact"
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
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  Độ Tinh Khiết Chuẩn Xác
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-5xl font-black text-deep-navy leading-tight">
                Sự Tinh Khiết Được <br />
                Định Hình Bởi Dữ Liệu
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                Trong một thế giới vận hành nhanh chóng, chúng tôi tin rằng sự
                an toàn không nên là một lựa chọn ngẫu nhiên. Bằng cách tích hợp
                Trí tuệ Nhân tạo vào cốt lõi quá trình nghiên cứu và sản xuất,
                Huy Luminax đảm bảo mọi giọt hóa chất cơ bản và mỗi tờ khăn giấy
                đều đạt tiêu chuẩn chất lượng nghiêm ngặt nhất.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
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

        {/* Business Areas Section (Bento Grid) */}
        <section
          id="fields"
          className="py-10 px-6 max-w-7xl mx-auto relative reveal"
        >
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                Hệ Sinh Thái Toàn Diện
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
              Lĩnh Vực Hoạt Động
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Sản phẩm đa dạng kết hợp công nghệ hiện đại, đáp ứng những nhu cầu
              khắt khe của doanh nghiệp và đời sống.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {businessAreas.map((area) => (
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
                <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
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

        {/* Bento Grid: Specs & Real-world Applications */}
        <section className="py-10 px-6 max-w-7xl mx-auto relative reveal">
          <div className="mb-20 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                Ứng Dụng &amp; Kỹ Thuật
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
              Ứng Dụng &amp; Kỹ Thuật
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
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
                  <div className="text-[11px] text-on-surface-variant/80 mt-1 font-medium">
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
                  <div className="text-[11px] text-on-surface-variant/80 mt-1 font-medium">
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
                  <div className="text-[11px] text-on-surface-variant/80 mt-1 font-medium">
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
                  <div className="text-[11px] text-on-surface-variant/80 mt-1 font-medium">
                    Đồng bộ real-time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section
          id="products"
          className="py-10 px-6 max-w-7xl mx-auto relative reveal"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div className="space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  Tinh Hoa Hóa Mỹ Phẩm
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
                Sản phẩm nổi bật
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Khám phá hệ sinh thái sản phẩm sạch và giải pháp công nghệ cao
                được phát triển &amp; kiểm chứng bởi Luminax AI.
              </p>
            </div>

            {/* Slider control buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(productsSliderRef, "left")}
                className="w-12 h-12 rounded-full border border-outline-variant/35 bg-white/60 hover:bg-white text-on-surface hover:text-primary flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all duration-200 cursor-pointer"
                title="Trước"
              >
                <span className="material-symbols-outlined font-bold">
                  west
                </span>
              </button>
              <button
                onClick={() => scrollSlider(productsSliderRef, "right")}
                className="w-12 h-12 rounded-full border border-outline-variant/35 bg-white/60 hover:bg-white text-on-surface hover:text-primary flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all duration-200 cursor-pointer"
                title="Sau"
              >
                <span className="material-symbols-outlined font-bold">
                  east
                </span>
              </button>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Horizontal Slider container */}
            <div
              ref={productsSliderRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth"
            >
              {productsList.map((product, idx) => (
                <article
                  key={idx}
                  className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] snap-start glass-premium glowing-card border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group cursor-pointer hover:-translate-y-2"
                >
                  <div className="relative h-56 bg-surface-container overflow-hidden">
                    <Image
                      alt={product.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      src={product.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-[5px] uppercase ${product.badgeStyle}`}
                        >
                          {product.badge}
                        </span>
                        <span className="text-sm font-black text-primary">
                          {product.price}
                        </span>
                      </div>
                      <h3 className="font-headline text-base sm:text-lg font-bold text-deep-navy group-hover:text-primary transition-colors leading-snug mb-3">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
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
          </div>
        </section>

        {/* News & Events Section */}
        <section
          id="news"
          className="py-10 px-6 max-w-7xl mx-auto relative reveal"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div className="space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  Thông Tin Mới Nhất
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
                Tin tức &amp; Sự kiện
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Cập nhật những thông tin công nghệ, sản phẩm mới và chiến lược
                phát triển bền vững từ Huy Luminax.
              </p>
            </div>

            {/* Slider control buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(newsSliderRef, "left")}
                className="w-12 h-12 rounded-full border border-outline-variant/35 bg-white/60 hover:bg-white text-on-surface hover:text-primary flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all duration-200 cursor-pointer"
                title="Trước"
              >
                <span className="material-symbols-outlined font-bold">
                  west
                </span>
              </button>
              <button
                onClick={() => scrollSlider(newsSliderRef, "right")}
                className="w-12 h-12 rounded-full border border-outline-variant/35 bg-white/60 hover:bg-white text-on-surface hover:text-primary flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all duration-200 cursor-pointer"
                title="Sau"
              >
                <span className="material-symbols-outlined font-bold">
                  east
                </span>
              </button>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Horizontal Slider container */}
            <div
              ref={newsSliderRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth"
            >
              {newsAndEvents.map((news, idx) => (
                <article
                  key={idx}
                  className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] snap-start glass-premium glowing-card border border-white/45 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group cursor-pointer hover:-translate-y-2"
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
                      <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
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
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-10 px-6 max-w-7xl mx-auto relative reveal">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                Giải Đáp Thắc Mắc
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
              Câu hỏi thường gặp
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Giải đáp các thắc mắc phổ biến về công nghệ AI và tiêu chuẩn an
              toàn của Huy Luminax.
            </p>
          </div>

          {/* Chia FAQ làm 2 cột bằng grid md:grid-cols-2 */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {faqsList.map((faq, idx) => {
              const isOpen = activeFAQ === idx;
              return (
                <div
                  key={idx}
                  className="glass-premium rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-white/80 transition-colors duration-200"
                  >
                    <h3 className="font-headline text-base sm:text-lg font-bold text-deep-navy pr-4">
                      {faq.question}
                    </h3>
                    <span
                      className={`material-symbols-outlined text-primary text-2xl transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-[200px] opacity-100 border-t border-white/20"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="p-6 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
