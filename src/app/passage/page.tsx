import "react";
import { MarkdownPage } from "@/components/Markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "关于我们-北京联合大学计算机社",
  description: "欢迎访问北京联合大学计算机社官方网站！",
};

export default function AboutPage() {
  return (
    <div>
      <MarkdownPage />
    </div>
  );
}
