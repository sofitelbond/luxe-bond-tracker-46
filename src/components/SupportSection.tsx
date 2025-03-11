
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is the employment guarantee bond?",
    answer: "The employment guarantee bond is a refundable deposit of €1,000 that candidates pay to secure their position at Sofitel Frankfurt Opera. It demonstrates your commitment to the role and will be fully refunded upon successful completion of your contract or if your application is unsuccessful."
  },
  {
    question: "Is the bond payment refundable?",
    answer: "Yes, the €1,000 bond payment is fully refundable in two scenarios: (1) upon successful completion of your employment contract, or (2) if your application is unsuccessful. The refund process typically takes 4-6 weeks after your contract completion."
  },
  {
    question: "How can I track my payment status?",
    answer: "You can track your payment status by using the Status Tracker feature on this website. Simply enter your Candidate ID (provided in your job offer email) to see real-time updates on your payment and application progress."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We currently accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover. Unfortunately, we do not accept PayPal, bank transfers, or cryptocurrency at this time."
  },
  {
    question: "How long does the payment process take?",
    answer: "The payment process is usually immediate, but it may take up to 48 hours for the payment to be fully processed and reflected in your application status. You will receive an email confirmation once your payment has been successfully processed."
  },
  {
    question: "What happens if my payment fails?",
    answer: "If your payment fails, you can attempt to make the payment again with the same or a different card. If you continue to experience issues, please contact our support team via email at employment@sofitel-frankfurt.com or call +49 69 256695 0 for assistance."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we take security very seriously. All payment information is encrypted using industry-standard SSL/TLS technology. We are PCI DSS compliant and do not store your full credit card details on our servers. Your personal data is handled in accordance with GDPR regulations."
  }
];

export const SupportSection: React.FC = () => {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond shortly.",
    });
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section id="support" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-sofitel-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('supportTitle')}
          </motion.h2>
          <motion.p
            className="text-lg text-sofitel-charcoal/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('supportDescription')}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div 
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-sofitel-navy/10 rounded-full">
                    <HelpCircle size={24} className="text-sofitel-navy" />
                  </div>
                  <h3 className="text-xl font-semibold text-sofitel-navy">{t('faqs')}</h3>
                </div>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <button 
                        className="flex justify-between items-center w-full text-left py-3"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="font-medium text-sofitel-navy">{faq.question}</span>
                        {openFaqIndex === index ? (
                          <ChevronUp size={18} className="text-sofitel-navy/70" />
                        ) : (
                          <ChevronDown size={18} className="text-sofitel-navy/70" />
                        )}
                      </button>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: openFaqIndex === index ? 'auto' : 0,
                          opacity: openFaqIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-3 pt-1 text-sofitel-charcoal/80 text-sm">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-sofitel-navy/10 rounded-full">
                  <Mail size={24} className="text-sofitel-navy" />
                </div>
                <h3 className="text-xl font-semibold text-sofitel-navy">{t('contactUs')}</h3>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-sofitel-charcoal">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-sofitel-charcoal">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-sofitel-charcoal">
                    {t('phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-sofitel-charcoal">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sofitel-navy/30 focus:border-sofitel-navy transition-all resize-none"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-sofitel-navy hover:bg-sofitel-navy/90 text-white font-medium shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('submit')}
                </motion.button>
              </form>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <h4 className="text-lg font-medium text-sofitel-navy mb-4">Direct Contact</h4>
              <ul className="space-y-4">
                <li className="flex space-x-3">
                  <Mail size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sofitel-charcoal">Email</h5>
                    <a href="mailto:employment@sofitel-frankfurt.com" className="text-sm text-sofitel-navy hover:underline">
                      employment@sofitel-frankfurt.com
                    </a>
                  </div>
                </li>
                
                <li className="flex space-x-3">
                  <Phone size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sofitel-charcoal">Phone</h5>
                    <a href="tel:+4969256695" className="text-sm text-sofitel-navy hover:underline">
                      +49 69 256695 0
                    </a>
                  </div>
                </li>
                
                <li className="flex space-x-3">
                  <Globe size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sofitel-charcoal">Website</h5>
                    <a href="https://www.sofitel-frankfurt.com" target="_blank" rel="noopener noreferrer" className="text-sm text-sofitel-navy hover:underline">
                      www.sofitel-frankfurt.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
