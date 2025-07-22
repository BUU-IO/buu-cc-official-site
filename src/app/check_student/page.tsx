import "react";
import CheckStudent from "@/components/CheckStudent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "关于我们-北京联合大学计算机社",
  description: "欢迎访问北京联合大学计算机社官方网站！",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <CheckStudent />
      <Footer />
    </main>
  );
}
