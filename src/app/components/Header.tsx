'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../css/layout.module.scss';
import LangSwitch from './LangSwitch';
const Header: React.FC = () => {

    const params = useSearchParams();
    const lang: string = params.get('lang') || 'ja';

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
                <Link href={`/?lang=${lang}`} className={styles.title}>
                    <p>Development Portfolio</p>
                    <span>By Kohiruimaki Yuto</span>
                </Link>
                <LangSwitch params={{lang: lang}} />
                <div className={`${styles.hmb} ${isHmbActive ? styles.clicked : ''}`} onClick={handleHmb}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>
            <div className={`${styles.sideMenu} ${isMenuActive ? styles.open : ''}`}>
                <ul>
                    <li onClick={handleHmb}><Link href={`/?lang=${lang}`}>Top</Link></li>
                    <li onClick={handleHmb}><Link href={`/development?lang=${lang}`}>Development</Link></li>
                    <li onClick={handleHmb}><Link href={`/?lang=${lang}#skills`}>Skills</Link></li>
                    <li onClick={handleHmb}><Link href={`/blog?lang=${lang}`}>Blog</Link></li>
                    <li onClick={handleHmb}><Link href={`/?lang=${lang}#contact`}>Contact</Link></li>
                </ul>
            </div>
        </>
    );
}

export default Header;