import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building, MapPin, Phone, Mail, FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function IVARegistration() {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',

        // Organization Details
        organizationName: '',
        designation: '',
        employeeId: '',

        // Location
        state: '',
        district: '',
        officeAddress: '',
        pincode: '',

        // Documents
        idProof: null,
        empanelmentDoc: null,
        photo: null,

        // Password
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const states = ['Maharashtra', 'Gujarat', 'Rajasthan', 'Karnataka', 'Tamil Nadu'];
    const districts = {
        'Maharashtra': ['Ahmednagar', 'Nashik', 'Pune', 'Thane', 'Mumbai'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
        'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
        'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Trichy']
    };

    const handleFileUpload = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                [fieldName]: file
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Personal Information
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';

        // Organization Details
        if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
        if (!formData.designation) newErrors.designation = 'Designation is required';

        // Location
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.officeAddress) newErrors.officeAddress = 'Office address is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';

        // Documents
        if (!formData.idProof) newErrors.idProof = 'ID proof is required';
        if (!formData.empanelmentDoc) newErrors.empanelmentDoc = 'Empanelment document is required';
        if (!formData.photo) newErrors.photo = 'Photo is required';

        // Password
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white mb-6">
                    <h1 className="text-3xl font-bold mb-2">IVA Officer Registration</h1>
                    <p className="text-purple-100">Register as an Independent Verification Agency Officer</p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User size={24} />
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="+91 9876543210"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Birth *
                                </label>
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender *
                                </label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Organization Details */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Building size={24} />
                            Organization Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Organization/Agency Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.organizationName}
                                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.organizationName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter organization name"
                                />
                                {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Designation *
                                </label>
                                <input
                                    type="text"
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.designation ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="e.g., Senior Verification Officer"
                                />
                                {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee ID (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter employee ID"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin size={24} />
                            Location Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State *
                                </label>
                                <select
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value, district: '' })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
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
                                    District *
                                </label>
                                <select
                                    value={formData.district}
                                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                                    disabled={!formData.state}
                                >
                                    <option value="">Select District</option>
                                    {formData.state && districts[formData.state]?.map(district => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Office Address *
                                </label>
                                <textarea
                                    rows="3"
                                    value={formData.officeAddress}
                                    onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.officeAddress ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter complete office address"
                                />
                                {errors.officeAddress && <p className="text-red-500 text-xs mt-1">{errors.officeAddress}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pincode *
                                </label>
                                <input
                                    type="text"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter pincode"
                                    maxLength="6"
                                />
                                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Document Upload */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={24} />
                            Document Upload
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Official ID Proof (Aadhaar/PAN/Driving License) *
                                </label>
                                <div className={`border-2 border-dashed rounded-lg p-4 ${errors.idProof ? 'border-red-500' : 'border-gray-300'}`}>
                                    <input
                                        type="file"
                                        id="idProof"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileUpload(e, 'idProof')}
                                        className="hidden"
                                    />
                                    <label htmlFor="idProof" className="cursor-pointer flex items-center gap-2">
                                        <Upload className="text-gray-400" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {formData.idProof ? formData.idProof.name : 'Click to upload ID proof'}
                                            </p>
                                            <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                                        </div>
                                    </label>
                                </div>
                                {errors.idProof && <p className="text-red-500 text-xs mt-1">{errors.idProof}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Empanelment Document *
                                </label>
                                <div className={`border-2 border-dashed rounded-lg p-4 ${errors.empanelmentDoc ? 'border-red-500' : 'border-gray-300'}`}>
                                    <input
                                        type="file"
                                        id="empanelmentDoc"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileUpload(e, 'empanelmentDoc')}
                                        className="hidden"
                                    />
                                    <label htmlFor="empanelmentDoc" className="cursor-pointer flex items-center gap-2">
                                        <Upload className="text-gray-400" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {formData.empanelmentDoc ? formData.empanelmentDoc.name : 'Click to upload empanelment document'}
                                            </p>
                                            <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                                        </div>
                                    </label>
                                </div>
                                {errors.empanelmentDoc && <p className="text-red-500 text-xs mt-1">{errors.empanelmentDoc}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Passport Size Photo *
                                </label>
                                <div className={`border-2 border-dashed rounded-lg p-4 ${errors.photo ? 'border-red-500' : 'border-gray-300'}`}>
                                    <input
                                        type="file"
                                        id="photo"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={(e) => handleFileUpload(e, 'photo')}
                                        className="hidden"
                                    />
                                    <label htmlFor="photo" className="cursor-pointer flex items-center gap-2">
                                        <Upload className="text-gray-400" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {formData.photo ? formData.photo.name : 'Click to upload photo'}
                                            </p>
                                            <p className="text-xs text-gray-500">JPG, PNG (Max 2MB)</p>
                                        </div>
                                    </label>
                                </div>
                                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Set Password</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Re-enter password"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex items-start gap-3 mb-4">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="w-5 h-5 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-700">
                                I agree to the terms and conditions and confirm that all information provided is accurate *
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Submit Registration
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 mt-4 text-center">
                            Your registration will be reviewed and approved by the State/Central Officer
                        </p>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h3>
                        <p className="text-gray-600 mb-4">
                            Your registration has been submitted successfully. You will receive an email once your account is approved.
                        </p>
                        <p className="text-sm text-gray-500">
                            Redirecting to login page...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
