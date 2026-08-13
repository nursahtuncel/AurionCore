import React from 'react';
import Header from '@/components/Header';
import { Metadata } from 'next';
import styles from './GizlilikPage.module.css';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | AurionCore',
  description: 'AurionCore gizlilik politikası ve kişisel verilerin korunması hakkında bilgilendirme.',
};

export default function GizlilikPage() {
  return (
    <main>
      <Header />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Gizlilik <span className="text-gradient">Politikası</span></h1>
            <p className={styles.lastUpdate}>Son güncelleme: 5 Ağustos 2026</p>
          </div>
          
          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Giriş</h2>
              <p className={styles.text}>
                AurionCore ("biz," "bizim," veya "bize") gizliliğinize saygı duyar ve kişisel verilerinizi korumayı taahhüt eder. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı, açıkladığımızı ve koruduğumuzu açıklar.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Topladığımız Bilgiler</h2>
              <p className={styles.text}>Sizinle ilgili bilgileri çeşitli yollarla toplayabiliriz, bunlar arasında:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}><strong>Kişisel Veri:</strong> Ad, e-posta adresi, telefon numarası ve bizimle iletişime geçtiğinizde veya hizmetlerimizi kullandığınızda sağladığınız diğer iletişim bilgileri.</li>
                <li className={styles.listItem}><strong>Kullanım Verisi:</strong> Web sitemizi nasıl kullandığınıza dair bilgiler, ziyaret edilen sayfalar, harcanan süre ve gezinme kalıpları dahil.</li>
                <li className={styles.listItem}><strong>Teknik Veri:</strong> IP adresi, tarayıcı türü, cihaz bilgileri ve işletim sistemi.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Bilgilerinizi Nasıl Kullanıyoruz</h2>
              <p className={styles.text}>Topladığımız bilgileri şu amaçlarla kullanıyoruz:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Hizmetlerimizi sağlamak, işletmek ve sürdürmek</li>
                <li className={styles.listItem}>Sorgularınıza yanıt vermek ve taleplerinizi yerine getirmek</li>
                <li className={styles.listItem}>Teknik bildirimler, güncellemeler ve idari mesajlar göndermek</li>
                <li className={styles.listItem}>Web sitemizi ve hizmetlerimizi geliştirmek</li>
                <li className={styles.listItem}>Kullanım kalıplarını ve trendlerini analiz etmek</li>
                <li className={styles.listItem}>Sahte, yetkisiz veya yasa dışı faaliyetlere karşı koruma sağlamak</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. Veri Paylaşımı ve Açıklama</h2>
              <p className={styles.text}>Kişisel bilgilerinizi satmıyoruz. Verilerinizi şu kişilerle paylaşabiliriz:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}><strong>Hizmet Sağlayıcılar:</strong> Web sitemizi işletmemize ve işimizi yürütmemize yardımcı olan üçüncü taraf satıcılar.</li>
                <li className={styles.listItem}><strong>Yasal Gereklilikler:</strong> Yasa gereği veya haklarımızı ve güvenliğimizi korumak için gerektiğinde.</li>
                <li className={styles.listItem}><strong>İş Transferleri:</strong> Bir birleşme, satın alma veya varlık satışı ile bağlantılı olarak.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Veri Güvenliği</h2>
              <p className={styles.text}>
                Kişisel verilerinizi yetkisiz erişime, değişikliğe, ifşaya veya imhaya karşı korumak için uygun teknik ve organizasyonel önlemler uyguluyoruz. Ancak, İnternet üzerinden iletim yöntemlerinin hiçbiri %100 güvenli değildir.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Haklarınız</h2>
              <p className={styles.text}>Konumunuza bağlı olarak, aşağıdaki haklara sahip olabilirsiniz:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Kişisel verilerinize erişim</li>
                <li className={styles.listItem}>Yanlış verileri düzeltme</li>
                <li className={styles.listItem}>Verilerinizin silinmesini talep etme</li>
                <li className={styles.listItem}>İşleme itiraz etme veya kısıtlama</li>
                <li className={styles.listItem}>Veri taşınabilirliği</li>
                <li className={styles.listItem}>Herhangi bir zamanda onayı geri çekme</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>7. Çerezler</h2>
              <p className={styles.text}>
                Web sitemizdeki deneyiminizi geliştirmek için çerezler ve benzeri izleme teknolojileri kullanıyoruz. Çerez tercihlerinizi tarayıcı ayarlarınızdan kontrol edebilirsiniz.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. Üçüncü Taraf Bağlantıları</h2>
              <p className={styles.text}>
                Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu dış sitelerin gizlilik uygulamalarından sorumlu değiliz.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. Bu Politikadaki Değişiklikler</h2>
              <p className={styles.text}>
                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Herhangi bir değişiklik olduğunda, yeni politikayı bu sayfada yayınlayarak ve "Son güncelleme" tarihini güncelleyerek sizi bilgilendireceğiz.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>10. Bize Ulaşın</h2>
              <p className={styles.text}>
                Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:
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
