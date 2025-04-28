import React from "react";
import styles from "./DoThingsBanner.module.css";
import Link from "next/link";
export default function DoThingsBanner() {
  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.title}>社团服务</h1>
      <div className={styles.content}>
        <Link href="./">
          <p className={styles.subtitle}>BUU学术加速(仅限联大校内师生使用)</p>
        </Link>
        <Link href="./">
          <p className={styles.subtitle}>BUU镜像站(仅限联大校内师生使用)</p>
        </Link>
        <p className={styles.subtitle}>And More...</p>
        {/* <button className={styles.ctaButton}>{buttonText}</button> */}
      </div>
      {/* <div className={styles.scrollPrompt}>
                    <span className={styles.scrollText}>{t("scroll_prompt")}</span>
                    <div className={styles.arrow}></div>
                </div> */}
    </div>
  );
}
