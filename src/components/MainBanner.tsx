import React from "react";
import styles from "./MainBanner.module.css";
import Link from "next/link";
import fs from "fs";
import path from "path";
const getMarkdownsList = () => {
  const dirPath = path.join(process.cwd(), "content");
  try {
    return fs.readdirSync(dirPath)
      .filter(file => file.endsWith(".md"))
      .map(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        return { file, stats };
      })
      .sort((a, b) => b.stats.birthtime.getTime() - a.stats.birthtime.getTime())
      .slice(0, 5)
      .map(({ file }) => {
        const slug = file.replace(/\.md$/, "");
        const content = fs.readFileSync(path.join(dirPath, file), "utf-8");
        const titleMatch = content.match(/^#\s+(.+)/m);
        return {
          slug,
          title: titleMatch ? titleMatch[1] : slug,
        };
      });
  } catch (e) {
    return [];
  }
};
const MarkdownList = () => {
  const posts = getMarkdownsList();

  return (
    <>
      {posts.map(post => (
        <Link
          key={post.slug}
          href={`/passage/${post.slug}`}
          className={styles.linkItem}
        >
          {post.title}
        </Link>
      ))}
      <p className={styles.moreText}>查看更多文章...</p>
    </>
  );
};
export default function MainBanner() {
  return (
    <div className={styles.bannerContainer}>
      {/* 左侧内容区块 */}
      <div className={styles.leftContent}>
        <h1 className={styles.title}>社团服务</h1>
        <div className={styles.linksContainer}>
          <Link href="./" className={styles.linkItem}>
            活动申请指南
          </Link>
          <Link href="./" className={styles.linkItem}>
            场地使用规范
          </Link>
          <Link href="./" className={styles.linkItem}>
            器材借用流程
          </Link>
          <p className={styles.moreText}>And More...</p>
        </div>
      </div>

      {/* 右侧文章列表 */}
      <div className={styles.rightContent}>
        <h1 className={styles.title}>最新文章</h1>
        <div className={styles.linksContainer}>
          <MarkdownList />
        </div>
      </div>
    </div>
  );
}