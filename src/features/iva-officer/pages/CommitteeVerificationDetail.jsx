import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Calendar, Camera, Upload, CheckCircle, X, Users } from 'lucide-react';

export default function CommitteeVerificationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        membersVerified: false,
        committeeGenuine: false,
        visitDate: '',
        visitPhotos: [],
        decision: '',
        remarks: ''
    });

    const [showSuccess, setShowSuccess] = useState(false);

    // Mock committee data
    const committee = {
        id: id || 'COM-2025-001',
        village: 'Daund',
        sarpanch: 'Priya Sharma',
        district: 'Pune',
        state: 'Maharashtra',
        projectTitle: 'Community Hall Construction',
        resolutionDate: '2025-11-15',
        resolutionNumber: 'RES-2025-045',
        members: [
            {
                id: 1,
                name: 'Ramesh Kumar',
                designation: 'Chairperson',
                contactNumber: '+91 9876543210',
                address: 'Village Road, Daund'
            },
            {
                id: 2,
                name: 'Sunita Patil',
                designation: 'Secretary',
                contactNumber: '+91 9876543211',
                address: 'Main Street, Daund'
            },
            {
                id: 3,
                name: 'Vijay Deshmukh',
                designation: 'Treasurer',
                contactNumber: '+91 9876543212',
                address: 'Temple Road, Daund'
            },
            {
                id: 4,
                name: 'Anjali Sharma',
                designation: 'Member',
                contactNumber: '+91 9876543213',
                address: 'School Lane, Daund'
            },
            {
                id: 5,
                name: 'Prakash Jadhav',
                designation: 'Member',
                contactNumber: '+91 9876543214',
                address: 'Market Area, Daund'
            }
        ],
        resolutionDetails: 'The committee has resolved to construct a community hall for village gatherings and events. The estimated budget is ₹50 lakhs and the project duration is 12 months.'
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.map((file, index) => ({
            id: formData.visitPhotos.length + index + 1,
            file,
            preview: URL.createObjectURL(file),
            gps: '18.7645° N, 74.5914° E' // Mock GPS
        }));
        setFormData({
            ...formData,
            visitPhotos: [...formData.visitPhotos, ...newPhotos]
        });
    };

    const removePhoto = (photoId) => {
        setFormData({
            ...formData,
            visitPhotos: formData.visitPhotos.filter(p => p.id !== photoId)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => {
            navigate('/iva-officer/verifications');
        }, 2000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate('/iva-officer/verifications')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Verifications
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Committee Verification</h1>
                        <p className="text-gray-600">Verification ID: {committee.id}</p>
                        <p className="text-gray-600">Village: {committee.village}, {committee.district}</p>
                    </div>
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
                        Committee Verification
                    </span>
                </div>
            </div>

            {/* Committee Resolution Details */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Committee Resolution Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Sarpanch</p>
                        <p className="font-semibold text-gray-900">{committee.sarpanch}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Project Title</p>
                        <p className="font-semibold text-gray-900">{committee.projectTitle}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Location</p>
                        <p className="font-semibold text-gray-900">{committee.village}, {committee.district}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-600 mb-1">Resolution Number</p>
                        <p className="text-lg font-bold text-blue-600">{committee.resolutionNumber}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600 mb-1">Resolution Date</p>
                        <p className="text-lg font-bold text-green-600">{new Date(committee.resolutionDate).toLocaleDateString('en-IN')}</p>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Resolution Details</h3>
                    <p className="text-gray-700">{committee.resolutionDetails}</p>
                </div>
            </div>

            {/* Committee Members */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users size={24} />
                    Committee Members ({committee.members.length})
                </h2>

                <div className="space-y-3">
                    {committee.members.map((member) => (
                        <div key={member.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <User className="text-indigo-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                            <p className="text-sm text-indigo-600">{member.designation}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 ml-13">
                                        <p>📞 {member.contactNumber}</p>
                                        <p>📍 {member.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* IVA Verification Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">IVA Verification Checklist</h2>

                <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="membersVerified"
                            checked={formData.membersVerified}
                            onChange={(e) => setFormData({ ...formData, membersVerified: e.target.checked })}
                            className="w-5 h-5 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            required
                        />
                        <label htmlFor="membersVerified" className="flex-1">
                            <p className="font-semibold text-gray-900">Confirm Committee Members Exist and Are Genuine</p>
                            <p className="text-sm text-gray-600">Verify all committee members are real people and their details are accurate</p>
                        </label>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="committeeGenuine"
                            checked={formData.committeeGenuine}
                            onChange={(e) => setFormData({ ...formData, committeeGenuine: e.target.checked })}
                            className="w-5 h-5 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            required
                        />
                        <label htmlFor="committeeGenuine" className="flex-1">
                            <p className="font-semibold text-gray-900">Confirm Committee is Properly Constituted</p>
                            <p className="text-sm text-gray-600">Verify the committee follows proper procedures and is legitimate</p>
                        </label>
                    </div>
                </div>

                {/* Visit Date */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Visit Date *
                    </label>
                    <input
                        type="date"
                        required
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Visit Photos Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Visit Photos (Geo-tagged) *
                    </label>
                    <p className="text-sm text-gray-600 mb-2">Upload photos of committee meeting, members, and verification documents</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                            type="file"
                            id="visitPhotos"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                        />
                        <label htmlFor="visitPhotos" className="cursor-pointer">
                            <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                            <p className="text-sm text-gray-600">Click to upload visit photos</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB (with GPS data)</p>
                        </label>
                    </div>

                    {/* Photo Previews */}
                    {formData.visitPhotos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {formData.visitPhotos.map((photo) => (
                                <div key={photo.id} className="relative group">
                                    <img
                                        src={photo.preview}
                                        alt="Visit photo"
                                        className="w-full aspect-video object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(photo.id)}
                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                    >
                                        <X size={16} />
                                    </button>
                                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded flex items-center gap-1">
                                        <MapPin size={10} />
                                        GPS: {photo.gps}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Final Decision */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Final Status *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, decision: 'Verified' })}
                            className={`p-4 border-2 rounded-lg text-center ${formData.decision === 'Verified'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-300 hover:border-green-300'
                                }`}
                        >
                            <CheckCircle className="mx-auto mb-2" size={32} />
                            <p className="font-semibold">Verified</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, decision: 'Not Verified' })}
                            className={`p-4 border-2 rounded-lg text-center ${formData.decision === 'Not Verified'
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-gray-300 hover:border-red-300'
                                }`}
                        >
                            <X className="mx-auto mb-2" size={32} />
                            <p className="font-semibold">Not Verified</p>
                        </button>
                    </div>
                </div>

                {/* Remarks */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remarks *
                    </label>
                    <textarea
                        required
                        rows="4"
                        value={formData.remarks}
                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your verification remarks..."
                    />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/iva-officer/verifications')}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!formData.decision}
                        className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Submit Verification
                    </button>
                </div>
            </form>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Verification Submitted!</h3>
                        <p className="text-gray-600">Your committee verification has been sent to the State Officer.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
