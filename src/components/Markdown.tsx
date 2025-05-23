import React from "react";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";
import "github-markdown-css/github-markdown-light.css";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export const MarkdownPage = ({ slug }: { slug: string }) => {
  const markdownFilePath = path.join(
    process.cwd(),
    "content",
    `${slug}.md` // 根据 slug 动态加载文件
  );

  try {
    const markdownContent = fs.readFileSync(markdownFilePath, "utf-8");
    return (
      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    );
  } catch (e) {
    return <div>文章不存在</div>;
  }
};