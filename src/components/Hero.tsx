import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1519580979853-d0da5a9ed416')] bg-cover bg-center opacity-[0.07]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sofitel-light to-white" />
      
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-2">
              <motion.span 
                className="inline-block px-4 py-1 rounded-full bg-sofitel-navy/5 text-sofitel-navy text-sm font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Sofitel Frankfurt Opera
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-sofitel-navy leading-tight">
                {t('welcomeTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-sofitel-charcoal/70">
                {t('welcomeSubtitle')}
              </p>
            </div>
            
            <p className="text-lg text-sofitel-charcoal/80 max-w-xl">
              Welcome to Sofitel Frankfurt Opera's secure employment guarantee bond portal. 
              Process your employment bond payment of UGX 1,991,000 (partial) or UGX 3,982,000 (full) easily via mobile money.
            </p>
            
            <div className="flex flex-wrap gap-3 items-center">
              <motion.a
                href="#payment"
                className="px-6 py-3 bg-sofitel-navy text-white rounded-lg font-medium flex items-center space-x-2 shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{t('paymentButton')}</span>
                <ArrowRight size={16} />
              </motion.a>
            </div>
            
            <div className="flex items-center space-x-2 text-sofitel-charcoal/60 text-sm">
              <ShieldCheck size={16} className="text-sofitel-gold" />
              <span>Secure, encrypted, and GDPR-compliant payment processing</span>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-card overflow-hidden p-6 sm:p-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sofitel-navy to-sofitel-gold" />
              <h3 className="text-xl font-semibold text-sofitel-navy mb-6">{t('bondDescription')}</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-sofitel-charcoal/70">{t('amount')}</span>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-sofitel-navy">UGX 3,982,000</div>
                    <div className="text-sm text-sofitel-charcoal/70">or UGX 1,991,000 (partial)</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-sofitel-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sofitel-navy font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sofitel-navy">Choose payment amount</h4>
                      <p className="text-sm text-sofitel-charcoal/70">Select either a partial (UGX 1,991,000) or full (UGX 3,982,000) payment option.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-sofitel-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sofitel-navy font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sofitel-navy">Make a secure payment</h4>
                      <p className="text-sm text-sofitel-charcoal/70">Process your employment guarantee bond through our secure mobile money gateway.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-sofitel-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sofitel-navy font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sofitel-navy">Receive confirmation</h4>
                      <p className="text-sm text-sofitel-charcoal/70">Get immediate confirmation of your payment via email.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-sofitel-cream rounded-full -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-sofitel-gold/10 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
