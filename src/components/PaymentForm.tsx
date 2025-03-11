
import React from 'react';
import { useLanguage } from '../contexts/language';
import { motion } from 'framer-motion';
import { PaymentFormSection } from './payment/PaymentFormSection';
import { SecurityInfoSection } from './payment/SecurityInfoSection';
import { AboutBondSection } from './payment/AboutBondSection';

export const PaymentForm: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="payment" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-sofitel-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('paymentTitle')}
          </motion.h2>
          <motion.p
            className="text-lg text-sofitel-charcoal/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('paymentDescription')}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <PaymentFormSection />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SecurityInfoSection />
            <AboutBondSection />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
