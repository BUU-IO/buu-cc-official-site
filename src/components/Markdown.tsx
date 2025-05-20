import React from "react";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";
import "github-markdown-css/github-markdown-light.css";
import remarkGfm from "remark-gfm"; // 引入插件
import rehypeHighlight from "rehype-highlight"; // 新增高亮插件
import "highlight.js/styles/github.css"; // 新增高亮样式

export const MarkdownPage = () => {
  const markdownFilePath = path.join(process.cwd(), "content", "README.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf-8"); //utf-8编码

  return (
    <div className="markdown-body">
      {" "}
      {/* 包裹容器 */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]} // 添加 rehype 插件
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};
