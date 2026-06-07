"use client";
 
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
 
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const pathname = usePathname();
 
  // Kiểm tra trạng thái đăng nhập của Admin
  useEffect(() => {
    const cookies = typeof document !== "undefined" ? document.cookie.split(";").map(c => c.trim()) : [];
    const hasLoggedInCookie = cookies.some(c => c.startsWith("admin_logged_in="));
    
    if (hasLoggedInCookie) {
      setIsAdminLoggedIn(true);
    } else {
      const checkSession = async () => {
        try {
          const response = await fetch("/api/auth/user");
          if (response.ok) {
            setIsAdminLoggedIn(true);
            if (typeof document !== "undefined") {
              document.cookie = "admin_logged_in=true; path=/; max-age=604800; SameSite=Lax";
            }
          }
        } catch (err) {
          console.error("Lỗi kiểm tra session admin:", err);
        }
      };
      checkSession();
    }
  }, []);

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
 
  const menuItems = [
    { name: "Trang chủ", href: "/", icon: "home" },
    { name: "Giới thiệu", href: "/gioi-thieu", icon: "info" },
    { name: "Sản phẩm", href: "/san-pham", icon: "shopping_bag" },
    { name: "Lĩnh vực", href: "/#fields", icon: "design_services" },
    { name: "AI & Công nghệ", href: "/cong-nghe", icon: "memory" },
    { name: "Tin tức", href: "/tin-tuc", icon: "newspaper" },
  ];
 
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };
 
  return (
    <header
      className={`fixed inset-x-6 sm:inset-x-8 md:inset-x-12 lg:inset-x-8 xl:inset-x-16 mx-auto w-auto max-w-7xl z-50 flex flex-col justify-between items-center rounded-3xl border border-white/40 shadow-lg transition-all duration-500 ease-out ${
        isScrolled
          ? "top-3 py-2 bg-surface/85 backdrop-blur-xl shadow-xl border-primary/10"
          : "top-6 py-3 bg-white/60 backdrop-blur-xl"
      }`}
    >
      <div className="w-full flex justify-between items-center px-6 md:px-8">
        <Link href="/" className="font-headline text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-vibrant-blue to-secondary-container flex items-center gap-2 drop-shadow-sm cursor-pointer">
          <Image
            src="/logo-new.png"
            alt="Huy Luminax Logo"
            width={38}
            height={38}
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
          Huy Luminax
        </Link>
 
        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-3 xl:gap-6 font-semibold">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 pb-1 transition-all duration-200 ${
                isActive(item.href)
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] hidden xl:inline-block">
                {item.icon}
              </span>
              <span className="text-xs xl:text-sm whitespace-nowrap">{item.name}</span>
            </Link>
          ))}
        </nav>
 
        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden md:inline-block bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-wider shadow-md shadow-[#0072ff]/20 hover:shadow-lg hover:shadow-[#0072ff]/35 transition-all duration-300 hover:scale-105 shine-effect text-center"
          >
            LIÊN HỆ NGAY
          </Link>
          {isAdminLoggedIn && (
            <Link
              href="/admin/dashboard"
              className="hidden md:flex w-10 h-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center border border-primary/20 hover:border-transparent transition-all duration-300 hover:scale-105 shadow-sm hover:shadow active:scale-95 cursor-pointer relative group/admin-btn"
              title="Quản trị hệ thống"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">
                admin_panel_settings
              </span>
              <span className="absolute top-12 scale-0 group-hover/admin-btn:scale-100 transition-all duration-200 bg-deep-navy text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                Trang quản trị
              </span>
            </Link>
          )}
          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-full text-on-surface-variant hover:text-primary hover:bg-white/60 flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
 
      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="w-full mt-3 px-6 pb-6 flex flex-col gap-4 pt-2 bg-white rounded-b-3xl">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 py-2 font-semibold ${
                isActive(item.href) ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
          {isAdminLoggedIn && (
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span>Trang quản trị</span>
            </Link>
          )}
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white py-3 rounded-full font-bold text-sm tracking-wider shadow-md shadow-[#0072ff]/20 hover:shadow-lg transition-all duration-300 shine-effect text-center block"
          >
            LIÊN HỆ NGAY
          </Link>
        </div>
      )}
    </header>
  );
}
