import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Building, FileText, Edit2, Save, X, Lock, Upload, Download, Award } from 'lucide-react';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [profileData, setProfileData] = useState({
        // Company Information
        companyName: 'ABC Constructions Pvt Ltd',
        registrationNumber: 'CIN-U45200MH2015PTC123456',
        gstNumber: '27AABCU9603R1ZM',
        panNumber: 'AABCU9603R',
        establishedYear: '2015',

        // Contact Information
        email: 'contact@abcconstructions.com',
        phone: '+91 98765 43214',
        alternatePhone: '+91 98765 43215',
        website: 'www.abcconstructions.com',

        // Address
        officeAddress: '123, Industrial Area, MIDC',
        city: 'Ahmednagar',
        district: 'Ahmednagar',
        state: 'Maharashtra',
        pinCode: '414111',

        // Representative Details
        representativeName: 'Suresh Patel',
        representativeDesignation: 'Managing Director',
        representativeEmail: 'suresh.patel@abcconstructions.com',
        representativePhone: '+91 98765 43216',

        // Business Details
        agencyId: 'AGN-MH-AHM-2024-001',
        category: 'Construction & Infrastructure',
        specialization: 'Building Construction, Road Development',
        yearsOfExperience: '9',
        employeeCount: '150',
        registrationDate: '2024-01-10',

        // Documents
        documents: {
            registrationCertificate: 'Company_Registration.pdf',
            gstCertificate: 'GST_Certificate.pdf',
            panCard: 'PAN_Card.pdf',
            experienceCertificate: 'Experience_Certificate.pdf',
            workPortfolio: 'Work_Portfolio.pdf'
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
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <Building size={32} />
                            Company Profile
                        </h1>
                        <p className="text-orange-100">Manage your company and representative information</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-semibold"
                        >
                            <Edit2 size={20} />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 font-semibold"
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

            {/* Company Logo */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-6">
                    <div className="w-32 h-32 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <Building size={64} className="text-orange-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{profileData.companyName}</h2>
                        <p className="text-gray-600">{profileData.category}</p>
                        <p className="text-sm text-gray-500 mt-1">Agency ID: {profileData.agencyId}</p>
                        {isEditing && (
                            <button className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-semibold flex items-center gap-2">
                                <Upload size={16} />
                                Upload Company Logo
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Company Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building size={20} className="text-orange-600" />
                    Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.companyName}
                                onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.companyName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                        <p className="text-gray-900 font-semibold">{profileData.registrationNumber}</p>
                        <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                        <p className="text-gray-900 font-semibold">{profileData.gstNumber}</p>
                        <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                        <p className="text-gray-900 font-semibold">{profileData.panNumber}</p>
                        <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                        <p className="text-gray-900 font-semibold">{profileData.establishedYear}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                        <p className="text-gray-900 font-semibold">
                            {new Date(profileData.registrationDate).toLocaleDateString('en-IN')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone size={20} className="text-orange-600" />
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold flex items-center gap-2">
                                <Phone size={16} className="text-gray-600" />
                                {profileData.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={profileData.alternatePhone}
                                onChange={(e) => setProfileData({ ...profileData, alternatePhone: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.alternatePhone}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.website}
                                onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.website}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Office Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-orange-600" />
                    Office Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.officeAddress}
                                onChange={(e) => setProfileData({ ...profileData, officeAddress: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                        <p className="text-gray-900 font-semibold">{profileData.district}</p>
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

            {/* Representative Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={20} className="text-orange-600" />
                    Authorized Representative
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.representativeName}
                                onChange={(e) => setProfileData({ ...profileData, representativeName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.representativeName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.representativeDesignation}
                                onChange={(e) => setProfileData({ ...profileData, representativeDesignation: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.representativeDesignation}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={profileData.representativeEmail}
                                onChange={(e) => setProfileData({ ...profileData, representativeEmail: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.representativeEmail}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={profileData.representativePhone}
                                onChange={(e) => setProfileData({ ...profileData, representativePhone: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.representativePhone}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award size={20} className="text-orange-600" />
                    Business Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <p className="text-gray-900 font-semibold">{profileData.category}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                        <p className="text-gray-900 font-semibold">{profileData.specialization}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                        <p className="text-gray-900 font-semibold">{profileData.yearsOfExperience} years</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                        <p className="text-gray-900 font-semibold">{profileData.employeeCount} employees</p>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-orange-600" />
                    Documents
                </h3>
                <div className="space-y-3">
                    {Object.entries(profileData.documents).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-gray-600" />
                                <div>
                                    <p className="font-semibold text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                    <p className="text-sm text-gray-600">{value}</p>
                                </div>
                            </div>
                            <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                                <Download size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lock size={20} className="text-orange-600" />
                    Security
                </h3>
                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold flex items-center gap-2"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
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
