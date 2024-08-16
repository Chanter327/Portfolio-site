import type { Metadata } from "next";
import Header from './components/Header';
import Footer from './components/Footer';
import PageInfo from "./components/PageInfo";
import styles from './css/layout.module.scss';
import './css/reset.scss';

export const metadata: Metadata = {
  title: "Kohiruimaki Yuto Portfolio",
  description: "Development portfolio by Kohiruimaki Yuto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={styles.html}>
      <body className={styles.body}>
        <div className={styles.wrapper}>
          <Header />
          <PageInfo />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
