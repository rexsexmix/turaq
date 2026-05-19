import type { Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ProfilePageContent } from "@/components/profile/ProfilePageContent";

export const metadata: Metadata = {
  title: "Профиль — Turaq",
  description: "Личный кабинет (демо)",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Header />
      <ProfilePageContent />
      <Footer />
    </div>
  );
}
