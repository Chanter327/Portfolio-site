'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from '../css/layout.module.scss';

const PageInfo: React.FC = () => {
    const url: string = usePathname();
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');
    const modifyUrl = (url: string): string | null => {
        // 最初の文字を削除し、2文字目を大文字にする
        if (url.length >= 2) {
            url = url.slice(1); // 最初の文字を削除
            url = url.charAt(0).toUpperCase() + url.slice(1); // 2文字目（現在は1文字目）を大文字にする
            return url
        }
        return null;
    }
    const modifiedUrl: string | null = modifyUrl(url);
    if (url !== '/' && url.charAt(1) !== '?') {
        return (
            <div className={styles.pageInfo}><Link href={`/?lang=${lang}`}>Top</Link> - {modifiedUrl && modifiedUrl}</div>
        );
    }
}

export default PageInfo;