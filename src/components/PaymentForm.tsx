
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PaymentForm: React.FC = () => {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').substring(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/^(\d{2})/, '$1/');
      }
    }
    
    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }
    
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: "Your bond payment has been processed successfully.",
      });
      
      // Reset form
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
      });
    }, 2000);
  };

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
            className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-card relative border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-sofitel-gold rounded-t-2xl" />
            
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-sofitel-navy/10 rounded-full">
                <CreditCard size={24} className="text-sofitel-navy" />
              </div>
              <h3 className="text-xl font-semibold text-sofitel-navy">Payment Details</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-medium text-sofitel-charcoal">
                  {t('amount')}
                </label>
                <input
                  type="text"
                  id="amount"
                  value={`${t('currencyEuro')}${t('bondAmount')}`}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-sofitel-light text-sofitel-navy font-medium"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-sofitel-charcoal">
                  {t('cardNumber')}
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-sofitel-charcoal">
                    {t('expiryDate')}
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cvv" className="block text-sm font-medium text-sofitel-charcoal">
                    {t('cvv')}
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="nameOnCard" className="block text-sm font-medium text-sofitel-charcoal">
                    {t('nameOnCard')}
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-sofitel-charcoal/60">
                <Lock size={14} className="text-sofitel-gold" />
                <span>Your payment information is encrypted and secure.</span>
              </div>
              
              <motion.button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg ${
                  isProcessing 
                    ? 'bg-sofitel-navy/70 cursor-wait' 
                    : 'bg-sofitel-navy hover:bg-sofitel-navy/90'
                } text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2`}
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{t('processPayment')}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <h4 className="text-lg font-medium text-sofitel-navy mb-4">Payment Security</h4>
              <ul className="space-y-4">
                <li className="flex space-x-3">
                  <Shield size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sofitel-charcoal">Secure Encryption</h5>
                    <p className="text-sm text-sofitel-charcoal/70">All payment information is encrypted with industry-standard SSL/TLS.</p>
                  </div>
                </li>
                
                <li className="flex space-x-3">
                  <Shield size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sofitel-charcoal">PCI Compliant</h5>
                    <p className="text-sm text-sofitel-charcoal/70">We adhere to Payment Card Industry Data Security Standards.</p>
                  </div>
                </li>
                
                <li className="flex space-x-3">
                  <Shield size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sofitel-charcoal">GDPR Compliance</h5>
                    <p className="text-sm text-sofitel-charcoal/70">Your personal data is handled in accordance with EU GDPR regulations.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-sofitel-cream p-6 rounded-xl">
              <h4 className="text-lg font-medium text-sofitel-navy mb-3">About the Employment Bond</h4>
              <p className="text-sm text-sofitel-charcoal/80 mb-4">
                The €1,000 employment guarantee bond is fully refundable upon successful completion of your contract 
                with Sofitel Frankfurt Opera or if your application is unsuccessful.
              </p>
              <p className="text-sm text-sofitel-charcoal/80">
                This bond serves as a commitment to your employment and helps us ensure that candidates 
                who receive job offers are serious about their intention to join our team.
              </p>
            </div>
            
            <div className="bg-sofitel-navy/5 p-6 rounded-xl">
              <h4 className="text-lg font-medium text-sofitel-navy mb-3">Need Assistance?</h4>
              <p className="text-sm text-sofitel-charcoal/80 mb-4">
                If you have any questions or encounter any issues with the payment process, 
                please don't hesitate to contact our support team.
              </p>
              <a href="#support" className="text-sofitel-navy font-medium text-sm hover:underline inline-flex items-center space-x-1">
                <span>Contact Support</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
