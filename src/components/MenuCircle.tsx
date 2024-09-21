'use client';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from '@/css/page.module.scss';
import { useState } from "react";

const MenuCircle: React.FC<{link: string, text: string, isNavi: boolean}> = ({link, text, isNavi=true}) => {
    const searchParams = useSearchParams();
    const lang: string = searchParams.get('lang') || 'ja';

    const [clicked, setClicked] = useState<boolean>(false);
    const handleClick = () => {
        setClicked(clicked ? false : true);
    }
    return (
        <Link href={isNavi ? `${link}?lang=${lang || 'ja'}` : `/?lang=${lang}${link}`} className={`${styles.menu} ${clicked ? styles.clicked : ''}`} onClick={handleClick} scroll>
            <div className={styles.menuInline}>
                <div>{text}</div>
            </div>
        </Link>
    );
}

export default MenuCircle;