
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
  );
};
