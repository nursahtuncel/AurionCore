"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { serviceCategories } from '@/data/services';
import styles from './ServicesPage.module.css';

export default function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const activeData = serviceCategories.find(c => c.id === activeCategory);

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <nav className={styles.sidebarNav}>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.categoryBtnActive : ''}`}
              >
                <span className={styles.categoryBtnText}>{category.title}</span>
                <span className={styles.categoryCount}>{category.services.length}</span>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarCTA}>
            <p>Hangi hizmeti seçeceğinize karar veremediniz mi?</p>
            <Link href="/iletisim" className={styles.sidebarCTABtn}>
              Ücretsiz Danışın
            </Link>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className={styles.content} key={activeCategory}>
        {activeData && (
          <>
            {/* Category Header */}
            <div className={styles.categoryHeader}>
              <div>
                <h2 className={styles.categoryTitle}>{activeData.title}</h2>
                {activeData.description && (
                  <p className={styles.categoryDesc}>{activeData.description}</p>
                )}
              </div>
              <div className={styles.categoryBadge}>
                {activeData.services.length} Hizmet
              </div>
            </div>

            {/* Services Grid */}
            <div className={styles.grid}>
              {activeData.services.map((service, index) => (
                <div
                  key={service.id}
                  className={`${styles.card} ${hoveredCard === service.id ? styles.cardHovered : ''}`}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDesc}>{service.description}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceBox}>
                      <span className={styles.priceLabel}>Başlangıç fiyatı</span>
                      <span className={styles.priceValue}>{service.price}</span>
                    </div>
                    <Link href="/iletisim" className={styles.orderBtn}>
                      <span>Sipariş Ver</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
