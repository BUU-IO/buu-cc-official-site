"use client";
import Link from "next/link";
import styles from "./Header.module.css"; // 新建对应的CSS模块
import Image from "next/image"; // 首先引入Image组件
import { useState } from "react"; // 添加状态管理


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logo}>
                <Image
                    src="../logo.svg"
                    alt="Logo"
                    width={40}  // 缩小移动端尺寸
                    height={40}
                />
                <Link href="/">北京联合大学计算机社</Link>
            </div>

            {/* 汉堡菜单按钮 */}
            <button
                className={styles.menuButton}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                ☰
            </button>

            {/* 导航菜单 */}
            <nav className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
                <Link href="/about" onClick={() => setIsMenuOpen(false)}>关于我们</Link>
                <Link href="/activities" onClick={() => setIsMenuOpen(false)}>社团活动</Link>
                <Link href="/courses" onClick={() => setIsMenuOpen(false)}>技术课程</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>加入我们</Link>
            </nav>
        </header>
    );
}