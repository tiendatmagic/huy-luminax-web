"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Search,
  CheckCircle,
  Eye,
  Trash2,
  ShieldAlert,
  Loader2,
  X,
  MessageSquare,
  MailOpen,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  content: string;
  status: string; // unread, read
  created_at: string;
  updated_at: string;
}

export default function ContactManagementPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [fromItem, setFromItem] = useState(0);
  const [toItem, setToItem] = useState(0);

  // Modals state
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to page 1 when search changes
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch contacts
  const fetchContacts = async (page = 1, status = "all", search = "") => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/auth/contacts?page=${page}&status=${status}&search=${encodeURIComponent(
          search
        )}`
      );
      if (res.ok) {
        const data = await res.json();
        setContacts(data.data);
        setTotalPages(data.last_page);
        setCurrentPage(data.current_page);
        setTotalItems(data.total);
        setFromItem(data.from || 0);
        setToItem(data.to || 0);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách liên hệ:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage, statusFilter, debouncedSearch);
  }, [currentPage, statusFilter, debouncedSearch]);

  // Đánh dấu đã đọc / chưa đọc
  const handleToggleRead = async (contact: Contact, forceStatus?: string) => {
    setActionLoading(true);
    const newStatus = forceStatus || (contact.status === "unread" ? "read" : "unread");
    try {
      const res = await fetch(`/api/auth/contacts/${contact.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Cập nhật state cục bộ
        setContacts((prev) =>
          prev.map((c) => (c.id === contact.id ? { ...c, status: newStatus } : c))
        );

        if (selectedContact && selectedContact.id === contact.id) {
          setSelectedContact((prev: any) => ({ ...prev, status: newStatus }));
        }

        // Tạo sự kiện cập nhật để layout admin hoặc dashboard reload stats nếu cần
        window.dispatchEvent(new Event("contactsUpdated"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Mở modal xem chi tiết liên hệ
  const handleOpenDetail = (contact: Contact) => {
    setSelectedContact(contact);
    if (contact.status === "unread") {
      handleToggleRead(contact, "read");
    }
  };

  // Xoá liên hệ
  const handleDeleteContact = async () => {
    if (!contactToDelete) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/auth/contacts/${contactToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setContactToDelete(null);
        fetchContacts(currentPage, statusFilter, debouncedSearch);
        window.dispatchEvent(new Event("contactsUpdated"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-orange-500/10 text-orange-600 border border-orange-200/50";
      case "read":
        return "bg-green-500/10 text-green-600 border border-green-200/50";
      default:
        return "bg-slate-500/10 text-slate-600 border border-slate-200/50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "unread":
        return "Chưa đọc";
      case "read":
        return "Đã đọc";
      default:
        return status;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="w-full bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-black/5 gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-deep-navy">
              Danh sách yêu cầu liên hệ
            </h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/25">
              {totalItems} Yêu cầu
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên, email, sđt..."
                className="w-full pl-10 pr-4 py-2 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-bold text-deep-navy focus:bg-white focus:border-primary outline-none transition-all duration-300 cursor-pointer"
            >
              <option value="all">Tất cả liên hệ</option>
              <option value="unread">Chưa đọc</option>
              <option value="read">Đã đọc</option>
            </select>
          </div>
        </div>

        {/* Contacts Table List */}
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-xs font-semibold text-on-surface-variant">
              Đang tải danh sách liên hệ...
            </p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-20 text-center text-on-surface-variant font-semibold text-sm">
            Không tìm thấy yêu cầu liên hệ nào.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-black/5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">Trạng thái</th>
                  <th className="py-3 px-4">Họ và tên</th>
                  <th className="py-3 px-4">Số điện thoại</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Nội dung trích dẫn</th>
                  <th className="py-3 px-4">Ngày gửi</th>
                  <th className="py-3 px-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-sm font-semibold text-deep-navy">
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={`hover:bg-black/[0.01] transition-colors cursor-pointer ${
                      contact.status === "unread" ? "bg-orange-500/[0.01] font-bold" : ""
                    }`}
                    onClick={() => handleOpenDetail(contact)}
                  >
                    <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleRead(contact)}
                        disabled={actionLoading}
                        className="p-1.5 rounded-lg hover:bg-black/5 text-on-surface-variant/80 transition-colors"
                        title={contact.status === "unread" ? "Đánh dấu đã đọc" : "Đánh dấu chưa đọc"}
                      >
                        {contact.status === "unread" ? (
                          <Mail className="w-4.5 h-4.5 text-orange-500 fill-orange-500/10" />
                        ) : (
                          <MailOpen className="w-4.5 h-4.5 text-green-500" />
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <span className="block text-deep-navy">{contact.name}</span>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono font-bold text-on-surface-variant">
                      {contact.phone}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-on-surface-variant">
                      {contact.email || <span className="text-on-surface-variant/40 italic">Không có</span>}
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <span className="block truncate text-xs text-on-surface-variant/85 font-medium">
                        {contact.content}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-on-surface-variant/70">
                      {new Date(contact.created_at).toLocaleString("vi-VN")}
                    </td>
                    <td className="py-4 px-4 text-center flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenDetail(contact)}
                        className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setContactToDelete(contact)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        title="Xoá"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-black/5 pt-4 flex-wrap gap-3">
            <span className="text-xs font-semibold text-on-surface-variant">
              Hiển thị {fromItem} - {toItem} trên tổng số {totalItems} liên hệ
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-black/5 flex items-center justify-center text-on-surface hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.02] transition-all cursor-pointer"
              >
                &larr;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "border border-black/5 text-on-surface hover:bg-black/[0.02]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg border border-black/5 flex items-center justify-center text-on-surface hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.02] transition-all cursor-pointer"
              >
                &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DETAIL CONTACT MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setSelectedContact(null)}
          ></div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-black/5 w-full max-w-xl max-h-[85vh] overflow-y-auto relative z-10 space-y-6 animate-scale-up scrollbar-none">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-deep-navy">Chi tiết yêu cầu liên hệ</h4>
                  <span className="text-[10px] text-on-surface-variant font-semibold">
                    Nhận lúc {new Date(selectedContact.created_at).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-deep-navy cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#faf8ff] p-4.5 rounded-2xl border border-black/[0.03]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block">Họ và tên</span>
                <span className="text-sm font-bold text-deep-navy">{selectedContact.name}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block">Số điện thoại</span>
                <span className="text-sm font-mono font-bold text-deep-navy">{selectedContact.phone}</span>
              </div>
              <div className="space-y-0.5 sm:col-span-2 pt-2 border-t border-black/[0.04]">
                <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block">Địa chỉ Email</span>
                <span className="text-sm font-semibold text-deep-navy">{selectedContact.email || "Không cung cấp"}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider pl-1 block">Nội dung gửi yêu cầu</span>
              <div className="w-full px-5 py-4 bg-slate-50 border border-black/5 rounded-2xl text-xs font-semibold text-deep-navy leading-relaxed min-h-[140px] whitespace-pre-wrap">
                {selectedContact.content}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-black/5">
              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase ${getStatusBadgeClass(selectedContact.status)}`}>
                {getStatusText(selectedContact.status)}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleRead(selectedContact)}
                  disabled={actionLoading}
                  className="px-5 py-2.5 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-bold text-on-surface transition-all cursor-pointer disabled:opacity-40"
                >
                  {selectedContact.status === "unread" ? "Đánh dấu đã đọc" : "Đánh dấu chưa đọc"}
                </button>
                <button
                  onClick={() => {
                    setSelectedContact(null);
                    setContactToDelete(selectedContact);
                  }}
                  className="px-5 py-2.5 bg-red-50 hover:bg-red-100 rounded-xl text-xs font-bold text-red-600 transition-all cursor-pointer"
                >
                  Xoá liên hệ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {contactToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setContactToDelete(null)}
          ></div>
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-sm relative z-10 space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-deep-navy">Xoá yêu cầu liên hệ?</h4>
              <p className="text-xs font-semibold text-on-surface-variant leading-relaxed mt-1">
                Bạn có chắc chắn muốn xoá yêu cầu liên hệ của <span className="font-bold">{contactToDelete.name}</span>? Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setContactToDelete(null)}
                className="flex-1 py-2.5 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteContact}
                disabled={actionLoading}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {actionLoading ? "Đang xoá..." : "Xác nhận xoá"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
