
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CreditCard, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PaymentFormSection: React.FC = () => {
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
    <div className="bg-white p-8 rounded-2xl shadow-card relative border border-gray-100">
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
          <CreditCard size={14} className="text-sofitel-gold" />
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
    </div>
  );
};
