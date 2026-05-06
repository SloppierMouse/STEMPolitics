import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STEMpolitics.com",
  description: "Making the case for STEM in public service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen font-sans">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="bg-slate-dark text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="font-semibold text-lg">STEMpolitics.com</p>
            <p className="text-gray-400 mt-1 text-sm">
              Making the case for STEM in public service.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
