import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/common/Header";
import SmoothScroll from "./components/common/SmoothScroll";
import ScrollToTop from "./components/common/ScrollToTop";
import Footer from "./components/common/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
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
      className={`${plusJakartaSans.variable} ${dmSans.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}