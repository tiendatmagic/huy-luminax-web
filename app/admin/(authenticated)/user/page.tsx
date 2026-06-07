"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Plus,
  Trash2,
  ShieldAlert,
  Mail,
  Lock,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
} from "lucide-react";

interface Member {
  id: number;
  name: string;
  fullname?: string;
  email: string;
  created_at: string;
}

interface CurrentUser {
  id: number;
  name: string;
  fullname?: string;
  email: string;
}

export default function UserManagementPage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [membersLoading, setMembersLoading] = useState(true);
  
  // Modal tạo thành viên
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberFullname, setNewMemberFullname] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPassword, setNewMemberPassword] = useState("");
  const [showMemberPassword, setShowMemberPassword] = useState(false);

  // Modal sửa thành viên
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [editMemberName, setEditMemberName] = useState("");
  const [editMemberFullname, setEditMemberFullname] = useState("");
  const [editMemberEmail, setEditMemberEmail] = useState("");
  const [editMemberPassword, setEditMemberPassword] = useState("");
  const [showEditMemberPassword, setShowEditMemberPassword] = useState(false);
  
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
    fetchMembers();
  }, []);

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
          fullname: newMemberFullname || null,
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
      setNewMemberFullname("");
      setNewMemberEmail("");
      setNewMemberPassword("");
      setShowMemberPassword(false);
      setIsCreateModalOpen(false);
      fetchMembers();
    } catch (err: any) {
      setMemberMessage({ text: err.message, isError: true });
    } finally {
      setMemberActionLoading(false);
    }
  };

  // Sửa thành viên
  const handleEditMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberToEdit) return;
    setMemberMessage(null);

    if (editMemberPassword && editMemberPassword.length < 6) {
      setMemberMessage({ text: "Mật khẩu mới phải chứa ít nhất 6 ký tự.", isError: true });
      return;
    }

    setMemberActionLoading(true);
    try {
      const res = await fetch(`/api/auth/members/${memberToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editMemberName,
          fullname: editMemberFullname || null,
          email: editMemberEmail,
          password: editMemberPassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Cập nhật thành viên thất bại.");
      }

      setMemberMessage({ text: "Đã cập nhật thông tin thành viên thành công!", isError: false });
      setIsEditModalOpen(false);

      // Nếu tự sửa thông tin của chính mình, phát sự kiện để Layout cập nhật
      if (currentUser?.id === memberToEdit.id) {
        window.dispatchEvent(new Event("profileUpdated"));
      }

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
    <div className="p-6 md:p-8 space-y-6">
      <div className="w-full bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header với nút Thêm thành viên */}
        <div className="flex items-center justify-between border-b border-black/5 pb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-deep-navy">Danh sách tài khoản Admin</h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/25">
              {members.length} Thành viên
            </span>
          </div>
          
          <button
            onClick={() => {
              setMemberMessage(null);
              setNewMemberName("");
              setNewMemberFullname("");
              setNewMemberEmail("");
              setNewMemberPassword("");
              setShowMemberPassword(false);
              setIsCreateModalOpen(true);
            }}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-primary/20 hover:shadow-primary/45 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm thành viên
          </button>
        </div>

        {/* Banner thông báo thành công hoặc lỗi */}
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
              <tbody>
                   {members.map((member) => (
                  <tr key={member.id} className="hover:bg-black/[0.01] transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                        {(member.fullname || member.name).substring(0, 2)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">{member.fullname || member.name}</span>
                        {member.fullname && (
                          <span className="text-[11px] text-on-surface-variant/70">@{member.name}</span>
                        )}
                      </div>
                      {currentUser?.id === member.id && (
                        <span className="text-[10px] font-bold bg-green-500/10 text-green-700 px-2 py-0.5 rounded-full border border-green-200 ml-1">
                          Bạn
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant/90">{member.email}</td>
                    <td className="py-4 px-4 text-xs text-on-surface-variant/70">
                      {new Date(member.created_at).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setMemberMessage(null);
                            setMemberToEdit(member);
                            setEditMemberName(member.name);
                            setEditMemberFullname(member.fullname || "");
                            setEditMemberEmail(member.email);
                            setEditMemberPassword("");
                            setShowEditMemberPassword(false);
                            setIsEditModalOpen(true);
                          }}
                          disabled={memberActionLoading}
                          className="p-2 rounded-xl text-primary hover:bg-primary/5 hover:text-primary-hover transition-colors cursor-pointer"
                          title="Sửa thông tin"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: TẠO THÀIEN VIÊN MỚI */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setIsCreateModalOpen(false)}
          ></div>
          
          {/* Modal Container */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-md relative z-10 space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-deep-navy">Tạo tài khoản Admin mới</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-deep-navy cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {memberMessage && memberMessage.isError && (
              <div className="flex items-start gap-2.5 border border-red-200 bg-red-50 text-red-700 text-sm font-semibold p-4 rounded-2xl">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{memberMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateMember} className="space-y-4">
              {/* Fullname Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Họ tên (Không bắt buộc)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="text"
                    value={newMemberFullname}
                    onChange={(e) => setNewMemberFullname(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>
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
                    className="w-full pl-10 pr-4 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
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
                    className="w-full pl-10 pr-4 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
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
                    className="w-full pl-10 pr-10 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMemberPassword(!showMemberPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-deep-navy transition-colors cursor-pointer"
                  >
                    {showMemberPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-3 bg-black/5 hover:bg-black/10 rounded-2xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={memberActionLoading}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {memberActionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>Tạo Thành Viên</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SỬA THÔNG TIN THÀNH VIÊN */}
      {isEditModalOpen && memberToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          ></div>
          
          {/* Modal Container */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-md relative z-10 space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-deep-navy">Sửa thông tin Admin</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-deep-navy cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {memberMessage && memberMessage.isError && (
              <div className="flex items-start gap-2.5 border border-red-200 bg-red-50 text-red-700 text-sm font-semibold p-4 rounded-2xl">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{memberMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleEditMember} className="space-y-4">
              {/* Fullname Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Họ tên (Không bắt buộc)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="text"
                    value={editMemberFullname}
                    onChange={(e) => setEditMemberFullname(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>

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
                    value={editMemberName}
                    onChange={(e) => setEditMemberName(e.target.value)}
                    placeholder="Nội bộ: nguyenvanb"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
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
                    value={editMemberEmail}
                    onChange={(e) => setEditMemberEmail(e.target.value)}
                    placeholder="ten@luminax.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Mật khẩu mới (Để trống nếu không đổi)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type={showEditMemberPassword ? "text" : "password"}
                    value={editMemberPassword}
                    onChange={(e) => setEditMemberPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-10 pr-10 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditMemberPassword(!showEditMemberPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-deep-navy transition-colors cursor-pointer"
                  >
                    {showEditMemberPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 bg-black/5 hover:bg-black/10 rounded-2xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={memberActionLoading}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {memberActionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Pencil className="w-4 h-4" />
                  )}
                  <span>Lưu Thay Đổi</span>
                </button>
              </div>
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
