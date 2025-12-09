import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Building, FileText, Edit2, Save, X, Lock, Upload, Download } from 'lucide-react';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [profileData, setProfileData] = useState({
        // Personal Information
        fullName: 'Rajesh Kumar Singh',
        email: 'rajesh.singh@pmajay.gov.in',
        phone: '+91 98765 43213',
        dateOfBirth: '1985-03-20',
        gender: 'Male',
        aadharNumber: '2345 6789 0123',

        // Official Details
        officerId: 'IVA-MH-AHM-2024-001',
        employeeId: 'EMP-IVA-12345',
        designation: 'IVA Officer',
        department: 'Independent Verification Agency',
        joiningDate: '2024-01-15',

        // Area Details
        assignedDistrict: 'Ahmednagar',
        assignedBlocks: 'Rahata, Kopargaon, Shrirampur',
        state: 'Maharashtra',
        officeAddress: 'District Office, Ahmednagar',
        pinCode: '414001',

        // Documents
        documents: {
            officialLetter: 'Appointment_Letter.pdf',
            idProof: 'Aadhar_Card.pdf',
            photo: 'Profile_Photo.jpg'
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
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <User size={32} />
                            My Profile
                        </h1>
                        <p className="text-purple-100">Manage your personal and official information</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-semibold"
                        >
                            <Edit2 size={20} />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-semibold"
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

            {/* Profile Photo */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-6">
                    <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                        <User size={64} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h2>
                        <p className="text-gray-600">{profileData.designation}, {profileData.department}</p>
                        <p className="text-sm text-gray-500 mt-1">ID: {profileData.officerId}</p>
                        {isEditing && (
                            <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-semibold flex items-center gap-2">
                                <Upload size={16} />
                                Upload New Photo
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={20} className="text-purple-600" />
                    Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.fullName}
                                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.fullName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold flex items-center gap-2">
                                <Phone size={16} className="text-gray-600" />
                                {profileData.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={profileData.dateOfBirth}
                                onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-semibold flex items-center gap-2">
                                <Calendar size={16} className="text-gray-600" />
                                {new Date(profileData.dateOfBirth).toLocaleDateString('en-IN')}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        {isEditing ? (
                            <select
                                value={profileData.gender}
                                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <p className="text-gray-900 font-semibold">{profileData.gender}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
                        <p className="text-gray-900 font-semibold">{profileData.aadharNumber}</p>
                        <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                    </div>
                </div>
            </div>

            {/* Official Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building size={20} className="text-purple-600" />
                    Official Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Officer ID</label>
                        <p className="text-gray-900 font-semibold">{profileData.officerId}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                        <p className="text-gray-900 font-semibold">{profileData.employeeId}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                        <p className="text-gray-900 font-semibold">{profileData.designation}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <p className="text-gray-900 font-semibold">{profileData.department}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date</label>
                        <p className="text-gray-900 font-semibold">
                            {new Date(profileData.joiningDate).toLocaleDateString('en-IN')}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                            Active
                        </span>
                    </div>
                </div>
            </div>

            {/* Area Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-purple-600" />
                    Area Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assigned District</label>
                        <p className="text-gray-900 font-semibold">{profileData.assignedDistrict}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Blocks</label>
                        <p className="text-gray-900 font-semibold">{profileData.assignedBlocks}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <p className="text-gray-900 font-semibold">{profileData.state}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
                        <p className="text-gray-900 font-semibold">{profileData.officeAddress}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                        <p className="text-gray-900 font-semibold">{profileData.pinCode}</p>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-purple-600" />
                    Documents
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-gray-600" />
                            <div>
                                <p className="font-semibold text-gray-900">Appointment Letter</p>
                                <p className="text-sm text-gray-600">{profileData.documents.officialLetter}</p>
                            </div>
                        </div>
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                            <Download size={20} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-gray-600" />
                            <div>
                                <p className="font-semibold text-gray-900">ID Proof (Aadhar)</p>
                                <p className="text-sm text-gray-600">{profileData.documents.idProof}</p>
                            </div>
                        </div>
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                            <Download size={20} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-gray-600" />
                            <div>
                                <p className="font-semibold text-gray-900">Profile Photo</p>
                                <p className="text-sm text-gray-600">{profileData.documents.photo}</p>
                            </div>
                        </div>
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                            <Download size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lock size={20} className="text-purple-600" />
                    Security
                </h3>
                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold flex items-center gap-2"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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
