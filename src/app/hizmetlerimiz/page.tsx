import React from 'react';
import Header from '@/components/Header';
import ServicesClient from './ServicesClient';
import styles from './ServicesPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz | AurionCore',
  description: 'AurionCore hizmetleri ve ürün fiyat listesi. Web sitesi, yapay zeka, dijital ürünler ve daha fazlası.',
};

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <div className={styles.pageWrapper}>
        {/* Hero */}
        <div className={styles.pageHero}>
          <p className={styles.heroEyebrow}>✦ Tüm Çözümlerimiz</p>
          <h1 className={styles.heroTitle}>
            İşinizi Büyütecek<br />
            <span className="text-gradient">Dijital Hizmetler</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Şeffaf fiyatlandırma, profesyonel teslimat. İhtiyacınız olan kategoriyi seçin ve hemen başlayalım.
          </p>
        </div>



        {/* Services Grid */}
        <div className={styles.container}>
          <ServicesClient />
        </div>
      </div>
    </main>
  );
}
