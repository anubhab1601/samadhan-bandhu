import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, MapPin, Save, Send, AlertCircle, CheckCircle } from 'lucide-react';

export default function InspectionForm() {
    const { inspectionId } = useParams();
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        agencyHeadName: '',
        agencyHeadIdProof: null,
        qualityRating: '',
        completionPercentage: '',
        remarks: '',
        improvementSuggestions: '',
        publicFeedback: '',
        constructionPhotos: [],
        wasteMaterialPhotos: [],
        officerAgencyPhotos: [],
        receiptPhotos: []
    });

    // Mock inspection data
    const inspection = {
        id: inspectionId,
        projectId: 'PROJ-2025-001',
        projectTitle: 'School Building Renovation',
        village: 'Shirdi',
        district: 'Ahmednagar',
        state: 'Maharashtra',
        agency: 'ABC Constructions',
        sarpanch: 'Ramesh Patil',
        scheduledDate: '2025-12-03',
        inspectionNumber: '1st Inspection'
    };

    const handlePhotoUpload = (category, files) => {
        // In real app, this would handle geo-tagging and upload
        const fileArray = Array.from(files);
        setFormData({
            ...formData,
            [category]: [...formData[category], ...fileArray]
        });
    };

    const removePhoto = (category, index) => {
        const updated = formData[category].filter((_, i) => i !== index);
        setFormData({ ...formData, [category]: updated });
    };

    const handleSaveDraft = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            navigate('/field-officer/inspections');
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Inspection Submitted!</h2>
                    <p className="text-gray-600 mb-4">
                        Your inspection report has been submitted to the State Officer for review.
                    </p>
                    <p className="text-sm text-gray-500">Redirecting to inspections page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate(`/field-officer/inspections/${inspectionId}`)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Inspection Details
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Inspection Form</h1>
                    <p className="text-gray-600">Inspection ID: {inspection.id}</p>
                    <p className="text-gray-600">{inspection.inspectionNumber}</p>
                </div>
            </div>

            {saved && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <p className="text-green-800 font-medium">Draft saved successfully!</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Basic Information (Auto-filled) */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">1. Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Project ID</p>
                            <p className="font-semibold text-gray-900">{inspection.projectId}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Project Title</p>
                            <p className="font-semibold text-gray-900">{inspection.projectTitle}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-semibold text-gray-900">{inspection.village}, {inspection.district}, {inspection.state}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Agency</p>
                            <p className="font-semibold text-gray-900">{inspection.agency}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Sarpanch</p>
                            <p className="font-semibold text-gray-900">{inspection.sarpanch}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Scheduled Date</p>
                            <p className="font-semibold text-gray-900">{new Date(inspection.scheduledDate).toLocaleDateString('en-IN')}</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Photo Uploads (Geo-tagged) */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">2. Photo Documentation (Geo-tagged)</h2>

                    {/* Construction Site Photos */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Camera className="text-indigo-600" size={20} />
                            <h3 className="font-semibold text-gray-900">Construction Site Photos (2-3 photos required)</h3>
                            <span className="text-red-600">*</span>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center mb-4">
                                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                <p className="text-sm text-gray-600 mb-2">Upload construction site photos with GPS location</p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    capture="environment"
                                    onChange={(e) => handlePhotoUpload('constructionPhotos', e.target.files)}
                                    className="hidden"
                                    id="construction-photos"
                                />
                                <label
                                    htmlFor="construction-photos"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                                >
                                    <Camera size={16} />
                                    Take/Upload Photos
                                </label>
                            </div>
                            {formData.constructionPhotos.length > 0 && (
                                <div className="grid grid-cols-3 gap-3">
                                    {formData.constructionPhotos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Construction ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto('constructionPhotos', index)}
                                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                            <div className="absolute bottom-1 left-1 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded flex items-center gap-1">
                                                <MapPin size={10} />
                                                GPS
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Waste Material Area Photos */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Camera className="text-indigo-600" size={20} />
                            <h3 className="font-semibold text-gray-900">Waste Material Area Photos</h3>
                            <span className="text-red-600">*</span>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center mb-4">
                                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                <p className="text-sm text-gray-600 mb-2">Upload waste material area photos</p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    capture="environment"
                                    onChange={(e) => handlePhotoUpload('wasteMaterialPhotos', e.target.files)}
                                    className="hidden"
                                    id="waste-photos"
                                />
                                <label
                                    htmlFor="waste-photos"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                                >
                                    <Camera size={16} />
                                    Take/Upload Photos
                                </label>
                            </div>
                            {formData.wasteMaterialPhotos.length > 0 && (
                                <div className="grid grid-cols-3 gap-3">
                                    {formData.wasteMaterialPhotos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Waste ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto('wasteMaterialPhotos', index)}
                                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                            <div className="absolute bottom-1 left-1 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded flex items-center gap-1">
                                                <MapPin size={10} />
                                                GPS
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Officer + Agency Head Photos */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Camera className="text-indigo-600" size={20} />
                            <h3 className="font-semibold text-gray-900">Officer + Agency Head Photos</h3>
                            <span className="text-red-600">*</span>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center mb-4">
                                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                <p className="text-sm text-gray-600 mb-2">Upload photos with agency head</p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    capture="user"
                                    onChange={(e) => handlePhotoUpload('officerAgencyPhotos', e.target.files)}
                                    className="hidden"
                                    id="officer-photos"
                                />
                                <label
                                    htmlFor="officer-photos"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                                >
                                    <Camera size={16} />
                                    Take/Upload Photos
                                </label>
                            </div>
                            {formData.officerAgencyPhotos.length > 0 && (
                                <div className="grid grid-cols-3 gap-3">
                                    {formData.officerAgencyPhotos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Officer ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto('officerAgencyPhotos', index)}
                                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                            <div className="absolute bottom-1 left-1 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded flex items-center gap-1">
                                                <MapPin size={10} />
                                                GPS
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Material Receipts Photos */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Camera className="text-indigo-600" size={20} />
                            <h3 className="font-semibold text-gray-900">Material Receipts Photos</h3>
                            <span className="text-red-600">*</span>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center mb-4">
                                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                <p className="text-sm text-gray-600 mb-2">Upload receipts of materials used</p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handlePhotoUpload('receiptPhotos', e.target.files)}
                                    className="hidden"
                                    id="receipt-photos"
                                />
                                <label
                                    htmlFor="receipt-photos"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                                >
                                    <Camera size={16} />
                                    Take/Upload Photos
                                </label>
                            </div>
                            {formData.receiptPhotos.length > 0 && (
                                <div className="grid grid-cols-3 gap-3">
                                    {formData.receiptPhotos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Receipt ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto('receiptPhotos', index)}
                                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                            <div className="absolute bottom-1 left-1 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded flex items-center gap-1">
                                                <MapPin size={10} />
                                                GPS
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 3: Work Assessment */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">3. Work Assessment</h2>

                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Agency Name (Auto-filled)</p>
                            <p className="font-semibold text-gray-900">{inspection.agency}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Agency Head Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.agencyHeadName}
                                onChange={(e) => setFormData({ ...formData, agencyHeadName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter agency head name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload ID Proof Photo of Agency Head *
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, agencyHeadIdProof: e.target.files[0] })}
                                    className="hidden"
                                    id="id-proof"
                                />
                                <label
                                    htmlFor="id-proof"
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                                >
                                    <Upload size={16} />
                                    {formData.agencyHeadIdProof ? formData.agencyHeadIdProof.name : 'Choose File'}
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quality Rating (1-5) *
                            </label>
                            <select
                                required
                                value={formData.qualityRating}
                                onChange={(e) => setFormData({ ...formData, qualityRating: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Rating</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Below Average</option>
                                <option value="3">3 - Average</option>
                                <option value="4">4 - Good</option>
                                <option value="5">5 - Excellent</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Completion Percentage (0-100) *
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    max="100"
                                    value={formData.completionPercentage}
                                    onChange={(e) => setFormData({ ...formData, completionPercentage: e.target.value })}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter percentage"
                                />
                                <span className="text-gray-600 font-medium">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Remarks *
                            </label>
                            <textarea
                                required
                                rows="4"
                                value={formData.remarks}
                                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your remarks about the inspection..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Improvement Suggestions *
                            </label>
                            <textarea
                                required
                                rows="4"
                                value={formData.improvementSuggestions}
                                onChange={(e) => setFormData({ ...formData, improvementSuggestions: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Suggest improvements for the project..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Local Public Feedback (Optional)
                            </label>
                            <textarea
                                rows="3"
                                value={formData.publicFeedback}
                                onChange={(e) => setFormData({ ...formData, publicFeedback: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter feedback from local public if any..."
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            className="flex-1 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 flex items-center justify-center gap-2 font-semibold"
                        >
                            <Save size={20} />
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-semibold"
                        >
                            <Send size={20} />
                            Submit to State Officer
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-3">
                        <AlertCircle size={14} className="inline mr-1" />
                        All fields marked with * are mandatory
                    </p>
                </div>
            </form>
        </div>
    );
}
