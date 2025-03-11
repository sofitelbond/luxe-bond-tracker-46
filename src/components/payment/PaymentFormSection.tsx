
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PaymentFormSection: React.FC = () => {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    provider: 'mtn',
    name: '',
    amount: '1000', // Default to full payment
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format phone number
    if (name === 'phoneNumber') {
      formattedValue = value.replace(/\D/g, '').substring(0, 10);
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
        title: "Payment Request Sent",
        description: `Your mobile money payment request of €${formData.amount} has been sent to ${formData.phoneNumber}. Please check your phone to complete the transaction.`,
      });
      
      // Reset form
      setFormData({
        phoneNumber: '',
        provider: 'mtn',
        name: '',
        amount: '1000',
      });
    }, 2000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-card relative border border-gray-100">
      <div className="absolute top-0 left-0 w-full h-1 bg-sofitel-gold rounded-t-2xl" />
      
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-sofitel-navy/10 rounded-full">
          <Phone size={24} className="text-sofitel-navy" />
        </div>
        <h3 className="text-xl font-semibold text-sofitel-navy">Mobile Money Payment</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-sofitel-charcoal">
            {t('amount')}
          </label>
          <select
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
          >
            <option value="500">€500 (Partial Payment)</option>
            <option value="1000">€1000 (Full Payment)</option>
          </select>
          <p className="text-xs text-sofitel-charcoal/60 mt-1">
            You can make a partial payment of €500 or the full amount of €1000.
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="provider" className="block text-sm font-medium text-sofitel-charcoal">
            Mobile Money Provider
          </label>
          <select
            id="provider"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
          >
            <option value="mtn">MTN Mobile Money</option>
            <option value="airtel">Airtel Money</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-sofitel-charcoal">
            Mobile Money Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="07XXXXXXXX"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-sofitel-charcoal">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
          />
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-sofitel-charcoal/60">
          <Phone size={14} className="text-sofitel-gold" />
          <span>You will receive a prompt on your phone to complete the payment</span>
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

