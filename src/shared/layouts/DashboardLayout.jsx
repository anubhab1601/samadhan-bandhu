import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ role }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar role={role} />

            <div className="flex">
                <Sidebar role={role} />

                <main className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto p-6">
                        <Outlet />
                    </div>
                </main>
            </div>

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
