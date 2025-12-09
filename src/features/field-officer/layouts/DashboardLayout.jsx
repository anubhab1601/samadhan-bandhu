import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User, MessageCircle, Menu, Home, LayoutDashboard, ClipboardCheck, CheckCircle2, FileText, Files, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import HelpModal from '../components/HelpModal';
import NotificationCenter from '../components/NotificationCenter';

export default function DashboardLayout() {
    const navigate = useNavigate();
    const { language, toggleLanguage, t } = useLanguage();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Bar */}
            <div className="bg-[#1b1b1b] text-white text-xs py-1.5 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-6">
                        <a href="#main-content" className="hover:underline">{t('skip_content')}</a>
                        <span className="hover:underline cursor-pointer">{t('screen_reader')}</span>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="flex gap-3">
                            <span onClick={() => toggleLanguage('en')} className={`cursor-pointer ${language === 'en' ? 'text-white' : 'text-gray-400'}`}>English</span>
                            <span>|</span>
                            <span onClick={() => toggleLanguage('hi')} className={`cursor-pointer ${language === 'hi' ? 'text-white' : 'text-gray-400'}`}>हिन्दी</span>
                        </div>
                        <NotificationCenter />
                        {user.name && (
                            <div className="flex items-center gap-2 border-l border-gray-600 pl-4">
                                <User size={14} />
                                <span>{user.name}</span>
                                <button onClick={handleLogout} className="ml-2 text-orange-400 hover:text-orange-300 flex items-center gap-1">
                                    <LogOut size={14} /> {t('logout')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GOI" className="h-16" />
                        <div>
                            <div className="text-sm text-gray-600">{t('ministry_name')}</div>
                            <div className="text-lg font-bold text-[#1e3a8a]">Ministry of Social Justice and Empowerment</div>
                            <div className="text-xs text-orange-600 font-semibold">{t('platform_name')}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Azadi Ka Amrit Mahotsav Logo */}
                        <img
                            src="/azadi-logo.png"
                            alt="Azadi Ka Amrit Mahotsav"
                            className="h-20 w-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-[#0d47a1] text-white shadow-md relative z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center md:block">
                        {/* Mobile Menu Button */}
                        <div className="md:hidden py-3">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="text-white focus:outline-none"
                            >
                                <Menu size={24} />
                            </button>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:block">
                            <ul className="flex items-center text-sm font-medium">
                                <li><Link to="/" className="block py-3.5 px-5 hover:bg-[#1565c0] border-b-2 border-transparent hover:border-orange-400">{t('nav_home')}</Link></li>
                                <li><Link to="/dashboard" className="block py-3.5 px-5 hover:bg-[#1565c0] border-b-2 border-transparent hover:border-orange-400">{t('nav_dashboard')}</Link></li>
                                <li className="relative">
                                    <button onClick={() => setActiveDropdown(activeDropdown === 'inspections' ? null : 'inspections')} className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0]">
                                        {t('nav_inspections')} <ChevronDown size={16} />
                                    </button>
                                    {activeDropdown === 'inspections' && (
                                        <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[200px] border z-50">
                                            <Link to="/inspections" className="block px-4 py-2 hover:bg-blue-50">{t('drop_pending_inspections')}</Link>
                                            <Link to="/inspections/completed" className="block px-4 py-2 hover:bg-blue-50">{t('drop_completed_inspections')}</Link>
                                        </div>
                                    )}
                                </li>
                                <li className="relative">
                                    <button onClick={() => setActiveDropdown(activeDropdown === 'reports' ? null : 'reports')} className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0]">
                                        {t('nav_reports')} <ChevronDown size={16} />
                                    </button>
                                    {activeDropdown === 'reports' && (
                                        <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[200px] border z-50">
                                            <Link to="/reports/submit" className="block px-4 py-2 hover:bg-blue-50">{t('drop_submit_report')}</Link>
                                            <Link to="/reports" className="block px-4 py-2 hover:bg-blue-50">{t('drop_my_reports')}</Link>
                                        </div>
                                    )}
                                </li>
                                <li><button onClick={() => setIsHelpOpen(true)} className="block py-3.5 px-5 hover:bg-[#1565c0]">{t('nav_help')}</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    {/* Sidebar */}
                    <div className="relative w-[280px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
                        {/* Sidebar Header */}
                        <div className="bg-[#0d47a1] p-4 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <User size={24} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{user.name || 'Guest User'}</p>
                                    <p className="text-xs text-blue-100">Field Officer</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Links */}
                        <div className="flex-1 overflow-y-auto py-2">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50">
                                <Home size={20} className="text-gray-500" />
                                <span className="font-medium">{t('nav_home')}</span>
                            </Link>
                            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50">
                                <LayoutDashboard size={20} className="text-gray-500" />
                                <span className="font-medium">{t('nav_dashboard')}</span>
                            </Link>

                            <div className="border-t border-gray-100 my-1"></div>

                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Inspections</div>
                            <Link to="/inspections" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50">
                                <ClipboardCheck size={20} className="text-gray-500" />
                                <span className="font-medium">{t('drop_pending_inspections')}</span>
                            </Link>
                            <Link to="/inspections/completed" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50">
                                <CheckCircle2 size={20} className="text-gray-500" />
                                <span className="font-medium">{t('drop_completed_inspections')}</span>
                            </Link>

                            <div className="border-t border-gray-100 my-1"></div>

                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Reports</div>
                            <Link to="/reports/submit" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50">
                                <FileText size={20} className="text-gray-500" />
                                <span className="font-medium">{t('drop_submit_report')}</span>
                            </Link>
                            <Link to="/reports" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50">
                                <Files size={20} className="text-gray-500" />
                                <span className="font-medium">{t('drop_my_reports')}</span>
                            </Link>

                            <div className="border-t border-gray-100 my-1"></div>

                            <button onClick={() => { setIsHelpOpen(true); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50">
                                <HelpCircle size={20} className="text-gray-500" />
                                <span className="font-medium">{t('nav_help')}</span>
                            </button>
                        </div>

                        {/* Sidebar Footer */}
                        <div className="border-t p-4">
                            <button onClick={handleLogout} className="flex items-center gap-4 text-red-600 w-full">
                                <LogOut size={20} />
                                <span className="font-medium">{t('logout')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-[#1b1b1b] text-gray-300 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm">
                    <p>© 2025 Ministry of Social Justice and Empowerment, Government of India. All rights reserved.</p>
                </div>
            </footer>

            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
            <button onClick={() => setIsHelpOpen(true)} className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-40">
                <MessageCircle size={24} />
            </button>
        </div>
    );
}
