"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  X,
  Loader2,
  Image as ImageIcon,
  Eye,
  PlusCircle,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

interface ProductCategory {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  price: string | null;
  regular_price: string | null;
  category_id: number | null;
  category?: ProductCategory;
  featured_image: string | null;
  gallery: string[] | null;
  short_description: string | null;
  description: string | null;
  stock_status: string;
  is_featured: boolean;
  status: string;
  created_at: string;
}

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // States cho Form Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [stockStatus, setStockStatus] = useState("instock");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState("active");
  const [imageUploading, setImageUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

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
      link.href =
        "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css";
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
      const [prodsRes, catsRes] = await Promise.all([
        fetch("/api/auth/products"),
        fetch("/api/auth/product-categories"),
      ]);

      if (prodsRes.ok) {
        const prodsData = await prodsRes.json();
        setProducts(prodsData);
        setCurrentPage(1);
      }

      if (catsRes.ok) {
        const catsData = await catsRes.json();
        setCategories(catsData);
      }
    } catch (err) {
      console.error("Lỗi lấy dữ liệu sản phẩm:", err);
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
          const res = await fetch("/api/auth/products/upload-image", {
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
    if (
      isModalOpen &&
      quillLoaded &&
      editorRef.current &&
      !quillInstanceRef.current
    ) {
      const Quill = (window as any).Quill;

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Nhập mô tả sản phẩm chi tiết tại đây...",
        modules: {
          toolbar: {
            container: [
              [{ font: [] }, { size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ header: [1, 2, 3, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
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
      if (editingProduct && editingProduct.description) {
        quill.clipboard.dangerouslyPasteHTML(editingProduct.description);
      }

      // Lắng nghe thay đổi nội dung
      quill.on("text-change", () => {
        setDescription(quill.root.innerHTML);
      });
    }

    return () => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current = null;
      }
    };
  }, [isModalOpen, quillLoaded]);

  // Xử lý upload ảnh đại diện (Featured Image)
  const handleFeaturedImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/auth/products/upload-image", {
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

  // Xử lý upload ảnh thư viện (Gallery Images)
  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setGalleryUploading(true);

    // Upload từng file tuần tự
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("/api/auth/products/upload-image", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setGallery((prev) => [...prev, data.url]);
        }
      } catch (err) {
        console.error("Lỗi upload ảnh thư viện:", err);
      }
    }
    setGalleryUploading(false);
  };

  // Xoá ảnh khỏi thư viện
  const removeGalleryImage = (idxToRemove: number) => {
    setGallery((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // Submit Form tạo/sửa sản phẩm
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim()) {
      setMessage({ text: "Tên sản phẩm không được để trống.", isError: true });
      return;
    }

    setActionLoading(true);
    try {
      const isEdit = !!editingProduct;
      const url = isEdit
        ? `/api/auth/products/${editingProduct.id}`
        : "/api/auth/products";
      const method = isEdit ? "PUT" : "POST";

      const productBody = {
        name: name.trim(),
        slug: slug.trim() || null,
        sku: sku.trim() || null,
        price: price.trim() || null,
        regular_price: regularPrice.trim() || null,
        category_id: categoryId || null,
        featured_image: featuredImage || null,
        gallery: gallery,
        short_description: shortDescription.trim() || null,
        description: description.trim() || null,
        stock_status: stockStatus,
        is_featured: isFeatured,
        status: status,
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productBody),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Có lỗi xảy ra khi xử lý sản phẩm.");
      }

      setMessage({
        text: isEdit
          ? "Đã cập nhật sản phẩm thành công!"
          : "Đã thêm sản phẩm mới thành công!",
        isError: false,
      });
      setIsModalOpen(false);
      clearForm();
      fetchData();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setActionLoading(false);
    }
  };

  // Xoá sản phẩm
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setMessage(null);
    setActionLoading(true);

    try {
      const res = await fetch(`/api/auth/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Xoá sản phẩm thất bại.");
      }

      setMessage({ text: "Đã xoá sản phẩm thành công.", isError: false });
      setProductToDelete(null);
      fetchData();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
      setProductToDelete(null);
    } finally {
      setActionLoading(false);
    }
  };

  const clearForm = () => {
    setEditingProduct(null);
    setName("");
    setSlug("");
    setSku("");
    setPrice("");
    setRegularPrice("");
    setCategoryId("");
    setFeaturedImage("");
    setGallery([]);
    setShortDescription("");
    setDescription("");
    setStockStatus("instock");
    setIsFeatured(false);
    setStatus("active");
  };

  const openEditModal = (prod: Product) => {
    setMessage(null);
    setEditingProduct(prod);
    setName(prod.name);
    setSlug(prod.slug || "");
    setSku(prod.sku || "");
    setPrice(prod.price ? parseFloat(prod.price).toString() : "");
    setRegularPrice(
      prod.regular_price ? parseFloat(prod.regular_price).toString() : "",
    );
    setCategoryId(prod.category_id ? prod.category_id.toString() : "");
    setFeaturedImage(prod.featured_image || "");
    setGallery(prod.gallery || []);
    setShortDescription(prod.short_description || "");
    setDescription(prod.description || "");
    setStockStatus(prod.stock_status);
    setIsFeatured(prod.is_featured);
    setStatus(prod.status);
    setIsModalOpen(true);
  };

  // Định dạng hiển thị tiền VNĐ
  const formatVnd = (val: string | null) => {
    if (!val) return "Liên hệ";
    const num = parseFloat(val);
    if (isNaN(num) || num === 0) return "Liên hệ";
    return num.toLocaleString("vi-VN") + " đ";
  };

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="w-full bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-deep-navy">
              Danh sách sản phẩm & dịch vụ
            </h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/25">
              {products.length} Sản phẩm
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/product/category"
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-deep-navy border border-black/10 font-bold text-xs px-4 py-2.5 rounded-2xl transition-all cursor-pointer shadow-sm"
            >
              <FolderOpen className="w-4 h-4 text-on-surface-variant" />
              Quản lý danh mục
            </Link>
            <button
              onClick={() => {
                clearForm();
                setMessage(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-primary/20 hover:shadow-primary/45 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Thông báo */}
        {message && (
          <div
            className={`flex items-start gap-2.5 border text-sm font-semibold p-4 rounded-2xl ${
              message.isError
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
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
            <p className="text-xs font-semibold text-on-surface-variant">
              Đang tải sản phẩm...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant font-semibold text-sm">
            Chưa có sản phẩm nào được đăng tải.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-black/5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  <th className="py-3 px-4">Sản phẩm</th>
                  <th className="py-3 px-4">SKU / Mã</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4">Giá bán</th>
                  <th className="py-3 px-4 text-center">Trạng thái kho</th>
                  <th className="py-3 px-4 text-center">Nổi bật</th>
                  <th className="py-3 px-4 text-center">Hiển thị</th>
                  <th className="py-3 px-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-sm font-semibold text-deep-navy">
                {currentProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    className="hover:bg-black/[0.01] transition-colors"
                  >
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-black/5 bg-slate-50 shrink-0">
                        {prod.featured_image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={prod.featured_image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p
                          className="font-bold truncate max-w-[200px]"
                          title={prod.name}
                        >
                          {prod.name}
                        </p>
                        <span className="text-[10px] text-on-surface-variant/70 font-mono">
                          /{prod.slug}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-on-surface-variant">
                      {prod.sku || "—"}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-primary">
                      {prod.category?.name || "Chưa phân loại"}
                    </td>
                    <td className="py-4 px-4">
                      {prod.regular_price &&
                        parseFloat(prod.regular_price) > 0 && (
                          <span className="text-[11px] line-through text-on-surface-variant/60 block font-normal">
                            {formatVnd(prod.regular_price)}
                          </span>
                        )}
                      <span className="text-xs font-black text-deep-navy">
                        {formatVnd(prod.price)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase whitespace-nowrap inline-block ${
                          prod.stock_status === "instock"
                            ? "bg-green-500/10 text-green-700 border-green-200"
                            : "bg-red-500/10 text-red-700 border-red-200"
                        }`}
                      >
                        {prod.stock_status === "instock"
                          ? "Còn hàng"
                          : "Hết hàng"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`text-xs font-bold ${prod.is_featured ? "text-amber-500" : "text-slate-300"}`}
                      >
                        ★
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase whitespace-nowrap inline-block ${
                          prod.status === "active"
                            ? "bg-blue-500/10 text-blue-700 border-blue-200"
                            : "bg-slate-500/10 text-slate-700 border-slate-200"
                        }`}
                      >
                        {prod.status === "active" ? "Kích hoạt" : "Bản nháp"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <Link
                          href={`/san-pham/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                          title="Xem thử trang ngoài"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 rounded-xl text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                          title="Chỉnh sửa sản phẩm"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(prod)}
                          className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                          title="Xoá sản phẩm"
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

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-black/5 pt-4 flex-wrap gap-3">
            <span className="text-xs font-semibold text-on-surface-variant">
              Hiển thị {indexOfFirstProduct + 1} -{" "}
              {Math.min(indexOfLastProduct, products.length)} trên tổng số{" "}
              {products.length} sản phẩm
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg border border-black/5 flex items-center justify-center text-on-surface hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.02] transition-all cursor-pointer"
              >
                &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: VIẾT/SỬA SẢN PHẨM (FULL-WIDTH / HIGH PREMIUM) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-black/5 w-full max-w-6xl max-h-[92vh] overflow-y-auto relative z-10 space-y-6 animate-scale-up scrollbar-none">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-deep-navy">
                {editingProduct
                  ? "Chỉnh sửa sản phẩm"
                  : "Thêm sản phẩm & dịch vụ mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-deep-navy cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cột trái: Tên, danh mục, SKU, mô tả ngắn, giá */}
                <div className="md:col-span-2 space-y-4">
                  {/* Name & Slug */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                        Tên sản phẩm / Dịch vụ{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên sản phẩm hoặc dịch vụ..."
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
                        placeholder="Ví dụ: nuoc-rua-tay (để trống sẽ tự tạo)"
                        className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Prices & SKU */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                        Mã SKU (Sản phẩm)
                      </label>
                      <input
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        placeholder="Mã sản phẩm..."
                        className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                        Giá bán (VNĐ)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Để trống = Liên hệ"
                        className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                        Giá gốc (Thị trường)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(e.target.value)}
                        placeholder="Để trống = Không gạch"
                        className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                      Mô tả ngắn sản phẩm
                    </label>
                    <textarea
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      placeholder="Mô tả tóm tắt nổi bật (hiển thị cạnh ảnh đại diện)..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Cột phải: Danh mục, ảnh đại diện, trạng thái */}
                <div className="space-y-4">
                  {/* Category Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                      Danh mục sản phẩm
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="">-- Chưa phân loại --</option>
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
                      Ảnh đại diện sản phẩm
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
                              <span className="text-[9px] font-bold mt-1">
                                Tải ảnh
                              </span>
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
                        Định dạng ảnh vuông 1:1 hoặc 4:3 là tối ưu nhất.
                      </div>
                    </div>
                  </div>

                  {/* Cấu hình hiển thị */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                        Kho hàng
                      </label>
                      <select
                        value={stockStatus}
                        onChange={(e) => setStockStatus(e.target.value)}
                        className="w-full px-3 py-2 bg-[#faf8ff] border border-black/10 rounded-xl text-xs font-semibold text-deep-navy cursor-pointer"
                      >
                        <option value="instock">Còn hàng</option>
                        <option value="outofstock">Hết hàng</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                        Trạng thái
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 bg-[#faf8ff] border border-black/10 rounded-xl text-xs font-semibold text-deep-navy cursor-pointer"
                      >
                        <option value="active">Kích hoạt</option>
                        <option value="draft">Bản nháp</option>
                      </select>
                    </div>
                  </div>

                  {/* Is Featured Checkbox */}
                  <label className="flex items-center gap-2 text-xs font-bold text-deep-navy pl-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                    />
                    <span>Đặt làm sản phẩm Nổi bật (Trang chủ)</span>
                  </label>
                </div>
              </div>

              {/* Gallery upload */}
              <div className="space-y-2 border-t border-black/5 pt-4">
                <label className="text-xs font-bold text-deep-navy uppercase tracking-wider pl-1 block">
                  Thư viện ảnh sản phẩm (Gallery)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-xl overflow-hidden border border-black/10 group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute inset-0 bg-black/45 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <label className="w-20 h-20 rounded-xl border border-dashed border-black/20 hover:border-primary transition-all flex flex-col items-center justify-center text-slate-400 hover:text-primary cursor-pointer">
                    {galleryUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    ) : (
                      <>
                        <PlusCircle className="w-5 h-5" />
                        <span className="text-[8px] font-bold mt-1">
                          Thêm ảnh
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      disabled={galleryUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-3 border-t border-black/5 pt-4">
                <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Mô tả chi tiết sản phẩm
                </label>
                <div className="border border-black/10 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
                  <div ref={editorRef} className="min-h-[220px]"></div>
                </div>
              </div>

              {/* Form Action buttons */}
              <div className="border-t border-black/5 pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={actionLoading}
                  className="px-5 py-3 bg-black/5 hover:bg-black/10 rounded-2xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/20"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>Lưu Sản Phẩm</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XOÁ */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setProductToDelete(null)}
          ></div>
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 w-full max-w-sm relative z-10 space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-deep-navy">
                Xoá sản phẩm?
              </h4>
              <p className="text-xs font-semibold text-on-surface-variant leading-relaxed mt-1">
                Bạn có chắc chắn muốn xoá sản phẩm{" "}
                <span className="font-bold">{productToDelete.name}</span>? Hành
                động này sẽ loại bỏ hoàn toàn thông tin sản phẩm và không thể
                hoàn tác.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteProduct}
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
