import Link from 'next/link';
import Image from 'next/image';
import MenuCircle from './components/MenuCircle';
import Contact from './components/Contact';
import styles from './css/home.module.scss';

const Home: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.theme}>
        <div>Value</div>
        <div>Each</div>
        <div>Phase.</div>
      </div>
      <div className={styles.subTheme}>- 過程に価値を -</div>
      <div className={styles.themeDesc}>
        成果や結果だけに限らず、プロジェクトや学習など全ての過程に<br />
        価値を見出すことで更なる成長につなげることを重要視して活動しています。
      </div>
      <div className={styles.menuContainer}>
        <MenuCircle link='#skills' text='Skills' />
        <MenuCircle link='/development' text='Dev' />
        <MenuCircle link='/blog' text='Blog' />
      </div>

      {/* About */}
      <div className={`${styles.content} ${styles.about}`}>
        <div className={styles.title}>About me</div>
        <div className={styles.text}>
            サイト制作に携わったことをきっかけにITの技術に惹かれ、<br />
            2023年からWeb開発の学習を始めました。<br />
            現在はアプリケーション開発やWeb開発をしています。<br />
            ユーザーに親しまれやすく、UI, UXを重視したデザインを<br />
            心がけるとともに、クライアントからの要望を正確に再現し、<br />
            デザインからコーディング、公開まで全過程を丁寧に実現します。
          </div>
      </div>

      {/* Development */}
      <div className={`${styles.content} ${styles.dev}`}>
        <div className={styles.title}>Development</div>
        <div className={styles.text}>
          プロジェクトや個人で開発したアプリケーションなどを
          一部紹介します。
          <Link href={'/development'} className={styles.toDetail}>
            <p>詳細を見る</p>
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
          経験のある開発言語やツールを紹介します。
        </div>
        <div className={styles.skills}>
          <div className={styles.skillDetail}>
            <div className={styles.title}>Frontend</div>
            <p>言語</p>
            <ul>
              <li>- HTML</li>
              <li>- CSS, Sass</li>
              <li>- JavaScript</li>
              <li>- TypeScript</li>
            </ul>
            <p>フレームワークなど</p>
            <ul>
              <li>- React</li>
              <li>- Next.js</li>
              <li>- Nuxt.js</li>
              <li>- Node.js</li>
            </ul>
          </div>
          <div className={styles.skillDetail}>
            <div className={styles.title}>Backend</div>
            <p>言語</p>
            <ul>
              <li>- Ruby</li>
              <li>- Python</li>
              <li>- Go</li>
            </ul>
            <p>フレームワークなど</p>
            <ul>
              <li>- Ruby on Rails</li>
              <li>- Flask</li>
              <li>- Gin Gonic</li>
            </ul>
          </div>
          <div className={styles.skillDetail}>
            <div className={styles.title}>Tools</div>
            <p>ツール</p>
            <ul>
              <li>- git, GitHub</li>
              <li>- Docker</li>
              <li>- Figma</li>
            </ul>
            <p>デプロイ</p>
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
        <div className={styles.text}>お気軽にお問い合わせください。</div>
        <Contact />
      </div>
    </main>
  );
}

export default Home;