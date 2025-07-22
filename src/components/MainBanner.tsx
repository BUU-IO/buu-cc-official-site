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
  } catch {
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
          <Link href="https://smirror.buucc.ren" className={styles.linkItem}>
            BUU计算机社软件镜像站
          </Link>
          <Link href="https://www.wjx.cn/vm/OmugQ2B.aspx# " className={styles.linkItem}>
            BUU计算机社学术加速
          </Link>
          <Link href="./wvpn/" className={styles.linkItem}>
            北京联合大学WebVPN链接转换
          </Link>
          <Link href="./check_student/" className={styles.linkItem}>
            学生信息验证
          </Link>
          <p className={styles.moreText}>And More...</p>
        </div>
      </div>

      {/* 右侧文章列表 */}
      <div className={styles.rightContent}>
        <h1 className={styles.title}>最新文章 & 公告</h1>
        <div className={styles.linksContainer}>
          <MarkdownList />
        </div>
      </div>
    </div>
  );
}