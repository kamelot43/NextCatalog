import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <div className={styles.logo}>NextCatalog</div>
                    <div className={styles.sub}>
                        Pet-project on Next.js App Router • Server Actions • Route Handlers
                    </div>
                </div>

                <nav className={styles.nav}>
                    <Link className={styles.link} href="/">
                        Home
                    </Link>
                    <a className={styles.link} href="https://github.com/" target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                    <a className={styles.link} href="https://vercel.com/" target="_blank" rel="noreferrer">
                        Deploy
                    </a>
                </nav>
            </div>
        </footer>
    );
}
