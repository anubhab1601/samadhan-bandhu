import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User } from 'lucide-react';

export default function DashboardLayout() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [activeDropdown, setActiveDropdown] = useState(null);

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
                        <a href="#main-content" className="hover:underline">Skip to main content</a>
                        <span className="hover:underline cursor-pointer">Screen Reader Access</span>
                        <div className="flex gap-2 items-center">
                            <span className="text-gray-400">Text Size:</span>
                            <button className="hover:text-orange-400 px-1">A-</button>
                            <button className="hover:text-orange-400 px-1">A</button>
                            <button className="hover:text-orange-400 px-1">A+</button>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="flex gap-3">
                            <span className="cursor-pointer font-semibold text-white">English</span>
                            <span className="cursor-pointer text-gray-400 hover:text-white">हिन्दी</span>
                        </div>
                        {user.name && (
                            <div className="flex items-center gap-2 border-l border-gray-600 pl-4">
                                <User size={14} />
                                <span>{user.name}</span>
                                <button onClick={handleLogout} className="ml-2 text-orange-400 hover:text-orange-300 flex items-center gap-1">
                                    <LogOut size={14} />
                                    Logout
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
                            <div className="text-sm text-gray-600 font-medium">भारत सरकार | Government of India</div>
                            <div className="text-sm text-gray-600">सामाजिक न्याय और अधिकारिता मंत्रालय</div>
                            <div className="text-lg font-bold text-[#1e3a8a] mt-1">Ministry of Social Justice and Empowerment</div>
                            <div className="text-xs text-orange-600 font-semibold tracking-wide">PM-AJAY UNIFIED MONITORING PLATFORM</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Swachh_Bharat_Mission_Logo.svg"
                            alt="Swachh Bharat"
                            className="h-14 opacity-90"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Azadi_Ka_Amrit_Mahotsav_Logo.svg/1200px-Azadi_Ka_Amrit_Mahotsav_Logo.svg.png"
                            alt="Azadi Ka Amrit Mahotsav"
                            className="h-14 opacity-90"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="bg-[#0d47a1] text-white shadow-md relative z-50">
                <div className="max-w-7xl mx-auto">
                    <ul className="flex items-center text-sm font-medium">
                        <li>
                            <Link to="/" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                Home
                            </Link>
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => toggleDropdown('dashboard')}
                                className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                Dashboard <ChevronDown size={16} />
                            </button>
                            {activeDropdown === 'dashboard' && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[200px] border border-gray-200">
                                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-50">Overview</Link>
                                    <Link to="/analytics" className="block px-4 py-2 hover:bg-blue-50">Analytics</Link>
                                </div>
                            )}
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => toggleDropdown('projects')}
                                className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                Projects <ChevronDown size={16} />
                            </button>
                            {activeDropdown === 'projects' && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[200px] border border-gray-200">
                                    <Link to="/projects" className="block px-4 py-2 hover:bg-blue-50">All Projects</Link>
                                    <Link to="/projects/new" className="block px-4 py-2 hover:bg-blue-50">Create New</Link>
                                    <Link to="/projects/reports" className="block px-4 py-2 hover:bg-blue-50">Reports</Link>
                                </div>
                            )}
                        </li>

                        <li>
                            <Link to="/funds" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                Fund Management
                            </Link>
                        </li>

                        <li>
                            <Link to="/gis" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                GIS Mapping
                            </Link>
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => toggleDropdown('reports')}
                                className="flex items-center gap-1 py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400"
                            >
                                Reports <ChevronDown size={16} />
                            </button>
                            {activeDropdown === 'reports' && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg min-w-[200px] border border-gray-200">
                                    <Link to="/reports/monthly" className="block px-4 py-2 hover:bg-blue-50">Monthly Reports</Link>
                                    <Link to="/reports/annual" className="block px-4 py-2 hover:bg-blue-50">Annual Reports</Link>
                                    <Link to="/reports/custom" className="block px-4 py-2 hover:bg-blue-50">Custom Reports</Link>
                                </div>
                            )}
                        </li>

                        <li>
                            <Link to="/help" className="block py-3.5 px-5 hover:bg-[#1565c0] transition-colors border-b-2 border-transparent hover:border-orange-400">
                                Help
                            </Link>
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
                            <h3 className="text-white font-semibold mb-3">About Ministry</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-orange-400">About Us</a></li>
                                <li><a href="#" className="hover:text-orange-400">Organization</a></li>
                                <li><a href="#" className="hover:text-orange-400">Who's Who</a></li>
                                <li><a href="#" className="hover:text-orange-400">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3">Important Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-orange-400">RTI</a></li>
                                <li><a href="#" className="hover:text-orange-400">Citizen Charter</a></li>
                                <li><a href="#" className="hover:text-orange-400">Grievance Redressal</a></li>
                                <li><a href="#" className="hover:text-orange-400">Public Disclosure</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3">Policies</h3>
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
        </div>
    );
}
