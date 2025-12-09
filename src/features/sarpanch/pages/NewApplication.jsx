import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, ArrowRight, CheckCircle, Home, MapPin, Users, Droplet, Heart, Zap, Wifi, Plus, Trash2 } from 'lucide-react';

export default function NewApplication() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 7;
    const [fetchingLocation, setFetchingLocation] = useState(false);

    // Simplified Form Data - Only Essential Fields
    const [formData, setFormData] = useState({
        // Basic Info
        state: '',
        district: '',
        block: '',
        gramPanchayat: '',
        village: '',

        // Population
        population: '',
        households: '',
        latitude: '',
        longitude: '',

        // Committee
        committeeMembers: [
            { name: '', designation: '', mobile: '', email: '' }
        ],

        // Water & Sanitation
        waterSourcesAvailable: '',
        householdsWithWater: '',
        householdsWithToilets: '',

        // Infrastructure
        allWeatherRoad: '',
        villageElectrified: '',
        internetAvailable: '',

        // Development Plan
        priorityNeeds: '',
        proposedProjects: '',
        estimatedBudget: ''
    });

    const steps = [
        { number: 1, title: 'Village Info', icon: Home },
        { number: 2, title: 'Location', icon: MapPin },
        { number: 3, title: 'Committee', icon: Users },
        { number: 4, title: 'Water & Sanitation', icon: Droplet },
        { number: 5, title: 'Infrastructure', icon: Zap },
        { number: 6, title: 'Development Plan', icon: FileText },
        { number: 7, title: 'Review', icon: CheckCircle }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCommitteeMemberChange = (index, field, value) => {
        const updatedMembers = [...formData.committeeMembers];
        updatedMembers[index][field] = value;
        setFormData(prev => ({ ...prev, committeeMembers: updatedMembers }));
    };

    const addCommitteeMember = () => {
        setFormData(prev => ({
            ...prev,
            committeeMembers: [...prev.committeeMembers, { name: '', designation: '', mobile: '', email: '' }]
        }));
    };

    const removeCommitteeMember = (index) => {
        const updatedMembers = formData.committeeMembers.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, committeeMembers: updatedMembers }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = () => {
        console.log('Application Data:', formData);
        alert('Application submitted successfully!');
        navigate('/sarpanch/applications');
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(6);
                const lng = position.coords.longitude.toFixed(6);
                setFormData(prev => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng
                }));
                setFetchingLocation(false);
                alert('Location captured successfully!');
            },
            (error) => {
                setFetchingLocation(false);
                let errorMessage = 'Unable to retrieve your location';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access in your browser.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }
                alert(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            case 5: return renderStep5();
            case 6: return renderStep6();
            case 7: return renderStep7();
            default: return null;
        }
    };

    // STEP 1: Village Basic Information
    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Home className="text-orange-600" size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Village Information</h3>
                    <p className="text-gray-600">Enter basic details about your village</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter State"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                        <input
                            type="text"
                            value={formData.district}
                            onChange={(e) => handleInputChange('district', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter District"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Block *</label>
                        <input
                            type="text"
                            value={formData.block}
                            onChange={(e) => handleInputChange('block', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter Block"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gram Panchayat *</label>
                        <input
                            type="text"
                            value={formData.gramPanchayat}
                            onChange={(e) => handleInputChange('gramPanchayat', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter Gram Panchayat"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Village Name *</label>
                        <input
                            type="text"
                            value={formData.village}
                            onChange={(e) => handleInputChange('village', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter Village Name"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // STEP 2: Population & Location
    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Population & Location</h3>
                    <p className="text-gray-600">Population data and GPS coordinates</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Population Data</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Population *</label>
                        <input
                            type="number"
                            value={formData.population}
                            onChange={(e) => handleInputChange('population', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Total Population"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Households *</label>
                        <input
                            type="number"
                            value={formData.households}
                            onChange={(e) => handleInputChange('households', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Total Households"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                        <MapPin size={20} />
                        GPS Coordinates
                    </h4>
                    <button
                        onClick={getCurrentLocation}
                        disabled={fetchingLocation}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${fetchingLocation
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                    >
                        {fetchingLocation ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Fetching...
                            </>
                        ) : (
                            <>
                                <MapPin size={18} />
                                Get Current Location
                            </>
                        )}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Latitude *</label>
                        <input
                            type="text"
                            value={formData.latitude}
                            onChange={(e) => handleInputChange('latitude', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g., 19.0760"
                            readOnly={fetchingLocation}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Longitude *</label>
                        <input
                            type="text"
                            value={formData.longitude}
                            onChange={(e) => handleInputChange('longitude', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g., 72.8777"
                            readOnly={fetchingLocation}
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                    Click "Get Current Location" to automatically fetch your GPS coordinates, or enter them manually.
                </p>
            </div>
        </div>
    );

    // STEP 3: Committee Members
    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="text-green-600" size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Village Committee</h3>
                        <p className="text-gray-600">Add key committee members</p>
                    </div>
                </div>
                <button
                    onClick={addCommitteeMember}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                    <Plus size={20} />
                    Add Member
                </button>
            </div>

            <div className="space-y-4">
                {formData.committeeMembers.map((member, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-green-900">Member {index + 1}</h4>
                            {formData.committeeMembers.length > 1 && (
                                <button
                                    onClick={() => removeCommitteeMember(index)}
                                    className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                    Remove
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'name', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                                <input
                                    type="text"
                                    value={member.designation}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'designation', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Designation"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                <input
                                    type="tel"
                                    value={member.mobile}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'mobile', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="10-digit mobile"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={member.email}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // STEP 4: Water & Sanitation
    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Droplet className="text-blue-600" size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Water & Sanitation</h3>
                    <p className="text-gray-600">Basic amenities status</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Are adequate drinking water sources available?
                        </label>
                        <select
                            value={formData.waterSourcesAvailable}
                            onChange={(e) => handleInputChange('waterSourcesAvailable', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Partial">Partial</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Households with Clean Water Access
                        </label>
                        <input
                            type="number"
                            value={formData.householdsWithWater}
                            onChange={(e) => handleInputChange('householdsWithWater', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Number of households"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Households with Toilets
                        </label>
                        <input
                            type="number"
                            value={formData.householdsWithToilets}
                            onChange={(e) => handleInputChange('householdsWithToilets', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Number of households"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // STEP 5: Infrastructure
    const renderStep5 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Zap className="text-yellow-600" size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Infrastructure Status</h3>
                    <p className="text-gray-600">Roads, electricity, and connectivity</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg p-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Is the village connected by all-weather road?
                        </label>
                        <select
                            value={formData.allWeatherRoad}
                            onChange={(e) => handleInputChange('allWeatherRoad', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Is the village electrified?
                        </label>
                        <select
                            value={formData.villageElectrified}
                            onChange={(e) => handleInputChange('villageElectrified', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Partial">Partial</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Does the village have Internet connectivity?
                        </label>
                        <select
                            value={formData.internetAvailable}
                            onChange={(e) => handleInputChange('internetAvailable', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Limited">Limited</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    // STEP 6: Development Plan
    const renderStep6 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <FileText className="text-indigo-600" size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Development Plan</h3>
                    <p className="text-gray-600">Priority needs and proposed projects</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 rounded-lg p-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Priority Needs *
                        </label>
                        <textarea
                            value={formData.priorityNeeds}
                            onChange={(e) => handleInputChange('priorityNeeds', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows="4"
                            placeholder="List the most urgent needs of your village (e.g., water supply, roads, drainage, etc.)"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Proposed Projects *
                        </label>
                        <textarea
                            value={formData.proposedProjects}
                            onChange={(e) => handleInputChange('proposedProjects', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows="4"
                            placeholder="Describe the projects you want to undertake"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Budget (in Lakhs) *
                        </label>
                        <input
                            type="number"
                            value={formData.estimatedBudget}
                            onChange={(e) => handleInputChange('estimatedBudget', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Estimated budget in lakhs"
                            min="1"
                            max="1000"
                            step="0.01"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter budget between ₹1 Lakh to ₹1000 Lakhs (1-1000)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    // STEP 7: Review
    const renderStep7 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Review Your Application</h3>
                    <p className="text-gray-600">Please review all information before submitting</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-1">Village</p>
                        <p className="font-semibold text-xl text-gray-900">{formData.village || 'Not provided'}</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-1">District</p>
                        <p className="font-semibold text-xl text-gray-900">{formData.district || 'Not provided'}</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-1">Population</p>
                        <p className="font-semibold text-xl text-gray-900">{formData.population || 'Not provided'}</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-1">Households</p>
                        <p className="font-semibold text-xl text-gray-900">{formData.households || 'Not provided'}</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-1">Committee Members</p>
                        <p className="font-semibold text-xl text-gray-900">{formData.committeeMembers.length}</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-1">Estimated Budget</p>
                        <p className="font-semibold text-xl text-gray-900">₹{formData.estimatedBudget || '0'} L</p>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Once submitted, this application will be sent for review.
                        You can track its status from the "My Applications" page.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white mb-8">
                    <button
                        onClick={() => navigate('/sarpanch/dashboard')}
                        className="flex items-center gap-2 text-white hover:text-orange-100 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <FileText size={36} />
                        New Application - PM-AJAY
                    </h1>
                    <p className="text-orange-100 mt-2">Village Development Application Form</p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8 overflow-x-auto">
                    <div className="flex items-center justify-between min-w-max">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.number;
                            const isCompleted = currentStep > step.number;

                            return (
                                <div key={step.number} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-orange-600 text-white shadow-lg scale-110' :
                                            isCompleted ? 'bg-green-600 text-white' :
                                                'bg-gray-200 text-gray-600'
                                            }`}>
                                            {isCompleted ? <CheckCircle size={28} /> : <Icon size={28} />}
                                        </div>
                                        <span className={`text-xs mt-2 text-center whitespace-nowrap font-medium ${isActive ? 'text-orange-600 font-bold' : 'text-gray-600'
                                            }`}>
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`h-1 w-16 mx-2 rounded transition-all ${isCompleted ? 'bg-green-600' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-600 text-white hover:bg-gray-700 shadow-md hover:shadow-lg'
                            }`}
                    >
                        <ArrowLeft size={20} />
                        Previous
                    </button>

                    {currentStep < totalSteps ? (
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                            Next
                            <ArrowRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                            <CheckCircle size={20} />
                            Submit Application
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
