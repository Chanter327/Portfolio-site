'use client';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from '../css/page.module.scss';

const MenuCircle: React.FC<{link: string, text: string, isNavi: boolean}> = ({link, text, isNavi=true}) => {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');
    return (
        <Link href={isNavi ? `${link}?lang=${lang || 'ja'}` : `/?lang=${lang}${link}`} className={styles.menu}>
            <div className={styles.menuInline}>
                <div>{text}</div>
            </div>
        </Link>
    );
}

export default MenuCircle;