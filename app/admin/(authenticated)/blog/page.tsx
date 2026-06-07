"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  X,
  Loader2,
  Image as ImageIcon,
  Eye,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  category_id: number | null;
  category?: Category;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  created_at: string;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // States cho Form Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  // Quill CDN Loading State
  const [quillLoaded, setQuillLoaded] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<any>(null);

  // Tải Quill CDN
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).Quill) {
        setQuillLoaded(true);
        return;
      }

      // Add CSS link
      const link = document.createElement("link");
      link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // Add JS script
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js";
      script.async = true;
      script.onload = () => {
        setQuillLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, []);

  // Fetch dữ liệu khởi tạo
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [postsRes, catsRes] = await Promise.all([
        fetch("/api/auth/posts"),
        fetch("/api/auth/categories"),
      ]);

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
        setCurrentPage(1);
      }

      if (catsRes.ok) {
        const catsData = await catsRes.json();
        setCategories(catsData);
      }
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Custom Image Handler cho Quill Editor
  const quillImageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const res = await fetch("/api/auth/posts/upload-image", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            const quill = quillInstanceRef.current;
            if (quill) {
              const range = quill.getSelection();
              quill.insertEmbed(range.index, "image", data.url);
            }
          } else {
            alert("Tải ảnh lên thất bại.");
          }
        } catch (err) {
          console.error("Lỗi upload ảnh trong editor:", err);
          alert("Có lỗi xảy ra khi tải ảnh lên.");
        }
      }
    };
  };

  // Khởi tạo Quill Editor khi Modal mở và Quill script đã load
  useEffect(() => {
    if (isModalOpen && quillLoaded && editorRef.current && !quillInstanceRef.current) {
      const Quill = (window as any).Quill;

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Nhập nội dung bài viết phong phú tại đây...",
        modules: {
          toolbar: {
            container: [
              [{ "font": [] }, { "size": [] }],
              ["bold", "italic", "underline", "strike"],
              [{ "color": [] }, { "background": [] }],
              [{ "header": [1, 2, 3, false] }],
              [{ "list": "ordered" }, { "list": "bullet" }],
              [{ "align": [] }],
              ["link", "image"],
              ["clean"],
            ],
            handlers: {
              image: quillImageHandler,
            },
          },
        },
      });

      quillInstanceRef.current = quill;

      // Set content nếu chỉnh sửa
      if (editingPost && editingPost.content) {
        quill.clipboard.dangerouslyPasteHTML(editingPost.content);
      }

      // Lắng nghe thay đổi nội dung
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }

    return () => {
      if (quillInstanceRef.current) {
        // Clear references
        quillInstanceRef.current = null;
      }
    };
  }, [isModalOpen, quillLoaded]);

  // Xử lý upload ảnh đại diện (Featured Image)
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/auth/posts/upload-image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setFeaturedImage(data.url);
      } else {
        alert("Tải ảnh đại diện thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi tải ảnh lên.");
    } finally {
      setImageUploading(false);
    }
  };

  // Submit Form tạo/sửa bài viết
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!title.trim()) {
      setMessage({ text: "Tiêu đề không được để trống.", isError: true });
      return;
    }

    setActionLoading(true);
    try {
      const isEdit = !!editingPost;
      const url = isEdit ? `/api/auth/posts/${editingPost.id}` : "/api/auth/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim() || null,
          category_id: categoryId ? parseInt(categoryId) : null,
          excerpt: excerpt.trim() || null,
          content: content.trim() || null,
          image: featuredImage || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Lưu bài viết thất bại.");
      }

      setMessage({
        text: isEdit ? "Cập nhật bài viết thành công!" : "Tạo bài viết mới thành công!",
        isError: false,
      });
      setIsModalOpen(false);
      setTitle("");
      setSlug("");
      setCategoryId("");
      setExcerpt("");
      setContent("");
      setFeaturedImage("");
      setEditingPost(null);
      fetchData();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setActionLoading(false);
    }
  };

  // Xoá bài viết
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    setMessage(null);
    setActionLoading(true);

    try {
      const res = await fetch(`/api/auth/posts/${postToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Xoá bài viết thất bại.");
      }

      setMessage({ text: "Đã xoá bài viết thành công.", isError: false });
      setPostToDelete(null);
      fetchData();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
      setPostToDelete(null);
    } finally {
      setActionLoading(false);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="w-full bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-deep-navy">Danh sách bài viết tin tức</h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/25">
              {posts.length} Bài viết
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog/category"
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-deep-navy border border-black/10 font-bold text-xs px-4 py-2.5 rounded-2xl transition-all cursor-pointer shadow-sm"
            >
              <FolderOpen className="w-4 h-4 text-on-surface-variant" />
              Quản lý danh mục
            </Link>
            <button
              onClick={() => {
                setMessage(null);
                setTitle("");
                setSlug("");
                setCategoryId("");
                setExcerpt("");
                setContent("");
                setFeaturedImage("");
                setEditingPost(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-primary/20 hover:shadow-primary/45 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Viết bài mới
            </button>
          </div>
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
            <p className="text-xs font-semibold text-on-surface-variant">Đang tải danh sách bài viết...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant font-semibold text-sm">
            Chưa có bài viết nào được đăng.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-black/5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  <th className="py-3 px-4">Ảnh</th>
                  <th className="py-3 px-4">Tiêu đề bài viết</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4">Ngày đăng</th>
                  <th className="py-3 px-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-sm font-semibold text-deep-navy">
                {currentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-black/[0.01] transition-colors">
                    <td className="py-3 px-4">
                      {post.image ? (
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-black/5 bg-slate-50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-10 rounded-lg bg-black/5 flex items-center justify-center text-on-surface-variant/40 border border-black/5">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-md">
                        <span className="font-bold block text-sm text-deep-navy line-clamp-1">{post.title}</span>
                        <span className="text-[10px] font-mono font-bold text-on-surface-variant/65 block mt-0.5 line-clamp-1">{post.slug}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {post.category ? (
                        <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-[5px] uppercase">
                          {post.category.name}
                        </span>
                      ) : (
                        <span className="text-xs text-on-surface-variant/50 italic">Không có danh mục</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant/70">
                      {new Date(post.created_at).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-3 px-4 text-center flex items-center justify-center gap-2 mt-1">
                      <a
                        href={`/tin-tuc/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl text-on-surface-variant hover:bg-black/5 transition-colors cursor-pointer"
                        title="Xem bài viết thực tế"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          setMessage(null);
                          setEditingPost(post);
                          setTitle(post.title);
                          setSlug(post.slug || "");
                          setCategoryId(post.category_id ? post.category_id.toString() : "");
                          setExcerpt(post.excerpt || "");
                          setContent(post.content || "");
                          setFeaturedImage(post.image || "");
                          setIsModalOpen(true);
                        }}
                        className="p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                        title="Chỉnh sửa bài viết"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPostToDelete(post)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                        title="Xoá bài viết"
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

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-black/5 pt-4 flex-wrap gap-3">
            <span className="text-xs font-semibold text-on-surface-variant">
              Hiển thị {indexOfFirstPost + 1} - {Math.min(indexOfLastPost, posts.length)} trên tổng số {posts.length} bài viết
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

      {/* MODAL: VIẾT/SỬA BÀI VIẾT (FULL WIDTH / HIGH PREMIUM) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-black/5 w-full max-w-4xl max-h-[92vh] overflow-y-auto relative z-10 space-y-6 animate-scale-up scrollbar-none">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-deep-navy">
                {editingPost ? "Chỉnh sửa bài viết" : "Viết bài tin tức mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-deep-navy cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Cột trái: Tiêu đề, danh mục, tóm tắt */}
                <div className="md:col-span-2 space-y-4">
                  {/* Title & Slug */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                        Tiêu đề bài viết
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tiêu đề hấp dẫn..."
                        className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                        Đường dẫn tĩnh (Slug)
                      </label>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="Ví dụ: tin-tuc-moi (để trống sẽ tự tạo)"
                        className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                      Trích dẫn ngắn (Excerpt)
                    </label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Mô tả ngắn gọn nội dung bài viết..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Cột phải: Danh mục, ảnh đại diện */}
                <div className="space-y-4">
                  {/* Category Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                      Danh mục bài viết
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Featured Image */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                      Ảnh đại diện bài viết
                    </label>
                    <div className="flex items-center gap-3">
                      {featuredImage ? (
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-black/10 bg-slate-50 shrink-0 group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={featuredImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFeaturedImage("")}
                            className="absolute inset-0 bg-black/45 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <label className="relative w-24 h-16 rounded-xl border border-dashed border-black/25 flex flex-col items-center justify-center text-on-surface-variant/40 hover:text-primary hover:border-primary transition-all cursor-pointer shrink-0">
                          {imageUploading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span className="text-[9px] font-bold mt-1">Tải ảnh</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFeaturedImageUpload}
                            disabled={imageUploading}
                            className="hidden"
                          />
                        </label>
                      )}
                      <div className="text-[10px] font-semibold text-on-surface-variant/70 leading-relaxed">
                        Tỉ lệ khuyên dùng 4:3 hoặc 16:9. Định dạng JPG, PNG, WebP (Dưới 2MB).
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Nội dung chi tiết bài viết
                </label>
                
                {/* Editor Container */}
                <div className="border border-black/10 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
                  <div ref={editorRef} style={{ minHeight: "260px" }}></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-black/5 hover:bg-black/10 rounded-2xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || imageUploading}
                  className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  <span>{editingPost ? "Lưu thay đổi" : "Đăng bài viết"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setPostToDelete(null)}
          ></div>
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-sm relative z-10 space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-deep-navy">Xoá bài viết?</h4>
              <p className="text-xs font-semibold text-on-surface-variant leading-relaxed mt-1">
                Bạn có chắc chắn muốn xoá bài viết <span className="font-bold">{postToDelete.title}</span>? Dữ liệu bài viết này sẽ bị xoá vĩnh viễn khỏi hệ thống.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setPostToDelete(null)}
                className="flex-1 py-2.5 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleDeletePost}
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
