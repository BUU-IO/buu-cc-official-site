import "react";
import styles from "./About.module.css";

export const About = () => {
  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.title}>关于我们</h1>
      <p>
        北京联合大学计算社创建于2015年,在应用文理学院成立,当前成员覆盖校本部北四环校区和应用文理学院的同学
      </p>
      <p>
        社团目前主要注意力在计算机应用技术的交流和开源，未来也会有一些应用和工程方向的竞赛
      </p>
      <p>主要活动地点：应用文理学院</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>github账号:</span>
        <a
          href="https://github.com/buu-io"
          style={{
            color: "#ffffff",
            textDecoration: "underline", //下划线
            marginLeft: "8px",
          }}
        >
          BUU-IO
        </a>
      </div>
    </div>
  );
};
