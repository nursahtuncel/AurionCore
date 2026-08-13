import React from 'react';
import Header from '@/components/Header';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';
import { Metadata } from 'next';
import styles from './ProjectsPage.module.css';

export const metadata: Metadata = {
  title: 'Projelerimiz | AurionCore',
  description: 'AurionCore tarafından hayata geçirilen dijital projeler.',
};

const CATEGORIES = [
  'Tümü', 
  'Web Sitesi', 
  'Tasarım', 
  'QR & Yerel Görünürlük', 
  'Dijital Kartlar & İçerik', 
  'İşletme Sistemleri', 
  'Yapay Zekâ Çözümleri', 
  'Reklam & Büyüme', 
  'SEO'
] as const;

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardCategory}>{project.category}</span>
        <span className={`${styles.statusBadge} ${project.status === 'live' ? styles.statusLive : styles.statusSoon}`}>
          {project.status === 'live' ? '● Yayında' : '○ Yakında'}
        </span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.cardMeta}>
          <span className={styles.year}>{project.year}</span>
          {project.url && project.status === 'live' && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.visitBtn}>
              Ziyaret Et
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
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
            <span className={styles.eyebrow}>✦ Portföy</span>
            <h1 className={styles.heroTitle}>
              Hayata Geçirdiğimiz<br />
              <span className="text-gradient">Dijital Projeler</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Müşterilerimiz için geliştirdiğimiz web siteleri, e-ticaret platformları,
              yapay zekâ çözümleri ve daha fazlası.
            </p>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section className={styles.projectsSection}>
          <div className={styles.container}>

            {projects.length === 0 ? (
              /* Empty state */
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h2 className={styles.emptyTitle}>Projeler Yakında</h2>
                <p className={styles.emptyDesc}>
                  Portföyümüz hazırlanıyor. Tamamlanan projelerimiz burada yer alacak.
                  <br />Bu sırada hizmetlerimize göz atabilirsiniz.
                </p>
                <a href="/hizmetlerimiz" className={styles.emptyBtn}>Hizmetlerimizi İnceleyin →</a>
              </div>
            ) : (
              <div className={styles.grid}>
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <div className={styles.ctaBox}>
              <div className={styles.ctaOrb} />
              <h2 className={styles.ctaTitle}>Projenizi Birlikte Yapalım</h2>
              <p className={styles.ctaDesc}>
                Aklınızdaki fikri hayata geçirmek için hazırız.
              </p>
              <a href="/iletisim" className={styles.ctaBtn}>Hemen İletişime Geçin →</a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
