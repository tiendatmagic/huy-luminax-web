"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [settings, setSettings] = useState<any>({
    company_name: "CÔNG TY TNHH HUY LUMINAX",
    site_slogan: "Tiên phong nghiên cứu hóa sinh xanh và ứng dụng trí tuệ nhân tạo Luminax AI nhằm kiến tạo các sản phẩm sạch, an toàn và tối ưu cho cộng đồng.",
    company_address: "Số 88 Tô Hiến Thành, Tân Lập, TP Nha Trang, Tỉnh Khánh Hòa",
    company_phone: "093.366.3112",
    company_email: "info@huyluminax.com",
    social_zalo: "0933663112",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/public/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings((prev: any) => ({
            ...prev,
            ...data
          }));
        }
      } catch (err) {
        console.error("Lỗi tải footer settings:", err);
      }
    };
    loadSettings();

    window.addEventListener("settingsUpdated", loadSettings);
    return () => {
      window.removeEventListener("settingsUpdated", loadSettings);
    };
  }, []);

  return (
    <>
      {/* Footer (Đẹp đẽ, nhất quán với trang mẫu nhưng không copy ảnh) */}
      <footer
        id="contact"
        className="bg-surface-container-low text-on-surface w-full py-6 px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center space-y-8 relative overflow-hidden"
      >
        {/* Ambient background blob */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="floating-blob w-96 h-96 bg-primary/5 bottom-[-100px] right-[-100px] blur-3xl opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 pb-12 mb-2 border-b border-black/10">
          {/* Cột 1: Logo & Company Description */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="font-headline text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-vibrant-blue to-secondary-container flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="/logo-new.png"
                alt="Huy Luminax Logo"
                width={44}
                height={44}
                className="object-contain"
              />
              HUY LUMINAX
            </Link>
            <p className="text-sm font-bold text-primary tracking-wide uppercase">
              {settings.company_name}
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
              {settings.site_slogan}
            </p>
            <div className="space-y-3.5 text-sm text-on-surface-variant font-medium">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                  location_on
                </span>
                <span>
                  {settings.company_address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">
                  call
                </span>
                <a
                  href={`tel:${settings.company_phone.replace(/\./g, "")}`}
                  className="hover:text-primary transition-colors"
                >
                  {settings.company_phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">
                  mail
                </span>
                <a
                  href={`mailto:${settings.company_email}`}
                  className="hover:text-primary transition-colors"
                >
                  {settings.company_email}
                </a>
              </div>
            </div>
          </div>

          {/* Cột 2: Quick Links */}
          <div className="lg:col-span-3 space-y-5 lg:pl-8">
            <h3 className="text-base font-bold text-deep-navy uppercase tracking-wider border-l-3 border-primary pl-3">
              Thông tin
            </h3>
            <ul className="space-y-3 text-sm font-semibold text-on-surface-variant">
              <li>
                <Link
                  href="/gioi-thieu"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Giới thiệu công ty
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Sản phẩm nổi bật
                </Link>
              </li>
              <li>
                <Link
                  href="/cong-nghe"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Giải pháp AI &amp; Công nghệ
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Tin tức &amp; Sự kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Products & Services */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-base font-bold text-deep-navy uppercase tracking-wider border-l-3 border-primary pl-3">
              Sản phẩm &amp; Dịch vụ
            </h3>
            <ul className="space-y-3 text-sm font-semibold text-on-surface-variant">
              <li>
                <Link
                  href="/san-pham"
                  className="hover:text-primary transition-colors"
                >
                  Khăn giấy kháng khuẩn cao cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham"
                  className="hover:text-primary transition-colors"
                >
                  Hóa chất cơ bản công nghiệp B2B
                </Link>
              </li>
              <li>
                <Link
                  href="/cong-nghe"
                  className="hover:text-primary transition-colors"
                >
                  Lập trình mô hình Luminax AI
                </Link>
              </li>
              <li>
                <Link
                  href="/cong-nghe"
                  className="hover:text-primary transition-colors"
                >
                  Giải pháp tự động hóa QA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto w-full pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-on-surface-variant">
          <p>© 2026 {settings.company_name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Widget liên hệ nhanh cố định góc dưới bên phải */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 items-end">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-red-500/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
          <a
            href={`tel:${settings.company_phone.replace(/\./g, "")}`}
            title="Gọi điện tư vấn"
            className="relative flex items-center justify-center w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg shadow-red-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer animate-ring"
          >
            <span className="material-symbols-outlined text-2xl font-bold font-fill">
              call
            </span>
          </a>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md">
            Gọi ngay: {settings.company_phone}
          </span>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-blue-500/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
          <a
            href={`https://zalo.me/${settings.social_zalo}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat Zalo"
            className="relative flex items-center justify-center w-14 h-14 bg-white border border-blue-100 hover:bg-blue-50 rounded-full shadow-lg shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden p-2.5"
          >
            <Image
              src="/zalo-icon.svg"
              alt="Zalo"
              width={32}
              height={32}
              className="object-contain"
            />
          </a>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md">
            Liên hệ Zalo
          </span>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-blue-500/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
          <Link
            href="/#contact"
            title="Gửi tin nhắn hỗ trợ"
            className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white rounded-full shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl font-bold font-fill">
              chat
            </span>
          </Link>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md">
            Gửi hỗ trợ trực tuyến
          </span>
        </div>
      </div>
    </>
  );
}
