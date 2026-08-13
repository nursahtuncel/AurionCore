import React from 'react';
import styles from './ReferencesSection.module.css';

const REFERENCES = [
  { id: 1, name: 'TechFlow' },
  { id: 2, name: 'LuminaTech' },
  { id: 3, name: 'Nexus Group' },
  { id: 4, name: 'Vanguard' },
  { id: 5, name: 'OmniCloud' },
  { id: 6, name: 'DataSync' },
];

export default function ReferencesSection() {
  return (
    <section id="referanslar" className={styles.references}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bize Güvenen <span className="text-gradient">Markalar</span></h2>
          <p className={styles.subtitle}>Sektörün öncü firmaları dijital mimarilerini AurionCore'a emanet ediyor.</p>
        </div>

        <div className={styles.logoMarquee}>
          <div className={styles.marqueeContent}>
            {[...REFERENCES, ...REFERENCES].map((ref, index) => (
              <div key={`${ref.id}-${index}`} className={`${styles.logoBox} glass-panel`}>
                <span className={styles.logoText}>{ref.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
