import "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.title}>关于我们</h1>
      <p>这是一个关于我们的页面</p>
    </div>
  );
};
