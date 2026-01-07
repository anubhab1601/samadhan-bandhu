import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Save, X } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';

export default function Settings() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.name || 'Central Officer',
        email: user?.email || 'central@gov.in',
        phone: '+91 98765 43210',
        designation: 'Director',
        department: 'Ministry of Social Justice',
        office: 'New Delhi',
        address: 'Shastri Bhawan, New Delhi - 110001'
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        // Save logic here
        alert('Profile updated successfully!');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage your account settings and preferences</p>
                </div>

                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                >
                                    <Save size={18} />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <User className="inline mr-2" size={16} />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg ${isEditing
                                    ? 'border-gray-300 focus:border-blue-500 focus:outline-none'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                    }`}
                            />
                        </div>

                        {/* Email (Read-only) */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Mail className="inline mr-2" size={16} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Phone className="inline mr-2" size={16} />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg ${isEditing
                                    ? 'border-gray-300 focus:border-blue-500 focus:outline-none'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                    }`}
                            />
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Building className="inline mr-2" size={16} />
                                Designation
                            </label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg ${isEditing
                                    ? 'border-gray-300 focus:border-blue-500 focus:outline-none'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                    }`}
                            />
                        </div>

                        {/* Department (Read-only) */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Building className="inline mr-2" size={16} />
                                Department
                            </label>
                            <input
                                type="text"
                                value={formData.department}
                                disabled
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Department cannot be changed</p>
                        </div>

                        {/* Office Location */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <MapPin className="inline mr-2" size={16} />
                                Office Location
                            </label>
                            <input
                                type="text"
                                name="office"
                                value={formData.office}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg ${isEditing
                                    ? 'border-gray-300 focus:border-blue-500 focus:outline-none'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                    }`}
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <MapPin className="inline mr-2" size={16} />
                                Office Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows="3"
                                className={`w-full px-4 py-2 border rounded-lg ${isEditing
                                    ? 'border-gray-300 focus:border-blue-500 focus:outline-none'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Account Type</span>
                            <span className="font-bold text-gray-900">Central Government Officer</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Account Status</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Active</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Member Since</span>
                            <span className="font-bold text-gray-900">January 2024</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-600">Last Login</span>
                            <span className="font-bold text-gray-900">Today, 10:30 AM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
