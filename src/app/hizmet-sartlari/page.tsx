import React from 'react';
import Header from '@/components/Header';
import { Metadata } from 'next';
import styles from './HizmetPage.module.css';

export const metadata: Metadata = {
  title: 'Hizmet Şartları | AurionCore',
  description: 'AurionCore hizmet şartları ve kullanım koşulları.',
};

export default function HizmetPage() {
  return (
    <main>
      <Header />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Hizmet <span className="text-gradient">Şartları</span></h1>
            <p className={styles.lastUpdate}>Son güncelleme: 5 Ağustos 2026</p>
          </div>
          
          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Şartlara Uyum</h2>
              <p className={styles.text}>
                AurionCore ("Şirket," "biz," "bizim," veya "bize") tarafından sağlanan hizmetlere erişerek veya kullanarak, bu Hizmet Şartları'na bağlı kalmayı kabul etmiş olursunuz. Bu şartları kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayın.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Hizmetlerin Tanımı</h2>
              <p className={styles.text}>AurionCore, yazılım geliştirme hizmetleri sunmaktadır, bunlar dahil ancak bunlarla sınırlı olmamak üzere:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Ön Yüz Mimarisi & Geliştirme</li>
                <li className={styles.listItem}>Mobil Uygulama Geliştirme</li>
                <li className={styles.listItem}>UI/UX Mühendisliği</li>
                <li className={styles.listItem}>Performans Optimizasyonu</li>
                <li className={styles.listItem}>Arka Uç & API Mimarisi</li>
                <li className={styles.listItem}>DevOps & Bulut Altyapısı</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Müşteri Sorumlulukları</h2>
              <p className={styles.text}>Bir müşteri olarak, şunları kabul edersiniz:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Proje yürütümü için gerekli doğru ve eksiksiz bilgileri sağlamak</li>
                <li className={styles.listItem}>İletişimlere zamanında yanıt vermek</li>
                <li className={styles.listItem}>Kararlaştırılan takvimlere göre ödemeleri yapmak</li>
                <li className={styles.listItem}>Sistemlere, hesaplara ve kaynaklara gerekli erişimi sağlamak</li>
                <li className={styles.listItem}>Teslimatları kararlaştırılan zaman dilimlerinde gözden geçirip onaylamak</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. Fikri Mülkiyet</h2>
              <p className={styles.text}>
                Tam ödeme yapıldıktan sonra, projeniz için özel olarak oluşturulan tüm özel kodlar, tasarımlar ve teslimatlar sizin mülkiyetiniz olur. Bizim hakkımız saklıdır:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Proje sırasında kazanılan genel bilgi ve teknikleri kullanmak</li>
                <li className={styles.listItem}>Telif hakkı olmayan bileşenleri, kütüphaneleri ve araçları yeniden kullanmak</li>
                <li className={styles.listItem}>Projeyi portföyümüzde sergilemek (aksi kararlaştırılmadıkça)</li>
              </ul>
              <p className={styles.text}>
                Önceden var olan fikri mülkiyet ve üçüncü taraf lisansları, ilgili sahiplerinde kalır.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Ödeme Şartları</h2>
              <p className={styles.text}>Ödeme şartları, bireysel proje anlaşmalarında belirtilmiştir. Genel şartlar şunları içerir:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Proje başlamadan önce depozito gerekebilir</li>
                <li className={styles.listItem}>Her aşamanın teslimi ve onayı üzerine aşama ödemeleri yapılır</li>
                <li className={styles.listItem}>Geç ödemeler ek ücretlere veya projenin askıya alınmasına neden olabilir</li>
                <li className={styles.listItem}>Tüm fiyatlar, aksi belirtilmedikçe, geçerli vergiler hariçtir</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Proje Değişiklikleri & Kapsam</h2>
              <p className={styles.text}>Anlaşma imzalandıktan sonra proje kapsamındaki değişiklikler:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Ek süre ve maliyet tahminleri gerektirebilir</li>
                <li className={styles.listItem}>Değişiklik emirleriyle belgelenir</li>
                <li className={styles.listItem}>Proje zaman çizelgelerini ve kilometre taşlarını etkileyebilir</li>
              </ul>
              <p className={styles.text}>
                Her iki taraf da uygulamadan önce kapsam değişikliklerini yazılı olarak kabul etmelidir.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>7. Gizlilik</h2>
              <p className={styles.text}>
                Her iki taraf da, katılım sırasında paylaşılan tüm özel bilgileri, ticari sırları ve hassas verileri gizli tutmayı kabul eder. Bu yükümlülük, herhangi bir anlaşmanın sona ermesinden sonra da devam eder.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. Garantiler & Feragatnameler</h2>
              <p className={styles.text}>Hizmetlerimizin profesyonel beceri ve özenle gerçekleştirileceğini garanti ederiz. Ancak:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Belirli iş sonuçlarını veya sonuçlarını garanti etmiyoruz</li>
                <li className={styles.listItem}>Üçüncü taraf hizmetler ve entegrasyonlar kendi şartlarına tabidir</li>
                <li className={styles.listItem}>Hizmetler garanti süresinden sonra "olduğu gibi" sağlanır</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. Sorumluluğun Sınırlandırılması</h2>
              <p className={styles.text}>
                Yasaların izin verdiği azami ölçüde, AurionCore, kar kaybı, veri kaybı veya iş fırsatları dahil olmak üzere dolaylı, tesadüfi, özel, sonuçsal veya cezai zararlardan sorumlu tutulamaz. Toplam sorumluluğumuz, iddiaya neden olan belirli hizmetler için ödediğiniz tutarları aşmayacaktır.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>10. Fesih</h2>
              <p className={styles.text}>Taraflardan biri yazılı bildirimle bir proje anlaşmasını feshedebilir. Fesih durumunda:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Bugüne kadar tamamlanan tüm işler için ödeme yapılması gerekir</li>
                <li className={styles.listItem}>Ödenen teslimatlar müşteriye devredilecektir</li>
                <li className={styles.listItem}>Gizlilik yükümlülükleri yürürlükte kalır</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>11. Yürürlükteki Hukuk</h2>
              <p className={styles.text}>
                Bu Hizmet Şartları, Türkiye Cumhuriyeti yasalarına göre yönetilecek ve yorumlanacaktır. Herhangi bir anlaşmazlık, İstanbul, Türkiye mahkemelerinde çözülecektir.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>12. Şartlarda Değişiklikler</h2>
              <p className={styles.text}>
                Bu şartları herhangi bir zamanda değiştirme hakkımız saklıdır. Değişiklikler, web sitemizde yayınlandığında yürürlüğe girecektir. Hizmetlerimizi kullanmaya devam etmeniz, değiştirilmiş şartları kabul ettiğiniz anlamına gelir.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>13. İletişim Bilgileri</h2>
              <p className={styles.text}>
                Bu Hizmet Şartları hakkında sorularınız için lütfen bizimle iletişime geçin:
              </p>
              <div className={styles.contactInfo}>
                <p>AurionCore</p>
                <p>İstanbul, Türkiye</p>
                <p>E-posta: info@aurioncore.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
