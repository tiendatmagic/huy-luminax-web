import type { Metadata } from "next";
import { Inter, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MaintenanceGuard from "@/components/MaintenanceGuard";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "vietnamese"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huy Luminax - Trí Tuệ Nhân Tạo & Tinh Hoa Hóa Chemical Việt Nam",
  description:
    "CÔNG TY TNHH HUY LUMINAX là đơn vị đi đầu trong việc tích hợp nghiên cứu hóa sinh và ứng dụng mô hình học máy Luminax AI. Chúng tôi cung cấp các dòng sản phẩm khăn giấy kháng khuẩn cao cấp, hóa chất cơ bản công nghiệp B2B đạt độ tinh khiết 99.998% và các giải pháp tự động hóa chuỗi cung ứng tối ưu.",
  keywords:
    "Huy Luminax, Luminax AI, hóa mỹ phẩm, hóa chất cơ bản, khăn giấy kháng khuẩn, khăn giấy cao cấp, ứng dụng AI hóa chất, sản xuất xanh, Computer Vision QA, PyTorch hóa chất, B2B hóa chất Việt Nam, công nghệ sản xuất khăn giấy",
  authors: [
    { name: "CÔNG TY TNHH HUY LUMINAX", url: "https://huy-luminax.com" },
  ],
  creator: "Huy Luminax Technology Team",
  publisher: "CÔNG TY TNHH HUY LUMINAX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Huy Luminax - Trí Tuệ Nhân Tạo & Tinh Hoa Hóa Chất",
    description:
      "Tiên phong tích hợp nghiên cứu hóa sinh và trí tuệ nhân tạo Luminax AI vào dây chuyền sản xuất khăn giấy và hóa chất cơ bản đạt độ tinh khiết tuyệt đối 99.998%.",
    url: "https://huy-luminax.com",
    siteName: "Huy Luminax",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huy Luminax - AI & Hóa Mỹ Phẩm Việt Nam",
    description:
      "Tiên phong ứng dụng trí tuệ nhân tạo vào sản xuất hóa mỹ phẩm xanh và tinh khiết.",
    creator: "@huyluminax",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${hanken.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Material Symbols Outlined for UI Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary-container selection:text-on-primary">
        <MaintenanceGuard>
          {children}
        </MaintenanceGuard>
      </body>
    </html>
  );
}
