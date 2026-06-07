"use client";
 
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
 
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
 
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
            src="/logo.svg"
            alt="Huy Luminax Logo"
            width={38}
            height={38}
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
          Huy Luminax
        </Link>
 
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6 font-semibold">
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
            className="hidden lg:inline-block bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-wider shadow-md shadow-[#0072ff]/20 hover:shadow-lg hover:shadow-[#0072ff]/35 transition-all duration-300 hover:scale-105 shine-effect text-center"
          >
            LIÊN HỆ NGAY
          </Link>
          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-white/60 rounded-[10px] transition-all duration-200"
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
