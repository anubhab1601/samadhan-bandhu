import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Save, Send, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, MapPin, Users, Droplet, Home, Zap, Wifi } from 'lucide-react';

export default function NewApplication() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 10;

    // Form Data State
    const [formData, setFormData] = useState({
        // Step 1: Village Basic Information
        state: '',
        stateLGD: '',
        district: '',
        districtLGD: '',
        block: '',
        blockLGD: '',
        gramPanchayat: '',
        gramPanchayatLGD: '',
        village: '',
        villageLGD: '',

        // Step 2: Population & GPS Data
        totalPopulation: '',
        scPopulation: '',
        totalHouseholds: '',
        surveyedHouseholds: '',
        surveyPeriodFrom: '',
        surveyPeriodTo: '',
        latitude: '',
        longitude: '',

        // Step 3: Village Committee (array of members)
        committeeMembers: [
            { name: '', designation: '', mobile: '', email: '', address: '', remarks: '' }
        ],

        // Step 4: Drinking Water & Sanitation
        drinkingWaterAvailable: '',
        drinkingWaterActionPlan1: '',
        drinkingWaterActionPlan2: '',
        householdsTotal: '',
        householdsWithWater: '',
        householdsWithoutWater: '',
        waterActionPlan1: '',
        waterActionPlan2: '',
        schoolsTotal: '',
        anganwadisTotal: '',
        schoolsWithToilets: '',
        anganwadisWithToilets: '',
        schoolsNeedToilets: '',
        anganwadisNeedToilets: '',
        schoolNamesToilets: '',
        anganwadiNamesToilets: '',
        toiletActionPlan1: '',
        toiletActionPlan2: '',

        // Step 5: Drains & Waste Management
        internalRoadsLength: '',
        drainsAvailable: '',
        drainsToConstruct: '',
        drainsActionPlan1: '',
        drainsActionPlan2: '',
        drainsFunctional: '',
        drainsToMakeFunctional: '',
        drainsMaintenanceActionPlan1: '',
        drainsMaintenanceActionPlan2: '',
        solidWasteGenerated: '',
        liquidWasteGenerated: '',
        solidWasteDisposed: '',
        liquidWasteDisposed: '',
        solidWasteCapacityNeeded: '',
        liquidWasteCapacityNeeded: '',
        wasteActionPlan1: '',
        wasteActionPlan2: '',

        // Step 6: Health & Nutrition
        ambulanceAvailable: '',
        ambulanceActionPlan1: '',
        ambulanceActionPlan2: '',
        anganwadisCount: '',
        anganwadisWithBuilding: '',
        anganwadisToConstruct: '',
        anganwadiLocations: '',
        anganwadiActionPlan1: '',
        anganwadiActionPlan2: '',

        // Step 7: Rural Roads
        allWeatherRoad: '',
        allWeatherRoadActionPlan: '',
        internalRoadsTotalLength: '',
        pakkaRoadsLength: '',
        pakkaRoadsToConstruct: '',
        roadsActionPlan1: '',
        roadsActionPlan2: '',

        // Step 8: Electricity
        villageElectrified: '',
        electrificationActionPlan1: '',
        electrificationActionPlan2: '',
        householdsForElectricity: '',
        householdsWithElectricity: '',
        householdsWithoutElectricity: '',
        electricityActionPlan1: '',
        electricityActionPlan2: '',
        internalRoadsForLights: '',
        roadsWithStreetLights: '',
        roadsWithoutStreetLights: '',
        streetLightsActionPlan: '',

        // Step 9: Digitization
        internetAvailable: '',
        internetActionPlan: '',
        cscAvailable: '',
        cscActionPlan1: '',
        cscActionPlan2: '',
        cscActionPlan3: ''
    });

    const steps = [
        { number: 1, title: 'Village Info', icon: Home },
        { number: 2, title: 'Population & GPS', icon: MapPin },
        { number: 3, title: 'Committee', icon: Users },
        { number: 4, title: 'Water & Sanitation', icon: Droplet },
        { number: 5, title: 'Drains & Waste', icon: Droplet },
        { number: 6, title: 'Health', icon: CheckCircle },
        { number: 7, title: 'Roads', icon: Home },
        { number: 8, title: 'Electricity', icon: Zap },
        { number: 9, title: 'Digitization', icon: Wifi },
        { number: 10, title: 'Review', icon: CheckCircle }
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
            committeeMembers: [...prev.committeeMembers, { name: '', designation: '', mobile: '', email: '', address: '', remarks: '' }]
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
        console.log('Form Data:', formData);
        alert('Application submitted successfully!');
        navigate('/sarpanch/applications');
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
            case 5:
                return renderStep5();
            case 6:
                return renderStep6();
            case 7:
                return renderStep7();
            case 8:
                return renderStep8();
            case 9:
                return renderStep9();
            case 10:
                return renderStep10();
            default:
                return null;
        }
    };

    // Step 1: Village Basic Information
    const renderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Village Level Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter State Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State LGD Code</label>
                    <input
                        type="text"
                        value={formData.stateLGD}
                        onChange={(e) => handleInputChange('stateLGD', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter LGD Code"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                    <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter District Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District LGD Code</label>
                    <input
                        type="text"
                        value={formData.districtLGD}
                        onChange={(e) => handleInputChange('districtLGD', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter LGD Code"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Block *</label>
                    <input
                        type="text"
                        value={formData.block}
                        onChange={(e) => handleInputChange('block', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter Block Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Block LGD Code</label>
                    <input
                        type="text"
                        value={formData.blockLGD}
                        onChange={(e) => handleInputChange('blockLGD', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter LGD Code"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gram Panchayat *</label>
                    <input
                        type="text"
                        value={formData.gramPanchayat}
                        onChange={(e) => handleInputChange('gramPanchayat', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter Gram Panchayat Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gram Panchayat LGD Code</label>
                    <input
                        type="text"
                        value={formData.gramPanchayatLGD}
                        onChange={(e) => handleInputChange('gramPanchayatLGD', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter LGD Code"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Village *</label>
                    <input
                        type="text"
                        value={formData.village}
                        onChange={(e) => handleInputChange('village', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter Village Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Village LGD Code</label>
                    <input
                        type="text"
                        value={formData.villageLGD}
                        onChange={(e) => handleInputChange('villageLGD', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter LGD Code"
                    />
                </div>
            </div>
        </div>
    );

    // Step 2: Population & GPS Data
    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Population & GPS Data</h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-4">Population Data (Census 2011)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Population *</label>
                        <input
                            type="number"
                            value={formData.totalPopulation}
                            onChange={(e) => handleInputChange('totalPopulation', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter total population"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SC Population *</label>
                        <input
                            type="number"
                            value={formData.scPopulation}
                            onChange={(e) => handleInputChange('scPopulation', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter SC population"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Households *</label>
                        <input
                            type="number"
                            value={formData.totalHouseholds}
                            onChange={(e) => handleInputChange('totalHouseholds', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter total households"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-4">Survey Data</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Households Surveyed</label>
                        <input
                            type="number"
                            value={formData.surveyedHouseholds}
                            onChange={(e) => handleInputChange('surveyedHouseholds', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            placeholder="Number of households surveyed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Survey Period From</label>
                        <input
                            type="date"
                            value={formData.surveyPeriodFrom}
                            onChange={(e) => handleInputChange('surveyPeriodFrom', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Survey Period To</label>
                        <input
                            type="date"
                            value={formData.surveyPeriodTo}
                            onChange={(e) => handleInputChange('surveyPeriodTo', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
                    <MapPin size={20} />
                    GPS Coordinates of Village
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Latitude *</label>
                        <input
                            type="text"
                            value={formData.latitude}
                            onChange={(e) => handleInputChange('latitude', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            placeholder="e.g., 19.0760"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Longitude *</label>
                        <input
                            type="text"
                            value={formData.longitude}
                            onChange={(e) => handleInputChange('longitude', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            placeholder="e.g., 72.8777"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // Step 3: Village Committee
    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Village PMAGY Convergence Committee</h3>
                <button
                    onClick={addCommitteeMember}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
                >
                    + Add Member
                </button>
            </div>

            <div className="space-y-4">
                {formData.committeeMembers.map((member, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900">Member {index + 1}</h4>
                            {formData.committeeMembers.length > 1 && (
                                <button
                                    onClick={() => removeCommitteeMember(index)}
                                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                                <input
                                    type="text"
                                    value={member.designation}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'designation', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="Designation"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                <input
                                    type="tel"
                                    value={member.mobile}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'mobile', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="10-digit mobile number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={member.email}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    value={member.address}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'address', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="Address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                                <input
                                    type="text"
                                    value={member.remarks}
                                    onChange={(e) => handleCommitteeMemberChange(index, 'remarks', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="Any remarks"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Step 4: Water & Sanitation
    const renderStep4 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Domain 1: Drinking Water and Sanitation</h3>

            {/* 1.1 Drinking Water Sources */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-4">1.1 Adequate Sustainable Drinking Water Sources</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Are adequate sustainable drinking water sources available?
                        </label>
                        <select
                            value={formData.drinkingWaterAvailable}
                            onChange={(e) => handleInputChange('drinkingWaterAvailable', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Action Plan - Item 1</label>
                        <textarea
                            value={formData.drinkingWaterActionPlan1}
                            onChange={(e) => handleInputChange('drinkingWaterActionPlan1', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="2"
                            placeholder="Details of work/initiative"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Action Plan - Item 2</label>
                        <textarea
                            value={formData.drinkingWaterActionPlan2}
                            onChange={(e) => handleInputChange('drinkingWaterActionPlan2', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="2"
                            placeholder="Details of work/initiative"
                        />
                    </div>
                </div>
            </div>

            {/* 1.2 Clean Drinking Water to Households */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-4">1.2 Households with Clean Drinking Water</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Households</label>
                        <input
                            type="number"
                            value={formData.householdsTotal}
                            onChange={(e) => handleInputChange('householdsTotal', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">With Clean Water</label>
                        <input
                            type="number"
                            value={formData.householdsWithWater}
                            onChange={(e) => handleInputChange('householdsWithWater', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Without Clean Water</label>
                        <input
                            type="number"
                            value={formData.householdsWithoutWater}
                            onChange={(e) => handleInputChange('householdsWithoutWater', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Action Plan - Item 1</label>
                        <textarea
                            value={formData.waterActionPlan1}
                            onChange={(e) => handleInputChange('waterActionPlan1', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Action Plan - Item 2</label>
                        <textarea
                            value={formData.waterActionPlan2}
                            onChange={(e) => handleInputChange('waterActionPlan2', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="2"
                        />
                    </div>
                </div>
            </div>

            {/* 1.4 Toilets in Schools & Anganwadis */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-4">1.4 Toilets in Schools & Anganwadis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Schools</label>
                        <input
                            type="number"
                            value={formData.schoolsTotal}
                            onChange={(e) => handleInputChange('schoolsTotal', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Anganwadis</label>
                        <input
                            type="number"
                            value={formData.anganwadisTotal}
                            onChange={(e) => handleInputChange('anganwadisTotal', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Schools with Toilets</label>
                        <input
                            type="number"
                            value={formData.schoolsWithToilets}
                            onChange={(e) => handleInputChange('schoolsWithToilets', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Anganwadis with Toilets</label>
                        <input
                            type="number"
                            value={formData.anganwadisWithToilets}
                            onChange={(e) => handleInputChange('anganwadisWithToilets', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Schools Need Toilets</label>
                        <input
                            type="number"
                            value={formData.schoolsNeedToilets}
                            onChange={(e) => handleInputChange('schoolsNeedToilets', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Anganwadis Need Toilets</label>
                        <input
                            type="number"
                            value={formData.anganwadisNeedToilets}
                            onChange={(e) => handleInputChange('anganwadisNeedToilets', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">School Names (where toilets needed)</label>
                        <textarea
                            value={formData.schoolNamesToilets}
                            onChange={(e) => handleInputChange('schoolNamesToilets', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="2"
                            placeholder="Comma-separated school names"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Anganwadi Names (where toilets needed)</label>
                        <textarea
                            value={formData.anganwadiNamesToilets}
                            onChange={(e) => handleInputChange('anganwadiNamesToilets', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="2"
                            placeholder="Comma-separated anganwadi names"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Action Plan - Item 1</label>
                        <textarea
                            value={formData.toiletActionPlan1}
                            onChange={(e) => handleInputChange('toiletActionPlan1', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Action Plan - Item 2</label>
                        <textarea
                            value={formData.toiletActionPlan2}
                            onChange={(e) => handleInputChange('toiletActionPlan2', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );


    // Step 5: Drains & Waste Management
    const renderStep5 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Domain 1: Drains & Waste Management</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-4">1.6 Drains Along Internal Roads</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Internal Roads Length (mts)</label>
                        <input type="number" value={formData.internalRoadsLength} onChange={(e) => handleInputChange('internalRoadsLength', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Drains Available (mts)</label>
                        <input type="number" value={formData.drainsAvailable} onChange={(e) => handleInputChange('drainsAvailable', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Drains to Construct (mts)</label>
                        <input type="number" value={formData.drainsToConstruct} onChange={(e) => handleInputChange('drainsToConstruct', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                    </div>
                </div>
            </div>
        </div>
    );

    // Step 6: Health
    const renderStep6 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Domain 3: Health and Nutrition</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-4">3.2 Emergency Ambulance Facility</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is emergency Ambulance facility available on call?</label>
                    <select value={formData.ambulanceAvailable} onChange={(e) => handleInputChange('ambulanceAvailable', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
        </div>
    );

    // Step 7: Roads
    const renderStep7 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Domain 5: Rural Roads</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-4">5.1 All-Weather Road</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is the village connected by all-weather road?</label>
                    <select value={formData.allWeatherRoad} onChange={(e) => handleInputChange('allWeatherRoad', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
        </div>
    );

    // Step 8: Electricity
    const renderStep8 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Domain 6: Electricity</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-4">6.1 Village Electrification</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Has the village been electrified?</label>
                    <select value={formData.villageElectrified} onChange={(e) => handleInputChange('villageElectrified', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
        </div>
    );

    // Step 9: Digitization
    const renderStep9 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Domain 9: Digitization</h3>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-900 mb-4">9.1 Internet Connectivity</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Does the village have access to Internet connectivity?</label>
                    <select value={formData.internetAvailable} onChange={(e) => handleInputChange('internetAvailable', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
        </div>
    );

    // Step 10: Review
    const renderStep10 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Review Your Application</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                    <div>
                        <h4 className="text-lg font-semibold text-green-900">Application Ready for Submission</h4>
                        <p className="text-sm text-green-700">Please review all information before submitting</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-6">
                    <div className="bg-white p-3 rounded">
                        <p className="text-gray-600">Village</p>
                        <p className="font-semibold text-gray-900">{formData.village || 'Not provided'}</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                        <p className="text-gray-600">District</p>
                        <p className="font-semibold text-gray-900">{formData.district || 'Not provided'}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white mb-8">
                    <button
                        onClick={() => navigate('/sarpanch/dashboard')}
                        className="flex items-center gap-2 text-white hover:text-orange-100 mb-4"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FileText size={32} />
                        New Application - PM-AJAY
                    </h1>
                    <p className="text-orange-100 mt-2">Need Assessment Form - Village Level Data & Infrastructure Development</p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center justify-between overflow-x-auto">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.number;
                            const isCompleted = currentStep > step.number;

                            return (
                                <div key={step.number} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive ? 'bg-orange-600 text-white' :
                                            isCompleted ? 'bg-green-600 text-white' :
                                                'bg-gray-200 text-gray-600'
                                            }`}>
                                            {isCompleted ? <CheckCircle size={24} /> : <Icon size={24} />}
                                        </div>
                                        <span className={`text-xs mt-2 text-center ${isActive ? 'font-bold text-orange-600' : 'text-gray-600'}`}>
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`h-1 w-12 mx-2 ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold ${currentStep === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-600 text-white hover:bg-gray-700'
                            }`}
                    >
                        <ArrowLeft size={20} />
                        Previous
                    </button>

                    {currentStep < totalSteps ? (
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
                        >
                            Next
                            <ArrowRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                        >
                            <Send size={20} />
                            Submit Application
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
