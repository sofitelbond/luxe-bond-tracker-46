import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/Layout';
import { useLanguage } from '../contexts/language';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { t } = useLanguage();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is already authenticated, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast({
        title: isLoginMode ? "Login error" : "Sign up error",
        description: "Email and password are required",
        variant: "destructive",
      });
      return false;
    }

    if (!isLoginMode && (!formData.fullName || !formData.phoneNumber)) {
      toast({
        title: "Sign up error",
        description: "Full name and phone number are required",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      if (isLoginMode) {
        const { error } = await signIn(formData.email, formData.password);
        if (!error) {
          // Successfully logged in
          setFormData({
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
          });
        }
      } else {
        const { error } = await signUp(
          formData.email, 
          formData.password, 
          formData.fullName, 
          formData.phoneNumber
        );
        if (!error) {
          // Successfully signed up
          setFormData({
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
          });
          setIsLoginMode(true); // Switch to login mode after successful signup
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-sofitel-navy">
              {isLoginMode ? t('login') || 'Sign in to your account' : t('signup') || 'Create an account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLoginMode 
                ? (t('noAccount') || "Don't have an account?") 
                : (t('haveAccount') || "Already have an account?")}
              <button 
                onClick={toggleMode} 
                className="ml-1 font-medium text-sofitel-gold hover:text-sofitel-gold/80"
              >
                {isLoginMode 
                  ? (t('signupNow') || "Sign up now") 
                  : (t('loginNow') || "Sign in now")}
              </button>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('emailAddress') || 'Email address'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sofitel-gold focus:outline-none focus:ring-sofitel-gold sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('password') || 'Password'}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sofitel-gold focus:outline-none focus:ring-sofitel-gold sm:text-sm"
                  placeholder="Password"
                />
              </div>
              
              {!isLoginMode && (
                <>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      {t('fullName') || 'Full Name'}
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sofitel-gold focus:outline-none focus:ring-sofitel-gold sm:text-sm"
                      placeholder="Full Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      {t('phoneNumber') || 'Phone Number'}
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sofitel-gold focus:outline-none focus:ring-sofitel-gold sm:text-sm"
                      placeholder="Phone Number"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-sofitel-gold py-2 px-4 text-sm font-medium text-white hover:bg-sofitel-gold/90 focus:outline-none focus:ring-2 focus:ring-sofitel-gold focus:ring-offset-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLoginMode ? (t('signIn') || 'Sign in') : (t('signUp') || 'Sign up')
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Auth;
