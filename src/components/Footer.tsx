
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
export const Footer: React.FC = () => {
  const {
    t
  } = useLanguage();
  return <footer className="bg-sofitel-navy text-white py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img alt="Sofitel Logo" className="h-8 mb-4 invert" src="/lovable-uploads/a33b5203-8c2a-437e-a8d2-83da6f210bbc.png" />
          <p className="text-sm text-white/80 max-w-xs">
            Sofitel Frankfurt Opera, Opernplatz 16, 60313 Frankfurt am Main, Germany
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors text-sm inline-block after:content-[''] after:block after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full">
                {t('faqs')}
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors text-sm inline-block after:content-[''] after:block after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full">
                {t('contactUs')}
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors text-sm inline-block after:content-[''] after:block after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full">
                {t('privacyPolicy')}
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors text-sm inline-block after:content-[''] after:block after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full">
                {t('termsOfService')}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('contactUs')}</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Email: employment@sofitel-frankfurt.com</li>
            <li>Tel: +49 1521 0755346</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/60">
        {t('footerCopyright')}
      </div>
    </footer>;
};
