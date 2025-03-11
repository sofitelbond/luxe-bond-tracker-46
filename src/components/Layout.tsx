import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/language';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/33e57c76-9e15-49bd-b6de-19edb216faad.png" 
              alt="Sofitel Logo" 
              className="h-10 w-auto" 
            />
            <span className="ml-2 text-xl font-semibold text-sofitel-navy">Frankfurt Opera</span>
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
                <button 
                  onClick={() => signOut()}
                  className="text-sofitel-navy hover:text-sofitel-gold transition-colors text-sm"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="px-4 py-2 rounded-md bg-sofitel-gold text-white hover:bg-sofitel-gold/90 transition-colors text-sm"
              >
                {t('signIn')}
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};
