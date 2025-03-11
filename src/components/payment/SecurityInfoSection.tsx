
import React from 'react';
import { Shield, Wallet } from 'lucide-react';

export const SecurityInfoSection: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
      <h4 className="text-lg font-medium text-sofitel-navy mb-4">Payment Security</h4>
      <ul className="space-y-4">
        <li className="flex space-x-3">
          <Shield size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-sofitel-charcoal">Secure Payments</h5>
            <p className="text-sm text-sofitel-charcoal/70">All transactions are encrypted and secured by our payment partner.</p>
          </div>
        </li>
        
        <li className="flex space-x-3">
          <Shield size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-sofitel-charcoal">Data Protection</h5>
            <p className="text-sm text-sofitel-charcoal/70">Your personal information is always secure and never shared with unauthorized parties.</p>
          </div>
        </li>
        
        <li className="flex space-x-3">
          <Wallet size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-sofitel-charcoal">Flexible Payments</h5>
            <p className="text-sm text-sofitel-charcoal/70">Make partial payments of €500 towards your €1,000 employment bond.</p>
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
  );
};
