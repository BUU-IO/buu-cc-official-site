import "react";
import WebVpnConvert from "@/components/webVpnConvert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "WebVPN转换器-北京联合大学计算机社",
  description: "欢迎访问北京联合大学计算机社官方网站！",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <WebVpnConvert />
      <Footer />
    </main>
  );
}
