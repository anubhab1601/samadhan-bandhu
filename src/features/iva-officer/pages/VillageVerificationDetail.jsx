import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Calendar, Camera, Upload, CheckCircle, X } from 'lucide-react';

export default function VillageVerificationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        demographicConfirmed: false,
        infrastructureConfirmed: false,
        workNeededConfirmed: false,
        visitDate: '',
        visitPhotos: [],
        decision: '',
        remarks: '',
        scores: {} // For 100-point scoring system
    });

    const [showSuccess, setShowSuccess] = useState(false);

    // Mock application data
    const application = {
        id: id || 'APP-2025-001',
        village: 'Shirdi',
        sarpanch: 'Ramesh Patil',
        district: 'Ahmednagar',
        state: 'Maharashtra',
        population: 2000,
        scPopulation: 900,
        existingInfrastructure: 'Community Hall, Primary School, Health Center',
        proposedWork: 'Construction of new water supply system and road development',
        submittedDate: '2025-11-20',
        applicationPhotos: [
            { id: 1, caption: 'Village overview', gps: '19.7645° N, 74.9914° E' },
            { id: 2, caption: 'Existing infrastructure', gps: '19.7645° N, 74.9914° E' },
            { id: 3, caption: 'Proposed work area', gps: '19.7645° N, 74.9914° E' }
        ]
    };

    const scPercentage = ((application.scPopulation / application.population) * 100).toFixed(1);
    const isPopulationEligible = application.population >= 500;
    const isScEligible = parseFloat(scPercentage) >= 40;

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

    // Score Row Component
    const ScoreRow = ({ id, label, options, formData, setFormData }) => (
        <div className="flex items-center justify-between gap-4 p-3 bg-white rounded border border-gray-200">
            <label className="text-sm text-gray-700 flex-1">{label}</label>
            <select
                value={formData.scores?.[id] || ''}
                onChange={(e) => setFormData({
                    ...formData,
                    scores: { ...formData.scores, [id]: e.target.value }
                })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt.s}>{opt.l} ({opt.s})</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate('/iva-officer/verifications')}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Verifications
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Village Eligibility Verification</h1>
                        <p className="text-gray-600">Application ID: {application.id}</p>
                        <p className="text-gray-600">Village: {application.village}, {application.district}</p>
                    </div>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                        Village Eligibility
                    </span>
                </div>
            </div>

            {/* Sarpanch Application Details */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sarpanch Application Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Sarpanch Name</p>
                        <p className="font-semibold text-gray-900">{application.sarpanch}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Village</p>
                        <p className="font-semibold text-gray-900">{application.village}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">District, State</p>
                        <p className="font-semibold text-gray-900">{application.district}, {application.state}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-lg border ${isPopulationEligible ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-sm text-gray-600 mb-1">Total Population</p>
                        <div className="flex items-end gap-2">
                            <p className={`text-2xl font-bold ${isPopulationEligible ? 'text-blue-600' : 'text-red-600'}`}>
                                {application.population.toLocaleString()}
                            </p>
                            <span className={`text-xs font-medium mb-1 ${isPopulationEligible ? 'text-green-600' : 'text-red-600'}`}>
                                {isPopulationEligible ? '✓ Eligible (≥500)' : '✗ Low Population (<500)'}
                            </span>
                        </div>
                    </div>
                    <div className={`p-4 rounded-lg border ${isScEligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-sm text-gray-600 mb-1">SC Population</p>
                        <div className="flex items-end gap-2">
                            <p className={`text-2xl font-bold ${isScEligible ? 'text-green-600' : 'text-red-600'}`}>
                                {application.scPopulation.toLocaleString()}
                            </p>
                            <span className="text-sm font-medium mb-1 text-gray-500">({scPercentage}%)</span>
                        </div>
                        <p className={`text-xs font-medium mt-1 ${isScEligible ? 'text-green-600' : 'text-red-600'}`}>
                            {isScEligible ? '✓ Eligible (≥40%)' : '✗ Low SC % (<40%)'}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Existing Infrastructure</h3>
                        <p className="text-gray-700">{application.existingInfrastructure}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Proposed Work</h3>
                        <p className="text-gray-700">{application.proposedWork}</p>
                    </div>
                </div>

                {/* Application Photos */}
                <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Application Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {application.applicationPhotos.map((photo) => (
                            <div key={photo.id} className="relative group">
                                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Camera className="text-gray-400" size={48} />
                                </div>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded flex items-center gap-1">
                                    <MapPin size={10} />
                                    GPS: {photo.gps}
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{photo.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* IVA Verification Checklist */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">IVA Verification Checklist</h2>

                <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="demographic"
                            checked={formData.demographicConfirmed}
                            onChange={(e) => setFormData({ ...formData, demographicConfirmed: e.target.checked })}
                            className="w-5 h-5 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            required
                        />
                        <label htmlFor="demographic" className="flex-1">
                            <p className="font-semibold text-gray-900">Confirm Demographic Details</p>
                            <p className="text-sm text-gray-600">Verify population, SC data is accurate</p>
                        </label>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="infrastructure"
                            checked={formData.infrastructureConfirmed}
                            onChange={(e) => setFormData({ ...formData, infrastructureConfirmed: e.target.checked })}
                            className="w-5 h-5 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            required
                        />
                        <label htmlFor="infrastructure" className="flex-1">
                            <p className="font-semibold text-gray-900">Confirm Existing Infrastructure</p>
                            <p className="text-sm text-gray-600">Verify existing infrastructure details are correct</p>
                        </label>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="workNeeded"
                            checked={formData.workNeededConfirmed}
                            onChange={(e) => setFormData({ ...formData, workNeededConfirmed: e.target.checked })}
                            className="w-5 h-5 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            required
                        />
                        <label htmlFor="workNeeded" className="flex-1">
                            <p className="font-semibold text-gray-900">Confirm Proposed Work is Genuinely Needed</p>
                            <p className="text-sm text-gray-600">Verify the proposed work is necessary and beneficial</p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Visit Photos Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Visit Photos (Geo-tagged) *
                    </label>
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

                {/* 100-Point Scoring System */}
                <div className="mb-6 border-t-4 border-blue-600 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Village Eligibility Scoring (100 Points)</h3>
                        <div className="px-4 py-2 bg-blue-100 rounded-lg">
                            <span className="text-sm text-gray-600">Total Score: </span>
                            <span className="text-2xl font-bold text-blue-600">
                                {Object.values(formData.scores || {}).reduce((sum, score) => sum + (parseInt(score) || 0), 0)}/100
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Score each indicator based on field verification. Score must be less than 70 for eligibility.</p>

                    <div className="space-y-3">
                        {/* Domain 1 */}
                        <details className="bg-blue-50 border border-blue-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-blue-900 hover:bg-blue-100">Domain 1: Water & Sanitation (16 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-blue-200">
                                <ScoreRow id="d1_1" label="1.1 Adequate water sources?" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d1_2" label="1.2 % households with clean water" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d1_3" label="1.3 % households with toilets" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d1_4" label="1.4 Toilets in schools/Anganwadis?" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d1_5" label="1.5 Open defecation?" options={[{ l: 'Yes', s: 0 }, { l: 'No', s: 2 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d1_6" label="1.6 % drains on roads" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d1_7" label="1.7 % drains functioning" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d1_8" label="1.8 % waste disposed" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 2 */}
                        <details className="bg-green-50 border border-green-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-green-900 hover:bg-green-100">Domain 2: Education (14 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-green-200">
                                <ScoreRow id="d2_1" label="2.1 % children (6-10) in primary" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d2_2" label="2.2 % children (11-13) in middle" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d2_3" label="2.3 % children (14-15) in secondary" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d2_4" label="2.4 % children (16-17) in higher sec" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d2_5" label="2.5 % youth (18-23) in college" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d2_6" label="2.6 % SC pre-matric scholarship" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d2_7" label="2.7 % SC post-matric scholarship" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 3 */}
                        <details className="bg-red-50 border border-red-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-red-900 hover:bg-red-100">Domain 3: Health & Nutrition (22 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-red-200">
                                <ScoreRow id="d3_1" label="3.1 % Health Protection Scheme" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_2" label="3.2 Emergency ambulance?" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_3" label="3.3 % anemic pregnant women" options={[{ l: '0%', s: 2 }, { l: '>0%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_4" label="3.4 % institutional deliveries" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_5" label="3.5 % low-birth-weight" options={[{ l: '0%', s: 2 }, { l: '>0%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_6" label="3.6 % full immunization" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_7" label="3.7 % underweight children" options={[{ l: '0%', s: 2 }, { l: '>0%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_8" label="3.8 Maternal deaths" options={[{ l: 'Nil', s: 2 }, { l: '>0', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_9" label="3.9 Infant deaths" options={[{ l: 'Nil', s: 2 }, { l: '>0', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_10" label="3.10 % disease treatment" options={[{ l: '100%', s: 2 }, { l: '<100%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d3_11" label="3.11 All Anganwadis built?" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 4 */}
                        <details className="bg-purple-50 border border-purple-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-purple-900 hover:bg-purple-100">Domain 4: Social Security (6 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-purple-200">
                                <ScoreRow id="d4_1" label="4.1 % Widow Pension" options={[{ l: '100%', s: 2 }, { l: '0%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d4_2" label="4.2 % Old Age Pension" options={[{ l: '100%', s: 2 }, { l: '0%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d4_3" label="4.3 % Disability Pension" options={[{ l: '100%', s: 2 }, { l: '0%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 5 */}
                        <details className="bg-yellow-50 border border-yellow-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-yellow-900 hover:bg-yellow-100">Domain 5: Roads & Housing (6 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-yellow-200">
                                <ScoreRow id="d5_1" label="5.1 All-weather roads?" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d5_2" label="5.2 % paved internal roads" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d5_3" label="5.3 % unsafe houses" options={[{ l: '100%', s: 2 }, { l: '0%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 6 */}
                        <details className="bg-orange-50 border border-orange-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-orange-900 hover:bg-orange-100">Domain 6: Electricity (10 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-orange-200">
                                <ScoreRow id="d6_1" label="6.1 Village electrified?" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d6_2" label="6.2 % households with electricity" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d6_3" label="6.3 % LED bulb usage" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d6_4" label="6.4 % gas connection" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d6_5" label="6.5 % street lights" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 7 */}
                        <details className="bg-lime-50 border border-lime-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-lime-900 hover:bg-lime-100">Domain 7: Agriculture (6 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-lime-200">
                                <ScoreRow id="d7_1" label="7.1 % Soil Health Card" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d7_2" label="7.2 % organic farming" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d7_3" label="7.3 % watershed management" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 8 */}
                        <details className="bg-indigo-50 border border-indigo-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-indigo-900 hover:bg-indigo-100">Domain 8: Financial Inclusion (8 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-indigo-200">
                                <ScoreRow id="d8_1" label="8.1 % Aadhaar coverage" options={[{ l: '>98%', s: 2 }, { l: '0-98%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d8_2" label="8.2 % bank accounts" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d8_3" label="8.3 % PM Suraksha Bima" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d8_4" label="8.4 % PM Jeevan Jyoti Bima" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 9 */}
                        <details className="bg-cyan-50 border border-cyan-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-cyan-900 hover:bg-cyan-100">Domain 9: Digitization (6 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-cyan-200">
                                <ScoreRow id="d9_1" label="9.1 Internet connectivity?" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d9_2" label="9.2 CSC/Cyber Café?" options={[{ l: 'Yes', s: 2 }, { l: 'No', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d9_3" label="9.3 % digital literacy" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                        {/* Domain 10 */}
                        <details className="bg-pink-50 border border-pink-200 rounded-lg">
                            <summary className="p-4 cursor-pointer font-semibold text-pink-900 hover:bg-pink-100">Domain 10: Livelihood (6 pts)</summary>
                            <div className="p-4 space-y-3 border-t border-pink-200">
                                <ScoreRow id="d10_1" label="10.1 % skill development" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d10_2" label="10.2 % bank-linked loans" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                                <ScoreRow id="d10_3" label="10.3 % SHG membership" options={[{ l: '>75%', s: 2 }, { l: '50-75%', s: 1 }, { l: '<50%', s: 0 }]} formData={formData} setFormData={setFormData} />
                            </div>
                        </details>
                    </div>

                    {/* Score Summary */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Score</p>
                                <p className="text-3xl font-bold text-blue-600">
                                    {Object.values(formData.scores || {}).reduce((sum, score) => sum + (parseInt(score) || 0), 0)}/100
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Recommendation</p>
                                <p className={`text-xl font-bold ${Object.values(formData.scores || {}).reduce((sum, score) => sum + (parseInt(score) || 0), 0) < 70
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                    }`}>
                                    {Object.values(formData.scores || {}).reduce((sum, score) => sum + (parseInt(score) || 0), 0) < 70
                                        ? '✓ Eligible (<70)'
                                        : '✗ Not Eligible (≥70)'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Decision */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Final Decision *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, decision: 'Eligible' })}
                            className={`p-4 border-2 rounded-lg text-center ${formData.decision === 'Eligible'
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-300 hover:border-green-300'
                                }`}
                        >
                            <CheckCircle className="mx-auto mb-2" size={32} />
                            <p className="font-semibold">Eligible</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, decision: 'Not Eligible' })}
                            className={`p-4 border-2 rounded-lg text-center ${formData.decision === 'Not Eligible'
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : 'border-gray-300 hover:border-red-300'
                                }`}
                        >
                            <X className="mx-auto mb-2" size={32} />
                            <p className="font-semibold">Not Eligible</p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                        className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                        <p className="text-gray-600">Your verification has been sent to the State Officer.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
