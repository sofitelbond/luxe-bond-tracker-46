
import React from 'react';
import { Shield } from 'lucide-react';

export const SecurityInfoSection: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
      <h4 className="text-lg font-medium text-sofitel-navy mb-4">Payment Security</h4>
      <ul className="space-y-4">
        <li className="flex space-x-3">
          <Shield size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-sofitel-charcoal">Secure Mobile Transaction</h5>
            <p className="text-sm text-sofitel-charcoal/70">All mobile money transactions are encrypted and secured.</p>
          </div>
        </li>
        
        <li className="flex space-x-3">
          <Shield size={20} className="text-sofitel-gold flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-sofitel-charcoal">PIN Protection</h5>
            <p className="text-sm text-sofitel-charcoal/70">Your mobile money PIN is never shared with our system.</p>
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
