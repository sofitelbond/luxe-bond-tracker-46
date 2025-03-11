
export type Language = 'en' | 'fr' | 'de' | 'es' | 'zh';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}
