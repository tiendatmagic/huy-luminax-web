"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [settings, setSettings] = useState<any>({
    company_name: "CÔNG TY TNHH HUY LUMINAX",
    site_slogan:
      "Tiên phong nghiên cứu hóa sinh xanh và ứng dụng trí tuệ nhân tạo Luminax AI nhằm kiến tạo các sản phẩm sạch, an toàn và tối ưu cho cộng đồng.",
    company_address:
      "Số 88 Tô Hiến Thành, Tân Lập, TP Nha Trang, Tỉnh Khánh Hòa",
    company_phone: "093.366.3112",
    company_email: "info@huyluminax.com",
    company_tax_code: "",
    company_working_hours: "",
    social_zalo: "0933663112",
    social_facebook: "",
    social_youtube: "",
    social_linkedin: "",
    widget_call_show: "1",
    widget_call_value: "093.366.3112",
    widget_zalo_show: "1",
    widget_zalo_value: "0933663112",
    widget_facebook_show: "0",
    widget_facebook_value: "",
    widget_messenger_show: "0",
    widget_messenger_value: "",
    widget_instagram_show: "0",
    widget_instagram_value: "",
    widget_contact_show: "1",
    widget_contact_value: "/#contact",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/public/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings((prev: any) => ({
            ...prev,
            ...data,
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
            {/* Cụm liên kết mạng xã hội của doanh nghiệp */}
            {(settings.social_facebook || settings.social_youtube || settings.social_linkedin) && (
              <div className="flex items-center gap-3 pt-2">
                {settings.social_facebook && (
                  <a
                    href={settings.social_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    title="Theo dõi chúng tôi trên Facebook"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                )}
                {settings.social_youtube && (
                  <a
                    href={settings.social_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    title="Đăng ký kênh Youtube của chúng tôi"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163c-.272-1.016-1.07-1.812-2.084-2.086C19.578 3.545 12 3.545 12 3.545s-7.578 0-9.414.532c-1.014.274-1.81 1.07-2.084 2.086C0 8.002 0 12 0 12s0 3.998.502 5.837c.274 1.014 1.07 1.81 2.084 2.084C4.422 20.455 12 20.455 12 20.455s7.578 0 9.414-.532c1.014-.274 1.81-1.07 2.084-2.084C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                )}
                {settings.social_linkedin && (
                  <a
                    href={settings.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    title="Kết nối với chúng tôi trên LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
            <div className="space-y-3.5 text-sm text-on-surface-variant font-medium">
              {settings.company_tax_code && (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">
                    description
                  </span>
                  <span>Mã số thuế: {settings.company_tax_code}</span>
                </div>
              )}

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                  location_on
                </span>
                <span>{settings.company_address}</span>
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

              {settings.company_working_hours && (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">
                    schedule
                  </span>
                  <span>Giờ làm việc: {settings.company_working_hours}</span>
                </div>
              )}
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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 items-end select-none">
        {/* 1. Nút Gọi điện */}
        {settings.widget_call_show === "1" && settings.widget_call_value && (
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-red-500/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
            <a
              href={`tel:${settings.widget_call_value.replace(/\./g, "")}`}
              title="Gọi điện tư vấn"
              className="relative flex items-center justify-center w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg shadow-red-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer animate-ring"
            >
              <span className="material-symbols-outlined text-2xl font-bold font-fill">
                call
              </span>
            </a>
            <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md z-50">
              Gọi ngay: {settings.widget_call_value}
            </span>
          </div>
        )}

        {/* 2. Nút Zalo */}
        {settings.widget_zalo_show === "1" && settings.widget_zalo_value && (
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-blue-500/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
            <a
              href={`https://zalo.me/${settings.widget_zalo_value}`}
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
            <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md z-50">
              Liên hệ Zalo
            </span>
          </div>
        )}

        {/* 3. Nút Facebook */}
        {settings.widget_facebook_show === "1" && settings.widget_facebook_value && (
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-blue-600/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
            <a
              href={settings.widget_facebook_value}
              target="_blank"
              rel="noopener noreferrer"
              title="Ghé thăm Facebook"
              className="relative flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md z-50">
              Facebook Page
            </span>
          </div>
        )}

        {/* 4. Nút Messenger */}
        {settings.widget_messenger_show === "1" && settings.widget_messenger_value && (
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-violet-500/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
            <a
              href={settings.widget_messenger_value}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat Messenger"
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white rounded-full shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl font-bold font-fill">
                forum
              </span>
            </a>
            <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md z-50">
              Messenger Chat
            </span>
          </div>
        )}

        {/* 5. Nút Instagram */}
        {settings.widget_instagram_show === "1" && settings.widget_instagram_value && (
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-pink-500/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
            <a
              href={settings.widget_instagram_value}
              target="_blank"
              rel="noopener noreferrer"
              title="Ghé thăm Instagram"
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 hover:opacity-90 text-white rounded-full shadow-lg shadow-pink-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md z-50">
              Instagram
            </span>
          </div>
        )}

        {/* 6. Nút Hỗ trợ */}
        {settings.widget_contact_show === "1" && settings.widget_contact_value && (
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-blue-500/35 blur-sm opacity-70 group-hover:opacity-100 animate-pulse-slow"></div>
            <Link
              href={settings.widget_contact_value}
              title="Gửi tin nhắn hỗ trợ"
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white rounded-full shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl font-bold font-fill">
                chat
              </span>
            </Link>
            <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-[5px] transition-all duration-200 whitespace-nowrap shadow-md z-50">
              Gửi hỗ trợ trực tuyến
            </span>
          </div>
        )}
      </div>
    </>
  );
}
