"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  ArrowRight,
  ChevronLeft,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  const loadCart = () => {
    try {
      const cartData = localStorage.getItem("cart");
      const cartItems = cartData ? JSON.parse(cartData) : [];
      setCart(cartItems);

      const total = cartItems.reduce((acc: number, item: any) => {
        const price = parseFloat(item.price);
        return acc + (isNaN(price) ? 0 : price) * item.quantity;
      }, 0);
      setCartTotal(total);
    } catch (err) {
      console.error("Lỗi tải giỏ hàng trang chi tiết:", err);
    }
  };

  useEffect(() => {
    setIsClient(true);
    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    const updated = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen bg-[#faf8ff]">
        <Header />
        <main className="flex-grow pt-36 pb-20 max-w-7xl mx-auto px-6 w-full"></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-grow pt-32 md:pt-36 lg:pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Breadcrumb / Title */}
          <div className="space-y-2">
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              TIẾP TỤC MUA SẮM
            </Link>
            <h1 className="text-2xl sm:text-3xl font-headline font-black text-deep-navy">
              Giỏ hàng của bạn
            </h1>
          </div>

          {cart.length === 0 ? (
            /* Giỏ hàng trống */
            <div className="bg-white border border-black/5 rounded-3xl p-12 text-center shadow-sm space-y-6 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="text-base font-bold text-deep-navy">
                  Giỏ hàng hiện tại đang trống
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng của mình. Hãy quay lại hệ sinh thái sản phẩm để chọn lựa.
                </p>
              </div>
              <Link
                href="/san-pham"
                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary/10"
              >
                QUAY LẠI CỬA HÀNG
              </Link>
            </div>
          ) : (
            /* Có sản phẩm */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Cột trái: Danh sách sản phẩm (8 cột) */}
              <div className="lg:col-span-8 bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="overflow-x-auto scrollbar-none">
                  <table className="w-full text-left border-collapse min-w-[550px]">
                    <thead>
                      <tr className="border-b border-black/5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 pr-4">Sản phẩm</th>
                        <th className="py-3 px-4 text-center">Giá bán</th>
                        <th className="py-3 px-4 text-center">Số lượng</th>
                        <th className="py-3 px-4 text-center">Thành tiền</th>
                        <th className="py-3 pl-4 text-center">Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 text-sm font-semibold text-deep-navy">
                      {cart.map((item) => (
                        <tr key={item.id} className="group/row">
                          {/* Info */}
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-black/5 shrink-0 bg-slate-50">
                                {item.featured_image ? (
                                  <Image
                                    src={item.featured_image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <span className="material-symbols-outlined">image</span>
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <Link
                                  href={`/san-pham/${item.slug}`}
                                  className="font-bold hover:text-primary transition-colors line-clamp-1 block text-sm"
                                  title={item.name}
                                >
                                  {item.name}
                                </Link>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="py-4 px-4 text-center text-xs font-bold whitespace-nowrap">
                            {parseFloat(item.price).toLocaleString("vi-VN")} đ
                          </td>

                          {/* Quantity selector */}
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center border border-black/10 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2.5 py-1 hover:bg-black/5 font-bold transition-all text-on-surface-variant cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-xs font-bold text-deep-navy">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2.5 py-1 hover:bg-black/5 font-bold transition-all text-on-surface-variant cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Line total */}
                          <td className="py-4 px-4 text-center text-xs font-black text-primary whitespace-nowrap">
                            {(parseFloat(item.price) * item.quantity).toLocaleString("vi-VN")} đ
                          </td>

                          {/* Delete Action */}
                          <td className="py-4 pl-4 text-center">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center"
                              title="Xóa khỏi giỏ hàng"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cột phải: Thanh toán (4 cột) */}
              <div className="lg:col-span-4 bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="text-base font-bold text-deep-navy border-b border-black/5 pb-2 uppercase tracking-wider">
                  Tổng đơn hàng
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant/80">
                    <span>Số lượng sản phẩm:</span>
                    <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant/80">
                    <span>Tạm tính:</span>
                    <span>{cartTotal.toLocaleString("vi-VN")} đ</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant/80 pb-2 border-b border-black/5">
                    <span>Vận chuyển:</span>
                    <span className="text-green-600 font-bold uppercase text-[10px] bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-200">
                      Miễn phí
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold text-deep-navy pt-2">
                    <span>Tổng thanh toán:</span>
                    <span className="text-primary font-black text-lg">
                      {cartTotal.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>

                <Link
                  href="/thanh-toan"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-primary/20 hover:shadow-primary/45 transition-all text-center cursor-pointer"
                >
                  XÁC NHẬN ĐẶT HÀNG
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
