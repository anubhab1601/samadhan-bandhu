import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Navigation
        skip_content: 'Skip to Main Content',
        screen_reader: 'Screen Reader Access',
        text_size: 'Text Size',
        logout: 'Logout',
        government_india: 'Government of India',
        ministry_name: 'सामाजिक न्याय और अधिकारिता मंत्रालय',
        platform_name: 'PM-AJAY - Agency Portal',
        nav_home: 'Home',
        nav_dashboard: 'Dashboard',
        nav_tenders: 'Tenders',
        nav_proposals: 'My Proposals',
        nav_projects: 'Projects',
        nav_payments: 'Payments',
        nav_help: 'Help',

        // Dropdown menus
        drop_available_tenders: 'Available Tenders',
        drop_applied_tenders: 'Applied Tenders',
        drop_submit_proposal: 'Submit Proposal',
        drop_ongoing_projects: 'Ongoing Projects',
        drop_completed_projects: 'Completed Projects',
        drop_payment_history: 'Payment History',
        drop_pending_payments: 'Pending Payments',

        // Footer
        footer_about: 'About',
        footer_links: 'Important Links',
        footer_policies: 'Policies',
    },
    hi: {
        // Navigation
        skip_content: 'मुख्य सामग्री पर जाएं',
        screen_reader: 'स्क्रीन रीडर एक्सेस',
        text_size: 'टेक्स्ट साइज',
        logout: 'लॉगआउट',
        government_india: 'भारत सरकार',
        ministry_name: 'Ministry of Social Justice and Empowerment',
        platform_name: 'पीएम-अजय (आदर्श ग्राम) - एजेंसी पोर्टल',
        nav_home: 'होम',
        nav_dashboard: 'डैशबोर्ड',
        nav_tenders: 'निविदाएं',
        nav_proposals: 'मेरे प्रस्ताव',
        nav_projects: 'परियोजनाएं',
        nav_payments: 'भुगतान',
        nav_help: 'सहायता',

        // Dropdown menus
        drop_available_tenders: 'उपलब्ध निविदाएं',
        drop_applied_tenders: 'आवेदित निविदाएं',
        drop_submit_proposal: 'प्रस्ताव जमा करें',
        drop_ongoing_projects: 'चल रही परियोजनाएं',
        drop_completed_projects: 'पूर्ण परियोजनाएं',
        drop_payment_history: 'भुगतान इतिहास',
        drop_pending_payments: 'लंबित भुगतान',

        // Footer
        footer_about: 'के बारे में',
        footer_links: 'महत्वपूर्ण लिंक',
        footer_policies: 'नीतियां',
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = (lang) => {
        setLanguage(lang);
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
