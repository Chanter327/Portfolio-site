import Link from "next/link";
import styles from '../css/home.module.scss';

const MenuCircle: React.FC<{link: string, text: string}> = ({link, text}) => {
    return (
        <Link href={link} className={styles.menu}>
            <div className={styles.menuInline}>
                <div>{text}</div>
            </div>
        </Link>
    );
}

export default MenuCircle;