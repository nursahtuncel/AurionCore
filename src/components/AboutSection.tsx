import React from 'react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="hakkimizda" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>
            Hakkımızda <span className="text-gradient">AurionCore</span>
          </h2>
          <p className={styles.description}>
            AurionCore, dijital mimarinin dönüştürücü gücüne inanan yenilikçi bir teknoloji ekibidir. İşletmelerin dijital dünyada sağlam temeller üzerine kurulmasını, estetik ve fonksiyonelliği harmanlayarak modern çözümler üretmesini sağlıyoruz.
          </p>
          <p className={styles.description}>
            Kodun ötesinde, kullanıcı deneyimine odaklanan, ölçeklenebilir ve geleceğe hazır yapılar inşa ediyoruz. Markanızın vizyonunu teknoloji ile buluşturuyor ve sizi her zaman bir adım öne taşıyoruz.
          </p>
          
          <div className={styles.stats}>
            <div className={styles.statBox}>
              <h3 className="text-gradient">100+</h3>
              <span>Başarılı Proje</span>
            </div>
            <div className={styles.statBox}>
              <h3 className="text-gradient">%99</h3>
              <span>Müşteri Memnuniyeti</span>
            </div>
          </div>
        </div>

        <div className={styles.visualContent}>
          <div className={`${styles.glassCard} glass-panel`}>
            <div className={styles.cardHeader}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
            <div className={styles.codeSnippet}>
              <pre>
                <code>
{`const AurionCore = {
  vizyon: "Dijital Mimari",
  misyon: "Geleceği İnşa Etmek",
  odak: ["İnovasyon", "Kalite", "Tasarım"],
  hazirMi: true
};`}
                </code>
              </pre>
            </div>
          </div>
          <div className={styles.decorativeOrb}></div>
        </div>
      </div>
    </section>
  );
}
