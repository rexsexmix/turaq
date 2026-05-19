import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Turaq — Найди своё место",
  description: "Аренда и продажа недвижимости в Казахстане",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full font-sans bg-surface text-text-primary transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
