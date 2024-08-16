'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../css/layout.module.scss';
const Header: React.FC = () => {
    const [isJa, setIsJa] = useState<boolean>(true);
    const switchLanguage = () => {
        if (isJa) {
            setIsJa(false);
        } else {
            setIsJa(true);
        }
    }

    const [isHmbActive, setIsHmbActive] = useState<boolean>(false);
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
    const handleHmb = () => {
        if (isHmbActive && isMenuActive) {
            setIsHmbActive(false);
            setIsMenuActive(false);
        } else {
            setIsHmbActive(true);
            setIsMenuActive(true);
        }
    }
    return (
        <>
            <header className={styles.header}>
                <Link href={'/'} className={styles.title}>
                    <p>Development Portfolio</p>
                    <span>By Kohiruimaki Yuto</span>
                </Link>
                <div className={styles.changeLanguage} onClick={switchLanguage}>
                    <div className={`${styles.language} ${isJa && styles.active}`}>ja</div>
                    <div className={styles.switch}>
                        <div className={`${styles.switchBall} ${isJa && styles.ja}`}></div>
                        <div className={styles.switchLine}></div>
                    </div>
                    <div className={`${styles.language} ${!isJa && styles.active}`}>en</div>
                </div>
                <div className={`${styles.hmb} ${isHmbActive ? styles.clicked : ''}`} onClick={handleHmb}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>
            <div className={`${styles.sideMenu} ${isMenuActive ? styles.open : ''}`}>
                <ul>
                    <li onClick={handleHmb}><Link href={'/'}>Top</Link></li>
                    <li onClick={handleHmb}><Link href={'/development'}>Development</Link></li>
                    <li onClick={handleHmb}><Link href={'/#skills'}>Skills</Link></li>
                    <li onClick={handleHmb}><Link href={'/blog'}>Blog</Link></li>
                    <li onClick={handleHmb}><Link href={'/#contact'}>Contact</Link></li>
                </ul>
            </div>
        </>
    );
}

export default Header;