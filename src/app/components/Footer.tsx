import styles from '../css/layout.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.content} ${styles.myName}`}>
                小比類巻 友翔<br />
            </div>
            <div className={styles.content}>
                E-mail: <a href="mailto:march09yuuto@gmail.com">march09yuuto@gmail.com</a>
            </div>
            <div className={styles.content}>
                GitHub: <a href="https://github.com/Chanter327">https://github.com/Chanter327</a>
            </div>
            <div className={styles.copyright}>@Kohiruimaki Yuto</div>
        </footer>
    );
}

export default Footer;