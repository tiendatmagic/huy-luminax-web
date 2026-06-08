"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import BusinessAreas from "@/components/home/BusinessAreas";
import AiTechnology from "@/components/home/AiTechnology";
import SpecsBento from "@/components/home/SpecsBento";
import ProductsSlider from "@/components/home/ProductsSlider";
import NewsSlider from "@/components/home/NewsSlider";
import FaqsSection from "@/components/home/FaqsSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.08,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-grow">
        {/* Banner chính */}
        <HeroSection />

        {/* Giới thiệu công ty */}
        <AboutSection />

        {/* Lĩnh vực hoạt động */}
        <BusinessAreas />

        {/* Công nghệ AI */}
        <AiTechnology />

        {/* Bento specs */}
        <SpecsBento />

        {/* Sản phẩm nổi bật */}
        <ProductsSlider />

        {/* Tin tức nổi bật */}
        <NewsSlider />

        {/* FAQs */}
        <FaqsSection />

        {/* Section Liên hệ và Form Modal */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
