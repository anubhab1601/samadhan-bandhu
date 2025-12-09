import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        skip_content: 'Skip to Main Content',
        screen_reader: 'Screen Reader Access',
        text_size: 'Text Size',
        logout: 'Logout',
        government_india: 'Government of India',
        ministry_name: 'सामाजिक न्याय और अधिकारिता मंत्रालय',
        platform_name: 'PM-AJAY - Field Officer Portal',
        nav_home: 'Home',
        nav_dashboard: 'Dashboard',
        nav_inspections: 'Inspections',
        nav_reports: 'Reports',
        nav_help: 'Help',
        drop_pending_inspections: 'Pending Inspections',
        drop_completed_inspections: 'Completed Inspections',
        drop_submit_report: 'Submit Report',
        drop_my_reports: 'My Reports',
        footer_about: 'About',
        footer_links: 'Important Links',
        footer_policies: 'Policies',
    },
    hi: {
        skip_content: 'मुख्य सामग्री पर जाएं',
        screen_reader: 'स्क्रीन रीडर एक्सेस',
        text_size: 'टेक्स्ट साइज',
        logout: 'लॉगआउट',
        government_india: 'भारत सरकार',
        ministry_name: 'Ministry of Social Justice and Empowerment',
        platform_name: 'पीएम-अजय (आदर्श ग्राम) - फील्ड ऑफिसर पोर्टल',
        nav_home: 'होम',
        nav_dashboard: 'डैशबोर्ड',
        nav_inspections: 'निरीक्षण',
        nav_reports: 'रिपोर्ट',
        nav_help: 'सहायता',
        drop_pending_inspections: 'लंबित निरीक्षण',
        drop_completed_inspections: 'पूर्ण निरीक्षण',
        drop_submit_report: 'रिपोर्ट जमा करें',
        drop_my_reports: 'मेरी रिपोर्ट',
        footer_about: 'के बारे में',
        footer_links: 'महत्वपूर्ण लिंक',
        footer_policies: 'नीतियां',
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');
    const toggleLanguage = (lang) => setLanguage(lang);
    const t = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
}
