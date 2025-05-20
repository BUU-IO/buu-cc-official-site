import React from "react";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";
import styles from "./About.module.css";

export const MarkdownPage = () => {
  const markdownFilePath = path.join(process.cwd(), "content", "README.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf-8");

  return (
    <div>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};
