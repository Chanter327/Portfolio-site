import styles from '../../css/blog.module.scss';

interface Props {
    searchParams: {lang?: string};
}

const Blog: React.FC<Props> = ({searchParams}) => {
    const lang: string = searchParams.lang || 'ja';
    const isJa: boolean = lang === 'ja';

    return (
        <div className={styles.info}>{isJa ? '現在準備中...' : 'Now Implementing...'}</div>
    );
}

// サーバーコンポーネントを定義
export default function Page({searchParams}: {searchParams: { lang?: string }}) {
    return <Blog searchParams={searchParams} />;
}