
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PaymentFormSection: React.FC = () => {
  const { t } = useLanguage();

  const handlePartialPaymentClick = () => {
    // Open the payment link in a new tab
    window.open('https://simpleswap.io/exchange?id=q6ona2v83j60u8bp', '_blank');
    
    // Show a toast notification
    toast({
      title: "Payment Redirect",
      description: "You're being redirected to our secure payment partner to make the €500 partial payment.",
    });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-card relative border border-gray-100">
      <div className="absolute top-0 left-0 w-full h-1 bg-sofitel-gold rounded-t-2xl" />
      
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-sofitel-navy/10 rounded-full">
          <ExternalLink size={24} className="text-sofitel-navy" />
        </div>
        <h3 className="text-xl font-semibold text-sofitel-navy">Payment Options</h3>
      </div>
      
      <div className="space-y-8">
        <div>
          <h4 className="text-lg font-medium text-sofitel-navy mb-3">Employment Bond Payment</h4>
          <p className="text-sm text-sofitel-charcoal/80 mb-6">
            You can make a partial payment of €500 for your employment guarantee bond. 
            Each partial payment will be credited toward your total bond amount of €1,000.
          </p>
          
          <div className="p-6 border border-gray-100 rounded-xl bg-sofitel-cream/30 mb-6">
            <h5 className="font-medium mb-2 text-sofitel-navy">Important Payment Information</h5>
            <ul className="text-sm text-sofitel-charcoal/80 space-y-2 list-disc pl-5">
              <li>The employment guarantee bond is €1,000 (equivalent to approximately UGX 3,982,000)</li>
              <li>You can make partial payments of €500 each (approximately UGX 1,991,000)</li>
              <li>Your payment is fully refundable upon successful completion of your contract</li>
              <li>You will be redirected to our secure payment partner to complete your transaction</li>
            </ul>
          </div>
          
          <motion.button
            onClick={handlePartialPaymentClick}
            className="w-full py-4 px-6 rounded-lg bg-sofitel-navy hover:bg-sofitel-navy/90 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Make €500 Partial Payment</span>
            <ExternalLink size={18} />
          </motion.button>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center space-x-2 text-sm text-sofitel-charcoal/60">
            <ExternalLink size={14} className="text-sofitel-gold" />
            <span>You will be redirected to our secure payment partner to complete your transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};
