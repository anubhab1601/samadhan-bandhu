import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Calendar, Camera, Upload, CheckCircle, X, Building, Phone, Mail, FileText } from 'lucide-react';

export default function AgencyVerificationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        officeExists: false,
        agencyActive: false,
        documentsVerified: false,
        visitDate: '',
        visitPhotos: [],
        decision: '',
        remarks: ''
    });

    const [showSuccess, setShowSuccess] = useState(false);

    // Mock agency data
    const agency = {
        id: id || 'AGN-2025-001',
        name: 'ABC Constructions Pvt Ltd',
        registrationNumber: 'REG-2020-12345',
        gstNumber: 'GST-27AABCU9603R1ZM',
        village: 'Shirdi',
        sarpanch: 'Ramesh Patil',
        district: 'Ahmednagar',
        state: 'Maharashtra',
        projectTitle: 'School Building Renovation',
        officeAddress: '123, Industrial Area, Shirdi, Ahmednagar - 423109',
        contactPerson: 'Rajesh Kumar',
        contactNumber: '+91 9876543210',
        email: 'contact@abcconstructions.com',
        establishedYear: '2015',
        totalProjects: 45,
        completedProjects: 38,
        ongoingProjects: 7,
        specialization: 'Building Construction, Road Development, Water Supply Systems',
        documents: [
            { id: 1, name: 'Company Registration Certificate', status: 'Submitted' },
            { id: 2, name: 'GST Registration', status: 'Submitted' },
            { id: 3, name: 'PAN Card', status: 'Submitted' },
            { id: 4, name: 'Previous Project Certificates', status: 'Submitted' },
            { id: 5, name: 'Bank Details', status: 'Submitted' }
        ]
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.map((file, index) => ({
            id: formData.visitPhotos.length + index + 1,
            file,
            preview: URL.createObjectURL(file),
            gps: '19.7645° N, 74.9914° E' // Mock GPS
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
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Verifications
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Agency Verification</h1>
                        <p className="text-gray-600">Verification ID: {agency.id}</p>
                        <p className="text-gray-600">Agency: {agency.name}</p>
                    </div>
                    <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-semibold">
                        Agency Verification
                    </span>
                </div>
            </div>

            {/* Agency Profile */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building size={24} />
                    Agency Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Agency Name</p>
                        <p className="font-semibold text-gray-900">{agency.name}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Registration Number</p>
                        <p className="font-semibold text-gray-900">{agency.registrationNumber}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">GST Number</p>
                        <p className="font-semibold text-gray-900">{agency.gstNumber}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-600 mb-1">Established Year</p>
                        <p className="text-2xl font-bold text-blue-600">{agency.establishedYear}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600 mb-1">Total Projects</p>
                        <p className="text-2xl font-bold text-green-600">{agency.totalProjects}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-gray-600 mb-1">Completed Projects</p>
                        <p className="text-xl font-bold text-purple-600">{agency.completedProjects}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-600 mb-1">Ongoing Projects</p>
                        <p className="text-xl font-bold text-orange-600">{agency.ongoingProjects}</p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                        <p className="text-sm text-gray-600 mb-1">Project Type</p>
                        <p className="text-sm font-semibold text-teal-600">{agency.projectTitle}</p>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Specialization</h3>
                    <p className="text-gray-700">{agency.specialization}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Office Address</h3>
                    <p className="text-gray-700 flex items-start gap-2">
                        <MapPin size={20} className="text-gray-500 flex-shrink-0 mt-1" />
                        {agency.officeAddress}
                    </p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="text-gray-600" size={20} />
                            <p className="text-sm text-gray-600">Contact Person</p>
                        </div>
                        <p className="font-semibold text-gray-900">{agency.contactPerson}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Phone className="text-gray-600" size={20} />
                            <p className="text-sm text-gray-600">Phone Number</p>
                        </div>
                        <p className="font-semibold text-gray-900">{agency.contactNumber}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Mail className="text-gray-600" size={20} />
                            <p className="text-sm text-gray-600">Email Address</p>
                        </div>
                        <p className="font-semibold text-gray-900">{agency.email}</p>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={24} />
                    Submitted Documents
                </h2>

                <div className="space-y-3">
                    {agency.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{doc.name}</p>
                                    <p className="text-sm text-gray-600">Status: {doc.status}</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {doc.status}
                            </span>
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
                            id="officeExists"
                            checked={formData.officeExists}
                            onChange={(e) => setFormData({ ...formData, officeExists: e.target.checked })}
                            className="w-5 h-5 mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            required
                        />
                        <label htmlFor="officeExists" className="flex-1">
                            <p className="font-semibold text-gray-900">Confirm Agency Office Exists</p>
                            <p className="text-sm text-gray-600">Verify the agency office is located at the provided address</p>
                        </label>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="agencyActive"
                            checked={formData.agencyActive}
                            onChange={(e) => setFormData({ ...formData, agencyActive: e.target.checked })}
                            className="w-5 h-5 mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            required
                        />
                        <label htmlFor="agencyActive" className="flex-1">
                            <p className="font-semibold text-gray-900">Confirm Agency is Active</p>
                            <p className="text-sm text-gray-600">Verify the agency is currently operational and conducting business</p>
                        </label>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="documentsVerified"
                            checked={formData.documentsVerified}
                            onChange={(e) => setFormData({ ...formData, documentsVerified: e.target.checked })}
                            className="w-5 h-5 mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            required
                        />
                        <label htmlFor="documentsVerified" className="flex-1">
                            <p className="font-semibold text-gray-900">Confirm Documents are Authentic</p>
                            <p className="text-sm text-gray-600">Verify all submitted documents are genuine and valid</p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                {/* Visit Photos Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Visit Photos (Geo-tagged) *
                    </label>
                    <p className="text-sm text-gray-600 mb-2">Upload photos of agency office, signboard, staff, and documents</p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
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
                        className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                        <p className="text-gray-600">Your agency verification has been sent to the State Officer.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
