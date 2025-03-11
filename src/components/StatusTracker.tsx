import React, { useState } from 'react';
import { useLanguage } from '../contexts/language';
import { motion } from 'framer-motion';
import { Search, Check, Clock, XCircle, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StatusResult {
  status: 'successful' | 'pending' | 'failed' | null;
  message: string;
  date?: string;
  reference?: string;
}

export const StatusTracker: React.FC = () => {
  const { t } = useLanguage();
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<StatusResult>({
    status: null,
    message: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your tracking ID",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call to check status
    setTimeout(() => {
      // Mock response based on tracking ID pattern
      let mockResult: StatusResult;
      
      if (trackingId.startsWith('SOF-2024-')) {
        if (trackingId.endsWith('1')) {
          mockResult = {
            status: 'successful',
            message: 'Your payment has been successfully processed. Welcome to the Sofitel team!',
            date: '2024-06-10',
            reference: 'PAY-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          };
        } else if (trackingId.endsWith('2')) {
          mockResult = {
            status: 'pending',
            message: 'Your payment is being processed. Please check back in 24-48 hours.',
            date: '2024-06-12',
          };
        } else if (trackingId.endsWith('3')) {
          mockResult = {
            status: 'failed',
            message: 'We encountered an issue with your payment. Please contact our support team.',
          };
        } else {
          mockResult = {
            status: 'pending',
            message: 'Your application is being reviewed. Payment will be processed once approved.',
          };
        }
      } else {
        toast({
          variant: "destructive",
          title: "Invalid ID Format",
          description: "Please enter a valid tracking ID starting with SOF-2024-",
        });
        mockResult = {
          status: null,
          message: '',
        };
      }
      
      setResult(mockResult);
      setIsSearching(false);
    }, 1500);
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case 'successful':
        return <Check className="h-8 w-8 text-green-500" />;
      case 'pending':
        return <Clock className="h-8 w-8 text-amber-500" />;
      case 'failed':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case 'successful':
        return 'bg-green-50 border-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-50 border-amber-100 text-amber-800';
      case 'failed':
        return 'bg-red-50 border-red-100 text-red-800';
      default:
        return '';
    }
  };

  const getStatusText = () => {
    switch (result.status) {
      case 'successful':
        return t('paymentSuccessful');
      case 'pending':
        return t('paymentPending');
      case 'failed':
        return t('paymentFailed');
      default:
        return '';
    }
  };

  return (
    <section id="track" className="py-20 md:py-24 bg-sofitel-cream/50">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-sofitel-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('statusTracker')}
          </motion.h2>
          <motion.p
            className="text-lg text-sofitel-charcoal/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('statusTrackerDescription')}
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-10">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your candidate ID (e.g., SOF-2024-123456)"
                  className="w-full px-5 py-4 pr-36 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={isSearching}
                  className={`absolute right-2 top-2 px-6 py-2 rounded-lg ${
                    isSearching 
                      ? 'bg-sofitel-navy/70 cursor-wait' 
                      : 'bg-sofitel-navy hover:bg-sofitel-navy/90'
                  } text-white font-medium flex items-center space-x-2 transition-all`}
                  whileHover={{ scale: isSearching ? 1 : 1.02 }}
                  whileTap={{ scale: isSearching ? 1 : 0.98 }}
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="sr-only">Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      <span>Search</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
            
            {result.status && (
              <motion.div
                className={`p-6 rounded-xl border ${getStatusColor()} flex items-start space-x-4`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex-shrink-0">
                  {getStatusIcon()}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-1">{getStatusText()}</h3>
                  <p className="text-sm opacity-80 mb-2">{result.message}</p>
                  
                  {result.status === 'successful' && (
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <p className="font-medium">Reference Number</p>
                        <p className="opacity-80">{result.reference}</p>
                      </div>
                      <div>
                        <p className="font-medium">Payment Date</p>
                        <p className="opacity-80">{result.date}</p>
                      </div>
                    </div>
                  )}
                  
                  {result.status === 'failed' && (
                    <a href="#support" className="inline-flex items-center mt-2 text-sm font-medium hover:underline">
                      <span>Contact Support</span>
                      <ArrowRight size={14} className="ml-1" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="bg-sofitel-light p-6 border-t border-gray-100">
            <h4 className="font-medium text-sofitel-navy mb-3">How to find your Candidate ID</h4>
            <p className="text-sm text-sofitel-charcoal/80">
              Your Candidate ID was provided in your job offer email. It typically starts with SOF-2024- 
              followed by a unique number. If you can't find it, please contact HR at 
              <a href="mailto:hr@sofitel-frankfurt.com" className="text-sofitel-navy ml-1 hover:underline">
                hr@sofitel-frankfurt.com
              </a>.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-sofitel-navy mb-2">Payment Successful</h3>
            <p className="text-sm text-sofitel-charcoal/70">
              Your payment has been confirmed and your application is proceeding to the next steps.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium text-sofitel-navy mb-2">Payment Pending</h3>
            <p className="text-sm text-sofitel-charcoal/70">
              Your payment is being processed. This usually takes 24-48 hours to complete.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-sofitel-navy mb-2">Payment Failed</h3>
            <p className="text-sm text-sofitel-charcoal/70">
              There was an issue with your payment. Contact our support team for assistance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
