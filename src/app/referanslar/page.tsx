import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { Metadata } from 'next';
import styles from './ReferanslarPage.module.css';

export const metadata: Metadata = {
  title: 'Referanslar | AurionCore',
  description: 'AurionCore referansları — bize güvenen markalar, projelerimiz ve müşteri yorumları.',
};

const PARTNERS = [
  {
    name: 'TechFlow',
    image: '/images/referanslar/techflow.png',
    desc: 'E-ticaret altyapısını sıfırdan tasarlayarak satışlarını %180 artırdık.',
    url: 'https://techflow.com',
    tags: ['E-Ticaret', 'Web Geliştirme'],
  },
  {
    name: 'LuminaTech',
    image: '/images/referanslar/luminatech.png',
    desc: 'Kurumsal web sitesi ve CRM entegrasyonu ile müşteri süreçlerini dijitalleştirdik.',
    url: 'https://luminatech.com',
    tags: ['Kurumsal Site', 'CRM'],
  },
  {
    name: 'Nexus Group',
    image: '/images/referanslar/nexus.png',
    desc: 'Yapay zeka destekli analiz paneli ile veri odaklı karar süreçlerini güçlendirdik.',
    url: 'https://nexusgroup.com',
    tags: ['Yapay Zeka', 'Veri Analizi'],
  },
  {
    name: 'Vanguard',
    image: '/images/referanslar/vanguard.png',
    desc: 'Mobil uygulama ve web platformu ile müşteri deneyimini yeniden tanımladık.',
    url: 'https://vanguard.com',
    tags: ['Mobil Uygulama', 'Web Platformu'],
  },
  {
    name: 'OmniCloud',
    image: '/images/referanslar/omnicloud.png',
    desc: 'Bulut altyapı migrasyonu ve DevOps süreçlerini optimize ettik.',
    url: 'https://omnicloud.com',
    tags: ['Bulut Altyapı', 'DevOps'],
  },
  {
    name: 'DataSync',
    image: '/images/referanslar/datasync.png',
    desc: 'Gerçek zamanlı veri senkronizasyonu ve raporlama paneli geliştirdik.',
    url: 'https://datasync.com',
    tags: ['Veri Senkronizasyonu', 'Raporlama'],
  },
];

const TESTIMONIALS = [
  {
    text: 'AurionCore ile çalışmak bizim için gerçek bir dönüm noktası oldu. Web sitemiz sadece güzel görünmekle kalmadı, satışlarımız da gözle görülür şekilde arttı.',
    author: 'Ahmet Yılmaz',
    role: 'TechFlow CEO',
    initials: 'AY',
  },
  {
    text: 'Projemizi zamanında ve beklentilerimizin üzerinde teslim ettiler. Teknik ekipleri her konuda yardımcı oldu ve süreç boyunca şeffaf bir iletişim kurdular.',
    author: 'Elif Kaya',
    role: 'LuminaTech Kurucu',
    initials: 'EK',
  },
  {
    text: 'Yapay zeka çözümleri sayesinde müşteri verilerimizi çok daha iyi analiz edebiliyoruz. AurionCore ekibinin uzmanlığına güveniyoruz.',
    author: 'Can Demir',
    role: 'Nexus Group CTO',
    initials: 'CD',
  },
  {
    text: 'Her aşamada profesyonel destek aldık. Tasarım kalitesi ve teknik altyapı konusunda sektördeki en iyi seçenek.',
    author: 'Selin Arslan',
    role: 'Vanguard Pazarlama Müdürü',
    initials: 'SA',
  },
];

const STATS = [
  { value: '120+', label: 'Tamamlanan Proje' },
  { value: '98%', label: 'Müşteri Memnuniyeti' },
  { value: '50+', label: 'Aktif Müşteri' },
];

export default function ReferanslarPage() {
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
            <span className={styles.eyebrow}>✦ Referanslarımız</span>
            <h1 className={styles.heroTitle}>
              Bize Güvenen<br />
              <span className="text-gradient">Markalar</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Sektörün öncü firmaları dijital dönüşümlerini AurionCore&apos;a emanet ediyor.
              İşte birlikte başardıklarımız.
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

        {/* ─── PARTNERS / PROJECTS ─── */}
        <section className={styles.partners}>
          <div className={styles.container}>
            <div className={styles.partnersHeader}>
              <span className={styles.sectionTag}>Projelerimiz</span>
              <h2 className={styles.sectionTitle}>
                Birlikte <span className="text-gradient">Büyüdüğümüz</span> Firmalar
              </h2>
            </div>
            <div className={styles.partnersGrid}>
              {PARTNERS.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.partnerCard}
                >
                  <div className={styles.partnerImageWrapper}>
                    <Image
                      src={partner.image}
                      alt={`${partner.name} projesi`}
                      width={600}
                      height={340}
                      className={styles.partnerImage}
                    />
                    <div className={styles.partnerImageOverlay}>
                      <span className={styles.visitBtn}>
                        Siteyi Ziyaret Et
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className={styles.partnerInfo}>
                    <div className={styles.partnerMeta}>
                      <h3 className={styles.partnerName}>{partner.name}</h3>
                      <div className={styles.partnerTags}>
                        {partner.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <p className={styles.partnerDesc}>{partner.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className={styles.testimonials}>
          <div className={styles.container}>
            <div className={styles.testimonialsHeader}>
              <span className={styles.sectionTag}>Müşteri Yorumları</span>
              <h2 className={styles.sectionTitle}>
                Müşterilerimiz <span className="text-gradient">Ne Diyor?</span>
              </h2>
            </div>
            <div className={styles.testimonialsGrid}>
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className={styles.testimonialCard}>
                  <div className={styles.quoteIcon}>&ldquo;</div>
                  <p className={styles.testimonialText}>{t.text}</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorAvatar}>{t.initials}</div>
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{t.author}</span>
                      <span className={styles.authorRole}>{t.role}</span>
                    </div>
                  </div>
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
              <h2 className={styles.ctaTitle}>Siz de aramıza katılın</h2>
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
