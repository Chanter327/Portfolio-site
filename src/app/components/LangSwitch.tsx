import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../css/layout.module.scss';

const LangSwitch: React.FC<{ params: { lang: string } }> = ({ params }) => {
  const [lang, setLang] = useState<string>(params.lang);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    setLang(params.lang);
  }, [params.lang]);

  const switchLanguage = () => {
    const newLang = lang === 'ja' ? 'en' : 'ja';
    setLang(newLang);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('lang', newLang);

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className={styles.changeLanguage} onClick={switchLanguage}>
      <div className={`${styles.language} ${lang === 'ja' ? styles.active : ''}`}>ja</div>
      <div className={styles.switch}>
        <div className={`${styles.switchBall} ${lang === 'ja' ? styles.ja : ''}`}></div>
        <div className={styles.switchLine}></div>
      </div>
      <div className={`${styles.language} ${lang !== 'ja' ? styles.active : ''}`}>en</div>
    </div>
  );
};

export default LangSwitch;
