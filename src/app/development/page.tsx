import Image from 'next/image';
import styles from '../../css/development.module.scss';

interface Props {
    searchParams: {lang?: string};
}

const Development: React.FC<Props> = ({searchParams}) => {
    const lang: string = searchParams.lang || 'ja';
    const isJa: boolean = lang === 'ja';

    return (
        <>
            <div className={styles.container}>
                <div className={styles.image}><Image src={'/nabe2-management.png'} alt='NABE2 management' width={80} height={80} unoptimized /></div>
                <div className={styles.desc}>
                    <div className={styles.title}>{isJa ? '勤怠・スケジュール管理アプリ' : 'Time and Schedule Management App'}</div>
                    <div className={styles.text}>
                        {isJa ? (
                            <span>
                                Ruby on Railsで開発した勤怠・スケジュール管理アプリです。<br />
                                クライアントの要望を聞き、それに合わせて<br />
                                デザイン、開発、公開を一人で行いました。<br />
                                よりユーザーが使いやすいUI / UXデザインを意識しました。
                            </span>
                        ) : (
                            <span>
                                This app was developed using Ruby on Rails.<br />
                                I handled the design, development, and deployment based on the client's requirements. Emphasis was placed on creating a user-friendly UI/UX design.
                            </span>
                        )}
                    </div>
                    <div className={styles.techStack}>
                            <dl>
                                <dt>{isJa ? '開発言語' : 'Programming languages'}</dt>
                                <dd>Frontend : HTML, Sass, JavaScript</dd>
                                <dd>Backend : Ruby (Ruby on Rails)</dd>
                                <dt>{isJa ? 'その他' : 'Others'}</dt>
                                <dd>git, GitHub, render.com, Figma</dd>
                                <dt>{isJa ? 'デモ' : 'Demo'}</dt>
                                <dd>not uploaded yet ...</dd>
                            </dl>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
            <div className={styles.image}><Image src={'/irorodot-s.png'} alt='iroro.s' width={80} height={80} unoptimized /></div>
            <div className={styles.desc}>
                <div className={styles.title}>{isJa ? 'Iroro.s ウェブサイト' : 'Iroro.s website'}</div>
                <div className={styles.text}>
                    {isJa ? (
                        <span>
                            ロゴやパッケージデザインを販売提供する企業の<br />
                            サイトをデザイン、コーディングし、
                            SEO対策を施しました。<br />
                            イラストに目がいくような表示方法、サイズ感を<br />
                            意識してデザインをしました。
                        </span>
                    ) : (
                        <span>
                            Designed and coded a website for a company specializing in the sale and provision of logo and package design services, and implemented SEO strategies. <br />
                            The design focused on highlighting illustrations, with careful attention to presentation and sizing to ensure they catch the viewer's eye.
                        </span>
                    )}
                </div>
                <div className={styles.techStack}>
                        <dl>
                            <dt>{isJa ? '開発言語' : 'Programming languages'}</dt>
                            <dd>Frontend : HTML, Sass, JavaScript</dd>
                            <dd>Backend : PHP</dd>
                            <dt>{isJa ? 'その他' : 'Others'}</dt>
                            <dd>git, GitHub</dd>
                            <dt>{isJa ? 'サイト' : 'Site'}</dt>
                            <dd>
                                {isJa ? (
                                    <span>サイトは<a href="https://irorodot-s.com">こちら</a></span>
                                ) : (
                                    <span>You can view the site <a href="https://irorodot-s.com">here</a>.</span>
                                )}
                            </dd>
                        </dl>
                </div>
            </div>
        </div>

        <div className={styles.container}>
            <div className={styles.image}><Image src={'/portfolio.png'} alt='portfolio' width={80} height={80} unoptimized /></div>
            <div className={styles.desc}>
                <div className={styles.title}>{isJa ? 'ポートフォリオサイト' : 'Portfolio site'}</div>
                <div className={styles.text}>
                    {isJa ? (
                        <span>
                            当ポートフォリオサイトはTypeScript, Next.jsを使用して作成しています。<br />
                            作成したアプリケーションやブログなどを掲載していく予定です。<br />
                            今後もモダンな技術を取り入れ、アップデートを重ねていこうと思います。
                        </span>
                    ) : (
                        <span>
                            This portfolio site is built using TypeScript and Next.js. <br />
                            It will showcase applications and blogs that I have created. <br />
                            I plan to continue incorporating modern technologies and regularly updating the site.
                        </span>
                    )}
                </div>
                <div className={styles.techStack}>
                        <dl>
                            <dt>{isJa ? '開発言語' : 'Programming languages'}</dt>
                            <dd>Frontend : TypeScript, Next.js</dd>
                            <dd>Backend : Next.js (Route Handlers)</dd>
                            <dt>{isJa ? 'その他' : 'Others'}</dt>
                            <dd>git, GitHub, Vercel</dd>
                        </dl>
                </div>
            </div>
        </div>
        </>
    );
}

// サーバーコンポーネントを定義
export default function Page({searchParams}: {searchParams: {lang?: string}}) {
    return <Development searchParams={searchParams} />;
}