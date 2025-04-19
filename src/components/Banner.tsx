import React from "react";
import styles from "./Banner.module.css";
import Image from "next/image"; // 首先引入Image组件
export default function MainBanner() {
  return (
    <>
      <div className={styles.bannerContainer}>
        <Image
          src="logo.svg"
          alt="Banner SVG"
          className={styles.svgImage}
          width={600}
          height={600}
        />
        <div className={styles.content}>
          <h1 className={styles.title}>北京联合大学计算机社</h1>
          <p className={styles.subtitle}>WWW.BUU.IO.IN</p>
          {/* <button className={styles.ctaButton}>{buttonText}</button> */}
        </div>
        {/* <div className={styles.scrollPrompt}>
                    <span className={styles.scrollText}>{t("scroll_prompt")}</span>
                    <div className={styles.arrow}></div>
                </div> */}
      </div>
    </>
  );
}
