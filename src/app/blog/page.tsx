import React from 'react';
import Header from '@/components/Header';
import { Metadata } from 'next';
import styles from './BlogPage.module.css';

export const metadata: Metadata = {
  title: 'Blog | AurionCore',
  description: 'AurionCore blog — teknoloji, tasarım ve dijital dünyaya dair en son yazılarımız.',
};

const FEATURED_POST = {
  category: 'Yapay Zeka',
  title: 'İşletmeler İçin Yapay Zeka: Nereden Başlamalı?',
  excerpt:
    'Yapay zeka artık sadece büyük şirketlerin değil, her ölçekteki işletmenin ulaşabileceği bir teknoloji. Peki nereden başlamalısınız? Bu rehberde AI entegrasyonunun temel adımlarını, maliyetlerini ve beklentilerinizi yönetmeyi ele alıyoruz.',
  date: '2 Ağu 2026',
};

const POSTS = [
  {
    id: 1,
    category: 'Mimari',
    title: 'Mikroservis Mimarisine Geçişte Karşılaşılan Zorluklar',
    excerpt:
      'Geleneksel monolitik yapılardan mikroservislere geçerken nelere dikkat etmeliyiz? Yeni nesil mimarilerin artıları ve eksileri.',
    date: '12 Eki 2026',
  },
  {
    id: 2,
    category: 'UI/UX',
    title: 'Glassmorphism ve Modern Web Tasarım Trendleri',
    excerpt:
      'Buzlu cam efekti olarak bilinen glassmorphism akımının 2026 yılındaki evrimi ve kullanıcı deneyimine etkileri.',
    date: '28 Eyl 2026',
  },
  {
    id: 3,
    category: 'Teknoloji',
    title: 'Yapay Zeka Destekli Yazılım Geliştirme Süreçleri',
    excerpt:
      'AI araçları kod kalitemizi nasıl artırıyor? Geleceğin yazılım mühendisliğinde yapay zekanın vazgeçilmez rolü.',
    date: '15 Eyl 2026',
  },
  {
    id: 4,
    category: 'E-Ticaret',
    title: 'Dönüşüm Oranlarını Artıran UX Stratejileri',
    excerpt:
      'E-ticaret sitenizin dönüşüm oranını artırmak için kullanıcı deneyiminde yapabileceğiniz pratik iyileştirmeler.',
    date: '1 Eyl 2026',
  },
  {
    id: 5,
    category: 'Güvenlik',
    title: 'Web Uygulamalarında Güvenlik Temelleri',
    excerpt:
      'SQL injection, XSS ve CSRF gibi yaygın web güvenlik açıklarından korunma yöntemleri ve en iyi uygulamalar.',
    date: '18 Ağu 2026',
  },
  {
    id: 6,
    category: 'DevOps',
    title: 'CI/CD Pipeline Kurulumu: Adım Adım Rehber',
    excerpt:
      'Sürekli entegrasyon ve sürekli dağıtım süreçlerini otomatikleştirerek geliştirme hızınızı nasıl artırabilirsiniz?',
    date: '5 Ağu 2026',
  },
];

export default function BlogPage() {
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
            <span className={styles.eyebrow}>✦ Blog</span>
            <h1 className={styles.heroTitle}>
              Teknoloji ve<br />
              <span className="text-gradient">Dijital Dünya</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Yazılım, tasarım, yapay zeka ve dijital dönüşüm hakkında en güncel yazılarımız.
            </p>
          </div>
        </section>

        {/* ─── FEATURED POST ─── */}
        <section className={styles.featured}>
          <div className={styles.container}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredImagePlaceholder} />
              <div className={styles.featuredContent}>
                <div className={styles.featuredBadge}>
                  <span className={styles.categoryTag}>{FEATURED_POST.category}</span>
                  <span className={styles.featuredDate}>{FEATURED_POST.date}</span>
                </div>
                <h2 className={styles.featuredTitle}>{FEATURED_POST.title}</h2>
                <p className={styles.featuredExcerpt}>{FEATURED_POST.excerpt}</p>
                <a href="#" className={styles.readMoreBtn}>
                  Devamını Oku <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ALL POSTS ─── */}
        <section className={styles.posts}>
          <div className={styles.container}>
            <div className={styles.postsHeader}>
              <span className={styles.sectionTag}>Tüm Yazılar</span>
              <h2 className={styles.postsTitle}>
                Son <span className="text-gradient">Yazılarımız</span>
              </h2>
              <p className={styles.postsSubtitle}>
                Teknoloji, tasarım ve dijital dünyaya dair en son yazılarımız.
              </p>
            </div>
            <div className={styles.postsGrid}>
              {POSTS.map((post) => (
                <article key={post.id} className={styles.postCard}>
                  <div className={styles.postCardHeader}>
                    <span className={styles.categoryTag}>{post.category}</span>
                    <span className={styles.postDate}>{post.date}</span>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <a href="#" className={styles.postReadMore}>
                    Devamını Oku <span>→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
