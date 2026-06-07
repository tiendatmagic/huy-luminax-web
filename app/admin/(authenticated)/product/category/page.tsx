"use client";
 
import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Plus,
  Edit2,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  X,
  Loader2,
} from "lucide-react";
 
interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  products_count?: number;
  created_at: string;
}
 
export default function ProductCategoryManagementPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;
 
  // States cho Modal Thêm/Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<ProductCategory | null>(null);
 
  // Fetch danh sách danh mục
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/product-categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Lỗi lấy danh mục sản phẩm:", err);
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    fetchCategories();
  }, []);
 
  // Submit form thêm hoặc sửa danh mục
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
 
    if (!categoryName.trim()) {
      setMessage({ text: "Tên danh mục không được để trống.", isError: true });
      return;
    }
 
    setActionLoading(true);
    try {
      const isEdit = !!editingCategory;
      const url = isEdit ? `/api/auth/product-categories/${editingCategory.id}` : "/api/auth/product-categories";
      const method = isEdit ? "PUT" : "POST";
 
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: categoryName.trim(),
          slug: categorySlug.trim() || null,
          description: categoryDesc.trim() 
        }),
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        throw new Error(data.message || "Có lỗi xảy ra khi xử lý danh mục.");
      }
 
      setMessage({
        text: isEdit ? "Đã cập nhật danh mục thành công!" : "Đã thêm danh mục mới thành công!",
        isError: false,
      });
      setIsModalOpen(false);
      setCategoryName("");
      setCategorySlug("");
      setCategoryDesc("");
      setEditingCategory(null);
      fetchCategories();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setActionLoading(false);
    }
  };
 
  // Xoá danh mục
  const handleDelete = async () => {
    if (!categoryToDelete) return;
    setMessage(null);
    setActionLoading(true);
 
    try {
      const res = await fetch(`/api/auth/product-categories/${categoryToDelete.id}`, {
        method: "DELETE",
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        throw new Error(data.message || "Xoá danh mục thất bại.");
      }
 
      setMessage({ text: "Đã xoá danh mục thành công.", isError: false });
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
      setCategoryToDelete(null);
    } finally {
      setActionLoading(false);
    }
  };
 
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);
 
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="w-full bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-deep-navy">Danh mục sản phẩm</h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/25">
              {categories.length} Danh mục
            </span>
          </div>
 
          <button
            onClick={() => {
              setMessage(null);
              setCategoryName("");
              setCategorySlug("");
              setCategoryDesc("");
              setEditingCategory(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-primary/20 hover:shadow-primary/45 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm danh mục
          </button>
        </div>
 
        {/* Thông báo */}
        {message && (
          <div className={`flex items-start gap-2.5 border text-sm font-semibold p-4 rounded-2xl ${
            message.isError
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-green-50 border-green-200 text-green-700"
          }`}>
            {message.isError ? (
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}
 
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-xs font-semibold text-on-surface-variant">Đang tải danh mục sản phẩm...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant font-semibold text-sm">
            Chưa có danh mục sản phẩm nào được tạo.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="border-b border-black/5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  <th className="py-3 px-4">Tên danh mục</th>
                  <th className="py-3 px-4">Đường dẫn tĩnh (Slug)</th>
                  <th className="py-3 px-4">Mô tả</th>
                  <th className="py-3 px-4 text-center">Số sản phẩm</th>
                  <th className="py-3 px-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-sm font-semibold text-deep-navy">
                {currentCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-black/[0.01] transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <FolderOpen className="w-4 h-4" />
                      </div>
                      <span className="font-bold">{cat.name}</span>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant/90 font-mono text-xs">{cat.slug}</td>
                    <td className="py-4 px-4 text-on-surface-variant/90 text-xs font-medium max-w-[200px] truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="py-4 px-4 text-center text-xs text-on-surface-variant font-bold">
                      {cat.products_count ?? 0}
                    </td>
                    <td className="py-4 px-4 text-center flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setMessage(null);
                          setEditingCategory(cat);
                          setCategoryName(cat.name);
                          setCategorySlug(cat.slug || "");
                          setCategoryDesc(cat.description || "");
                          setIsModalOpen(true);
                        }}
                        className="p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                        title="Chỉnh sửa danh mục"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCategoryToDelete(cat)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                        title="Xoá danh mục"
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
 
        {/* Phân trang danh mục */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-black/5 pt-4 flex-wrap gap-3">
            <span className="text-xs font-semibold text-on-surface-variant">
              Hiển thị {indexOfFirstCategory + 1} - {Math.min(indexOfLastCategory, categories.length)} trên tổng số {categories.length} danh mục
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
 
      {/* MODAL: THÊM / SỬA DANH MỤC */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-md relative z-10 space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-deep-navy">
                {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-deep-navy cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
 
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ví dụ: Khăn giấy, Hóa mỹ phẩm..."
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Đường dẫn tĩnh (Slug)
                </label>
                <input
                  type="text"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  placeholder="Ví dụ: hoa-my-pham (để trống sẽ tự tạo)"
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                />
              </div>
 
              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Mô tả danh mục
                </label>
                <textarea
                  value={categoryDesc}
                  onChange={(e) => setCategoryDesc(e.target.value)}
                  placeholder="Mô tả ngắn gọn về danh mục sản phẩm này..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-none"
                />
              </div>
 
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-black/5 hover:bg-black/10 rounded-2xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    editingCategory ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />
                  )}
                  <span>{editingCategory ? "Cập Nhật" : "Thêm Mới"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {/* MODAL XÁC NHẬN XOÁ */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setCategoryToDelete(null)}
          ></div>
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-sm relative z-10 space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-deep-navy">Xoá danh mục?</h4>
              <p className="text-xs font-semibold text-on-surface-variant leading-relaxed mt-1">
                Bạn có chắc chắn muốn xoá danh mục <span className="font-bold">{categoryToDelete.name}</span>? Các sản phẩm thuộc danh mục này sẽ được chuyển về trạng thái không thuộc danh mục nào. Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="flex-1 py-2.5 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
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
