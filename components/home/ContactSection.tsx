"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ContactSection() {
  const [settings, setSettings] = useState<any>({
    company_phone: "093.366.3112",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/public/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.company_phone) {
            setSettings({ company_phone: data.company_phone });
          }
        }
      } catch (err) {
        console.error("Lỗi lấy settings ContactSection:", err);
      }
    };
    fetchSettings();
  }, []);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactContent, setContactContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactContent.trim()) {
      setSubmitMessage({
        text: "Vui lòng nhập đầy đủ các thông tin bắt buộc.",
        isError: true,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const res = await fetch("/api/public/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim() || null,
          phone: contactPhone.trim(),
          content: contactContent.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitMessage({ text: data.message, isError: false });
        setContactName("");
        setContactEmail("");
        setContactPhone("");
        setContactContent("");
        // Tự động đóng modal sau 2.5s
        setTimeout(() => {
          setIsContactModalOpen(false);
          setSubmitMessage(null);
        }, 2500);
      } else {
        setSubmitMessage({
          text: data.message || "Đã xảy ra lỗi khi gửi yêu cầu.",
          isError: true,
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage({
        text: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact-section" className="py-20 px-6 max-w-4xl mx-auto relative reveal">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="floating-blob w-72 h-72 bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30"></div>
        </div>

        <div className="glass-premium rounded-[2.5rem] p-8 md:p-12 border border-white/45 relative overflow-hidden shadow-2xl text-center space-y-8 relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center mb-2 border border-primary/10">
              <span className="material-symbols-outlined text-primary text-3xl font-fill">forum</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-primary glow-effect animate-ping"></span>
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                Kết Nối Nhanh
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-headline font-black text-deep-navy">
              Liên Hệ Với Chúng Tôi
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed font-semibold">
              Quý khách có nhu cầu hợp tác B2B, yêu cầu kỹ thuật chuyên sâu về
              Luminax AI hoặc phản hồi dịch vụ? Hãy kết nối trực tiếp với
              chúng tôi qua hotline hoặc gửi thông tin qua biểu mẫu trực
              tuyến.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4">
            {/* Nút Gọi Hotline */}
            <a
              href={`tel:${settings.company_phone.replace(/\./g, "")}`}
              className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-red-500/15 hover:shadow-red-500/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              <span>GỌI HOTLINE: {settings.company_phone}</span>
            </a>

            {/* Nút Mở Form Liên Hệ */}
            <button
              onClick={() => {
                setSubmitMessage(null);
                setIsContactModalOpen(true);
              }}
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b2e5] hover:to-[#0066e5] text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#0072ff]/15 hover:shadow-[#0072ff]/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              <span>GỬI FORM LIÊN HỆ TRỰC TUYẾN</span>
            </button>
          </div>
        </div>
      </section>

      {/* MODAL FORM LIÊN HỆ */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => {
              if (!isSubmitting) setIsContactModalOpen(false);
            }}
          ></div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-black/5 w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10 space-y-6 animate-scale-up scrollbar-none">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-2xl">
                  mail
                </span>
                <h3 className="text-lg font-bold text-deep-navy">
                  Gửi yêu cầu liên hệ
                </h3>
              </div>
              <button
                disabled={isSubmitting}
                onClick={() => setIsContactModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 text-deep-navy cursor-pointer transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {submitMessage && (
              <div
                className={`flex items-start gap-2.5 border text-sm font-semibold p-4 rounded-2xl ${
                  submitMessage.isError
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-green-50 border-green-200 text-green-700"
                }`}
              >
                <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">
                  {submitMessage.isError ? "report" : "check_circle"}
                </span>
                <span>{submitMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Nhập họ tên của bạn..."
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    disabled={isSubmitting}
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Nhập số điện thoại..."
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    disabled={isSubmitting}
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="example@gmail.com..."
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider pl-1">
                  Nội dung liên hệ <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  disabled={isSubmitting}
                  value={contactContent}
                  onChange={(e) => setContactContent(e.target.value)}
                  placeholder="Nhập nội dung chi tiết bạn muốn gửi..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/5">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-6 py-3 bg-black/5 hover:bg-black/10 rounded-2xl text-xs font-bold text-on-surface transition-colors cursor-pointer disabled:opacity-40"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="material-symbols-outlined text-sm font-bold">
                      send
                    </span>
                  )}
                  <span>{isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
