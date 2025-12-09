import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function Applications() {
    const applications = [
        { id: 'PMAJAY-2025-MH-12345', title: 'Community Hall Construction', status: 'Approved', date: '2025-11-20', budget: '₹50 Lakhs' },
        { id: 'PMAJAY-2025-MH-12346', title: 'Road Development', status: 'Pending', date: '2025-11-25', budget: '₹75 Lakhs' },
        { id: 'PMAJAY-2025-MH-12347', title: 'Water Supply System', status: 'In Progress', date: '2025-11-15', budget: '₹1.2 Crores' },
        { id: 'PMAJAY-2025-MH-12348', title: 'School Building Renovation', status: 'Rejected', date: '2025-11-10', budget: '₹30 Lakhs' },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle className="text-green-600" size={20} />;
            case 'Pending': return <Clock className="text-orange-600" size={20} />;
            case 'In Progress': return <FileText className="text-blue-600" size={20} />;
            case 'Rejected': return <XCircle className="text-red-600" size={20} />;
            default: return <FileText className="text-gray-600" size={20} />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                    <p className="text-sm text-gray-600 mt-1">View and manage all your PM-AJAY applications</p>
                </div>
                <Link
                    to="/sarpanch/new-application"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition-colors"
                >
                    <Plus size={20} />
                    New Application
                </Link>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Application ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Title</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Budget</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Submitted Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{app.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{app.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{app.budget}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(app.status)}
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                app.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                    app.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.date).toLocaleDateString('en-IN')}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <Link to={`/sarpanch/applications/${app.id}`} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                            <Eye size={16} /> View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
