import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Upload, FileText, AlertCircle, Calendar, IndianRupee } from 'lucide-react';

export default function ReleaseTender() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Tender Information
        tenderTitle: '',
        tenderNumber: '',
        applicationId: '',
        projectType: '',

        // Project Details
        projectDescription: '',
        scopeOfWork: '',
        location: '',

        // Budget & Timeline
        estimatedBudget: '',
        earnestMoneyDeposit: '',
        tenderFee: '',
        publishDate: new Date().toISOString().split('T')[0],
        submissionDeadline: '',
        technicalBidOpening: '',
        financialBidOpening: '',
        projectDuration: '',

        // Eligibility Criteria
        minExperience: '',
        minTurnover: '',
        similarProjectsCompleted: '',
        registrationRequired: '',

        // Required Documents
        requiredDocuments: [
            'Company Registration Certificate',
            'GST Registration',
            'PAN Card',
            'Experience Certificates',
            'Financial Statements (Last 3 years)',
            'Similar Project Completion Certificates'
        ],

        // Additional Information
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        additionalNotes: ''
    });

    const [documents, setDocuments] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDocumentUpload = (e) => {
        const files = Array.from(e.target.files);
        setDocuments(prev => [...prev, ...files]);
    };

    const removeDocument = (index) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tenderId = 'TND-2025-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        alert(`Tender published successfully!\nTender ID: ${tenderId}\n\nThe tender is now live and agencies can start applying.`);
        navigate('/block/tenders');
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Release New Tender</h1>
                <p className="text-sm text-gray-600 mt-1">Publish tender for approved project to invite agency applications</p>
            </div>

            {/* Important Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <h3 className="text-sm font-bold text-blue-900">Important Instructions</h3>
                        <ul className="text-sm text-blue-800 mt-2 space-y-1">
                            <li>• Ensure project has been approved by PM-AJAY before releasing tender</li>
                            <li>• All fields marked with * are mandatory</li>
                            <li>• Set realistic deadlines for tender submission and bid opening</li>
                            <li>• Upload all necessary tender documents and specifications</li>
                            <li>• Tender will be visible to all registered agencies once published</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Tender Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tender Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Tender Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tender Title *</label>
                            <input
                                type="text"
                                name="tenderTitle"
                                value={formData.tenderTitle}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Community Hall Construction"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Application ID (Approved Project) *</label>
                            <input
                                type="text"
                                name="applicationId"
                                value={formData.applicationId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="PMAJAY-2025-MH-12345"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type *</label>
                            <select
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Type</option>
                                <option value="Infrastructure">Infrastructure Development</option>
                                <option value="Building">Building Construction</option>
                                <option value="Road">Road Development</option>
                                <option value="Water">Water Supply</option>
                                <option value="Sanitation">Sanitation</option>
                                <option value="Education">Education Facility</option>
                                <option value="Health">Health Facility</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Village, District, State"
                            />
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Project Details
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description *</label>
                            <textarea
                                name="projectDescription"
                                value={formData.projectDescription}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Provide detailed description of the project..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Scope of Work *</label>
                            <textarea
                                name="scopeOfWork"
                                value={formData.scopeOfWork}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="List all work items, specifications, and deliverables..."
                            />
                        </div>
                    </div>
                </div>

                {/* Budget & Timeline */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Budget & Timeline
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <IndianRupee size={16} className="text-green-600" />
                                Estimated Budget *
                            </label>
                            <input
                                type="number"
                                name="estimatedBudget"
                                value={formData.estimatedBudget}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Amount in Rupees"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Earnest Money Deposit (EMD) *</label>
                            <input
                                type="number"
                                name="earnestMoneyDeposit"
                                value={formData.earnestMoneyDeposit}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Amount in Rupees"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tender Fee *</label>
                            <input
                                type="number"
                                name="tenderFee"
                                value={formData.tenderFee}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Amount in Rupees"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Duration (Months) *</label>
                            <input
                                type="number"
                                name="projectDuration"
                                value={formData.projectDuration}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Duration in months"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Calendar size={16} className="text-blue-600" />
                                Submission Deadline *
                            </label>
                            <input
                                type="date"
                                name="submissionDeadline"
                                value={formData.submissionDeadline}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Technical Bid Opening Date *</label>
                            <input
                                type="date"
                                name="technicalBidOpening"
                                value={formData.technicalBidOpening}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Financial Bid Opening Date *</label>
                            <input
                                type="date"
                                name="financialBidOpening"
                                value={formData.financialBidOpening}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Eligibility Criteria
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Experience (Years) *</label>
                            <input
                                type="number"
                                name="minExperience"
                                value={formData.minExperience}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Years of experience"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Annual Turnover *</label>
                            <input
                                type="number"
                                name="minTurnover"
                                value={formData.minTurnover}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Amount in Rupees"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Similar Projects Completed *</label>
                            <input
                                type="number"
                                name="similarProjectsCompleted"
                                value={formData.similarProjectsCompleted}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Number of projects"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Required *</label>
                            <select
                                name="registrationRequired"
                                value={formData.registrationRequired}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="PWD">PWD Registration</option>
                                <option value="CPWD">CPWD Registration</option>
                                <option value="Both">Both PWD & CPWD</option>
                                <option value="None">No Specific Registration</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Required Documents */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Required Documents from Agencies
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="space-y-2">
                            {formData.requiredDocuments.map((doc, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                    <FileText size={16} className="text-blue-600" />
                                    {doc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tender Documents Upload */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Upload Tender Documents *
                    </h2>
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                            <label className="cursor-pointer">
                                <span className="text-blue-600 hover:text-blue-700 font-semibold">Click to upload documents</span>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    multiple
                                    onChange={handleDocumentUpload}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-sm text-gray-500 mt-2">Upload tender specifications, drawings, BOQ, etc. (PDF, DOC, DOCX)</p>
                        </div>
                        {documents.length > 0 && (
                            <div className="space-y-2">
                                {documents.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <FileText size={20} className="text-blue-600" />
                                            <span className="text-sm text-gray-700">{doc.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeDocument(index)}
                                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person *</label>
                            <input
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                            <input
                                type="tel"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="+91 XXXXXXXXXX"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Any additional information for agencies..."
                        />
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/block/tenders')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition-colors"
                    >
                        <Save size={20} />
                        Publish Tender
                    </button>
                </div>
            </form>
        </div>
    );
}
