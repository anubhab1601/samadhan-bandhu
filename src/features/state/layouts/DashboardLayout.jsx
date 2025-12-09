import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User, MessageCircle, LayoutDashboard, FileText, CheckSquare, BarChart2, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import HelpModal from '../components/HelpModal';
import NotificationCenter from '../components/NotificationCenter';

export default function DashboardLayout() {
    const navigate = useNavigate();
    const { language, toggleLanguage, t } = useLanguage();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            {/* Top Utility Bar */}
            <div className="bg-[#1b1b1b] text-white text-xs py-1.5 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-6">
                        <a href="#main-content" className="hover:underline">{t('skip_content')}</a>
                        <span className="hover:underline cursor-pointer">{t('screen_reader')}</span>
                        <div className="flex gap-2 items-center">
                            <span className="text-gray-400">{t('text_size')}:</span>
                            <button className="hover:text-orange-400 px-1">A-</button>
                            <button className="hover:text-orange-400 px-1">A</button>
                            <button className="hover:text-orange-400 px-1">A+</button>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="flex gap-3">
                            <span
                                onClick={() => toggleLanguage('en')}
                                className={`cursor-pointer font-semibold ${language === 'en' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                English
                            </span>
                            <span className="text-gray-500">|</span>
                            <span
                                onClick={() => toggleLanguage('hi')}
                                className={`cursor-pointer font-semibold ${language === 'hi' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                हिन्दी
                            </span>
                        </div>
                        <NotificationCenter />
                        {user.name && (
                            <div className="flex items-center gap-2 border-l border-gray-600 pl-4">
                                <User size={14} />
                                <span>{user.name}</span>
                                <button onClick={handleLogout} className="ml-2 text-orange-400 hover:text-orange-300 flex items-center gap-1">
                                    <LogOut size={14} />
                                    {t('logout')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                            alt="Government of India"
                            className="h-16 w-auto"
                        />
                        <div>
                            <div className="text-sm text-gray-600 font-medium">भारत सरकार | {t('government_india')}</div>
                            <div className="text-sm text-gray-600">{t('ministry_name')}</div>
                            <div className="text-lg font-bold text-[#1e3a8a] mt-1">Ministry of Social Justice and Empowerment</div>
                            <div className="text-xs text-orange-600 font-semibold tracking-wide">{t('platform_name')}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <img
                            src="/azadi-logo.png"
                            alt="Azadi Ka Amrit Mahotsav"
                            className="h-20 w-auto object-contain"
                        />
                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm"
                        >
                            <LogOut size={18} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="bg-[#0d47a1] text-white shadow-md relative z-50">
                <div className="max-w-7xl mx-auto">
                    <ul className="flex items-center text-sm font-medium">
                        <li>
                            <Link to="/state" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                {t('nav_home')}
                            </Link>
                        </li>

                        <li>
                            <Link to="/state/dashboard" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                {t('nav_dashboard')}
                            </Link>
                        </li>

                        <li>
                            <Link to="/state/applications" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                Applications
                            </Link>
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => toggleDropdown('applications')}
                                className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                {t('nav_applications')} <ChevronDown size={16} />
                            </button>
                            {activeDropdown === 'applications' && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[200px] border border-gray-200 z-50">
                                    <Link to="/state/applications/incoming" className="block px-4 py-2 hover:bg-blue-50">Incoming Applications</Link>
                                    <Link to="/state/applications/pending" className="block px-4 py-2 hover:bg-blue-50">{t('drop_pending_applications')}</Link>
                                    <Link to="/state/applications/approved" className="block px-4 py-2 hover:bg-blue-50">{t('drop_approved_applications')}</Link>
                                    <Link to="/state/applications" className="block px-4 py-2 hover:bg-blue-50">{t('drop_all_applications')}</Link>
                                </div>
                            )}
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => toggleDropdown('verification')}
                                className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                {t('nav_verification')} <ChevronDown size={16} />
                            </button>
                            {activeDropdown === 'verification' && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[200px] border border-gray-200 z-50">
                                    <Link to="/state/verification/assign" className="block px-4 py-2 hover:bg-blue-50">{t('drop_assign_iva')}</Link>
                                    <Link to="/state/verification/reports" className="block px-4 py-2 hover:bg-blue-50">{t('drop_verification_reports')}</Link>
                                    <Link to="/state/verification/forward" className="block px-4 py-2 hover:bg-blue-50">{t('drop_forward_to_pmajay')}</Link>
                                </div>
                            )}
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => toggleDropdown('projects')}
                                className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                {t('nav_projects')} <ChevronDown size={16} />
                            </button>
                            {activeDropdown === 'projects' && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[220px] border border-gray-200 z-50">
                                    <Link to="/state/projects" className="block px-4 py-2 hover:bg-blue-50">All Projects</Link>
                                    <Link to="/state/projects/ongoing" className="block px-4 py-2 hover:bg-blue-50">{t('drop_ongoing_projects')}</Link>
                                    <Link to="/state/projects/completed" className="block px-4 py-2 hover:bg-blue-50">{t('drop_completed_projects')}</Link>
                                    <Link to="/state/projects/PROJ-2025-MH-001/tender-review" className="block px-4 py-2 hover:bg-blue-50">Tender & Agency Review</Link>
                                    <Link to="/state/funds" className="block px-4 py-2 hover:bg-blue-50">State Fund Management</Link>
                                    <Link to="/state/funds/blocks" className="block px-4 py-2 hover:bg-blue-50">Block Fund Releases</Link>
                                </div>
                            )}
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => toggleDropdown('inspections')}
                                className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                {t('nav_inspections')} <ChevronDown size={16} />
                            </button>
                            {activeDropdown === 'inspections' && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[200px] border border-gray-200 z-50">
                                    <Link to="/state/inspections/schedule" className="block px-4 py-2 hover:bg-blue-50">{t('drop_schedule_inspection')}</Link>
                                    <Link to="/state/inspections/reports" className="block px-4 py-2 hover:bg-blue-50">{t('drop_inspection_reports')}</Link>
                                </div>
                            )}
                        </li>

                        <li>
                            <Link to="/state/districts" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                Districts
                            </Link>
                        </li>

                        <li>
                            <Link to="/state/reports" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                Reports
                            </Link>
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => toggleDropdown('users')}
                                className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                User Management <ChevronDown size={16} />
                            </button>
                            {activeDropdown === 'users' && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[220px] border border-gray-200 z-50">
                                    <Link to="/state/users/pending" className="block px-4 py-2 hover:bg-blue-50">Pending Registrations</Link>
                                    <Link to="/state/users/sarpanch" className="block px-4 py-2 hover:bg-blue-50">Sarpanch Requests</Link>
                                </div>
                            )}
                        </li>

                        <li>
                            <button
                                onClick={() => setIsHelpOpen(true)}
                                className="block w-full text-left py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                {t('nav_help')}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-[#1b1b1b] text-gray-300 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                        <div>
                            <h3 className="text-white font-semibold mb-3">{t('footer_about')}</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-orange-400">About Us</a></li>
                                <li><a href="#" className="hover:text-orange-400">Organization</a></li>
                                <li><a href="#" className="hover:text-orange-400">Who's Who</a></li>
                                <li><a href="#" className="hover:text-orange-400">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3">{t('footer_links')}</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-orange-400">RTI</a></li>
                                <li><a href="#" className="hover:text-orange-400">Citizen Charter</a></li>
                                <li><a href="#" className="hover:text-orange-400">Grievance Redressal</a></li>
                                <li><a href="#" className="hover:text-orange-400">Public Disclosure</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3">{t('footer_policies')}</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-orange-400">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-orange-400">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-orange-400">Copyright Policy</a></li>
                                <li><a href="#" className="hover:text-orange-400">Hyperlinking Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-6 text-sm text-center">
                        <p>© 2025 Ministry of Social Justice and Empowerment, Government of India. All rights reserved.</p>
                        <p className="mt-2 text-xs text-gray-400">
                            Website designed, developed and hosted by National Informatics Centre (NIC)
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            Last Updated: {new Date().toLocaleDateString('en-IN')}
                        </p>
                    </div>
                </div>
            </footer>

            {/* Help Modal & FAB */}
            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

            <button
                onClick={() => setIsHelpOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-40 flex items-center justify-center group"
                aria-label="Help & Support"
            >
                <MessageCircle size={24} />
                <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    State Officer Help
                </span>
            </button>
        </div>
    );
}
