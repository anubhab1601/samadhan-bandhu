import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, Upload, MapPin, Users, DollarSign, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function CreateProject() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Basic Details
        title: '',
        description: '',
        category: '',
        priority: 'Medium',

        // Location Details
        state: '',
        district: '',
        block: '',
        village: '',
        pincode: '',
        latitude: '',
        longitude: '',

        // Budget Details
        totalBudget: '',
        centralShare: '',
        stateShare: '',
        beneficiaryContribution: '',

        // Beneficiary Details
        totalBeneficiaries: '',
        scBeneficiaries: '',
        stBeneficiaries: '',
        obcBeneficiaries: '',
        generalBeneficiaries: '',

        // Timeline
        startDate: '',
        endDate: '',
        duration: '',

        // Implementation
        implementingAgency: '',
        agencyType: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',

        // Additional Details
        objectives: '',
        expectedOutcomes: '',
        sustainability: '',
        remarks: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/projects', formData);
            alert('Project created successfully!');
            navigate('/projects');
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { number: 1, title: 'Basic Details', icon: FileText },
        { number: 2, title: 'Location', icon: MapPin },
        { number: 3, title: 'Budget', icon: DollarSign },
        { number: 4, title: 'Beneficiaries', icon: Users },
        { number: 5, title: 'Review', icon: CheckCircle },
    ];

    const categories = [
        'Infrastructure Development',
        'Education & Skill Development',
        'Healthcare Services',
        'Water Supply & Sanitation',
        'Rural Road Construction',
        'Community Hall',
        'Livelihood Generation',
        'Women Empowerment',
        'Other'
    ];

    const states = [
        'Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra',
        'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
                    <p className="text-sm text-gray-600 mt-1">Submit a new PM-AJAY project proposal</p>
                </div>
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    <ArrowLeft size={18} />
                    Back to Projects
                </button>
            </div>

            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= step.number
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    } transition-colors`}>
                                    <step.icon size={24} />
                                </div>
                                <span className={`mt-2 text-xs font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                                    } transition-colors`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Step 1: Basic Details */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-4 border-b">
                            <FileText size={20} />
                            Basic Project Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter project title"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Provide detailed description of the project"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority Level
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Location Details */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-4 border-b">
                            <MapPin size={20} />
                            Location Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    District <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter district name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Block/Taluka
                                </label>
                                <input
                                    type="text"
                                    name="block"
                                    value={formData.block}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter block/taluka"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Village/Town
                                </label>
                                <input
                                    type="text"
                                    name="village"
                                    value={formData.village}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter village/town"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    PIN Code
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    maxLength={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter PIN code"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    GPS Coordinates (Optional)
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Latitude"
                                    />
                                    <input
                                        type="text"
                                        name="longitude"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Longitude"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Budget Details */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-4 border-b">
                            <DollarSign size={20} />
                            Budget & Financial Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Project Budget (₹) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="totalBudget"
                                    value={formData.totalBudget}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter total budget"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Central Government Share (₹)
                                </label>
                                <input
                                    type="number"
                                    name="centralShare"
                                    value={formData.centralShare}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Central share"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State Government Share (₹)
                                </label>
                                <input
                                    type="number"
                                    name="stateShare"
                                    value={formData.stateShare}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="State share"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Beneficiary Contribution (₹)
                                </label>
                                <input
                                    type="number"
                                    name="beneficiaryContribution"
                                    value={formData.beneficiaryContribution}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Beneficiary contribution"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expected End Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Beneficiary Details */}
                {currentStep === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-4 border-b">
                            <Users size={20} />
                            Beneficiary Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Beneficiaries <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="totalBeneficiaries"
                                    value={formData.totalBeneficiaries}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Total number of beneficiaries"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    SC Beneficiaries
                                </label>
                                <input
                                    type="number"
                                    name="scBeneficiaries"
                                    value={formData.scBeneficiaries}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Scheduled Caste"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ST Beneficiaries
                                </label>
                                <input
                                    type="number"
                                    name="stBeneficiaries"
                                    value={formData.stBeneficiaries}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Scheduled Tribe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    OBC Beneficiaries
                                </label>
                                <input
                                    type="number"
                                    name="obcBeneficiaries"
                                    value={formData.obcBeneficiaries}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Other Backward Classes"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Implementing Agency <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="implementingAgency"
                                    value={formData.implementingAgency}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Name of implementing agency"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Contact person name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Objectives
                                </label>
                                <textarea
                                    name="objectives"
                                    value={formData.objectives}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Key objectives of the project"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-4 border-b">
                            <CheckCircle size={20} />
                            Review & Submit
                        </h2>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                            <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-800">
                                <p className="font-semibold mb-1">Please review all details carefully</p>
                                <p>Once submitted, the project will be sent for approval. You can go back to edit any section if needed.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Basic Details</h3>
                                <dl className="space-y-2 text-sm">
                                    <div><dt className="text-gray-600">Title:</dt><dd className="font-medium">{formData.title || '-'}</dd></div>
                                    <div><dt className="text-gray-600">Category:</dt><dd className="font-medium">{formData.category || '-'}</dd></div>
                                    <div><dt className="text-gray-600">Priority:</dt><dd className="font-medium">{formData.priority}</dd></div>
                                </dl>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Location</h3>
                                <dl className="space-y-2 text-sm">
                                    <div><dt className="text-gray-600">State:</dt><dd className="font-medium">{formData.state || '-'}</dd></div>
                                    <div><dt className="text-gray-600">District:</dt><dd className="font-medium">{formData.district || '-'}</dd></div>
                                    <div><dt className="text-gray-600">Village:</dt><dd className="font-medium">{formData.village || '-'}</dd></div>
                                </dl>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Budget</h3>
                                <dl className="space-y-2 text-sm">
                                    <div><dt className="text-gray-600">Total Budget:</dt><dd className="font-medium">₹{formData.totalBudget || '0'}</dd></div>
                                    <div><dt className="text-gray-600">Start Date:</dt><dd className="font-medium">{formData.startDate || '-'}</dd></div>
                                    <div><dt className="text-gray-600">End Date:</dt><dd className="font-medium">{formData.endDate || '-'}</dd></div>
                                </dl>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Beneficiaries</h3>
                                <dl className="space-y-2 text-sm">
                                    <div><dt className="text-gray-600">Total:</dt><dd className="font-medium">{formData.totalBeneficiaries || '0'}</dd></div>
                                    <div><dt className="text-gray-600">Agency:</dt><dd className="font-medium">{formData.implementingAgency || '-'}</dd></div>
                                    <div><dt className="text-gray-600">Contact:</dt><dd className="font-medium">{formData.contactEmail || '-'}</dd></div>
                                </dl>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft size={18} />
                        Previous
                    </button>

                    <div className="text-sm text-gray-600">
                        Step {currentStep} of {steps.length}
                    </div>

                    {currentStep < steps.length ? (
                        <button
                            type="button"
                            onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Next
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : (
                                <>
                                    <Save size={18} />
                                    Submit Project
                                </>
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
