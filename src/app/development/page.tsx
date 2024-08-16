import Image from 'next/image';
import styles from '../css/development.module.scss';

const Developments: React.FC = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.image}><Image src={'/nabe2-management.png'} alt='NABE2 management' width={80} height={80} unoptimized /></div>
                <div className={styles.desc}>
                    <div className={styles.title}>勤怠・スケジュール管理アプリ</div>
                    <div className={styles.text}>
                        Ruby on Railsで開発した勤怠・スケジュール管理アプリです。<br />
                        クライアントの要望を聞き、それに合わせて<br />
                        デザイン、開発、公開を一人で行いました。<br />
                        よりユーザーが使いやすいUI / UXデザインを意識しました。
                    </div>
                    <div className={styles.techStack}>
                            <dl>
                                <dt>開発言語</dt>
                                <dd>Frontend : HTML, Sass, JavaScript</dd>
                                <dd>Backend : Ruby (Ruby on Rails)</dd>
                                <dt>その他</dt>
                                <dd>git, GitHub, render.com, Figma</dd>
                                <dt>デモ</dt>
                                <dd>not uploaded yet ...</dd>
                            </dl>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
            <div className={styles.image}><Image src={'/irorodot-s.png'} alt='iroro.s' width={80} height={80} unoptimized /></div>
            <div className={styles.desc}>
                <div className={styles.title}>Iroro.s ウェブサイト</div>
                <div className={styles.text}>
                    ロゴやパッケージデザインを販売提供する企業の<br />
                    サイトをデザイン、コーディングし、
                    SEO対策を施しました。<br />
                    イラストに目がいくような表示方法、サイズ感を<br />
                    意識してデザインをしました。
                </div>
                <div className={styles.techStack}>
                        <dl>
                            <dt>開発言語</dt>
                            <dd>Frontend : HTML, Sass, JavaScript</dd>
                            <dd>Backend : PHP</dd>
                            <dt>その他</dt>
                            <dd>git, GitHub</dd>
                            <dt>デモ</dt>
                            <dd>サイトは<a href="https://irorodot-s.com">こちら</a></dd>
                        </dl>
                </div>
            </div>
        </div>

        <div className={styles.container}>
            <div className={styles.image}><Image src={'/portfolio.png'} alt='portfolio' width={80} height={80} unoptimized /></div>
            <div className={styles.desc}>
                <div className={styles.title}>ポートフォリオサイト</div>
                <div className={styles.text}>
                    当ポートフォリオサイトはTypeScript, Next.jsを使用して作成しています。<br />
                    作成したアプリケーションやブログなどを掲載していく予定です。<br />
                    今後もモダンな技術を取り入れ、アップデートを重ねていこうと思います。
                </div>
                <div className={styles.techStack}>
                        <dl>
                            <dt>開発言語</dt>
                            <dd>Frontend : TypeScript, Next.js</dd>
                            <dd>Backend : Next.js (Route Handlers)</dd>
                            <dt>その他</dt>
                            <dd>git, GitHub, Vercel</dd>
                        </dl>
                </div>
            </div>
        </div>
        </>
    );
}

export default Developments;