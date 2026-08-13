"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    `${styles.navLink} ${isActive(href) ? styles.activeNavLink : ''}`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink} onClick={() => setIsMobileMenuOpen(false)}>
          <Logo className={styles.logo} />
        </Link>

        <div className={`${styles.navWrapper} ${isMobileMenuOpen ? styles.open : ''}`}>
          <nav className={styles.nav}>
            <Link href="/" className={linkClass('/')} onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>
            <Link href="/hizmetlerimiz" className={linkClass('/hizmetlerimiz')} onClick={() => setIsMobileMenuOpen(false)}>Hizmetler</Link>
            <Link href="/hakkimizda" className={linkClass('/hakkimizda')} onClick={() => setIsMobileMenuOpen(false)}>Hakkımızda</Link>
            <Link href="/referanslar" className={linkClass('/referanslar')} onClick={() => setIsMobileMenuOpen(false)}>Referanslar</Link>
            <Link href="/blog" className={linkClass('/blog')} onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <div className={styles.themeToggleWrapper}>
              <ThemeToggle />
            </div>
            <Link href="/iletisim" className={`${styles.contactBtn} ${pathname === '/iletisim' ? styles.activeContactBtn : ''}`} onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
          </nav>
        </div>

        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>
    </header>
  );
}
