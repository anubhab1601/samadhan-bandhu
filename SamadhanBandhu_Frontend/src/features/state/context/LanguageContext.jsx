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
        platform_name: 'PM-AJAY - State Portal',
        nav_home: 'Home',
        nav_dashboard: 'Dashboard',
        nav_applications: 'Applications',
        nav_verification: 'Verification',
        nav_projects: 'Projects',
        nav_inspections: 'Inspections',
        nav_reports: 'Reports',
        nav_help: 'Help',

        // Dropdown menus
        drop_pending_applications: 'Pending Applications',
        drop_approved_applications: 'Approved Applications',
        drop_all_applications: 'All Applications',
        drop_assign_iva: 'Assign to IVA',
        drop_verification_reports: 'Verification Reports',
        drop_forward_to_pmajay: 'Forward to PM-AJAY',
        drop_ongoing_projects: 'Ongoing Projects',
        drop_completed_projects: 'Completed Projects',
        drop_schedule_inspection: 'Schedule Inspection',
        drop_inspection_reports: 'Inspection Reports',
        drop_monthly: 'Monthly Reports',
        drop_quarterly: 'Quarterly Reports',

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
        platform_name: 'पीएम-अजय (आदर्श ग्राम) - राज्य पोर्टल',
        nav_home: 'होम',
        nav_dashboard: 'डैशबोर्ड',
        nav_applications: 'आवेदन',
        nav_verification: 'सत्यापन',
        nav_projects: 'परियोजनाएं',
        nav_inspections: 'निरीक्षण',
        nav_reports: 'रिपोर्ट',
        nav_help: 'सहायता',

        // Dropdown menus
        drop_pending_applications: 'लंबित आवेदन',
        drop_approved_applications: 'स्वीकृत आवेदन',
        drop_all_applications: 'सभी आवेदन',
        drop_assign_iva: 'IVA को सौंपें',
        drop_verification_reports: 'सत्यापन रिपोर्ट',
        drop_forward_to_pmajay: 'PM-AJAY को भेजें',
        drop_ongoing_projects: 'चल रही परियोजनाएं',
        drop_completed_projects: 'पूर्ण परियोजनाएं',
        drop_schedule_inspection: 'निरीक्षण शेड्यूल करें',
        drop_inspection_reports: 'निरीक्षण रिपोर्ट',
        drop_monthly: 'मासिक रिपोर्ट',
        drop_quarterly: 'त्रैमासिक रिपोर्ट',

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
