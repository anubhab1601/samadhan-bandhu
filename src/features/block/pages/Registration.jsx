import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Building, FileText, Lock, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function Registration() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        aadharNumber: '',

        // Village Details
        villageName: '',
        gramPanchayat: '',
        block: '',
        district: '',
        state: '',
        pinCode: '',

        // Official Details
        blockOfficerId: '',
        letterNumber: '',
        tenureFrom: '',
        tenureTo: '',

        // Documents
        officialLetter: null,
        idProof: null,
        photo: null,

        // Account Setup
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const states = ['Maharashtra', 'Gujarat', 'Rajasthan', 'Karnataka', 'Tamil Nadu'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData({ ...formData, [name]: files[0] });
            if (errors[name]) {
                setErrors({ ...errors, [name]: '' });
            }
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.fullName) newErrors.fullName = 'Full name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            if (!formData.phone) newErrors.phone = 'Phone number is required';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
            if (!formData.gender) newErrors.gender = 'Gender is required';
            if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
        } else if (step === 2) {
            if (!formData.villageName) newErrors.villageName = 'Village name is required';
            if (!formData.gramPanchayat) newErrors.gramPanchayat = 'Gram Panchayat is required';
            if (!formData.block) newErrors.block = 'Block is required';
            if (!formData.district) newErrors.district = 'District is required';
            if (!formData.state) newErrors.state = 'State is required';
            if (!formData.pinCode) newErrors.pinCode = 'PIN code is required';
        } else if (step === 3) {
            if (!formData.blockOfficerId) newErrors.blockOfficerId = 'Block Officer ID is required';
            if (!formData.letterNumber) newErrors.letterNumber = 'Letter number is required';
            if (!formData.tenureFrom) newErrors.tenureFrom = 'Tenure start date is required';
            if (!formData.tenureTo) newErrors.tenureTo = 'Tenure end date is required';
            if (!formData.officialLetter) newErrors.officialLetter = 'Official letter is required';
            if (!formData.idProof) newErrors.idProof = 'ID proof is required';
            if (!formData.photo) newErrors.photo = 'Photo is required';
        } else if (step === 4) {
            if (!formData.password) newErrors.password = 'Password is required';
            if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(4)) {
            // Submit to API
            console.log('Form submitted:', formData);
            setShowSuccess(true);
        }
    };

    const steps = [
        { number: 1, title: 'Personal Info', icon: User },
        { number: 2, title: 'Village Details', icon: MapPin },
        { number: 3, title: 'Official Details', icon: Building },
        { number: 4, title: 'Account Setup', icon: Lock }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white mb-6">
                    <h1 className="text-3xl font-bold mb-2">Block Officer Registration</h1>
                    <p className="text-orange-100">Register as a Block Officer to access PM-AJAY portal</p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.number;
                            const isCompleted = currentStep > step.number;

                            return (
                                <React.Fragment key={step.number}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : isActive ? 'bg-orange-500' : 'bg-gray-300'
                                            } text-white mb-2`}>
                                            {isCompleted ? <CheckCircle size={24} /> : <Icon size={24} />}
                                        </div>
                                        <p className={`text-sm font-semibold ${isActive ? 'text-orange-600' : 'text-gray-600'}`}>
                                            {step.title}
                                        </p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`flex-1 h-1 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="+91 98765 43210"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth *
                                        </label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gender *
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Aadhar Number *
                                        </label>
                                        <input
                                            type="text"
                                            name="aadharNumber"
                                            value={formData.aadharNumber}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="1234 5678 9012"
                                            maxLength="14"
                                        />
                                        {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Village Details */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Village Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Village Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="villageName"
                                            value={formData.villageName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.villageName ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter village name"
                                        />
                                        {errors.villageName && <p className="text-red-500 text-xs mt-1">{errors.villageName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gram Panchayat *
                                        </label>
                                        <input
                                            type="text"
                                            name="gramPanchayat"
                                            value={formData.gramPanchayat}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.gramPanchayat ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter Gram Panchayat"
                                        />
                                        {errors.gramPanchayat && <p className="text-red-500 text-xs mt-1">{errors.gramPanchayat}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Block *
                                        </label>
                                        <input
                                            type="text"
                                            name="block"
                                            value={formData.block}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.block ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter block"
                                        />
                                        {errors.block && <p className="text-red-500 text-xs mt-1">{errors.block}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            District *
                                        </label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter district"
                                        />
                                        {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State *
                                        </label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="">Select State</option>
                                            {states.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            PIN Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="pinCode"
                                            value={formData.pinCode}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.pinCode ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="423109"
                                            maxLength="6"
                                        />
                                        {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Official Details */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Official Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Block Officer ID / Letter Number *
                                        </label>
                                        <input
                                            type="text"
                                            name="blockOfficerId"
                                            value={formData.blockOfficerId}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.blockOfficerId ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="BLK-OFF-MH-AHM-2024-001"
                                        />
                                        {errors.blockOfficerId && <p className="text-red-500 text-xs mt-1">{errors.blockOfficerId}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Official Letter Number *
                                        </label>
                                        <input
                                            type="text"
                                            name="letterNumber"
                                            value={formData.letterNumber}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.letterNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="GP/SHIRDI/2024/123"
                                        />
                                        {errors.letterNumber && <p className="text-red-500 text-xs mt-1">{errors.letterNumber}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tenure From *
                                        </label>
                                        <input
                                            type="date"
                                            name="tenureFrom"
                                            value={formData.tenureFrom}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.tenureFrom ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.tenureFrom && <p className="text-red-500 text-xs mt-1">{errors.tenureFrom}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tenure To *
                                        </label>
                                        <input
                                            type="date"
                                            name="tenureTo"
                                            value={formData.tenureTo}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.tenureTo ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.tenureTo && <p className="text-red-500 text-xs mt-1">{errors.tenureTo}</p>}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Upload Documents</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Official Letter *
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex-1 cursor-pointer">
                                                    <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.officialLetter ? 'border-red-500' : 'border-gray-300'} hover:border-orange-500`}>
                                                        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                                        <p className="text-sm text-gray-600">
                                                            {formData.officialLetter ? formData.officialLetter.name : 'Click to upload official letter (PDF)'}
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        name="officialLetter"
                                                        onChange={handleFileChange}
                                                        accept=".pdf"
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            {errors.officialLetter && <p className="text-red-500 text-xs mt-1">{errors.officialLetter}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ID Proof (Aadhar) *
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex-1 cursor-pointer">
                                                    <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.idProof ? 'border-red-500' : 'border-gray-300'} hover:border-orange-500`}>
                                                        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                                        <p className="text-sm text-gray-600">
                                                            {formData.idProof ? formData.idProof.name : 'Click to upload ID proof (PDF)'}
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        name="idProof"
                                                        onChange={handleFileChange}
                                                        accept=".pdf"
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            {errors.idProof && <p className="text-red-500 text-xs mt-1">{errors.idProof}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Profile Photo *
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex-1 cursor-pointer">
                                                    <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.photo ? 'border-red-500' : 'border-gray-300'} hover:border-orange-500`}>
                                                        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                                        <p className="text-sm text-gray-600">
                                                            {formData.photo ? formData.photo.name : 'Click to upload photo (JPG/PNG)'}
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Account Setup */}
                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Account Setup</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter password (min 8 characters)"
                                        />
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password *
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Re-enter password"
                                        />
                                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-2">Approval Process</h4>
                                            <p className="text-sm text-blue-800">
                                                After submitting your registration, your account will be reviewed and approved by the State Officer.
                                                You will receive an email notification once your account is activated. This process typically takes 2-3 business days.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
                                >
                                    Previous
                                </button>
                            )}
                            {currentStep < 4 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="ml-auto px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2"
                                >
                                    <CheckCircle size={20} />
                                    Submit Registration
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h2>
                        <p className="text-gray-600 mb-6">
                            Your registration has been submitted successfully. You will receive an email notification once your account is approved by the State Officer.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
