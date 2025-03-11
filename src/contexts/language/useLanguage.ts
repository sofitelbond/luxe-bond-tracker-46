
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { LanguageContextType } from './types';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
