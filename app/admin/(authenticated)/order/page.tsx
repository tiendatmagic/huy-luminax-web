"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Loader2,
  ShieldAlert,
  CheckCircle2,
  X,
  FileText,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Tag,
} from "lucide-react";

interface OrderItem {
  id: number;
  product_id: number | null;
  product_name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: number;
  order_code: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string;
  customer_address: string;
  note: string | null;
  total_amount: string;
  payment_method: string;
  status: string;
  created_at: string;
  items?: OrderItem[];
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Fetch danh sách đơn hàng
  const fetchOrders = async (page = 1, status = "all") => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/auth/orders?page=${page}&status=${status}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
        setTotalOrdersCount(data.total);
      } else {
        throw new Error("Không thể lấy danh sách đơn hàng.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err.message, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  // Xem chi tiết đơn hàng
  const handleViewDetails = async (orderId: number) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/auth/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedOrder(data);
        setIsDetailModalOpen(true);
      } else {
        throw new Error("Không thể tải chi tiết đơn hàng.");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/auth/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Cập nhật trạng thái thất bại.");
      }

      setMessage({ text: "Cập nhật trạng thái đơn hàng thành công!", isError: false });
      
      // Update local state danh sách đơn hàng
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );

      // Cập nhật state chi tiết nếu đang mở
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 text-amber-700 border-amber-200";
      case "processing":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-slate-500/10 text-slate-700 border-slate-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatVnd = (val: string | null) => {
    if (!val) return "0 đ";
    return parseFloat(val).toLocaleString("vi-VN") + " đ";
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="w-full bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-deep-navy">Danh sách đơn hàng</h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/25">
              {totalOrdersCount} Đơn hàng
            </span>
          </div>

          {/* Bộ lọc trạng thái */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface-variant/80 uppercase">Lọc theo:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-slate-50 border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy outline-none cursor-pointer"
            >
              <option value="all">Tất cả đơn hàng</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
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
            <p className="text-xs font-semibold text-on-surface-variant">Đang tải đơn hàng...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant font-semibold text-sm">
            Chưa có đơn hàng nào được tạo.
          </div>
        ) : (
          /* Danh sách bảng đơn hàng */
          <div className="space-y-4">
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-black/5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    <th className="py-3 px-4">Mã đơn</th>
                    <th className="py-3 px-4">Khách hàng</th>
                    <th className="py-3 px-4">Số điện thoại</th>
                    <th className="py-3 px-4 text-center">Tổng tiền</th>
                    <th className="py-3 px-4 text-center">Trạng thái</th>
                    <th className="py-3 px-4 text-center">Ngày đặt</th>
                    <th className="py-3 px-4 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-sm font-semibold text-deep-navy">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-black/[0.01] transition-colors">
                      <td className="py-4 px-4 font-bold text-primary text-xs font-mono select-all">
                        {order.order_code}
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-bold">{order.customer_name}</p>
                          {order.customer_email && (
                            <span className="text-[10px] text-on-surface-variant/70 font-normal block">
                              {order.customer_email}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-mono text-on-surface-variant">
                        {order.customer_phone}
                      </td>
                      <td className="py-4 px-4 text-center text-xs font-black text-primary">
                        {formatVnd(order.total_amount)}
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        {/* Dropdown thay đổi trạng thái nhanh */}
                        <select
                          value={order.status}
                          disabled={actionLoading}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border uppercase cursor-pointer outline-none ${getStatusBadgeClass(
                            order.status
                          )}`}
                        >
                          <option value="pending" className="text-amber-700 bg-white">Chờ xử lý</option>
                          <option value="processing" className="text-blue-700 bg-white">Đang xử lý</option>
                          <option value="completed" className="text-green-700 bg-white">Hoàn thành</option>
                          <option value="cancelled" className="text-red-700 bg-white">Đã hủy</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-center text-xs text-on-surface-variant font-medium">
                        {new Date(order.created_at).toLocaleDateString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleViewDetails(order.id)}
                          className="p-1.5 rounded-xl text-primary hover:bg-primary/15 transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold"
                          title="Xem chi tiết đơn hàng"
                        >
                          <Eye className="w-4.5 h-4.5" />
                          <span>Chi tiết</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-black/5 pt-4 flex-wrap gap-3">
                <span className="text-xs font-semibold text-on-surface-variant">
                  Trang {currentPage} trên tổng số {totalPages} trang
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || actionLoading}
                    className="w-8 h-8 rounded-lg border border-black/5 flex items-center justify-center text-on-surface hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.02] transition-all cursor-pointer"
                  >
                    &larr;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      disabled={actionLoading}
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
                    disabled={currentPage === totalPages || actionLoading}
                    className="w-8 h-8 rounded-lg border border-black/5 flex items-center justify-center text-on-surface hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.02] transition-all cursor-pointer"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: CHI TIẾT ĐƠN HÀNG */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDetailModalOpen(false)}
          ></div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-black/5 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 space-y-6 scrollbar-none">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <div>
                <h3 className="text-base font-black text-deep-navy flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Chi tiết đơn hàng: <span className="font-mono text-primary select-all">{selectedOrder.order_code}</span>
                </h3>
                <span className="text-[10px] text-on-surface-variant font-semibold mt-1 block">
                  Đặt lúc: {new Date(selectedOrder.created_at).toLocaleString("vi-VN")}
                </span>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-deep-navy cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột trái: Thông tin khách hàng & Trạng thái */}
              <div className="space-y-4">
                <div className="bg-[#faf8ff] p-5 rounded-2xl border border-black/5 space-y-3">
                  <h4 className="text-xs font-black text-deep-navy uppercase tracking-wider pl-0.5">Thông tin khách hàng</h4>
                  
                  <div className="space-y-2 text-xs font-semibold text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-bold text-deep-navy">{selectedOrder.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <span>{selectedOrder.customer_phone}</span>
                    </div>
                    {selectedOrder.customer_email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <span>{selectedOrder.customer_email}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{selectedOrder.customer_address}</span>
                    </div>
                  </div>
                </div>

                {/* Cập nhật Trạng thái & Ghi chú */}
                <div className="bg-[#faf8ff] p-5 rounded-2xl border border-black/5 space-y-3">
                  <h4 className="text-xs font-black text-deep-navy uppercase tracking-wider pl-0.5">Trạng thái đơn hàng</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-on-surface-variant">Cập nhật:</span>
                    <select
                      value={selectedOrder.status}
                      disabled={actionLoading}
                      onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border uppercase cursor-pointer outline-none ${getStatusBadgeClass(
                        selectedOrder.status
                      )}`}
                    >
                      <option value="pending" className="text-amber-700 bg-white">Chờ xử lý</option>
                      <option value="processing" className="text-blue-700 bg-white">Đang xử lý</option>
                      <option value="completed" className="text-green-700 bg-white">Hoàn thành</option>
                      <option value="cancelled" className="text-red-700 bg-white">Đã hủy</option>
                    </select>
                  </div>

                  {selectedOrder.note && (
                    <div className="pt-2.5 border-t border-black/5 space-y-1">
                      <span className="text-[10px] font-bold text-on-surface-variant/80 uppercase block">Ghi chú của khách:</span>
                      <p className="text-xs font-semibold text-deep-navy leading-relaxed italic">
                        "{selectedOrder.note}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cột phải: Danh sách sản phẩm mua */}
              <div className="space-y-4">
                <div className="bg-[#faf8ff] p-5 rounded-2xl border border-black/5 space-y-3 flex flex-col h-full justify-between">
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-deep-navy uppercase tracking-wider pl-0.5 border-b border-black/5 pb-2">
                      Sản phẩm đã mua
                    </h4>
                    
                    <div className="space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-none">
                      {selectedOrder.items?.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs font-bold text-deep-navy">
                          <div className="min-w-0 pr-2">
                            <p className="truncate" title={item.product_name}>{item.product_name}</p>
                            <span className="text-[10px] text-on-surface-variant/70 font-semibold font-mono block">
                              x{item.quantity} - {formatVnd(item.price)}
                            </span>
                          </div>
                          <span className="text-primary font-black shrink-0">
                            {(parseFloat(item.price) * item.quantity).toLocaleString("vi-VN")} đ
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-black/5 pt-3 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
                      <span>Hình thức thanh toán:</span>
                      <span className="uppercase text-deep-navy">COD</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
                      <span>Phí vận chuyển:</span>
                      <span className="text-green-600 font-bold uppercase text-[9px] bg-green-500/10 px-2 py-0.5 rounded-full border border-green-200">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-deep-navy pt-2 border-t border-black/5">
                      <span>Tổng tiền đơn hàng:</span>
                      <span className="text-primary font-black text-base">
                        {formatVnd(selectedOrder.total_amount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end pt-4 border-t border-black/5">
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="px-5 py-2.5 bg-black/5 hover:bg-black/10 rounded-2xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
