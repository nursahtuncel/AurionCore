"use client";

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand & Description */}
          <div className={styles.brandInfo}>
            <Link href="/" aria-label="Ana Sayfa">
              <Logo className={styles.logo} />
            </Link>
            <p className={styles.description}>
              İşletmelerin dijital dünyada güçlenmesi için modern web, yapay zeka ve dijital sistem çözümleri sunuyoruz.
            </p>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/company/aurioncore/" className={styles.socialIcon} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a> */}
              <a href="https://www.instagram.com/aurioncore/" className={styles.socialIcon} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className={styles.columnTitle}>Hızlı Linkler</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/">Ana Sayfa</Link></li>
              <li className={styles.linkItem}><Link href="/hizmetlerimiz">Hizmetlerimiz</Link></li>
              <li className={styles.linkItem}><Link href="/hakkimizda">Hakkımızda</Link></li>
              <li className={styles.linkItem}><Link href="/referanslar">Referanslar</Link></li>
              <li className={styles.linkItem}><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className={styles.columnTitle}>Hizmetlerimiz</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><Link href="/hizmetlerimiz#web">Web Geliştirme</Link></li>
              <li className={styles.linkItem}><Link href="/hizmetlerimiz#ai">Yapay Zeka Çözümleri</Link></li>
              <li className={styles.linkItem}><Link href="/hizmetlerimiz#dijital">Dijital Ürünler</Link></li>
              <li className={styles.linkItem}><Link href="/hizmetlerimiz#danismanlik">Dijital Danışmanlık</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className={styles.columnTitle}>İletişim</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+90 (532) 271 46 37 </span>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>aurioncore.info@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Merkez mahallesi,Kağıthane Caddesi,Çağlayan / İstanbul</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            &copy; {currentYear} AurionCore. Tüm hakları saklıdır.
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>
            <Link href="/hizmet-sartlari">Kullanım Koşulları</Link>
            <a href="#">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
