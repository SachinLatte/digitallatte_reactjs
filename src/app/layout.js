import { Plus_Jakarta_Sans, Libre_Franklin } from "next/font/google";
import "./globals.css";
import Header from "./components/common/Header";
import SmoothScroll from "./components/common/SmoothScroll";
import ScrollToTop from "./components/common/ScrollToTop";
import Footer from "./components/common/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  icons: {
    icon: `${basePath}/favicon-32x32.png`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${libreFranklin.variable} antialiased overflow-x-hidden`}
    >
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}