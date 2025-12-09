import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Edit2, Save, X, Lock, Upload, Download } from 'lucide-react';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [profileData, setProfileData] = useState({
        // Personal Information
        fullName: 'Rajesh Kumar',
        designation: 'State Nodal Officer',
        employeeId: 'SNO-MH-2024-001',
        department: 'Social Justice & Special Assistance Department',
        joiningDate: '2020-06-15',

        // Contact Information
        email: 'sno.mh@pmajay.gov.in',
        phone: '+91 98765 43210',
        alternatePhone: '+91 98765 43211',

        // Office Address
        officeAddress: 'Room No. 405, 4th Floor, Mantralaya',
        city: 'Mumbai',
        district: 'Mumbai City',
        state: 'Maharashtra',
        pinCode: '400032',

        // Jurisdiction
        jurisdictionState: 'Maharashtra',
        totalDistricts: '36',
        totalBlocks: '358',

        // Documents
        documents: {
            appointmentLetter: 'Appointment_Letter.pdf',
            idCard: 'ID_Card.pdf',
            authorizationLetter: 'Auth_Letter.pdf'
        }
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Password changed successfully!');
        setShowPasswordModal(false);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <User size={32} />
                            My Profile
                        </h1>
                        <p className="text-blue-100">Manage your personal and official information</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold"
                        >
                            <Edit2 size={20} />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 font-semibold"
                            >
                                <Save size={20} />
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 font-semibold"
                            >
                                <X size={20} />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-6">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                        <User size={64} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h2>
                        <p className="text-blue-600 font-medium">{profileData.designation}</p>
                        <p className="text-gray-600">{profileData.department}</p>
                        <p className="text-sm text-gray-500 mt-1">Employee ID: {profileData.employeeId}</p>
                        {isEditing && (
                            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold flex items-center gap-2">
                                <Upload size={16} />
                                Change Photo
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Official Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building size={20} className="text-blue-600" />
                    Official Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.fullName}
                                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.fullName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                        <p className="text-gray-900 font-semibold">{profileData.designation}</p>
                        <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <p className="text-gray-900 font-semibold">{profileData.department}</p>
                        <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date</label>
                        <p className="text-gray-900 font-semibold">
                            {new Date(profileData.joiningDate).toLocaleDateString('en-IN')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone size={20} className="text-blue-600" />
                    Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold flex items-center gap-2">
                                <Mail size={16} className="text-gray-600" />
                                {profileData.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold flex items-center gap-2">
                                <Phone size={16} className="text-gray-600" />
                                {profileData.phone}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Office Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-blue-600" />
                    Office Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.officeAddress}
                                onChange={(e) => setProfileData({ ...profileData, officeAddress: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.officeAddress}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <p className="text-gray-900 font-semibold">{profileData.city}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <p className="text-gray-900 font-semibold">{profileData.state}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                        <p className="text-gray-900 font-semibold">{profileData.pinCode}</p>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lock size={20} className="text-blue-600" />
                    Security
                </h3>
                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2"
                >
                    <Lock size={20} />
                    Change Password
                </button>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
