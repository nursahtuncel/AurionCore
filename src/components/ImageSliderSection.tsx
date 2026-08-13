import React from 'react';
import styles from './ImageSliderSection.module.css';
import Image from 'next/image';
import Link from 'next/link';

const banners = [
  { id: 1, src: '/images/web-tasarim.png', alt: 'Web Tasarım' },
  { id: 2, src: '/images/otomasyon.png', alt: 'Otomasyon' },
  { id: 3, src: '/images/google-ads.png', alt: 'Google Ads' },
  { id: 4, src: '/images/crm.png', alt: 'CRM Çözümleri' },
  { id: 5, src: '/images/seo.png', alt: 'SEO' },
  { id: 6, src: '/images/yapayzeka-agent.png', alt: 'Yapay Zeka' },
];

export default function ImageSliderSection() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.container}>
        <div className={styles.gridWrapper}>
          {banners.map((banner) => (
            <Link key={banner.id} href="/hizmetlerimiz" className={styles.bannerLink}>
              <div className={styles.bannerItem}>
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={banner.id <= 2}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
