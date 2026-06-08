"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Loader2,
  CheckCircle2,
  PhoneCall,
  ShoppingBag,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrderCode, setCreatedOrderCode] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);

    // Load Cart
    const cartData = localStorage.getItem("cart");
    const cartItems = cartData ? JSON.parse(cartData) : [];
    setCart(cartItems);

    const total = cartItems.reduce((acc: number, item: any) => {
      const price = parseFloat(item.price);
      return acc + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0);
    setCartTotal(total);

    // Autofill Customer Info từ localStorage
    try {
      const customerInfoData = localStorage.getItem("customer_info");
      if (customerInfoData) {
        const info = JSON.parse(customerInfoData);
        if (info.name) setName(info.name);
        if (info.phone) setPhone(info.phone);
        if (info.address) setAddress(info.address);
        if (info.email) setEmail(info.email);
      }
    } catch (err) {
      console.error("Lỗi load customer info:", err);
    }
  }, []);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate
    if (!name.trim()) {
      setErrorMessage("Vui lòng nhập họ tên.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Vui lòng nhập số điện thoại.");
      return;
    }
    if (!address.trim()) {
      setErrorMessage("Vui lòng nhập địa chỉ nhận hàng.");
      return;
    }
    if (cart.length === 0) {
      setErrorMessage("Giỏ hàng của bạn đang trống.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build order items
      const orderItems = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/public/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          customer_address: address.trim(),
          customer_email: email.trim() || null,
          note: note.trim() || null,
          items: orderItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đã xảy ra lỗi trong quá trình đặt hàng.");
      }

      // Đặt hàng thành công!
      setCreatedOrderCode(data.order_code);
      setOrderSuccess(true);

      // Lưu lại thông tin khách hàng vào localStorage cho lần sau
      const customerInfo = {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        email: email.trim(),
      };
      localStorage.setItem("customer_info", JSON.stringify(customerInfo));

      // Xóa giỏ hàng
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err: any) {
      setErrorMessage(err.message || "Đặt hàng thất bại. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
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
          {!orderSuccess && (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => router.push("/gio-hang")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4" />
                QUAY LẠI GIỎ HÀNG
              </button>
              <h1 className="text-2xl sm:text-3xl font-headline font-black text-deep-navy">
                Thanh toán
              </h1>
            </div>
          )}

          {orderSuccess ? (
            /* Đặt hàng thành công */
            <div className="bg-white border border-black/5 rounded-3xl p-8 md:p-12 text-center shadow-sm max-w-2xl mx-auto space-y-6 flex flex-col items-center justify-center animate-scale-up">
              <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-headline font-black text-deep-navy">
                  Đặt hàng thành công!
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                  Cảm ơn bạn đã tin tưởng Huy Luminax. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
                </p>
              </div>

              {/* Chi tiết mã đơn */}
              <div className="bg-[#faf8ff] border border-black/5 p-5 rounded-2xl w-full max-w-md space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
                  <span>Mã đơn hàng:</span>
                  <span className="text-primary font-black text-sm select-all">{createdOrderCode}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
                  <span>Hình thức thanh toán:</span>
                  <span className="text-deep-navy uppercase">Thanh toán khi nhận hàng (COD)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-md">
                <Link
                  href="/san-pham"
                  className="flex-1 bg-slate-50 hover:bg-slate-100 border border-black/10 text-deep-navy py-3.5 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  MUA SẢN PHẨM KHÁC
                </Link>
                <a
                  href="tel:0987654321"
                  className="flex-1 bg-primary hover:bg-primary-hover text-white py-3.5 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  HỖ TRỢ HOTLINE
                </a>
              </div>
            </div>
          ) : (
            /* Giao diện nhập thông tin thanh toán */
            <form onSubmit={handleOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Cột trái: Form thông tin (8 cột) */}
              <div className="lg:col-span-8 bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="border-b border-black/5 pb-2">
                  <h3 className="text-base font-bold text-deep-navy">Thông tin nhận hàng</h3>
                  <p className="text-[11px] text-on-surface-variant/80 mt-0.5">Vui lòng điền đầy đủ địa chỉ và số điện thoại chính xác để chúng tôi giao hàng.</p>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-4 rounded-2xl">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Họ tên */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-deep-navy uppercase pl-1">
                      Họ và tên người nhận <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  {/* SĐT & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-deep-navy uppercase pl-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                        placeholder="0987654321"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-deep-navy uppercase pl-1">
                        Email nhận thông tin
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Địa chỉ */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-deep-navy uppercase pl-1">
                      Địa chỉ nhận hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                      placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố..."
                    />
                  </div>

                  {/* Ghi chú */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-deep-navy uppercase pl-1">
                      Ghi chú đơn hàng
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300 resize-none"
                      placeholder="Ghi chú thời gian giao hàng, hướng dẫn chỉ đường..."
                    />
                  </div>
                </div>
              </div>

              {/* Cột phải: Thanh toán (4 cột) */}
              <div className="lg:col-span-4 bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="text-base font-bold text-deep-navy border-b border-black/5 pb-2 uppercase tracking-wider">
                  Đơn hàng thanh toán
                </h3>

                <div className="max-h-40 overflow-y-auto space-y-2.5 border-b border-black/5 pb-4 pr-1 scrollbar-none">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs font-semibold text-on-surface-variant">
                      <span className="truncate max-w-[150px]">{item.name}</span>
                      <span>
                        x{item.quantity} - {(parseFloat(item.price) * item.quantity).toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant/80">
                    <span>Tổng tiền hàng:</span>
                    <span>{cartTotal.toLocaleString("vi-VN")} đ</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant/80">
                    <span>Phí vận chuyển:</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="border-t border-black/5 pt-3 flex justify-between items-center text-sm font-bold text-deep-navy">
                    <span>Cần thanh toán:</span>
                    <span className="text-primary font-black text-lg">
                      {cartTotal.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="bg-[#faf8ff] border border-black/5 p-4 rounded-2xl space-y-2">
                  <h4 className="text-[10px] font-black text-deep-navy uppercase tracking-wider pl-0.5">Phương thức thanh toán</h4>
                  <label className="flex items-center gap-2.5 text-xs font-bold text-deep-navy p-2 bg-white border border-primary/20 rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      defaultChecked
                      className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
                    />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-primary/20 hover:shadow-primary/45 transition-all text-center cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      ĐANG ĐẶT HÀNG...
                    </>
                  ) : (
                    "ĐẶT HÀNG NGAY"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
