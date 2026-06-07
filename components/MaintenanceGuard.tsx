"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Settings, Mail, Phone } from "lucide-react";

export default function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminBanner, setShowAdminBanner] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    company_name: "HUY LUMINAX",
    company_phone: "093.366.3112",
    company_email: "info@huyluminax.com"
  });

  useEffect(() => {
    // Không áp dụng chế độ bảo trì đối với các trang admin hoặc các route API
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/api")) {
      setIsLoading(false);
      return;
    }

    // Kiểm tra xem admin đã đăng nhập chưa bằng cookie
    const cookies = typeof document !== "undefined" ? document.cookie.split(";").map(c => c.trim()) : [];
    const hasAdminToken = cookies.some(c => c.startsWith("admin_token=") || c.startsWith("admin_logged_in="));

    // Lấy cài đặt hệ thống từ public settings API
    const checkMaintenance = async () => {
      try {
        const res = await fetch("/api/public/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.company_name) {
            setCompanyInfo({
              company_name: data.company_name,
              company_phone: data.company_phone || "093.366.3112",
              company_email: data.company_email || "info@huyluminax.com"
            });
          }
          if (data.maintenance_mode === "1") {
            if (hasAdminToken) {
              setShowAdminBanner(true);
            } else {
              setIsMaintenance(true);
            }
          } else {
            setShowAdminBanner(false);
            setIsMaintenance(false);
          }
        }
      } catch (err) {
        console.error("Lỗi kiểm tra chế độ bảo trì:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenance();
  }, [pathname]);

  useEffect(() => {
    if (showAdminBanner) {
      document.body.classList.add("admin-maintenance-banner-active");
    } else {
      document.body.classList.remove("admin-maintenance-banner-active");
    }
    return () => {
      document.body.classList.remove("admin-maintenance-banner-active");
    };
  }, [showAdminBanner]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#faf8ff] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <span className="text-sm font-bold text-deep-navy">Đang tải cấu hình hệ thống...</span>
      </div>
    );
  }

  if (isMaintenance) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#faf8ff] relative overflow-hidden py-12 px-6">
        {/* Background Ambient Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="floating-blob w-[500px] h-[500px] bg-primary/10 -top-40 -left-40 blur-3xl opacity-40"></div>
          <div className="floating-blob w-[500px] h-[500px] bg-secondary/10 -bottom-40 -right-40 blur-3xl opacity-40"></div>
        </div>

        <div className="w-full max-w-xl text-center space-y-8 relative z-10">
          {/* Brand Logo rotating slowly */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6 drop-shadow-xl animate-pulse-slow">
              <Image
                src="/logo-new.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="font-headline text-3xl font-black text-deep-navy tracking-tight uppercase">
              {companyInfo.company_name}
            </h2>
          </div>

          {/* Maintenance Card */}
          <div className="glass-premium rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50 space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto animate-spin-slow">
              <Settings className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-black text-deep-navy">
                Hệ Thống Đang Bảo Trì
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Chúng tôi đang tiến hành nâng cấp và tối ưu hóa hệ thống định kỳ nhằm đem lại trải nghiệm tốt nhất cho bạn. Website sẽ hoạt động trở lại trong thời gian sớm nhất.
              </p>
            </div>

            {/* Contact details */}
            <div className="border-t border-black/5 pt-6 space-y-3.5 text-xs md:text-sm font-semibold text-deep-navy">
              <p className="text-on-surface-variant/80 text-[11px] uppercase tracking-wider">Liên hệ khẩn cấp qua:</p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href={`tel:${companyInfo.company_phone.replace(/\./g, "")}`}
                  className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
                >
                  <Phone className="w-4.5 h-4.5 text-primary/70" />
                  <span>{companyInfo.company_phone}</span>
                </a>
                <a
                  href={`mailto:${companyInfo.company_email}`}
                  className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
                >
                  <Mail className="w-4.5 h-4.5 text-primary/70" />
                  <span>{companyInfo.company_email}</span>
                </a>
              </div>
            </div>
          </div>

          <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">
            Huy Luminax Technology Team
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      {showAdminBanner && (
        <div className="fixed top-0 left-0 right-0 h-10 bg-amber-500 text-white flex items-center justify-between px-4 sm:px-6 z-[99999] shadow-md text-[10px] sm:text-xs font-bold font-sans select-none">
          <div className="flex items-center gap-2 truncate">
            <Settings className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
            <span className="truncate">Hệ thống đang BẬT chế độ bảo trì. Bạn đang xem website với quyền Admin (Bypass Mode).</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link href="/admin/settings" className="underline hover:text-amber-100 transition-colors whitespace-nowrap">
              Cấu hình hệ thống
            </Link>
            <button 
              onClick={() => {
                setShowAdminBanner(false);
                document.body.classList.remove("admin-maintenance-banner-active");
              }}
              className="hover:bg-white/20 p-1 rounded-full transition-all cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[16px] block">close</span>
            </button>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
