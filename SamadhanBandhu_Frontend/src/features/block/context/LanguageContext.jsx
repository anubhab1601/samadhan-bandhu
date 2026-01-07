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
        platform_name: 'PM-AJAY - Block Officer Portal',
        nav_home: 'Home',
        nav_dashboard: 'Dashboard',
        nav_applications: 'Applications',
        nav_tenders: 'Tenders',
        nav_projects: 'Projects',
        nav_help: 'Help',

        // Dropdown menus
        drop_new_application: 'New Application',
        drop_my_applications: 'My Applications',
        drop_track_status: 'Track Status',
        drop_active_tenders: 'Active Tenders',
        drop_release_tender: 'Release Tender',
        drop_tender_applications: 'Tender Applications',
        drop_ongoing_projects: 'Ongoing Projects',
        drop_completed_projects: 'Completed Projects',

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
        platform_name: 'पीएम-अजय (आदर्श ग्राम) - ब्लॉक अधिकारी पोर्टल',
        nav_home: 'होम',
        nav_dashboard: 'डैशबोर्ड',
        nav_applications: 'आवेदन',
        nav_tenders: 'टेंडर',
        nav_projects: 'परियोजनाएं',
        nav_help: 'सहायता',

        // Dropdown menus
        drop_new_application: 'नया आवेदन',
        drop_my_applications: 'मेरे आवेदन',
        drop_track_status: 'स्थिति ट्रैक करें',
        drop_active_tenders: 'सक्रिय टेंडर',
        drop_release_tender: 'टेंडर जारी करें',
        drop_tender_applications: 'टेंडर आवेदन',
        drop_ongoing_projects: 'चल रही परियोजनाएं',
        drop_completed_projects: 'पूर्ण परियोजनाएं',

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
