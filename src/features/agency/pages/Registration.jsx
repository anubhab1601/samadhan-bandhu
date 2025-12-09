import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertCircle, X, Building, CreditCard, User, MapPin } from 'lucide-react';

export default function Registration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        agencyName: '',
        registrationNumber: '',
        panNumber: '',
        gstNumber: '',
        address: '',
        contactPerson: '',
        contactPhone: '',
        email: '',
        bankAccount: '',
        ifscCode: '',
        bankName: '',
        documents: []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.agencyName) newErrors.agencyName = 'Agency Name is required';
        if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration Number is required';
        if (!formData.panNumber) newErrors.panNumber = 'PAN Number is required';
        if (!formData.gstNumber) newErrors.gstNumber = 'GST Number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.contactPerson) newErrors.contactPerson = 'Contact Person is required';
        if (!formData.contactPhone) newErrors.contactPhone = 'Contact Phone is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.bankAccount) newErrors.bankAccount = 'Bank Account is required';
        if (!formData.ifscCode) newErrors.ifscCode = 'IFSC Code is required';
        if (formData.documents.length < 3) newErrors.documents = 'Please upload at least Registration Cert, PAN, and GST Cert';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            documents: [...formData.documents, ...files.map(f => ({ name: f.name, size: f.size }))]
        });
        if (errors.documents) {
            setErrors({ ...errors, documents: null });
        }
    };

    const removeFile = (index) => {
        setFormData({
            ...formData,
            documents: formData.documents.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                alert('Registration submitted successfully! Your application is under review.');
                setIsSubmitting(false);
                navigate('/agency/dashboard');
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Building size={24} />
                            Agency Registration
                        </h1>
                        <p className="text-blue-100 mt-1">Register your agency to participate in government tenders</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <Building size={20} className="text-blue-600" />
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name *</label>
                                    <input
                                        type="text"
                                        value={formData.agencyName}
                                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.agencyName ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter agency name"
                                    />
                                    {errors.agencyName && <p className="text-xs text-red-500 mt-1">{errors.agencyName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number *</label>
                                    <input
                                        type="text"
                                        value={formData.registrationNumber}
                                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter registration number"
                                    />
                                    {errors.registrationNumber && <p className="text-xs text-red-500 mt-1">{errors.registrationNumber}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
                                    <input
                                        type="text"
                                        value={formData.panNumber}
                                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.panNumber ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter PAN number"
                                    />
                                    {errors.panNumber && <p className="text-xs text-red-500 mt-1">{errors.panNumber}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number *</label>
                                    <input
                                        type="text"
                                        value={formData.gstNumber}
                                        onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.gstNumber ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter GST number"
                                    />
                                    {errors.gstNumber && <p className="text-xs text-red-500 mt-1">{errors.gstNumber}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address *</label>
                                    <textarea
                                        rows="3"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter full address"
                                    ></textarea>
                                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <User size={20} className="text-blue-600" />
                                Contact Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name *</label>
                                    <input
                                        type="text"
                                        value={formData.contactPerson}
                                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter name"
                                    />
                                    {errors.contactPerson && <p className="text-xs text-red-500 mt-1">{errors.contactPerson}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        value={formData.contactPhone}
                                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.contactPhone && <p className="text-xs text-red-500 mt-1">{errors.contactPhone}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <CreditCard size={20} className="text-blue-600" />
                                Bank Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                    <input
                                        type="text"
                                        value={formData.bankName}
                                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter bank name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
                                    <input
                                        type="text"
                                        value={formData.bankAccount}
                                        onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.bankAccount ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter account number"
                                    />
                                    {errors.bankAccount && <p className="text-xs text-red-500 mt-1">{errors.bankAccount}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code *</label>
                                    <input
                                        type="text"
                                        value={formData.ifscCode}
                                        onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter IFSC code"
                                    />
                                    {errors.ifscCode && <p className="text-xs text-red-500 mt-1">{errors.ifscCode}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Document Upload */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <FileText size={20} className="text-blue-600" />
                                Document Upload
                            </h2>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                <div className="text-center">
                                    <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                                    <label className="cursor-pointer">
                                        <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                                        <span className="text-gray-600"> or drag and drop</span>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">Upload Registration Cert, PAN Card, GST Cert (Max 5MB each)</p>
                                </div>
                            </div>
                            {errors.documents && <p className="text-sm text-red-500">{errors.documents}</p>}

                            {formData.documents.length > 0 && (
                                <div className="space-y-2">
                                    {formData.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <FileText className="text-blue-600" size={20} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                                    <p className="text-xs text-gray-500">{(doc.size / 1024).toFixed(2)} KB</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={20} />
                                        Register Agency
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
