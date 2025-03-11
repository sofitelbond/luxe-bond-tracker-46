
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LanguageOption = {
  code: 'en' | 'fr' | 'de' | 'es' | 'zh';
  label: string;
  flag: string;
};

const languageOptions: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage = languageOptions.find(option => option.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white shadow-soft hover:shadow-medium transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe size={16} className="text-sofitel-navy" />
          <span className="text-sm font-medium text-sofitel-navy">
            {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
          </span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white shadow-medium rounded-lg border-none">
        <div className="py-2 px-3 text-xs font-medium text-sofitel-navy/60 border-b border-gray-100">
          {t('languageSelector')}
        </div>
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            className={`py-2 px-3 cursor-pointer transition-colors ${
              language === option.code 
                ? 'bg-sofitel-cream text-sofitel-navy' 
                : 'text-sofitel-charcoal hover:bg-sofitel-light'
            }`}
            onClick={() => setLanguage(option.code)}
          >
            <span className="mr-2">{option.flag}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
