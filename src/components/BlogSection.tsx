import React from 'react';
import styles from './BlogSection.module.css';

const POSTS = [
  {
    id: 1,
    category: 'Mimari',
    title: 'Mikroservis Mimarisine Geçişte Karşılaşılan Zorluklar',
    excerpt: 'Geleneksel monolitik yapılardan mikroservislere geçerken nelere dikkat etmeliyiz? Yeni nesil mimarilerin artıları ve eksileri.',
    date: '12 Eki 2026',
  },
  {
    id: 2,
    category: 'UI/UX',
    title: 'Glassmorphism ve Modern Web Tasarım Trendleri',
    excerpt: 'Buzlu cam efekti olarak bilinen glassmorphism akımının 2026 yılındaki evrimi ve kullanıcı deneyimine etkileri.',
    date: '28 Eyl 2026',
  },
  {
    id: 3,
    category: 'Teknoloji',
    title: 'Yapay Zeka Destekli Yazılım Geliştirme Süreçleri',
    excerpt: 'AI araçları kod kalitemizi nasıl artırıyor? Geleceğin yazılım mühendisliğinde yapay zekanın vazgeçilmez rolü.',
    date: '15 Eyl 2026',
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className={styles.blog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Güncel <span className="text-gradient">Blog</span></h2>
          <p className={styles.subtitle}>Teknoloji, tasarım ve dijital dünyaya dair en son yazılarımız.</p>
        </div>

        <div className={styles.grid}>
          {POSTS.map(post => (
            <article key={post.id} className={`${styles.card} glass-panel`}>
              <div className={styles.cardHeader}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.date}>{post.date}</span>
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <a href="#" className={styles.readMore}>
                Devamını Oku <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
