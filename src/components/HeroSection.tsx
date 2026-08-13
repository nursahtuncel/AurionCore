import React from 'react';
import styles from './HeroSection.module.css';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="anasayfa" className={styles.hero}>
      {/* Animated background orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.gridOverlay}></div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span>✨</span> Yeni Nesil Dijital Çözümler
        </div>

        <h1 className={styles.title}>
          Geleceğin{' '}
          <span className="text-gradient">Dijital Mimarisini</span>
          <br />
          Birlikte İnşa Edelim
        </h1>

        <p className={styles.subtitle}>
          AurionCore olarak, yenilikçi teknolojiler ve modern estetik
          anlayışımızla markanızı dijital dünyada zirveye taşıyoruz.
          İşletmeniz için en uygun yazılım çözümlerini sunuyoruz.
        </p>

        <div className={styles.actions}>
          <Link href="/hizmetlerimiz" className={styles.primaryBtn}>
            Hizmetlerimizi İnceleyin
          </Link>
          <Link href="/iletisim" className={styles.secondaryBtn}>
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </section>
  );
}
