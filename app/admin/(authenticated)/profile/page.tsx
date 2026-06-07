"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export default function AdminProfilePage() {
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  
  const [profileOldPassword, setProfileOldPassword] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [profileConfirmPassword, setProfileConfirmPassword] = useState("");
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileMessage, setProfileMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Load thông tin ban đầu
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user");
        if (res.ok) {
          const data = await res.json();
          setProfileName(data.name);
          setProfileEmail(data.email);
        }
      } catch (err) {
        console.error("Lỗi tải thông tin cá nhân:", err);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);

    // Kiểm tra tính hợp lệ của mật khẩu nếu muốn thay đổi
    if (profilePassword) {
      if (!profileOldPassword) {
        setProfileMessage({ text: "Bạn phải nhập mật khẩu cũ để thay đổi mật khẩu mới.", isError: true });
        return;
      }
      if (profilePassword !== profileConfirmPassword) {
        setProfileMessage({ text: "Mật khẩu xác nhận không khớp.", isError: true });
        return;
      }
      if (profilePassword.length < 6) {
        setProfileMessage({ text: "Mật khẩu mới phải có ít nhất 6 ký tự.", isError: true });
        return;
      }
    }

    setProfileLoading(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileName,
          email: profileEmail,
          old_password: profileOldPassword || undefined,
          password: profilePassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Cập nhật hồ sơ thất bại.");
      }

      setProfileMessage({ text: "Cập nhật thông tin cá nhân thành công!", isError: false });
      setProfileOldPassword("");
      setProfilePassword("");
      setProfileConfirmPassword("");
      
      // Đồng bộ ngay lập tức sang layout và header
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (err: any) {
      setProfileMessage({ text: err.message, isError: true });
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-2xl bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-deep-navy border-b border-black/5 pb-4">
          Chỉnh sửa thông tin cá nhân
        </h3>

        {profileMessage && (
          <div className={`flex items-start gap-2.5 border text-sm font-semibold p-4 rounded-2xl ${
            profileMessage.isError
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-green-50 border-green-200 text-green-700"
          }`}>
            {profileMessage.isError ? (
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <span>{profileMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          {/* Name Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
              Tên hiển thị
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                <User className="w-4.5 h-4.5" />
              </div>
              <input
                type="text"
                required
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Tên admin"
                className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
              Địa chỉ Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <input
                type="email"
                required
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Password section */}
          <div className="border-t border-black/5 pt-5 mt-6 space-y-4">
            <h4 className="text-xs font-black text-deep-navy uppercase tracking-widest mb-2">Thay đổi mật khẩu (Tuỳ chọn)</h4>
            
            {/* Mật khẩu cũ */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                Mật khẩu hiện tại (Cũ)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={profileOldPassword}
                  onChange={(e) => setProfileOldPassword(e.target.value)}
                  placeholder="Bắt buộc nếu muốn đổi mật khẩu mới"
                  className="w-full pl-10 pr-10 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-deep-navy transition-colors cursor-pointer"
                >
                  {showOldPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mật khẩu mới */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Mật khẩu mới
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={profilePassword}
                    onChange={(e) => setProfilePassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-10 pr-10 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-deep-navy transition-colors cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Xác nhận mật khẩu */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={profileConfirmPassword}
                    onChange={(e) => setProfileConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full pl-10 pr-10 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-deep-navy transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={profileLoading}
            className="bg-primary hover:bg-primary-hover text-white font-bold text-xs py-3.5 px-6 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-50"
          >
            {profileLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Lưu Thay Đổi</span>
          </button>
        </form>
      </div>
    </div>
  );
}
