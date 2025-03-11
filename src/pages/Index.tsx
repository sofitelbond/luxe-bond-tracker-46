
import React from 'react';
import { Layout } from '../components/Layout';
import { Hero } from '../components/Hero';
import { PaymentForm } from '../components/PaymentForm';
import { SupportSection } from '../components/SupportSection';
import { LanguageProvider } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <div className="relative overflow-hidden">
          {/* Decorative elements */}
          <motion.div
            className="absolute -right-32 top-40 w-64 h-64 rounded-full bg-sofitel-gold/5 -z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute -left-32 bottom-40 w-80 h-80 rounded-full bg-sofitel-navy/5 -z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <PaymentForm />
          <SupportSection />
        </div>
        
        {/* Add the Toaster component for notifications */}
        <Toaster />
      </Layout>
    </LanguageProvider>
  );
};

export default Index;
