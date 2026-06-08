"use client";

import React, { useState } from "react";

const faqsList = [
  {
    question: "Luminax AI giúp ích gì trong sản xuất?",
    answer:
      "Hệ thống AI phân tích hàng triệu điểm dữ liệu theo thời gian thực để tối ưu hóa công thức hóa học, giảm thiểu sai sót con người và đảm bảo độ tinh khiết đạt mức 99.998% trong suốt quá trình vận hành dây chuyền.",
  },
  {
    question: "Sản phẩm tiêu dùng có thực sự an toàn không?",
    answer:
      "Hoàn toàn an toàn. Mọi sản phẩm khăn giấy và hóa chất gia dụng của Huy Luminax đều trải qua quy trình diệt khuẩn quang phổ rộng và được kiểm chứng tự động bởi hệ thống Computer Vision QA trước khi đóng gói.",
  },
  {
    question: "Làm thế nào để trở thành đối tác của Huy Luminax?",
    answer:
      "Quý khách có thể liên hệ trực tiếp qua mục 'Liên hệ công tác' ở chân trang hoặc điền thông tin gửi về bộ phận kinh doanh qua email liên hệ để nhận báo giá chi tiết và các giải pháp B2B tùy chỉnh phù hợp.",
  },
  {
    question: "Công nghệ AI có làm tăng giá thành sản phẩm?",
    answer:
      "Không, ngược lại việc tối ưu hóa bằng AI giúp giảm thiểu tối đa lãng phí nguyên liệu và năng lượng tiêu thụ, cho phép chúng tôi tối ưu chi phí và cung cấp sản phẩm chất lượng cao với mức giá cạnh tranh nhất.",
  },
];

export default function FaqsSection() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto relative reveal">
      <div className="text-center mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-primary glow-effect animate-ping"></span>
          <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
            Giải Đáp Thắc Mắc
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-headline font-black text-deep-navy">
          Câu hỏi thường gặp
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-semibold">
          Giải đáp các thắc mắc phổ biến về công nghệ AI và tiêu chuẩn an
          toàn của Huy Luminax.
        </p>
      </div>

      {/* Chia FAQ làm 2 cột bằng grid md:grid-cols-2 */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {faqsList.map((faq, idx) => {
          const isOpen = activeFAQ === idx;
          return (
            <div
              key={idx}
              className="glass-premium rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/80 transition-colors duration-200"
              >
                <h3 className="font-headline text-base sm:text-lg font-bold text-deep-navy pr-4">
                  {faq.question}
                </h3>
                <span
                  className={`material-symbols-outlined text-primary text-2xl transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "max-h-[200px] opacity-100 border-t border-white/20"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="p-6 text-sm sm:text-base text-on-surface-variant leading-relaxed font-semibold">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
