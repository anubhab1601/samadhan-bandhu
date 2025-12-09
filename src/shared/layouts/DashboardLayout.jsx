import React, { useState, useEffect } from 'react';
import { X, Megaphone, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';

export default function DashboardLayout({ role }) {
    const [broadcast, setBroadcast] = useState(null);

    useEffect(() => {
        const checkBroadcast = () => {
            try {
                const stored = localStorage.getItem('pm_ajay_broadcast');
                if (stored) {
                    setBroadcast(JSON.parse(stored));
                } else {
                    setBroadcast(null);
                }
            } catch (e) {
                console.error("Error parsing broadcast", e);
            }
        };

        checkBroadcast();

        // Listen for storage events (cross-tab)
        window.addEventListener('storage', checkBroadcast);

        // Poll for same-tab updates
        const interval = setInterval(checkBroadcast, 1000);

        return () => {
            window.removeEventListener('storage', checkBroadcast);
            clearInterval(interval);
        };
    }, []);

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'warning': return 'bg-red-600';
            case 'joy': return 'bg-green-600';
            default: return 'bg-blue-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {broadcast && (
                <div className={`${getPriorityStyles(broadcast.priority)} text-white px-4 py-2 shadow-md transition-all duration-300`}>
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 animate-pulse">
                            <Megaphone size={18} className="flex-shrink-0" />
                            <p className="font-medium text-sm md:text-base">
                                <span className="font-bold uppercase tracking-wider text-xs mr-2 opacity-90 border border-white/30 px-1 rounded">
                                    {broadcast.priority === 'joy' ? 'Success' : broadcast.priority === 'warning' ? 'Urgent' : 'Update'}
                                </span>
                                {broadcast.message}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs opacity-75 hidden sm:inline-block">
                                {new Date(broadcast.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <button
                                onClick={() => setBroadcast(null)}
                                className="hover:bg-white/20 p-1 rounded transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Navbar role={role} />

            <div className="flex">
                <Sidebar role={role} />

                <main className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto p-6">
                        <Outlet />
                    </div>
                </main>
            </div>

            <Chatbot />

            {/* Footer */}
            <footer className="bg-[#1b1b1b] text-gray-400 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                        <div>
                            <h3 className="font-semibold text-white mb-2">PM-AJAY Portal</h3>
                            <p>Pradhan Mantri Anusuchit Jaati Abhyuday Yojana</p>
                            <p className="mt-2">Ministry of Social Justice and Empowerment</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Quick Links</h3>
                            <ul className="space-y-1">
                                <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Contact</h3>
                            <p>Email: support@pmajay.gov.in</p>
                            <p>Helpline: 1800-XXX-XXXX</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs">
                        <p>© 2025 Ministry of Social Justice and Empowerment, Government of India. All rights reserved.</p>
                        <p className="mt-1">Website designed, developed and hosted by National Informatics Centre (NIC)</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
