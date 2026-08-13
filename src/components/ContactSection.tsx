import React from 'react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section id="iletisim" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bize <span className="text-gradient">Ulaşın</span></h2>
          <p className={styles.subtitle}>Projenizi hayata geçirmek için bir kahve eşliğinde detayları konuşalım.</p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.infoCard} glass-panel`}>

            <div className={styles.infoItem}>
              <div className={styles.icon}>
                {/* Location pin */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3>Adres</h3>
                <p>Mecidiyeköy<br />İstanbul</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.icon}>
                {/* Envelope / mail */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <h3>E-Posta</h3>
                <p>nursahtuncell@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.icon}>
                {/* Phone */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3>Telefon</h3>
                <p>+90 532 271 46 37</p>
              </div>
            </div>
          </div>

          <div className={`${styles.formCard} glass-panel`}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Adınız Soyadınız</label>
                <input type="text" id="name" placeholder="Adınız.." />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">E-Posta Adresiniz</label>
                <input type="email" id="email" placeholder="örnek@gmail.com" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Mesajınız</label>
                <textarea id="message" rows={4} placeholder=" Projenizden bahsedin..."></textarea>
              </div>

              <button type="button" className={styles.submitBtn}>
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
