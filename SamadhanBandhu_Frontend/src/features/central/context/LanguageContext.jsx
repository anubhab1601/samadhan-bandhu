import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        // Layout
        government_india: "Government of India",
        ministry_name: "Ministry of Social Justice and Empowerment",
        platform_name: "PM-AJAY UNIFIED MONITORING PLATFORM",
        skip_content: "Skip to main content",
        screen_reader: "Screen Reader Access",
        text_size: "Text Size",
        logout: "Logout",

        // Navigation
        nav_home: "Home",
        nav_dashboard: "Dashboard",
        nav_projects: "Projects",
        nav_funds: "Fund Management",
        nav_gis: "GIS Mapping",
        nav_payments: "Payments",
        nav_reports: "Reports",
        nav_help: "Help",

        // Dropdowns
        drop_overview: "Overview",
        drop_analytics: "Analytics",
        drop_all_projects: "All Projects",
        drop_create_new: "Create New",
        drop_monthly: "Monthly Reports",
        drop_annual: "Annual Reports",
        drop_custom: "Custom Reports",

        // Home Page
        hero_title: "Pradhan Mantri Anusuchit Jaati Abhyuday Yojana",
        hero_subtitle: "Empowering communities through infrastructure development and income generation schemes.",
        hero_title_2: "Inclusive Growth for All",
        hero_subtitle_2: "Ensuring social justice and equality through targeted schemes.",
        hero_title_3: "Building a Better Future",
        hero_subtitle_3: "Infrastructure development for sustainable progress in villages.",
        hero_button: "View Dashboard",

        stats_villages: "Villages Covered",
        stats_beneficiaries: "Beneficiaries",
        stats_projects: "Completed Projects",
        stats_funds: "Funds Utilized",

        features_title: "Key Features",
        feat_infra: "Adarsh Gram",
        feat_infra_desc: "Integrated development of SC majority villages",
        feat_income: "Income Generation",
        feat_income_desc: "Financial assistance for livelihood projects",
        feat_monitor: "Real-time Monitoring",
        feat_monitor_desc: "Track progress with GIS and live data",

        footer_about: "About Ministry",
        footer_links: "Important Links",
        footer_policies: "Policies",

        // Analytics
        analytics_title: "Scheme Analytics",
        analytics_subtitle: "Comprehensive view of scheme performance and fund utilization",

        // Dashboard
        dash_title: "Centre Dashboard",
        dash_subtitle: "Unified monitoring and management platform for PM-AJAY schemes",
        dash_total_projects: "Total Projects",
        dash_funds_allocated: "Funds Allocated",
        dash_pending_approvals: "Pending Approvals",
        dash_completed_projects: "Completed Projects",
        dash_quick_access: "Quick Access",
        dash_recent_projects: "Recent Projects",
        dash_view_all: "View All",

        // Table Headers
        th_project_id: "Project ID",
        th_project_name: "Project Name",
        th_state: "State",
        th_budget: "Budget",
        th_status: "Status",
        th_action: "Action",

        // Quick Links
        ql_new_project: "New Project",
        ql_fund_requests: "Fund Requests",
        ql_reports: "Reports",
        ql_gis_view: "GIS View",
        ql_analytics: "Analytics",
        ql_alerts: "Alerts"
    },
    hi: {
        // Layout
        government_india: "भारत सरकार",
        ministry_name: "सामाजिक न्याय और अधिकारिता मंत्रालय",
        platform_name: "पीएम-अजय एकीकृत निगरानी मंच",
        skip_content: "मुख्य सामग्री पर जाएं",
        screen_reader: "स्क्रीन रीडर एक्सेस",
        text_size: "टेक्स्ट का आकार",
        logout: "लॉग आउट",

        // Navigation
        nav_home: "होम",
        nav_dashboard: "डैशबोर्ड",
        nav_projects: "परियोजनाएं",
        nav_funds: "निधि प्रबंधन",
        nav_gis: "जीआईएस मैपिंग",
        nav_payments: "भुगतान",
        nav_reports: "रिपोर्ट",
        nav_help: "सहायता",

        // Dropdowns
        drop_overview: "अवलोकन",
        drop_analytics: "विश्लेषण",
        drop_all_projects: "सभी परियोजनाएं",
        drop_create_new: "नया बनाएं",
        drop_monthly: "मासिक रिपोर्ट",
        drop_annual: "वार्षिक रिपोर्ट",
        drop_custom: "कस्टम रिपोर्ट",

        // Home Page
        hero_title: "प्रधानमंत्री अनुसूचित जाति अभ्युदय योजना",
        hero_subtitle: "बुनियादी ढांचे के विकास और आय सृजन योजनाओं के माध्यम से समुदायों को सशक्त बनाना।",
        hero_title_2: "सभी के लिए समावेशी विकास",
        hero_subtitle_2: "लक्षित योजनाओं के माध्यम से सामाजिक न्याय और समानता सुनिश्चित करना।",
        hero_title_3: "बेहतर भविष्य का निर्माण",
        hero_subtitle_3: "गांवों में सतत प्रगति के लिए बुनियादी ढांचे का विकास।",
        hero_button: "डैशबोर्ड देखें",

        stats_villages: "कवर किए गए गांव",
        stats_beneficiaries: "लाभार्थी",
        stats_projects: "पूर्ण परियोजनाएं",
        stats_funds: "उपयोग की गई निधि",

        features_title: "मुख्य विशेषताएं",
        feat_infra: "आदर्श ग्राम",
        feat_infra_desc: "अनुसूचित जाति बहुल गांवों का एकीकृत विकास",
        feat_income: "आय सृजन",
        feat_income_desc: "आजीविका परियोजनाओं के लिए वित्तीय सहायता",
        feat_monitor: "वास्तविक समय निगरानी",
        feat_monitor_desc: "जीआईएस और लाइव डेटा के साथ प्रगति को ट्रैक करें",

        footer_about: "मंत्रालय के बारे में",
        footer_links: "महत्वपूर्ण लिंक",
        footer_policies: "नीतियां",

        // Analytics
        analytics_title: "योजना विश्लेषण",
        analytics_subtitle: "योजना के प्रदर्शन और निधि उपयोग का व्यापक दृश्य",

        // Dashboard
        dash_title: "केंद्र डैशबोर्ड",
        dash_subtitle: "पीएम-अजय योजनाओं के लिए एकीकृत निगरानी और प्रबंधन मंच",
        dash_total_projects: "कुल परियोजनाएं",
        dash_funds_allocated: "आवंटित निधि",
        dash_pending_approvals: "लंबित अनुमोदन",
        dash_completed_projects: "पूर्ण परियोजनाएं",
        dash_quick_access: "त्वरित पहुंच",
        dash_recent_projects: "हाल की परियोजनाएं",
        dash_view_all: "सभी देखें",

        // Table Headers
        th_project_id: "परियोजना आईडी",
        th_project_name: "परियोजना का नाम",
        th_state: "राज्य",
        th_budget: "बजट",
        th_status: "स्थिति",
        th_action: "कार्रवाई",

        // Quick Links
        ql_new_project: "नई परियोजना",
        ql_fund_requests: "निधि अनुरोध",
        ql_reports: "रिपोर्ट",
        ql_gis_view: "जीआईएस दृश्य",
        ql_analytics: "विश्लेषण",
        ql_alerts: "चेतावनी"
    }
};

export const LanguageProvider = ({ children }) => {
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
};

export const useLanguage = () => useContext(LanguageContext);
