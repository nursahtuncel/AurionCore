import React from 'react';
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | AurionCore',
  description: 'Bizimle iletişime geçin. Dijital projelerinizi birlikte hayata geçirelim.',
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--background)' }}>
        <ContactSection />
      </div>
    </main>
  );
}
