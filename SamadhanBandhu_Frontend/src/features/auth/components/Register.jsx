import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    User, Mail, Lock, Phone, Building, MapPin, FileText,
    Upload, Camera, CheckCircle, AlertCircle, ArrowRight, ArrowLeft,
    Shield, CreditCard, Calendar, Hash
} from 'lucide-react';
import {
    BlockOfficerForm,
    AgencyForm,
    FieldOfficerForm,
    StateOfficerForm,
    CenterOfficerForm
} from './RoleSpecificForms';

const ROLE_OPTIONS = [
    { value: 'block', label: 'Block Officer', icon: '👤', description: 'Block-level fund management' },
    { value: 'agency', label: 'Agency', icon: '🏗️', description: 'Construction/Implementation agency' },
    { value: 'field-officer', label: 'Field Officer', icon: '👨‍💼', description: 'Inspection and monitoring officer' },
    { value: 'state', label: 'State Officer', icon: '🏢', description: 'State government officer' },
    { value: 'central', label: 'Center Officer', icon: '🏛️', description: 'Central government officer' }
];

const STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Role Selection, 2: Basic Info, 3: Role-Specific, 4: Face Capture
    const [selectedRole, setSelectedRole] = useState('');
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [capturedFace, setCapturedFace] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    // Common form data
    const [formData, setFormData] = useState({
        // Common fields
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        department: '',
        state: '',
        district: '',

        // Block Officer specific
        villageName: '',
        gramPanchayat: '',
        block: '',
        pin: '',
        blockOfficerId: '',
        tenureFrom: '',
        tenureTo: '',

        // Agency specific
        agencyName: '',
        registrationNumber: '',
        registrationAuthority: '',
        yearEstablished: '',
        typesOfWork: [],
        bankAccountNumber: '',
        ifscCode: '',
        bankName: '',
        bankBranch: '',
        panNumber: '',
        gstNumber: '',

        // Field Officer specific
        designation: '',
        officeAddress: '',
        employeeId: '',

        // State Officer specific
        stateDesignation: '',
        stateDepartment: '',
        stateOfficeAddress: '',

        // IVA Officer specific
        ivaOrganization: '',
        ivaDesignation: '',
        ivaOfficeAddress: '',

        // Center Officer specific
        centerDesignation: '',
        ministry: '',
        centerOfficeAddress: ''
    });

    const [documents, setDocuments] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newDocs = files.map(f => ({
            name: f.name,
            size: f.size,
            file: f
        }));
        setDocuments([...documents, ...newDocs]);
    };

    const removeDocument = (index) => {
        setDocuments(documents.filter((_, i) => i !== index));
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 640, height: 480 }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsCameraActive(true);
            }
        } catch (error) {
            alert('Camera access denied. Please allow camera access to complete registration.');
            console.error('Camera error:', error);
        }
    };

    const captureFace = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);
            const imageData = canvas.toDataURL('image/jpeg');
            setCapturedFace(imageData);
            stopCamera();
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            setIsCameraActive(false);
        }
    };

    const retakeFace = () => {
        setCapturedFace(null);
        startCamera();
    };

    const validateStep = (currentStep) => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!selectedRole) newErrors.role = 'Please select a role';
        }

        if (currentStep === 2) {
            if (!formData.fullName) newErrors.fullName = 'Full name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
            if (!formData.password) newErrors.password = 'Password is required';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
            if (!formData.state) newErrors.state = 'State is required';
            if (!formData.district) newErrors.district = 'District is required';
        }

        if (currentStep === 3) {
            // Role-specific validation
            if (selectedRole === 'block') {
                if (!formData.villageName) newErrors.villageName = 'Village name is required';
                if (!formData.gramPanchayat) newErrors.gramPanchayat = 'Gram Panchayat is required';
                if (!formData.blockOfficerId) newErrors.blockOfficerId = 'Block Officer ID is required';
            } else if (selectedRole === 'agency') {
                if (!formData.agencyName) newErrors.agencyName = 'Agency name is required';
                if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
                if (!formData.bankAccountNumber) newErrors.bankAccountNumber = 'Bank account is required';
                if (documents.length < 3) newErrors.documents = 'Please upload at least 3 documents';
            } else if (selectedRole === 'field-officer') {
                if (!formData.designation) newErrors.designation = 'Designation is required';
                if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            if (step === 3) {
                // Start camera for face capture
                startCamera();
            }
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step === 4) {
            stopCamera();
            setCapturedFace(null);
        }
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        if (!capturedFace) {
            alert('Please capture your face to complete registration');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            alert('Registration submitted successfully! Your application is pending approval.');
            setIsSubmitting(false);
            navigate('/login');
        }, 2000);
    };

    const selectedRoleData = ROLE_OPTIONS.find(r => r.value === selectedRole);

    return (
        <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
            {/* Top Government Bar */}
            <div className="bg-[#1b1b1b] text-white text-[11px] py-1.5 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span>भारत सरकार | Government of India</span>
                    <div className="flex gap-4">
                        <span className="cursor-pointer font-semibold">English</span>
                        <span className="cursor-pointer text-gray-400">हिन्दी</span>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                            alt="Government of India"
                            className="h-14 w-auto"
                        />
                        <div>
                            <div className="text-[11px] text-gray-600">सामाजिक न्याय और अधिकारिता मंत्रालय</div>
                            <h1 className="text-[15px] font-bold text-[#1e3a8a]">Ministry of Social Justice and Empowerment</h1>
                            <div className="text-[11px] text-orange-600 font-semibold">PM-AJAY - REGISTRATION PORTAL</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {['Role Selection', 'Basic Information', 'Role-Specific Details', 'Face Authentication'].map((label, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step > index + 1 ? 'bg-green-500 border-green-500 text-white' :
                                    step === index + 1 ? 'bg-blue-600 border-blue-600 text-white' :
                                        'bg-white border-gray-300 text-gray-400'
                                    }`}>
                                    {step > index + 1 ? <CheckCircle size={20} /> : index + 1}
                                </div>
                                <div className="ml-3">
                                    <div className={`text-sm font-medium ${step >= index + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {label}
                                    </div>
                                </div>
                                {index < 3 && (
                                    <div className={`w-24 h-1 mx-4 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                    {/* Step 1: Role Selection */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Role</h2>
                            <p className="text-gray-600 mb-6">Choose the role that best describes your position</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ROLE_OPTIONS.map((role) => (
                                    <div
                                        key={role.value}
                                        onClick={() => setSelectedRole(role.value)}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedRole === role.value
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="text-3xl">{role.icon}</div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{role.label}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                                            </div>
                                            {selectedRole === role.value && (
                                                <CheckCircle className="text-blue-600" size={24} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role}</p>}
                        </div>
                    )}

                    {/* Step 2: Basic Information */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                            <p className="text-gray-600 mb-6">Enter your personal and contact details</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Official Email ID *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="your.email@gov.in"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.mobile ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="10-digit mobile number"
                                        />
                                    </div>
                                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                                </div>

                                {/* Department/Organization */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Department/Organization
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={formData.department}
                                            onChange={(e) => handleInputChange('department', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter department name"
                                        />
                                    </div>
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State *
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <select
                                            value={formData.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.state ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select State</option>
                                            {STATES.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>

                                {/* District */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        District *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.district}
                                        onChange={(e) => handleInputChange('district', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.district ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter district"
                                    />
                                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Create a strong password"
                                        />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Re-enter password"
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Role-Specific Details */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {selectedRoleData?.label} Specific Details
                            </h2>
                            <p className="text-gray-600 mb-6">Provide additional information for your role</p>

                            {/* Render role-specific forms */}
                            {selectedRole === 'block' && (
                                <BlockOfficerForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    errors={errors}
                                />
                            )}

                            {selectedRole === 'agency' && (
                                <AgencyForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    errors={errors}
                                    documents={documents}
                                    handleFileUpload={handleFileUpload}
                                    removeDocument={removeDocument}
                                />
                            )}

                            {selectedRole === 'field-officer' && (
                                <FieldOfficerForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    errors={errors}
                                />
                            )}

                            {selectedRole === 'state' && (
                                <StateOfficerForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    errors={errors}
                                />
                            )}

                            {selectedRole === 'central' && (
                                <CenterOfficerForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    errors={errors}
                                />
                            )}
                        </div>
                    )}

                    {/* Step 4: Face Capture - Placeholder for now */}
                    {step === 4 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Face Authentication Setup</h2>
                            <p className="text-gray-600 mb-6">Capture your face for secure authentication</p>

                            <div className="max-w-md mx-auto">
                                {!capturedFace ? (
                                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className="w-full h-80 object-cover"
                                        />
                                        <div className="p-4 text-center">
                                            <button
                                                onClick={captureFace}
                                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
                                            >
                                                <Camera size={20} />
                                                Capture Face
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <img src={capturedFace} alt="Captured face" className="w-full rounded-lg" />
                                        <button
                                            onClick={retakeFace}
                                            className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full"
                                        >
                                            Retake Photo
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t">
                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                            >
                                <ArrowLeft size={20} />
                                Previous
                            </button>
                        )}

                        {step < 4 ? (
                            <button
                                onClick={nextStep}
                                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                            >
                                Next
                                <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !capturedFace}
                                className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={20} />
                                        Submit Registration
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Login Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#1b1b1b] text-gray-400 py-4 mt-auto">
                <div className="max-w-7xl mx-auto px-6 text-center text-xs">
                    <p>© 2025 Ministry of Social Justice and Empowerment, Government of India. All rights reserved.</p>
                    <p className="mt-1">Website designed, developed and hosted by National Informatics Centre (NIC)</p>
                </div>
            </footer>
        </div>
    );
}
