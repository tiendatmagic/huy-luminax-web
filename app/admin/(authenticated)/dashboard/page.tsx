"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShoppingBag,
  FileText,
  Cpu,
  Eye,
  EyeOff,
  MessageSquare,
  TrendingUp,
  Loader2,
  User,
  Plus,
  Trash2,
  ShieldAlert,
  Mail,
  Lock,
  CheckCircle2,
} from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface CurrentUser {
  id: number;
  name: string;
  email: string;
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = tabParam === "members" ? "members" : "dashboard";

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // State quản lý Thành viên
  const [members, setMembers] = useState<Member[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPassword, setNewMemberPassword] = useState("");
  const [showMemberPassword, setShowMemberPassword] = useState(false);
  const [memberMessage, setMemberMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [memberActionLoading, setMemberActionLoading] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

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
    }
  };

  // Fetch danh sách thành viên
  const fetchMembers = async () => {
    setMembersLoading(true);
    try {
      const res = await fetch("/api/auth/members");
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách thành viên:", err);
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Tự động fetch thành viên khi vào tab tương ứng
  useEffect(() => {
    if (activeTab === "members") {
      fetchMembers();
      setMemberMessage(null);
      setShowMemberPassword(false);
    }
  }, [activeTab]);

  // Tạo thành viên mới
  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setMemberMessage(null);

    if (newMemberPassword.length < 6) {
      setMemberMessage({ text: "Mật khẩu phải chứa ít nhất 6 ký tự.", isError: true });
      return;
    }

    setMemberActionLoading(true);
    try {
      const res = await fetch("/api/auth/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newMemberName,
          email: newMemberEmail,
          password: newMemberPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Tạo thành viên thất bại.");
      }

      setMemberMessage({ text: "Đã tạo tài khoản admin thành viên thành công!", isError: false });
      setNewMemberName("");
      setNewMemberEmail("");
      setNewMemberPassword("");
      setShowMemberPassword(false);
      fetchMembers();
    } catch (err: any) {
      setMemberMessage({ text: err.message, isError: true });
    } finally {
      setMemberActionLoading(false);
    }
  };

  // Xoá thành viên
  const handleDeleteMember = async () => {
    if (!memberToDelete) return;
    setMemberMessage(null);
    setMemberActionLoading(true);

    try {
      const res = await fetch(`/api/auth/members/${memberToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Xoá thành viên thất bại.");
      }

      setMemberMessage({ text: "Đã xoá thành viên thành công.", isError: false });
      setMemberToDelete(null);
      fetchMembers();
    } catch (err: any) {
      setMemberMessage({ text: err.message, isError: true });
      setMemberToDelete(null);
    } finally {
      setMemberActionLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === "dashboard" && (
        <>
          {/* Greeting banner */}
          <div className="relative rounded-3xl bg-gradient-to-r from-deep-navy via-[#1e293b] to-deep-navy text-white p-6 md:p-8 overflow-hidden shadow-xl border border-white/5">
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
                { title: "Quản lý Sản phẩm", desc: "Thêm, sửa, xoá các sản phẩm khăn giấy kháng khuẩn và hoá chất công nghiệp B2B.", color: "border-primary/20 hover:border-primary" },
                { title: "Đăng tin tức mới", desc: "Cập nhật bài viết về công nghệ sản xuất, hướng dẫn sử dụng và xu hướng ngành hàng.", color: "border-secondary/20 hover:border-secondary" },
                { title: "Cấu hình AI & Tech", desc: "Tinh chỉnh mô hình Luminax AI và giải pháp tự động hóa QA sản phẩm.", color: "border-purple-300 hover:border-purple-500" },
                { title: "Quản lý Thành viên", desc: "Thêm tài khoản admin, phân bổ quyền truy cập và kiểm tra phân quyền.", color: "border-teal-300 hover:border-teal-500", action: () => window.location.href = "/admin/dashboard?tab=members" },
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
        </>
      )}

      {/* TAB 2: MEMBERS MANAGEMENT */}
      {activeTab === "members" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Danh sách thành viên */}
          <div className="xl:col-span-2 bg-white border border-black/5 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-deep-navy">Danh sách tài khoản Admin</h3>
              <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/25">
                {members.length} Thành viên
              </span>
            </div>

            {memberMessage && (
              <div className={`flex items-start gap-2.5 border text-sm font-semibold p-4 rounded-2xl ${
                memberMessage.isError
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-green-50 border-green-200 text-green-700"
              }`}>
                {memberMessage.isError ? (
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                )}
                <span>{memberMessage.text}</span>
              </div>
            )}

            {membersLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-xs font-semibold text-on-surface-variant">Đang tải danh sách thành viên...</p>
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-none">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-black/5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      <th className="py-3 px-4">Tên hiển thị</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Ngày tạo</th>
                      <th className="py-3 px-4 text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 text-sm font-semibold text-deep-navy">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-black/[0.01] transition-colors">
                        <td className="py-4 px-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                            {member.name.substring(0, 2)}
                          </div>
                          <span className="font-bold">{member.name}</span>
                          {currentUser?.id === member.id && (
                            <span className="text-[10px] font-bold bg-green-500/10 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                              Bạn
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-on-surface-variant/90">{member.email}</td>
                        <td className="py-4 px-4 text-xs text-on-surface-variant/70">
                          {new Date(member.created_at).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => setMemberToDelete(member)}
                            disabled={currentUser?.id === member.id || memberActionLoading}
                            className={`p-2 rounded-xl transition-colors ${
                              currentUser?.id === member.id
                                ? "text-black/20 cursor-not-allowed"
                                : "text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                            }`}
                            title={currentUser?.id === member.id ? "Không thể xoá chính mình" : "Xoá thành viên"}
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tạo tài khoản mới */}
          <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-deep-navy border-b border-black/5 pb-4">
              Tạo tài khoản Admin mới
            </h3>
            <form onSubmit={handleCreateMember} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Tên thành viên (Username)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Nội bộ: nguyenvanb"
                    className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Email đăng nhập
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="ten@luminax.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Mật khẩu khởi tạo
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type={showMemberPassword ? "text" : "password"}
                    required
                    value={newMemberPassword}
                    onChange={(e) => setNewMemberPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-10 pr-10 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMemberPassword(!showMemberPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-deep-navy transition-colors cursor-pointer"
                  >
                    {showMemberPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={memberActionLoading}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-xs py-3.5 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                {memberActionLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span>Tạo Thành Viên</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMemberToDelete(null)}
          ></div>
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-sm relative z-10 space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-deep-navy">Xoá thành viên?</h4>
              <p className="text-xs font-semibold text-on-surface-variant leading-relaxed mt-1">
                Bạn có chắc chắn muốn xoá tài khoản admin **{memberToDelete.name}** ({memberToDelete.email})? Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setMemberToDelete(null)}
                className="flex-1 py-2.5 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteMember}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Xác nhận xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
