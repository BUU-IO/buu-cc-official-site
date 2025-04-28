import Banner from "@/components/Banner";
import { Metadata } from "next";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "北京联合大学计算机社",
  description: "欢迎访问北京联合大学计算机社官方网站！",
};

export default function Home() {
  return (
    <main>
      <Banner />
      <Footer />
      {/* 其他页面内容 */}
    </main>
  );
}
