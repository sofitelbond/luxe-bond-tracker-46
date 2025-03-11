
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'de' | 'es' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    welcomeTitle: 'Sofitel Frankfurt Opera Employment Bond',
    welcomeSubtitle: 'Your Journey to Excellence Starts Here',
    paymentTitle: 'Secure Payment Portal',
    paymentDescription: 'Process your €1,000 refundable employment guarantee bond securely.',
    statusTracker: 'Payment Status Tracker',
    statusTrackerDescription: 'Track your payment and application in real-time.',
    supportTitle: 'Support Resources',
    supportDescription: 'Find answers to your questions and access help.',
    paymentButton: 'Make Payment',
    trackButton: 'Track Status',
    supportButton: 'Get Support',
    faqs: 'Frequently Asked Questions',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    languageSelector: 'Language',
    candidateId: 'Candidate ID',
    amount: 'Amount',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    nameOnCard: 'Name on Card',
    processPayment: 'Process Payment',
    paymentSuccessful: 'Payment Successful',
    paymentPending: 'Payment Pending',
    paymentFailed: 'Payment Failed',
    currencyEuro: '€',
    bondAmount: '1,000',
    bondDescription: 'Refundable Employment Guarantee Bond',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    message: 'Message',
    submit: 'Submit',
    footerCopyright: '© 2024 Sofitel Frankfurt Opera. All rights reserved.',
  },
  fr: {
    welcomeTitle: 'Caution d\'Emploi Sofitel Frankfurt Opera',
    welcomeSubtitle: 'Votre Parcours vers l\'Excellence Commence Ici',
    paymentTitle: 'Portail de Paiement Sécurisé',
    paymentDescription: 'Traitez votre caution d\'emploi remboursable de 1 000 € en toute sécurité.',
    statusTracker: 'Suivi du Statut de Paiement',
    statusTrackerDescription: 'Suivez votre paiement et votre candidature en temps réel.',
    supportTitle: 'Ressources d\'Assistance',
    supportDescription: 'Trouvez des réponses à vos questions et accédez à l\'aide.',
    paymentButton: 'Effectuer un Paiement',
    trackButton: 'Suivre le Statut',
    supportButton: 'Obtenir de l\'Aide',
    faqs: 'Questions Fréquemment Posées',
    contactUs: 'Contactez-nous',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d\'Utilisation',
    languageSelector: 'Langue',
    candidateId: 'ID du Candidat',
    amount: 'Montant',
    cardNumber: 'Numéro de Carte',
    expiryDate: 'Date d\'Expiration',
    cvv: 'CVV',
    nameOnCard: 'Nom sur la Carte',
    processPayment: 'Traiter le Paiement',
    paymentSuccessful: 'Paiement Réussi',
    paymentPending: 'Paiement en Attente',
    paymentFailed: 'Paiement Échoué',
    currencyEuro: '€',
    bondAmount: '1 000',
    bondDescription: 'Caution d\'Emploi Remboursable',
    emailAddress: 'Adresse Email',
    phoneNumber: 'Numéro de Téléphone',
    message: 'Message',
    submit: 'Soumettre',
    footerCopyright: '© 2024 Sofitel Frankfurt Opera. Tous droits réservés.',
  },
  de: {
    welcomeTitle: 'Sofitel Frankfurt Opera Arbeitsbürgschaft',
    welcomeSubtitle: 'Ihre Reise zur Exzellenz beginnt hier',
    paymentTitle: 'Sicheres Zahlungsportal',
    paymentDescription: 'Verarbeiten Sie Ihre erstattungsfähige Arbeitsbürgschaft von 1.000 € sicher.',
    statusTracker: 'Zahlungsstatus-Tracker',
    statusTrackerDescription: 'Verfolgen Sie Ihre Zahlung und Bewerbung in Echtzeit.',
    supportTitle: 'Support-Ressourcen',
    supportDescription: 'Finden Sie Antworten auf Ihre Fragen und erhalten Sie Hilfe.',
    paymentButton: 'Zahlung vornehmen',
    trackButton: 'Status verfolgen',
    supportButton: 'Support erhalten',
    faqs: 'Häufig gestellte Fragen',
    contactUs: 'Kontaktieren Sie uns',
    privacyPolicy: 'Datenschutzrichtlinie',
    termsOfService: 'Nutzungsbedingungen',
    languageSelector: 'Sprache',
    candidateId: 'Bewerber-ID',
    amount: 'Betrag',
    cardNumber: 'Kartennummer',
    expiryDate: 'Ablaufdatum',
    cvv: 'CVV',
    nameOnCard: 'Name auf der Karte',
    processPayment: 'Zahlung verarbeiten',
    paymentSuccessful: 'Zahlung erfolgreich',
    paymentPending: 'Zahlung ausstehend',
    paymentFailed: 'Zahlung fehlgeschlagen',
    currencyEuro: '€',
    bondAmount: '1.000',
    bondDescription: 'Erstattungsfähige Arbeitsbürgschaft',
    emailAddress: 'E-Mail-Adresse',
    phoneNumber: 'Telefonnummer',
    message: 'Nachricht',
    submit: 'Absenden',
    footerCopyright: '© 2024 Sofitel Frankfurt Opera. Alle Rechte vorbehalten.',
  },
  es: {
    welcomeTitle: 'Bono de Empleo Sofitel Frankfurt Opera',
    welcomeSubtitle: 'Su Viaje hacia la Excelencia Comienza Aquí',
    paymentTitle: 'Portal de Pago Seguro',
    paymentDescription: 'Procese su bono de garantía de empleo reembolsable de 1.000 € de forma segura.',
    statusTracker: 'Seguimiento del Estado de Pago',
    statusTrackerDescription: 'Realice un seguimiento de su pago y solicitud en tiempo real.',
    supportTitle: 'Recursos de Soporte',
    supportDescription: 'Encuentre respuestas a sus preguntas y acceda a ayuda.',
    paymentButton: 'Realizar Pago',
    trackButton: 'Seguir Estado',
    supportButton: 'Obtener Soporte',
    faqs: 'Preguntas Frecuentes',
    contactUs: 'Contáctenos',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    languageSelector: 'Idioma',
    candidateId: 'ID de Candidato',
    amount: 'Monto',
    cardNumber: 'Número de Tarjeta',
    expiryDate: 'Fecha de Vencimiento',
    cvv: 'CVV',
    nameOnCard: 'Nombre en la Tarjeta',
    processPayment: 'Procesar Pago',
    paymentSuccessful: 'Pago Exitoso',
    paymentPending: 'Pago Pendiente',
    paymentFailed: 'Pago Fallido',
    currencyEuro: '€',
    bondAmount: '1.000',
    bondDescription: 'Bono de Garantía de Empleo Reembolsable',
    emailAddress: 'Dirección de Correo Electrónico',
    phoneNumber: 'Número de Teléfono',
    message: 'Mensaje',
    submit: 'Enviar',
    footerCopyright: '© 2024 Sofitel Frankfurt Opera. Todos los derechos reservados.',
  },
  zh: {
    welcomeTitle: '法兰克福索菲特歌剧院就业保证金',
    welcomeSubtitle: '您的卓越之旅从这里开始',
    paymentTitle: '安全支付门户',
    paymentDescription: '安全处理您的 1,000 欧元可退还就业保证金。',
    statusTracker: '支付状态跟踪器',
    statusTrackerDescription: '实时跟踪您的付款和申请。',
    supportTitle: '支持资源',
    supportDescription: '找到您问题的答案并获取帮助。',
    paymentButton: '支付',
    trackButton: '跟踪状态',
    supportButton: '获取支持',
    faqs: '常见问题',
    contactUs: '联系我们',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
    languageSelector: '语言',
    candidateId: '候选人 ID',
    amount: '金额',
    cardNumber: '卡号',
    expiryDate: '到期日期',
    cvv: '安全码',
    nameOnCard: '持卡人姓名',
    processPayment: '处理付款',
    paymentSuccessful: '付款成功',
    paymentPending: '付款待处理',
    paymentFailed: '付款失败',
    currencyEuro: '€',
    bondAmount: '1,000',
    bondDescription: '可退还就业保证金',
    emailAddress: '电子邮件地址',
    phoneNumber: '电话号码',
    message: '信息',
    submit: '提交',
    footerCopyright: '© 2024 法兰克福索菲特歌剧院。保留所有权利。',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
