import "react";
import { MarkdownPage } from "@/components/Markdown";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";
import { use } from 'react'

type Params = Promise<{ slug: string }>
const getMarkdownContent = (slug: string) => {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
};

// 元数据生成，仍旧异步
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const markdownContent = getMarkdownContent(slug);

  // Default values
  let title = `${slug} - 北京联合大学计算机社`;
  let description = "欢迎访问北京联合大学计算机社官方网站！";

  if (markdownContent) {
    // Extract title (first # heading)
    const titleMatch = markdownContent.match(/^#\s+(.+)/m);
    if (titleMatch) {
      title = `${titleMatch[1]} - 北京联合大学计算机社`;
    }

    // Extract description
    const plainText = markdownContent
      .replace(/^#.*$/gm, "") // Remove headings
      .replace(/\*\*/g, "")   // Remove bold
      .replace(/`{3}[\s\S]*?`{3}/g, "") // Remove code blocks
      .replace(/\n/g, " ")    // Replace newlines
      .substring(0, 150)
      .trim();
    description = plainText.length >= 150 ? `${plainText}...` : plainText;
  }

  return {
    title,
    description,
  };
};

// Page component
export default function DynamicPage(props: { params: Params }) {
  const params = use(props.params)
  const slug = params.slug
  return (
    <main>
      <Header />
      <div className="bannerContainer">
        <div className="markdown-content-wrapper">
          <MarkdownPage slug={slug} />
        </div>
      </div>
      <Footer />
    </main>
  );
}