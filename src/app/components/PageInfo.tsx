'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from '../css/layout.module.scss';
import { useEffect } from 'react';

const PageInfo: React.FC = () => {
    const getUrl = (): string => {
        const pathname = usePathname();
        const searchParams = useSearchParams();
        const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        return currentUrl;
    }

    let url: string = getUrl();
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
    useEffect(() => {
        console.log(url);
    }, [url]);
    if (url !== '/') {
        return (
            <div className={styles.pageInfo}><Link href={'/'}>Top</Link> - {modifiedUrl && modifiedUrl}</div>
        );
    }
}

export default PageInfo;