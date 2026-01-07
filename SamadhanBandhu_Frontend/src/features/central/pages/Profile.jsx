import React from 'react';
import { User, Mail, Phone, MapPin, Building, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';

export default function Profile() {
    const { user } = useAuth();

    const profileData = {
        name: user?.name || 'Central Officer',
        email: user?.email || 'central@gov.in',
        phone: '+91 98765 43210',
        designation: 'Director',
        department: 'Ministry of Social Justice and Empowerment',
        office: 'New Delhi',
        address: 'Shastri Bhawan, New Delhi - 110001',
        employeeId: 'MSJE/2024/001',
        joinDate: 'January 2024',
        lastLogin: 'Today, 10:30 AM'
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-sm text-gray-600 mt-1">View your account information and details</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                            <User size={48} className="text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                            <p className="text-gray-600">{profileData.designation}</p>
                            <p className="text-sm text-gray-500 mt-1">{profileData.department}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Mail size={18} className="text-blue-600" />
                                <label className="text-sm font-bold text-gray-700">Email Address</label>
                            </div>
                            <p className="text-gray-900">{profileData.email}</p>
                        </div>

                        {/* Phone */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Phone size={18} className="text-blue-600" />
                                <label className="text-sm font-bold text-gray-700">Phone Number</label>
                            </div>
                            <p className="text-gray-900">{profileData.phone}</p>
                        </div>

                        {/* Employee ID */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield size={18} className="text-blue-600" />
                                <label className="text-sm font-bold text-gray-700">Employee ID</label>
                            </div>
                            <p className="text-gray-900">{profileData.employeeId}</p>
                        </div>

                        {/* Department */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Building size={18} className="text-blue-600" />
                                <label className="text-sm font-bold text-gray-700">Department</label>
                            </div>
                            <p className="text-gray-900">{profileData.department}</p>
                        </div>

                        {/* Office Location */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin size={18} className="text-blue-600" />
                                <label className="text-sm font-bold text-gray-700">Office Location</label>
                            </div>
                            <p className="text-gray-900">{profileData.office}</p>
                        </div>

                        {/* Join Date */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar size={18} className="text-blue-600" />
                                <label className="text-sm font-bold text-gray-700">Member Since</label>
                            </div>
                            <p className="text-gray-900">{profileData.joinDate}</p>
                        </div>

                        {/* Address */}
                        <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin size={18} className="text-blue-600" />
                                <label className="text-sm font-bold text-gray-700">Office Address</label>
                            </div>
                            <p className="text-gray-900">{profileData.address}</p>
                        </div>
                    </div>
                </div>

                {/* Account Status */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Account Status</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Account Type</span>
                            <span className="font-bold text-gray-900">Central Government Officer</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Status</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Active</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-600">Last Login</span>
                            <span className="font-bold text-gray-900">{profileData.lastLogin}</span>
                        </div>
                    </div>
                </div>

                {/* Info Note */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <Shield className="inline mr-2" size={16} />
                        Profile information is managed by the system administrator. Contact your department head for any updates.
                    </p>
                </div>
            </div>
        </div>
    );
}
