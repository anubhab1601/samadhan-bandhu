import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';

const ROLE_COLORS = {
    'central': 'bg-blue-600',
    'state': 'bg-green-600',
    'sarpanch': 'bg-purple-600',
    'field-officer': 'bg-indigo-600',
    'agency': 'bg-yellow-600',
    'iva-officer': 'bg-teal-600'
};

const ROLE_NAMES = {
    'central': 'Central Government',
    'state': 'State Government',
    'sarpanch': 'Sarpanch',
    'field-officer': 'Field Officer',
    'agency': 'Agency',
    'iva-officer': 'IVA Officer'
};

export default function Navbar({ role }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const colorClass = ROLE_COLORS[role] || 'bg-blue-600';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Top Government Bar */}
            <div className="bg-[#1b1b1b] text-white text-xs py-1.5 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-6">
                        <span>भारत सरकार | Government of India</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="cursor-pointer font-semibold">English</span>
                        <span className="cursor-pointer text-gray-400">हिन्दी</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                            alt="Government of India"
                            className="h-16 w-auto"
                        />
                        <div>
                            <div className="text-sm text-gray-600">सामाजिक न्याय और अधिकारिता मंत्रालय</div>
                            <div className="text-base font-bold text-[#1e3a8a]">Ministry of Social Justice and Empowerment</div>
                            <div className="text-sm text-orange-600 font-semibold mt-0.5">PM-AJAY UNIFIED PLATFORM</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <img
                            src="/assets/logos/swach-bharat.png"
                            alt="Swachh Bharat"
                            className="h-12 w-auto object-contain"
                        />
                        <img
                            src="/assets/logos/azadi-logo.png"
                            alt="Azadi Ka Amrit Mahotsav"
                            className="h-18 w-auto object-contain"
                        />
                        <img
                            src="/assets/logos/samadhan-bandhu-logo.jpg"
                            alt="Samadhan Bandhu"
                            className="h-16 w-auto object-contain"
                        />
                    </div>
                </div>
            </div>


            {/* Role-specific Navigation Bar */}
            <div className={`${colorClass} text-white shadow-lg`}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="font-semibold text-lg">{ROLE_NAMES[role]} Portal</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Settings */}
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Settings size={20} />
                        </button>

                        {/* User Menu */}
                        <div className="flex items-center gap-3 pl-3 border-l border-white/20">
                            <div className="text-right">
                                <div className="text-sm font-semibold">{user?.email || 'User'}</div>
                                <div className="text-xs opacity-80">{ROLE_NAMES[role]}</div>
                            </div>
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <User size={20} />
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <LogOut size={18} />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
