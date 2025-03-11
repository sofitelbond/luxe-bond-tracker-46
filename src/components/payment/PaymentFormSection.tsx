
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const PaymentFormSection: React.FC = () => {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    provider: 'mtn',
    name: '',
    amount: '3982000', // Default to full payment
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Call the appropriate edge function based on the selected provider
      const functionName = formData.provider === 'mtn' ? 'mtn-payment' : 'airtel-payment';
      
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: {
          phoneNumber: formData.phoneNumber,
          amount: parseInt(formData.amount, 10),
          name: formData.name,
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Payment Request Sent",
        description: `Your ${formData.provider.toUpperCase()} mobile money payment request of UGX ${formData.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} has been sent to ${formData.phoneNumber}. Please check your phone to complete the transaction.`,
      });
      
      // Reset form
      setFormData({
        phoneNumber: '',
        provider: 'mtn',
        name: '',
        amount: '3982000',
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Request Failed",
        description: `There was an error processing your payment request. Please try again later.`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
            <option value="1991000">UGX 1,991,000 (Partial Payment)</option>
            <option value="3982000">UGX 3,982,000 (Full Payment)</option>
          </select>
          <p className="text-xs text-sofitel-charcoal/60 mt-1">
            You can make a partial payment of UGX 1,991,000 or the full amount of UGX 3,982,000.
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
