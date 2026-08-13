import React from 'react';
import Header from '@/components/Header';
import { Metadata } from 'next';
import styles from './AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Hakkımızda | AurionCore',
  description: 'AurionCore hakkında — vizyonumuz, değerlerimiz ve ekibimiz.',
};

const STATS = [
  { value: '120+', label: 'Tamamlanan Proje' },
  { value: '98%', label: 'Müşteri Memnuniyeti' },
  { value: '5+', label: 'Yıllık Deneyim' },
  { value: '24/7', label: 'Teknik Destek' },
];

const VALUES = [
  {
    title: 'Şeffaflık',
    description: 'Fiyat belirsizliği yok. Projenize başlamadan ne yapacağımızı, ne ödeyeceğinizi ve ne zaman teslim alacağınızı net olarak ortaya koyarız.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Hız & Verimlilik',
    description: 'Gereksiz toplantılar, süresiz onay süreçleri yok. Hızlı kararlar, hızlı üretim — projeniz belirlenen sürede teslim edilir.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: 'Kalıcı Kalite',
    description: 'Teslim edip unutmuyoruz. Geliştirdiğimiz her ürün uzun vadeli çalışacak şekilde tasarlanır, destek sürecinde yanınızda olmaya devam ederiz.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Müşteri Odaklılık',
    description: 'Sizi dinleyerek başlıyoruz. İhtiyacınıza en uygun çözümü birlikte tasarlar, süreç boyunca sizi bilgilendirmeyi ön planda tutarız.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main>
      <Header />
      <div className={styles.page}>

        {/* ─── HERO ─── */}
        <section className={styles.hero}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>✦ Bizi Tanıyın</span>
            <h1 className={styles.heroTitle}>
              Dijital Dünyada<br />
              <span className="text-gradient">Güvenilir Ortağınız</span>
            </h1>
            <p className={styles.heroSubtitle}>
              AurionCore olarak küçük ve orta ölçekli işletmelerin dijital dönüşümünü
              hızlandırmak için kurulduk. Teknoloji yalnızca büyükler için değil — her
              işletme dijitalde güçlü olabilir.
            </p>
          </div>

          {/* Stats Bar */}
          <div className={styles.statsBar}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── STORY ─── */}
        <section className={styles.story}>
          <div className={styles.container}>
            <div className={styles.storyGrid}>
              <div className={styles.storyLeft}>
                <span className={styles.sectionTag}>Hikayemiz</span>
                <h2 className={styles.sectionTitle}>
                  Neden <span className="text-gradient">AurionCore?</span>
                </h2>
                <p className={styles.storyText}>
                  Yıllarca farklı sektörlerdeki işletmelerin dijital süreçlerine destek olduk. Gördük ki pek çok firma ya çok pahalı ajanslarla çalışmak zorunda kalıyor, ya da kalitesiz çözümlerle vakit kaybediyor.
                </p>
                <p className={styles.storyText}>
                  AurionCore tam bu boşluğu doldurmak için doğdu. Kurumsal kalitede çözümler, küçük işletmenin anlayacağı dilde ve bütçesine uygun fiyatlarla.
                </p>
                <p className={styles.storyText}>
                  Bugün web sitesi, yapay zeka çözümleri, dijital ürünler ve işletme sistemleriyle yüzlerce işletmenin yanındayız. Ve her geçen gün büyüyoruz.
                </p>
              </div>

              <div className={styles.storyRight}>
                <div className={`${styles.codeCard} glass-panel`}>
                  <div className={styles.codeCardHeader}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.codeCardTitle}>aurioncore.ts</span>
                  </div>
                  <pre className={styles.codeBlock}>{`const aurioncore = {
  misyon: "Her işletmeyi dijitalde
           güçlendirmek",

  değerler: [
    "Şeffaflık",
    "Hız & Verimlilik",
    "Kalıcı Kalite",
  ],

  müşteri_memnuniyeti: "% 98",

  çalışma_saatleri: "7/24",
};`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── VALUES ─── */}
        <section className={styles.values}>
          <div className={styles.container}>
            <div className={styles.valuesHeader}>
              <span className={styles.sectionTag}>Değerlerimiz</span>
              <h2 className={styles.sectionTitle}>
                Bizi <span className="text-gradient">Farklı</span> Kılan Nedir?
              </h2>
            </div>
            <div className={styles.valuesGrid}>
              {VALUES.map((value) => (
                <div key={value.title} className={`${styles.valueCard} glass-panel`}>
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDesc}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <div className={styles.ctaBox}>
              <div className={styles.ctaOrb} />
              <h2 className={styles.ctaTitle}>Birlikte çalışalım</h2>
              <p className={styles.ctaSubtitle}>
                Projenizi konuşmak için ücretsiz bir görüşme ayarlayalım.
              </p>
              <a href="/iletisim" className={styles.ctaBtn}>İletişime Geçin →</a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
