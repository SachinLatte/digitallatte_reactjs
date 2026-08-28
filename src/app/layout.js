import { Plus_Jakarta_Sans, Libre_Franklin } from "next/font/google";
import "./globals.css";
import AppLayoutShell from "./components/common/AppLayoutShell";

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
    icon: `${basePath}/favicon-32x32.webp`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${libreFranklin.variable} antialiased overflow-x-hidden`}
    >
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <AppLayoutShell>{children}</AppLayoutShell>
      </body>
    </html>
  );
}