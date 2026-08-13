export type ProjectStatus = 'live' | 'coming-soon';
export type ProjectCategory = 
  | 'Tümü' 
  | 'Web Sitesi' 
  | 'Tasarım' 
  | 'QR & Yerel Görünürlük' 
  | 'Dijital Kartlar & İçerik' 
  | 'İşletme Sistemleri' 
  | 'Yapay Zekâ Çözümleri' 
  | 'Reklam & Büyüme' 
  | 'SEO';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  url?: string;
  tags: string[];
  year: number;
}

export const projects: Project[] = [
  // İleride projeleri buraya ekleyin
];
