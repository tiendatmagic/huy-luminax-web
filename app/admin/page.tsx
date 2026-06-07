"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, remember }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("[LỖI ĐĂNG NHẬP HỆ THỐNG]: Đăng nhập thất bại.", {
          url: res.url,
          status: res.status,
          statusText: res.statusText,
          errorResponse: data
        });
        throw new Error(data.message || "Tài khoản hoặc mật khẩu không chính xác.");
      }

      // Đăng nhập thành công, chuyển hướng tới dashboard
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error("[LỖI EXCEPTION ĐĂNG NHẬP]:", err);
      setError(err.message || "Đã xảy ra lỗi kết nối, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#faf8ff] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="floating-blob w-96 h-96 bg-primary/10 -top-20 -left-20 blur-3xl opacity-40"></div>
        <div className="floating-blob w-96 h-96 bg-secondary/10 -bottom-20 -right-20 blur-3xl opacity-40"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-16 h-16 mb-4 drop-shadow-md">
            <Image
              src="/logo-new.png"
              alt="Huy Luminax Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="font-headline text-2xl font-black text-deep-navy tracking-tight text-center">
            HUY LUMINAX ADMIN
          </h2>
          <p className="mt-1 text-sm font-semibold text-on-surface-variant/80 text-center">
            Hệ thống quản trị nội dung & Luminax AI
          </p>
        </div>

        {/* Card Container */}
        <div className="glass-premium rounded-3xl p-8 shadow-2xl border border-white/40 max-w-full">
          <h3 className="text-xl font-bold text-deep-navy mb-6">
            Đăng nhập hệ thống
          </h3>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold p-4 rounded-2xl animate-pulse-slow">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username/Email Input */}
            <div className="space-y-3">
              <label
                htmlFor="username"
                className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1"
              >
                Tên tài khoản hoặc Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@luminax.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-black/10 rounded-2xl text-sm font-semibold text-deep-navy placeholder-on-surface-variant/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1"
              >
                Mật khẩu
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 bg-white/60 border border-black/10 rounded-2xl text-sm font-semibold text-deep-navy placeholder-on-surface-variant/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-deep-navy transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4.5 h-4.5 rounded-md border-black/15 text-primary focus:ring-primary/30 cursor-pointer"
                />
                <span className="text-sm font-semibold text-on-surface-variant group-hover:text-deep-navy transition-colors">
                  Ghi nhớ trạng thái đăng nhập
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary text-white font-bold text-sm py-4 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/45 transition-all duration-300 flex items-center justify-center gap-2 shine-effect disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
