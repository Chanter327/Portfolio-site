'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import styles from '@/css/article.module.scss';

interface Props {
    searchParams: {lang?: string};
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
  
const ArticlePage: React.FC<Props> = ({ searchParams }) => {
    const lang: string = searchParams.lang || 'ja';
    const isJa: boolean = lang === 'ja';

    const { id } = useParams();
    const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string;
    const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_DELIVERY_API as string;

    const [article, setArticle] = useState<ArticleItem | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const getArticle = async () => {
        setStatus('now loading...');
        try {
            const response = await fetch(
                isJa ? (
                    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}&locale=ja-JP`
                ) : (
                    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}&locale=en-US`
                )
            );
            if (!response.ok) {
                setStatus(isJa ? '読み込みに失敗しました。' : 'failed to load.');
                throw new Error('Network response was not ok');
            }
            const data: ArticleItem = await response.json();
            setArticle(data);

            // 画像のURLを取得
            const urls = await Promise.all(
                data.fields.images.map(async (image) => await getImageUrl(image.sys.id))
            );
            setImageUrls(urls);
            setStatus(null);
        } catch (error) {
            console.error('Error fetching article:', error);
            setStatus(isJa ? '読み込みに失敗しました。' : 'failed to load.');
        }
    };

    useEffect(() => {
        getArticle();
    }, []);

    useEffect(() => {
        getArticle();
    }, [lang]);

    const getImageUrl = async (imageId: string): Promise<string> => {
        try {
            const response = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/assets/${imageId}?access_token=${ACCESS_TOKEN}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const assetData: Asset = await response.json();
            return `https:${assetData.fields.file.url}`;
        } catch (error) {
            console.error('Error fetching image asset:', error);
            return '';
        }
    };

    const handleTopImage = (n: number) => {
        setSelectedImage(n);
    }

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
            <div className={styles.loading}>{status}</div>
        ) : (
            article && (
                <>
                    <div className={styles.container}>
                        <div className={styles.images}>
                            {imageUrls.length > 0 ? (
                                <div className={styles.topImage}><Link href={imageUrls[selectedImage]}><img src={imageUrls[selectedImage]} alt={article.fields.title} /></Link></div>
                            ) : (
                                <div className={styles.topImage}><div className={styles.noImage}>- No Image -</div></div>
                            )}
                            {imageUrls.length > 0 && (
                                <Link href={imageUrls[selectedImage]} className={styles.viewImage}>
                                    <ZoomInIcon sx={{fontSize: 20}} />{isJa ? ('画像を拡大表示') : ('view the enlarged image')}
                                </Link>
                            )}
                            <div className={styles.imageList}>
                                {imageUrls.length > 1 && imageUrls.map((url, index) => (
                                    <div className={styles.imageContainer} onClick={() => handleTopImage(index)}><Image src={url} alt={`Image ${index + 1}`} layout='fill' /></div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.articleTexts}>
                            <div className={styles.typeContainer}>
                            {article.fields.type.map((typeValue, index) => (
                                <div
                                    className={`${styles.type} ${styles[typeValue] || ''}`}
                                    key={index}
                                >
                                    {`# ${typeValue}`}
                                </div>
                            ))}
                            </div>
                            <div className={styles.date}>{formatDate(article.fields.blogDate)}</div>
                            <div className={styles.title}>{article.fields.title}</div>
                            <div className={styles.text}>
                                {article.fields.text.content.map((paragraph, index) => (
                                    <p key={index}>{paragraph.content[0].value}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Link href={`/blog?lang=${lang}`} className={styles.back} scroll>
                        {isJa ? (
                        <p>戻る</p>
                        ) : (
                        <p>back</p>
                        )}
                        <div className={styles.backArrow}></div>
                    </Link>
                </>
            )
        )
    );
};

export default ArticlePage;
