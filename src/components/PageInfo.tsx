'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from '@/css/layout.module.scss';

const PageInfo: React.FC = () => {
    const url: string = usePathname();
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');

    const modifyUrl = (url: string): string | null => {
        // 最初の '/' を削除
        let modifiedUrl = url.slice(1);
        
        // 2番目の '/' の位置を見つける
        const secondSlashIndex = modifiedUrl.indexOf('/');
        
        if (secondSlashIndex !== -1) {
            // 2番目の '/' までの部分を取得
            modifiedUrl = modifiedUrl.slice(0, secondSlashIndex);
        }
        
        // 最初の文字を大文字にする
        if (modifiedUrl.length > 0) {
            modifiedUrl = modifiedUrl.charAt(0).toUpperCase() + modifiedUrl.slice(1);
            return modifiedUrl;
        }
        
        return null;
    }

    const modifiedUrl: string | null = modifyUrl(url);

    if (url !== '/' && url.charAt(1) !== '?') {
        return (
            <div className={styles.pageInfo}>
                <Link href={`/?lang=${lang}`}>Top</Link> - {modifiedUrl && modifiedUrl}
            </div>
        );
    }

    return null;
}

export default PageInfo;