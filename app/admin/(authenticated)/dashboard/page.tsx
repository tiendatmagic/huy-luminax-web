"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  FileText,
  Eye,
  MessageSquare,
  TrendingUp,
  Loader2,
} from "lucide-react";

interface CurrentUser {
  id: number;
  name: string;
  email: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch thông tin user hiện tại
  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("/api/auth/user");
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-xs font-semibold text-on-surface-variant">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Greeting banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6 md:p-8 overflow-hidden shadow-xl border border-white/5">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
        <div className="max-w-xl relative z-10 space-y-3">
          <span className="text-xs font-black tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Luminax AI Ready</span>
          <h1 className="font-headline text-2xl md:text-3xl font-black">Chào mừng quay trở lại, {currentUser?.name || "Admin"}!</h1>
          <p className="text-sm text-slate-300 font-semibold leading-relaxed">
            Hệ thống quản trị Huy Luminax đang hoạt động ổn định. Bạn có toàn quyền cấu hình dữ liệu sản phẩm, tin tức, thông tin công nghệ và tương tác với các yêu cầu từ khách hàng.
          </p>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Tổng sản phẩm", value: "24", icon: ShoppingBag, color: "from-blue-500 to-indigo-500", trend: "Khăn giấy & Hoá chất" },
          { title: "Tin tức công nghệ", value: "18", icon: FileText, color: "from-purple-500 to-pink-500", trend: "0 bài viết nháp chờ duyệt" },
          { title: "Lượt truy cập (Tuần)", value: "1,245", icon: Eye, color: "from-cyan-500 to-teal-500", trend: "+12.4% so với tuần trước", showTrendIcon: true },
          { title: "Yêu cầu liên hệ", value: "12", icon: MessageSquare, color: "from-orange-500 to-red-500", trend: "3 yêu cầu mới chưa đọc" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">{stat.title}</span>
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-deep-navy">{stat.value}</h3>
              <p className="text-xs font-semibold text-on-surface-variant/70 flex items-center gap-1">
                {stat.showTrendIcon && <TrendingUp className="w-3.5 h-3.5 text-green-500" />}
                <span>{stat.trend}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lối tắt quản trị */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-deep-navy mb-6">Lối tắt quản lý nội dung</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Quản lý Sản phẩm", desc: "Thêm, sửa, xoá các sản phẩm khăn giấy kháng khuẩn và hoá chất công nghiệp B2B.", color: "border-primary/20 hover:border-primary", action: () => {} },
            { title: "Đăng tin tức mới", desc: "Cập nhật bài viết về công nghệ sản xuất, hướng dẫn sử dụng và xu hướng ngành hàng.", color: "border-secondary/20 hover:border-secondary", action: () => router.push("/admin/blog") },
            { title: "Cấu hình AI & Tech", desc: "Tinh chỉnh mô hình Luminax AI và giải pháp tự động hóa QA sản phẩm.", color: "border-purple-300 hover:border-purple-500", action: () => {} },
            { title: "Quản lý Thành viên", desc: "Thêm tài khoản admin, phân bổ quyền truy cập và kiểm tra phân quyền.", color: "border-teal-300 hover:border-teal-500", action: () => router.push("/admin/user") },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className={`text-left p-6 rounded-2xl border ${item.color} bg-white/50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between min-h-[160px]`}
            >
              <div>
                <h4 className="font-bold text-deep-navy mb-2">{item.title}</h4>
                <p className="text-xs text-on-surface-variant/80 font-semibold leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-xs font-bold text-primary mt-4 inline-flex items-center gap-1">
                Truy cập nhanh &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
