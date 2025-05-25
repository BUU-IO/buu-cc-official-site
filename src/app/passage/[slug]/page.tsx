import "react";
import { MarkdownPage } from "@/components/Markdown";
import { Metadata } from "next";
import Header from "@/components/Header";
import fs from "fs";
import path from "path";

// 共享的文件读取
const getMarkdownContent = (slug: string) => {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params
  const markdownContent = getMarkdownContent(slug);

  // 默认值
  let title = `${slug} - 北京联合大学计算机社`;
  let description = "欢迎访问北京联合大学计算机社官方网站！";

  if (markdownContent) {
    // 提取标题（第一个 # 开头的行）
    const titleMatch = markdownContent.match(/^#\s+(.+)/m);
    if (titleMatch) {
      title = `${titleMatch[1]} - 北京联合大学计算机社`;
    }

    // 提取描述
    const plainText = markdownContent
      .replace(/^#.*$/gm, "")     // 移除标题
      .replace(/\*\*/g, "")       // 移除加粗
      .replace(/`{3}[\s\S]*?`{3}/g, "") // 移除代码块
      .replace(/\n/g, " ")        // 替换换行符
      .substring(0, 150)
      .trim();
    description = plainText.length >= 150 ? `${plainText}...` : plainText;
  }

  return {
    title,
    description,
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  return (
    <main>
      <Header />
      <div className="bannerContainer">
        <div className="markdown-content-wrapper">
          <MarkdownPage slug={slug} />
        </div>
      </div>
    </main>
  );
}