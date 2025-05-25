"use client";
import Link from "next/link";
import styles from "./Header.module.css"; // 新建对应的CSS模块
import Image from "next/image"; // 首先引入Image组件
import { useState, useEffect } from "react"; // 添加状态管理


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 添加body滚动控制
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add(styles.menuOpen);
        } else {
            document.body.classList.remove(styles.menuOpen);
        }
    }, [isMenuOpen]);

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
            </nav>
        </header>
    );
}