'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/css/blog.module.scss';

interface Props {
  searchParams: { lang?: string };
}

interface ArticlesRes {
  items: ArticleItem[];
  includes: {
    Asset: Asset[];
  };
}

interface ArticleItem {
  fields: Article;
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Article {
  blogDate: string;
  images: ImageAsset[];
  text: ArticleText;
  title: string;
  type: string[];
}

interface ImageAsset {
  sys: {
    id: string;
  };
}

interface Asset {
  sys: { id: string };
  fields: {
    file: {
      url: string;
    };
  };
}

interface ArticleText {
  content: { content: { value: string }[] }[];
}

const Blog: React.FC<Props> = ({ searchParams }) => {
    const lang: string = searchParams.lang || 'ja';
    const isJa: boolean = lang === 'ja';

    const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string;
    const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_DELIVERY_API as string;

    const [articles, setArticles] = useState<ArticlesRes | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const getArticles = async () => {
      setStatus('now loading...');
        try {
            const response = await fetch(
                isJa ? (
                    `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&locale=ja-JP&content_type=portfolioBlog&order=-fields.blogDate,-sys.createdAt`
                ) : (
                    `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&locale=en-US&content_type=portfolioBlog&order=-fields.blogDate,-sys.createdAt`
                )
            );
            if (!response.ok) {
                setStatus(isJa ? '読み込みに失敗しました。' : 'failed to load.');
                throw new Error('Network response was not ok');
            }
            const data: ArticlesRes = await response.json();
            setArticles(data);
            setStatus(null);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setStatus(isJa ? '読み込みに失敗しました。' : 'failed to load.');
            }
        };

    useEffect(() => {
        getArticles();
    }, []);

    useEffect(() => {
        getArticles();
    }, [lang]);

    const getImageUrl = (imageId: string): string => {
        if (!articles || !articles.includes || !articles.includes.Asset) return '';
        const asset = articles.includes.Asset.find(asset => asset.sys.id === imageId);
        return asset ? `https:${asset.fields.file.url}` : '';
    };

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
        });
    };

    return (
        status !== null ? (
        <div>{status}</div>
        ) : (
        articles && (
            <>
            {isJa ? (
                <div className={styles.desc}>主に生活記録用のブログです。記事をクリックまたはタップで詳細を表示します。</div>
            ) : (
                <div className={styles.desc}>It's mainly a blog for daily life records. Click or tap on an article to view the details.</div>
            )}
            <div className={styles.blogContainer}>
                {articles.items.map((value) => (
                <Link href={`/blog/${value.sys.id}?lang=${lang}`} scroll className={styles.article} key={value.sys.id}>
                    <div className={styles.date}>{formatDate(value.fields.blogDate)}</div>
                    {value.fields.images ? (
                    <div className={styles.imageContainer}>
                        <img src={getImageUrl(value.fields.images[0].sys.id)} alt={`${value.fields.title}-image`} />
                    </div>
                    ) : (
                    <div className={styles.imageContainer}><div className={styles.noImage}>- No Image -</div></div>
                    )}
                    <div className={styles.title}>{value.fields.title}</div>
                    <div className={styles.typeContainer}>
                        {value.fields.type.map((typeValue, index) => (
                            <div
                                className={`${styles.type} ${styles[typeValue] || ''}`}
                                key={index}
                            >
                                {`# ${typeValue}`}
                            </div>
                        ))}
                    </div>
                    <div className={styles.text}>{value.fields.text.content[0].content[0].value}</div>
                </Link>
                ))}
            </div>
            </>
        )
        )
    );
};

// サーバーコンポーネントを定義
export default function Page({ searchParams }: { searchParams: { lang?: string } }) {
  return <Blog searchParams={searchParams} />;
}
