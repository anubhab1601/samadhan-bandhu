import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, MapPin, Camera, CheckCircle, Clock, Send } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, gradient, link }) => (
    <Link to={link} className="group relative overflow-hidden rounded-lg md:rounded-xl bg-white shadow-md hover:shadow-xl transition-all border-0">
        <div className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10`}></div>
        <div className="relative p-4 md:p-6">
            <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{title}</p>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`${gradient} p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg`}>
                    <Icon size={24} className="text-white md:w-8 md:h-8" />
                </div>
            </div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${gradient}`}></div>
    </Link>
);

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg md:rounded-xl p-4 md:p-8 shadow-lg">
                <h1 className="text-xl md:text-3xl font-bold mb-2">Welcome, {user.name || 'IVA Officer'}!</h1>
                <p className="text-blue-100 text-sm md:text-base">{user.agency_name || 'Information Verifying Agency'}</p>
                <p className="text-xs md:text-sm text-blue-200 mt-2">Conduct field verifications and submit reports for village development applications</p>
            </div>

            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded"></span>
                    Quick Overview
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <StatCard title="Pending Assignments" value="5" icon={Clock} gradient="bg-gradient-to-br from-orange-500 to-orange-700" link="/assignments" />
                    <StatCard title="Completed Verifications" value="12" icon={CheckCircle} gradient="bg-gradient-to-br from-green-500 to-green-700" link="/assignments/completed" />
                    <StatCard title="Reports Submitted" value="12" icon={FileText} gradient="bg-gradient-to-br from-blue-500 to-blue-700" link="/reports" />
                    <StatCard title="Field Visits" value="18" icon={MapPin} gradient="bg-gradient-to-br from-purple-500 to-purple-700" link="/assignments" />
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded"></span>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <Link to="/assignments" className="bg-white rounded-lg p-4 md:p-6 hover:shadow-lg shadow-sm transition-all">
                        <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-600 bg-opacity-10 rounded-lg mb-3 md:mb-4">
                            <FileText size={20} className="text-blue-600 md:w-6 md:h-6" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">View Assignments</h3>
                        <p className="text-xs md:text-sm text-gray-600">Check pending verification assignments</p>
                    </Link>
                    <Link to="/reports/submit" className="bg-white rounded-lg p-4 md:p-6 hover:shadow-lg shadow-sm transition-all">
                        <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-600 bg-opacity-10 rounded-lg mb-3 md:mb-4">
                            <Send size={20} className="text-green-600 md:w-6 md:h-6" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">Submit Report</h3>
                        <p className="text-xs md:text-sm text-gray-600">Submit verification report with photos</p>
                    </Link>
                    <Link to="/reports" className="bg-white rounded-lg p-4 md:p-6 hover:shadow-lg shadow-sm transition-all">
                        <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-purple-600 bg-opacity-10 rounded-lg mb-3 md:mb-4">
                            <Camera size={20} className="text-purple-600 md:w-6 md:h-6" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">My Reports</h3>
                        <p className="text-xs md:text-sm text-gray-600">View all submitted verification reports</p>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="px-4 py-3 md:px-6 md:py-4">
                    <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
                </div>
                <div className="divide-y">
                    <div className="p-3 md:p-4 hover:bg-gray-50">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg"><FileText size={16} className="text-blue-600 md:w-5 md:h-5" /></div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">New Assignment Received</p>
                                <p className="text-xs md:text-sm text-gray-600 mt-1">Application PMAJAY-2025-MH-12345 assigned for verification</p>
                                <p className="text-xs text-gray-400 mt-1 md:mt-2">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 md:p-4 hover:bg-gray-50">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 rounded-lg"><CheckCircle size={16} className="text-green-600 md:w-5 md:h-5" /></div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Report Submitted</p>
                                <p className="text-xs md:text-sm text-gray-600 mt-1">Verification report for Village ABC submitted successfully</p>
                                <p className="text-xs text-gray-400 mt-1 md:mt-2">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
