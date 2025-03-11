
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const AboutBondSection: React.FC = () => {
  return (
    <>
      <div className="bg-sofitel-cream p-6 rounded-xl">
        <h4 className="text-lg font-medium text-sofitel-navy mb-3">About the Employment Bond</h4>
        <p className="text-sm text-sofitel-charcoal/80 mb-4">
          The €1,000 employment guarantee bond is fully refundable upon successful completion of your contract 
          with Sofitel Frankfurt Opera or if your application is unsuccessful.
        </p>
        <p className="text-sm text-sofitel-charcoal/80 mb-4">
          You can choose to pay the full amount of €1,000 or make a partial payment of €500.
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
    </>
  );
};

