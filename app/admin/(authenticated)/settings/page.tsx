"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Building2,
  Globe,
  Share2,
  Search,
  Sliders,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  Save,
  Info,
} from "lucide-react";

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState<any>({
    site_name: "",
    site_slogan: "",
    company_name: "",
    company_address: "",
    company_phone: "",
    company_email: "",
    company_tax_code: "",
    company_working_hours: "",
    social_facebook: "",
    social_youtube: "",
    social_linkedin: "",
    social_zalo: "",
    widget_call_show: "1",
    widget_call_value: "",
    widget_zalo_show: "1",
    widget_zalo_value: "",
    widget_facebook_show: "0",
    widget_facebook_value: "",
    widget_messenger_show: "0",
    widget_messenger_value: "",
    widget_instagram_show: "0",
    widget_instagram_value: "",
    widget_contact_show: "1",
    widget_contact_value: "",
    seo_meta_title: "",
    seo_meta_description: "",
    google_analytics_id: "",
    maintenance_mode: "0",
    posts_per_page: "9",
    custom_header_scripts: "",
    custom_footer_scripts: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Fetch settings từ API
  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      } else {
        throw new Error("Không thể tải cài đặt hệ thống.");
      }
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prev: any) => ({
      ...prev,
      [name]: checked ? "1" : "0",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSaving(true);

    try {
      const res = await fetch("/api/auth/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Cập nhật cài đặt thất bại.");
      }

      setMessage({ text: "Đã lưu tất cả thay đổi cài đặt hệ thống thành công!", isError: false });
      setSettings(data.settings);
      
      // Phát sự kiện toàn cục để cập nhật các cấu hình tĩnh ở các nơi khác nếu cần
      window.dispatchEvent(new Event("settingsUpdated"));
      
      // Cuộn lên đầu để xem thông báo thành công
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-sm font-bold text-deep-navy">Đang tải cài đặt hệ thống...</p>
      </div>
    );
  }

  const tabs = [
    { id: "general", name: "Doanh nghiệp", icon: Building2 },
    { id: "social", name: "Mạng xã hội & Widget", icon: Share2 },
    { id: "seo", name: "SEO & Google Analytics", icon: Search },
    { id: "advanced", name: "Hệ thống & Script", icon: Sliders },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl">
      {/* Banner thông báo */}
      {message && (
        <div className={`flex items-start gap-2.5 border text-sm font-semibold p-4 rounded-2xl animate-fade-in ${
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

      <div className="bg-white border border-black/5 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-slate-50/50 border-b md:border-b-0 md:border-r border-black/5 p-4 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-primary/5 hover:text-deep-navy"
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-grow p-6 md:p-8 space-y-6">
          {/* TAB 1: DOANH NGHIỆP */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="border-b border-black/5 pb-2">
                <h4 className="text-base font-bold text-deep-navy">Thông tin Website & Doanh nghiệp</h4>
                <p className="text-xs text-on-surface-variant/80 mt-1">Thông tin cấu hình thương hiệu chính thức xuất hiện tại Header, Footer và Liên hệ.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Tên Website <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    name="site_name"
                    value={settings.site_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="Huy Luminax"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Tên Công ty <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    name="company_name"
                    value={settings.company_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="CÔNG TY TNHH HUY LUMINAX"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Slogan / Giới thiệu ngắn</label>
                <textarea
                  name="site_slogan"
                  value={settings.site_slogan}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300 resize-none"
                  placeholder="Mô tả hoặc khẩu hiệu của công ty..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Địa chỉ trụ sở <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  name="company_address"
                  value={settings.company_address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                  placeholder="Số 123 Đường Công Nghệ,..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Hotline liên hệ <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    name="company_phone"
                    value={settings.company_phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="0987.654.321"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Email chính thức <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    name="company_email"
                    value={settings.company_email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="contact@luminax.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Mã số thuế</label>
                  <input
                    type="text"
                    name="company_tax_code"
                    value={settings.company_tax_code}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="0102030405"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Giờ làm việc</label>
                  <input
                    type="text"
                    name="company_working_hours"
                    value={settings.company_working_hours}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="Thứ 2 - Thứ 7 (08:00 - 17:00)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MẠNG XÃ HỘI & WIDGET LIÊN HỆ */}
          {activeTab === "social" && (
            <div className="space-y-4">
              <div className="border-b border-black/5 pb-2">
                <h4 className="text-base font-bold text-deep-navy">Liên kết Mạng xã hội & Widget Liên hệ</h4>
                <p className="text-xs text-on-surface-variant/80 mt-1">Kết nối các tài khoản MXH và cấu hình hiển thị cho các nút liên hệ nổi góc màn hình.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Facebook Page</label>
                  <input
                    type="url"
                    name="social_facebook"
                    value={settings.social_facebook || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="https://facebook.com/company"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">YouTube Channel</label>
                  <input
                    type="url"
                    name="social_youtube"
                    value={settings.social_youtube || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="https://youtube.com/c/company"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">LinkedIn Company</label>
                  <input
                    type="url"
                    name="social_linkedin"
                    value={settings.social_linkedin || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Số điện thoại Zalo</label>
                  <input
                    type="text"
                    name="social_zalo"
                    value={settings.social_zalo || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="0987654321"
                  />
                </div>
              </div>

              {/* Phần cấu hình các nút Widget liên hệ nổi */}
              <div className="border-t border-black/5 pt-4 space-y-4">
                <h5 className="text-xs sm:text-sm font-black text-deep-navy uppercase tracking-wider pl-1">Cấu hình Widget Liên hệ nổi (Góc dưới bên phải)</h5>
                
                {/* 1. Nút Gọi điện */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-red-50/30 border border-red-100 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-navy min-w-[150px] shrink-0 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="widget_call_show"
                      checked={settings.widget_call_show === "1"}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded text-red-500 focus:ring-red-400 cursor-pointer"
                    />
                    <span>Nút Gọi điện</span>
                  </label>
                  <input
                    type="text"
                    name="widget_call_value"
                    value={settings.widget_call_value || ""}
                    onChange={handleChange}
                    disabled={settings.widget_call_show !== "1"}
                    className="flex-grow px-4 py-2 bg-white border border-black/10 rounded-xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:border-primary transition-all disabled:opacity-50 disabled:bg-slate-50"
                    placeholder="Số điện thoại gọi điện (Ví dụ: 0987.654.321)"
                  />
                </div>

                {/* 2. Nút Zalo */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-blue-50/20 border border-blue-100/50 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-navy min-w-[150px] shrink-0 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="widget_zalo_show"
                      checked={settings.widget_zalo_show === "1"}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                    />
                    <span>Nút Zalo</span>
                  </label>
                  <input
                    type="text"
                    name="widget_zalo_value"
                    value={settings.widget_zalo_value || ""}
                    onChange={handleChange}
                    disabled={settings.widget_zalo_show !== "1"}
                    className="flex-grow px-4 py-2 bg-white border border-black/10 rounded-xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:border-primary transition-all disabled:opacity-50 disabled:bg-slate-50"
                    placeholder="Số điện thoại Zalo (Ví dụ: 0987654321)"
                  />
                </div>

                {/* 3. Nút Facebook Page */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-indigo-50/20 border border-indigo-100/50 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-navy min-w-[150px] shrink-0 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="widget_facebook_show"
                      checked={settings.widget_facebook_show === "1"}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span>Nút Facebook</span>
                  </label>
                  <input
                    type="url"
                    name="widget_facebook_value"
                    value={settings.widget_facebook_value || ""}
                    onChange={handleChange}
                    disabled={settings.widget_facebook_show !== "1"}
                    className="flex-grow px-4 py-2 bg-white border border-black/10 rounded-xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:border-primary transition-all disabled:opacity-50 disabled:bg-slate-50"
                    placeholder="Link trang Facebook (Ví dụ: https://facebook.com/company)"
                  />
                </div>

                {/* 4. Nút Messenger */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-purple-50/20 border border-purple-100/50 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-navy min-w-[150px] shrink-0 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="widget_messenger_show"
                      checked={settings.widget_messenger_show === "1"}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span>Nút Messenger</span>
                  </label>
                  <input
                    type="url"
                    name="widget_messenger_value"
                    value={settings.widget_messenger_value || ""}
                    onChange={handleChange}
                    disabled={settings.widget_messenger_show !== "1"}
                    className="flex-grow px-4 py-2 bg-white border border-black/10 rounded-xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:border-primary transition-all disabled:opacity-50 disabled:bg-slate-50"
                    placeholder="Link chat Messenger (Ví dụ: https://m.me/username hoặc https://messenger.com/t/...)"
                  />
                </div>

                {/* 5. Nút Instagram */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-pink-50/20 border border-pink-100/50 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-navy min-w-[150px] shrink-0 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="widget_instagram_show"
                      checked={settings.widget_instagram_show === "1"}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded text-pink-500 focus:ring-pink-400 cursor-pointer"
                    />
                    <span>Nút Instagram</span>
                  </label>
                  <input
                    type="url"
                    name="widget_instagram_value"
                    value={settings.widget_instagram_value || ""}
                    onChange={handleChange}
                    disabled={settings.widget_instagram_show !== "1"}
                    className="flex-grow px-4 py-2 bg-white border border-black/10 rounded-xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:border-primary transition-all disabled:opacity-50 disabled:bg-slate-50"
                    placeholder="Link tài khoản Instagram (Ví dụ: https://instagram.com/company)"
                  />
                </div>

                {/* 6. Nút Hỗ trợ (Nội bộ / Form Contact) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-teal-50/20 border border-teal-100/50 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-navy min-w-[150px] shrink-0 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="widget_contact_show"
                      checked={settings.widget_contact_show === "1"}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                    <span>Nút Chat Hỗ Trợ</span>
                  </label>
                  <input
                    type="text"
                    name="widget_contact_value"
                    value={settings.widget_contact_value || ""}
                    onChange={handleChange}
                    disabled={settings.widget_contact_show !== "1"}
                    className="flex-grow px-4 py-2 bg-white border border-black/10 rounded-xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:border-primary transition-all disabled:opacity-50 disabled:bg-slate-50"
                    placeholder="Đường dẫn trang liên hệ (Ví dụ: /#contact hoặc link chat trực tuyến)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SEO & GOOGLE ANALYTICS */}
          {activeTab === "seo" && (
            <div className="space-y-4">
              <div className="border-b border-black/5 pb-2">
                <h4 className="text-base font-bold text-deep-navy">Cấu hình SEO & Đo lường Google Analytics</h4>
                <p className="text-xs text-on-surface-variant/80 mt-1">Thiết lập các thuộc tính tối ưu hóa tìm kiếm mặc định cho toàn trang và ID đo lường.</p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Tiêu đề SEO Trang chủ (Meta Title)</label>
                <input
                  type="text"
                  name="seo_meta_title"
                  value={settings.seo_meta_title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                  placeholder="Huy Luminax - Hóa sinh xanh & Trí tuệ nhân tạo..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Mô tả SEO Trang chủ (Meta Description)</label>
                <textarea
                  name="seo_meta_description"
                  value={settings.seo_meta_description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300 resize-none"
                  placeholder="Mô tả ngắn gọn nội dung website cho kết quả tìm kiếm Google..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Google Analytics ID (G-XXXXXXX)</label>
                <input
                  type="text"
                  name="google_analytics_id"
                  value={settings.google_analytics_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </div>
          )}

          {/* TAB 4: HỆ THỐNG & SCRIPT */}
          {activeTab === "advanced" && (
            <div className="space-y-4">
              <div className="border-b border-black/5 pb-2">
                <h4 className="text-base font-bold text-deep-navy">Cài đặt Hệ thống & Nhúng Mã Script</h4>
                <p className="text-xs text-on-surface-variant/80 mt-1">Quản lý trạng thái hoạt động của website và nhúng các đoạn mã tùy chọn.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Chế độ bảo trì hệ thống</label>
                  <select
                    name="maintenance_mode"
                    value={settings.maintenance_mode}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300 cursor-pointer"
                  >
                    <option value="0">Tắt (Website hoạt động công khai)</option>
                    <option value="1">Bật (Hiển thị trang thông báo bảo trì)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Số bài viết mỗi trang (Pagination) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    required
                    name="posts_per_page"
                    value={settings.posts_per_page}
                    onChange={handleChange}
                    min="3"
                    max="50"
                    className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs sm:text-sm font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300"
                    placeholder="9"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Mã Script Custom Header (Chèn trong thẻ &lt;head&gt;)</label>
                <textarea
                  name="custom_header_scripts"
                  value={settings.custom_header_scripts || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300 font-mono text-[10px]"
                  placeholder="<!-- Ví dụ: <script>...</script> -->"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-deep-navy uppercase pl-1">Mã Script Custom Footer (Chèn trước thẻ &lt;/body&gt;)</label>
                <textarea
                  name="custom_footer_scripts"
                  value={settings.custom_footer_scripts || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#faf8ff] border border-black/10 rounded-2xl text-xs font-semibold text-deep-navy outline-none focus:bg-white focus:border-primary transition-all duration-300 font-mono text-[10px]"
                  placeholder="<!-- Nhúng widget hỗ trợ, chatbot,... -->"
                />
              </div>
            </div>
          )}

          {/* Form Action buttons */}
          <div className="border-t border-black/5 pt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={fetchSettings}
              disabled={isSaving}
              className="px-5 py-3 bg-black/5 hover:bg-black/10 rounded-2xl text-xs sm:text-sm font-bold text-on-surface transition-colors cursor-pointer disabled:opacity-50"
            >
              Hủy thay đổi
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/20 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Lưu Cài Đặt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
