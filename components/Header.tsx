"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [siteName, setSiteName] = useState("Huy Luminax");
  const pathname = usePathname();

  const [cart, setCart] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  const loadCart = () => {
    try {
      const cartData = localStorage.getItem("cart");
      const cartItems = cartData ? JSON.parse(cartData) : [];
      setCart(cartItems);

      const count = cartItems.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0,
      );
      setCartItemsCount(count);

      const total = cartItems.reduce((acc: number, item: any) => {
        const price = parseFloat(item.price);
        return acc + (isNaN(price) ? 0 : price) * item.quantity;
      }, 0);
      setCartTotal(total);
    } catch (err) {
      console.error("Lỗi load giỏ hàng Header:", err);
    }
  };

  const updateCartItemQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    const updated = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeCartItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Load public settings để lấy tên website động và giỏ hàng
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/public/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.site_name) {
            setSiteName(data.site_name);
          }
        }
      } catch (err) {
        console.error("Lỗi tải header settings:", err);
      }
    };
    loadSettings();
    loadCart();

    window.addEventListener("settingsUpdated", loadSettings);
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("settingsUpdated", loadSettings);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // Kiểm tra trạng thái đăng nhập của Admin
  useEffect(() => {
    const cookies =
      typeof document !== "undefined"
        ? document.cookie.split(";").map((c) => c.trim())
        : [];
    const hasLoggedInCookie = cookies.some((c) =>
      c.startsWith("admin_logged_in="),
    );

    if (hasLoggedInCookie) {
      setIsAdminLoggedIn(true);
    } else {
      const checkSession = async () => {
        try {
          const response = await fetch("/api/auth/user");
          if (response.ok) {
            setIsAdminLoggedIn(true);
            if (typeof document !== "undefined") {
              document.cookie =
                "admin_logged_in=true; path=/; max-age=604800; SameSite=Lax";
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
        <Link
          href="/"
          className="font-headline text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-vibrant-blue to-secondary-container flex items-center gap-2 drop-shadow-sm cursor-pointer"
        >
          <Image
            src="/logo-new.png"
            alt="Huy Luminax Logo"
            width={38}
            height={38}
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
          {siteName}
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
              <span className="text-xs xl:text-sm whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Nút Giỏ hàng & Mini Cart Dropdown (Desktop) */}
          <div className="relative group/cart hidden xl:block">
            <Link
              href="/gio-hang"
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-primary/10 text-on-surface-variant hover:text-primary flex items-center justify-center border border-black/10 hover:border-primary/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative shadow-sm"
              title="Xem giỏ hàng của bạn"
            >
              <span className="material-symbols-outlined text-[20px]">
                shopping_cart
              </span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-scale-up">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mini Cart Panel (Hover) */}
            <div className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-xl border border-black/5 p-4 scale-0 origin-top-right group-hover/cart:scale-100 transition-all duration-300 ease-out z-50 space-y-4">
              <h4 className="text-xs font-black text-deep-navy uppercase tracking-wider border-b border-black/5 pb-2">
                Giỏ hàng của bạn ({cartItemsCount} SP)
              </h4>

              {cart.length === 0 ? (
                <div className="py-6 text-center text-xs font-semibold text-on-surface-variant">
                  Giỏ hàng của bạn đang trống.
                </div>
              ) : (
                <>
                  <div className="max-h-56 overflow-y-auto space-y-3.5 pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 justify-between"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-black/5 shrink-0 bg-slate-50">
                          {item.featured_image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.featured_image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <span className="material-symbols-outlined text-lg">
                                image
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow min-w-0 text-left">
                          <h5
                            className="text-sm font-bold text-deep-navy truncate"
                            title={item.name}
                          >
                            {item.name}
                          </h5>
                          <span className="text-xs text-primary font-black block">
                            {parseFloat(item.price).toLocaleString("vi-VN")} đ
                          </span>

                          {/* Bộ tăng giảm số lượng mini */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.id,
                                  item.quantity - 1,
                                )
                              }
                              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[10px] font-bold text-on-surface-variant cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-[10px] font-bold text-deep-navy w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.id,
                                  item.quantity + 1,
                                )
                              }
                              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[10px] font-bold text-on-surface-variant cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeCartItem(item.id)}
                          className="w-8 h-8 p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          title="Xóa sản phẩm"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            delete
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-black/5 pt-3 space-y-3">
                    <div className="flex items-center justify-between text-sm font-bold text-deep-navy">
                      <span>Tổng tạm tính:</span>
                      <span className="text-primary font-black text-sm">
                        {cartTotal.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                    <Link
                      href="/gio-hang"
                      className="block w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-center rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary/10"
                    >
                      XEM GIỎ HÀNG
                    </Link>
                    <Link
                      href="/thanh-toan"
                      className="block w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-center rounded-2xl text-xs font-bold transition-all shadow-md shadow-amber-500/15"
                    >
                      THANH TOÁN
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

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

          {/* Nút Giỏ hàng di động (Mobile) */}
          <Link
            href="/gio-hang"
            className="xl:hidden w-10 h-10 rounded-full bg-slate-50 hover:bg-primary/10 text-on-surface-variant flex items-center justify-center border border-black/10 relative shadow-sm cursor-pointer"
            title="Giỏ hàng"
          >
            <span className="material-symbols-outlined text-[20px]">
              shopping_cart
            </span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-sm">
                {cartItemsCount}
              </span>
            )}
          </Link>

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
                isActive(item.href)
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-primary"
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
              <span className="material-symbols-outlined">
                admin_panel_settings
              </span>
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
