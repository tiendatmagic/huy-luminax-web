"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Cpu,
  Info,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Loader2,
  FolderOpen,
  Sun,
  Moon,
  ShoppingCart,
} from "lucide-react";

interface UserProfile {
  id: number;
  name: string;
  fullname?: string;
  email: string;
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [siteName, setSiteName] = useState("HUY LUMINAX");
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/user");
      if (!res.ok) {
        throw new Error("Không thể xác thực.");
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/public/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.site_name) {
          setSiteName(data.site_name.toUpperCase());
        }
      }
    } catch (err) {
      console.error("Lỗi lấy settings layout admin:", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSettings();

    // Khôi phục theme từ localStorage
    const savedTheme = localStorage.getItem("admin-theme") || "light";
    setTheme(savedTheme);

    // Đăng ký sự kiện lắng nghe cập nhật hồ sơ để đồng bộ tức thì
    const handleProfileUpdate = () => {
      fetchUser();
    };
    const handleSettingsUpdate = () => {
      fetchSettings();
    };
    window.addEventListener("profileUpdated", handleProfileUpdate);
    window.addEventListener("settingsUpdated", handleSettingsUpdate);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
      window.removeEventListener("settingsUpdated", handleSettingsUpdate);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("admin-theme", nextTheme);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#faf8ff] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <span className="text-sm font-bold text-deep-navy">
          Đang tải cấu hình quản trị...
        </span>
      </div>
    );
  }

  const navItems: {
    id: string;
    name: string;
    icon: any;
    href: string;
    disabled?: boolean;
  }[] = [
    {
      id: "dashboard",
      name: "Tổng quan",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      id: "blog",
      name: "Bài viết",
      icon: FileText,
      href: "/admin/blog",
    },
    {
      id: "products",
      name: "Sản phẩm",
      icon: ShoppingBag,
      href: "/admin/product",
    },
    {
      id: "orders",
      name: "Đơn hàng",
      icon: ShoppingCart,
      href: "/admin/order",
    },
    {
      id: "user",
      name: "Thành viên",
      icon: User,
      href: "/admin/user",
    },
    {
      id: "settings",
      name: "Cài đặt hệ thống",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  // Kiểm tra mục nào đang active
  const isTabActive = (item: (typeof navItems)[0]) => {
    return pathname === item.href;
  };

  return (
    <div
      className={`min-h-screen bg-[#faf8ff] flex text-on-surface relative transition-colors duration-300 ${theme === "dark" ? "dark-mode-admin" : ""}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="floating-blob w-[500px] h-[500px] bg-primary/5 -top-40 -left-40 blur-3xl opacity-30"></div>
        <div className="floating-blob w-[500px] h-[500px] bg-secondary/5 -bottom-40 -right-40 blur-3xl opacity-30"></div>
      </div>

      {/* SIDEBAR - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white/70 backdrop-blur-md border-r border-black/5 relative z-20 shrink-0">
        <div className="p-6 pb-2 border-b border-black/5 flex items-center gap-3">
          <Link href="/" className="relative w-10 h-10 block cursor-pointer">
            <Image
              src="/logo-new.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>
          <div>
            <h1 className="font-headline text-lg font-black text-deep-navy">
              {siteName}
            </h1>
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) =>
            item.disabled ? (
              <div
                key={item.id}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold opacity-50 cursor-not-allowed text-on-surface-variant/50"
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </div>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 text-left cursor-pointer ${
                  isTabActive(item)
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-on-surface-variant hover:bg-primary/5 hover:text-deep-navy"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            ),
          )}
        </nav>

        {/* User Card bottom sidebar */}
        <div className="p-4 border-t border-black/5 bg-white/40">
          <Link
            href="/admin/profile"
            className={`w-full flex items-center gap-3 p-2 rounded-2xl bg-white/80 border shadow-sm text-left transition-colors cursor-pointer hover:bg-white ${
              pathname === "/admin/profile"
                ? "border-primary"
                : "border-black/5"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold uppercase text-sm shadow-inner shrink-0">
              {(user?.fullname || user?.name || "").substring(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-deep-navy truncate">
                {user?.fullname || user?.name}
              </p>
              <p className="text-[11px] font-semibold text-on-surface-variant/80 truncate">
                {user?.email}
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* MOBILE SIDEBAR DRAWSER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <aside className="relative flex flex-col w-72 bg-white h-full shadow-2xl z-10 animate-fade-in-right">
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image
                    src="/logo-new.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="font-headline text-base font-black text-deep-navy">
                    {siteName}
                  </h1>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg hover:bg-black/5 text-deep-navy cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              {navItems.map((item) =>
                item.disabled ? (
                  <div
                    key={item.id}
                    className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold opacity-40 cursor-not-allowed text-on-surface-variant/40"
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                ) : (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 text-left cursor-pointer ${
                      isTabActive(item)
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-on-surface-variant hover:bg-primary/5 hover:text-deep-navy"
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                ),
              )}
            </nav>

            <div className="p-4 border-t border-black/5 bg-white/40">
              <Link
                href="/admin/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full flex items-center gap-3 p-2 rounded-2xl bg-white/80 border shadow-sm text-left transition-colors cursor-pointer hover:bg-white ${
                  pathname === "/admin/profile"
                    ? "border-primary"
                    : "border-black/5"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold uppercase text-sm shrink-0">
                  {(user?.fullname || user?.name || "").substring(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-deep-navy truncate">
                    {user?.fullname || user?.name}
                  </p>
                  <p className="text-[11px] font-semibold text-on-surface-variant/80 truncate">
                    {user?.email}
                  </p>
                </div>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header with dropdown */}
        <header className="h-20 border-b border-black/5 bg-white/40 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-black/10 hover:bg-black/5 text-deep-navy cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-deep-navy">
                {pathname === "/admin/dashboard" &&
                  !window.location.search.includes("tab=members") &&
                  "Tổng quan hệ thống"}
                {pathname === "/admin/dashboard" &&
                  window.location.search.includes("tab=members") &&
                  "Quản lý thành viên"}
                {pathname === "/admin/profile" && "Thông tin cá nhân"}
                {pathname === "/admin/settings" && "Cài đặt hệ thống"}
                {pathname.startsWith("/admin/product") &&
                  "Quản lý sản phẩm & dịch vụ"}
                {pathname.startsWith("/admin/order") &&
                  "Quản lý đơn hàng"}
              </h2>
              <p className="text-xs font-semibold text-on-surface-variant/70 hidden sm:block">
                Hệ thống quản trị và xác thực
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Theme Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-on-surface-variant transition-all hover:scale-105 active:scale-95 cursor-pointer relative group/theme-btn"
              title={
                theme === "light"
                  ? "Chuyển sang giao diện tối"
                  : "Chuyển sang giao diện sáng"
              }
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>

            {/* Header Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 hover:bg-black/5 p-1.5 rounded-2xl transition-colors cursor-pointer"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-deep-navy">
                    Xin chào, {user?.fullname || user?.name}
                  </p>
                  <span className="text-[10px] font-bold bg-green-500/10 text-green-700 px-2 py-0.5 rounded-full border border-green-200 uppercase">
                    Chủ sở hữu
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold uppercase text-sm border-2 border-white shadow-md">
                  {(user?.fullname || user?.name || "").substring(0, 2)}
                </div>
              </button>

              {isDropdownOpen && (
                <>
                  {/* Backdrop overlay to close */}
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>

                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-black/5 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-black/5 sm:hidden">
                      <p className="text-xs font-bold text-deep-navy truncate">
                        {user?.fullname || user?.name}
                      </p>
                      <p className="text-[10px] text-on-surface-variant truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/admin/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-on-surface-variant" />
                      Thông tin cá nhân
                    </Link>
                    <div className="border-t border-black/5 my-1"></div>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Child Pages go here */}
        <div className="flex-1">{children}</div>
      </div>

      {/* CONFIRM LOGOUT MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsLogoutModalOpen(false)}
          ></div>
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-sm relative z-10 space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-deep-navy">
                Đăng xuất tài khoản?
              </h4>
              <p className="text-xs font-semibold text-on-surface-variant leading-relaxed mt-1">
                Bạn có chắc chắn muốn đăng xuất khỏi hệ thống quản trị Huy
                Luminax?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  handleLogout();
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
