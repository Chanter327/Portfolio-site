import Link from 'next/link';
import Image from 'next/image';
import MenuCircle from './components/MenuCircle';
import Contact from './components/Contact';
import styles from './css/home.module.scss';

interface Props {
  searchParams: {lang?: string};
}

const Top: React.FC<Props> = ({searchParams}) => {
  const lang: string = searchParams.lang || 'ja';

  return (
    <main className={styles.main}>
      <div className={styles.theme}>
        <div>Value</div>
        <div>Each</div>
        <div>Phase.</div>
      </div>
      <div className={styles.subTheme}>
        {lang === 'ja' ? '- 過程に価値を -' : '- Find values in each phase -'}
      </div>
      <div className={styles.themeDesc}>
        {lang === 'ja' ? (
            <span>
              成果や結果だけに限らず、プロジェクトや学習など全ての過程に<br />
              価値を見出すことで更なる成長につなげることを重要視して活動しています。
            </span>
          ) : (
            <span>
              Emphasize the importance of finding value not only in the outcomes and results but also in every process of projects and learning<br />
              in order to lead to further growth.
            </span>
        )}
      </div>
      <div className={styles.menuContainer}>
        <MenuCircle link='#skills' text='Skills' isNavi={false} />
        <MenuCircle link='/development' text='Dev' isNavi />
        <MenuCircle link='/blog' text='Blog' isNavi />
      </div>

      {/* About */}
      <div className={`${styles.content} ${styles.about}`}>
        <div className={styles.title}>About me</div>
        <div className={styles.text}>
          {lang === 'ja' ? (
            <span>
              サイト制作に携わったことをきっかけにITの技術に惹かれ、<br />
              2023年からWeb開発の学習を始めました。<br />
              現在はアプリケーション開発やWeb開発をしています。<br />
              ユーザーに親しまれやすく、UI, UXを重視したデザインを<br />
              心がけるとともに、クライアントからの要望を正確に再現し、<br />
              デザインからコーディング、公開まで全過程を丁寧に実現します。
            </span>
          ) : (
            <span>
              My interest in IT technology was sparked by my involvement in website creation, <br />
              and I began studying web development in 2023. Currently, I am engaged in application and web development. <br />
              I strive to create designs that are user-friendly and focus on UI and UX, while accurately reflecting client requests. I meticulously handle the entire process from design to coding and publication.
            </span>
          )}
        </div>
      </div>

      {/* Development */}
      <div className={`${styles.content} ${styles.dev}`}>
        <div className={styles.title}>Development</div>
        <div className={styles.text}>
          {lang === 'ja' ? (
            <span>
              プロジェクトや個人で開発したアプリケーションなどを 一部紹介します。
            </span>
          ) : (
            <span>
              Introducing some applications developed individually and some developed for projects.
            </span>
          )}
          <Link href={'/development'} className={styles.toDetail}>
            {lang === 'ja' ? (
              <p>詳細を見る</p>
            ) : (
              <p>view details</p>
            )}
            <div className={styles.toDetailArrow}></div>
          </Link>
        </div>
        <div className={styles.showCase}>
          <div className={styles.sample}><Image src={'/nabe2-management.png'} alt='NABE2 management' width={80} height={80} unoptimized /></div>
          <div className={styles.sample}><Image src={'/irorodot-s.png'} alt='iroro.s' width={80} height={80} unoptimized /></div>
          <div className={styles.sample}><Image src={'/portfolio.png'} alt='portfolio' width={80} height={80} unoptimized /></div>
        </div>
      </div>

      {/* Skills */}
      <div className={`${styles.content} ${styles.skills}`} id='skills'>
        <div className={styles.title}>Skills</div>
        <div className={styles.text}>
          {lang === 'ja' ? (
            <span>経験のある開発言語やツールを紹介します。</span>
          ) : (
            <span>Introducing the programming languages and tools I have experience with.</span>
          )}
        </div>
        <div className={styles.skills}>
          <div className={styles.skillDetail}>
            <div className={styles.title}>Frontend</div>
            <p>{lang === 'ja' ? '言語' : 'Programming languages'}</p>
            <ul>
              <li>- HTML</li>
              <li>- CSS, Sass</li>
              <li>- JavaScript</li>
              <li>- TypeScript</li>
            </ul>
            <p>{lang === 'ja' ? 'フレームワークなど' : 'Frameworks'}</p>
            <ul>
              <li>- React</li>
              <li>- Next.js</li>
              <li>- Nuxt.js</li>
              <li>- Node.js</li>
            </ul>
          </div>
          <div className={styles.skillDetail}>
            <div className={styles.title}>Backend</div>
            <p>{lang === 'ja' ? '言語' : 'Programming languages'}</p>
            <ul>
              <li>- Ruby</li>
              <li>- Python</li>
              <li>- Go</li>
            </ul>
            <p>{lang === 'ja' ? 'フレームワークなど' : 'Frameworks'}</p>
            <ul>
              <li>- Ruby on Rails</li>
              <li>- Flask</li>
              <li>- Gin Gonic</li>
            </ul>
          </div>
          <div className={styles.skillDetail}>
            <div className={styles.title}>Tools</div>
            <p>{lang === 'ja' ? 'その他' : 'Others'}</p>
            <ul>
              <li>- git, GitHub</li>
              <li>- Docker</li>
              <li>- Figma</li>
            </ul>
            <p>{lang === 'ja' ? 'デプロイ' : 'Deployment'}</p>
            <ul>
              <li>- Render</li>
              <li>- Netlify</li>
              <li>- Vercel</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className={`${styles.content} ${styles.contact}`} id='contact'>
        <div className={styles.title}>Contact</div>
        <div className={styles.text}>{lang === 'ja' ? 'お気軽にお問い合わせください。' : 'Please feel free to contact me.'}</div>
        <Contact lang={lang} />
      </div>
    </main>
  );
}

// サーバーコンポーネントを定義
export default function Page({searchParams}: {searchParams: { lang?: string }}) {
  return <Top searchParams={searchParams} />;
}