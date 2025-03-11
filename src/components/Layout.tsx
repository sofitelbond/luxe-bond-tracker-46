
import React, { ReactNode } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-sofitel-light">
      <header className="py-6 px-8 md:px-12 flex justify-between items-center w-full fixed top-0 z-50 glass">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Sofitel_logo.svg" 
            alt="Sofitel Logo" 
            className="h-8 mr-4"
          />
          <h1 className="text-xl font-semibold text-sofitel-navy hidden md:block">
            Frankfurt Opera
          </h1>
        </div>
        <LanguageSelector />
      </header>
      
      <motion.main 
        className="flex-grow pt-24 pb-16"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};
