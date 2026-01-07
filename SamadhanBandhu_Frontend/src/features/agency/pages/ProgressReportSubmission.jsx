import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Upload, FileText } from 'lucide-react';
import GeoPhotoUpload from '../../../shared/components/GeoPhotoUpload';
import DocumentUpload from '../../../shared/components/DocumentUpload';

export default function ProgressReportSubmission() {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [formData, setFormData] = useState({
        // Report Period
        reportMonth: '',
        reportYear: '',

        // Work Progress
        workCompletedThisMonth: '',
        currentOverallProgress: '',
        milestonesAchieved: '',

        // Financial
        expenditureThisMonth: '',
        totalExpenditureTillDate: '',
        billsSubmitted: '',
        paymentsReceived: '',

        // Workforce
        workersEmployed: '',
        skillCategories: '',
        safetyIncidents: '',

        // Materials
        materialsUsed: '',
        materialsInStock: '',
        materialsOrdered: '',

        // Challenges & Issues
        challengesFaced: '',
        delaysIfAny: '',
        supportRequired: '',

        // Next Month Plan
        plannedActivities: '',
        expectedProgress: '',
        resourceRequirements: '',

        // Overall Status
        overallStatus: '',
        remarks: ''
    });

    const [progressPhotos, setProgressPhotos] = useState([]);
    const [supportingDocuments, setSupportingDocuments] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock project data
    const project = {
        id: projectId || 'PMAJAY-2025-MH-12347',
        projectTitle: 'Water Supply System',
        villageName: 'Daund',
        district: 'Pune',
        contractAmount: '₹1.15 Crores',
        currentProgress: '45%'
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear, currentYear + 1];

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.reportMonth) newErrors.reportMonth = 'Report month is required';
        if (!formData.reportYear) newErrors.reportYear = 'Report year is required';
        if (!formData.workCompletedThisMonth) newErrors.workCompletedThisMonth = 'Work completed description is required';
        if (!formData.currentOverallProgress) newErrors.currentOverallProgress = 'Current progress is required';
        if (!formData.overallStatus) newErrors.overallStatus = 'Overall status is required';
        if (!formData.remarks) newErrors.remarks = 'Remarks are required';

        if (progressPhotos.length === 0) {
            newErrors.progressPhotos = 'At least one progress photo is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            alert('Progress report submitted successfully!');
            setIsSubmitting(false);
            navigate('/agency/projects');
        }, 2000);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(`/agency/projects/${project.id}`)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Project Dashboard
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Monthly Progress Report</h1>
                <p className="text-gray-600 mt-1">Submit detailed monthly progress report</p>
            </div>

            {/* Project Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">Project Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <span className="text-blue-700 font-medium">Project ID:</span>
                        <p className="text-blue-900">{project.id}</p>
                    </div>
                    <div>
                        <span className="text-blue-700 font-medium">Project:</span>
                        <p className="text-blue-900">{project.projectTitle}</p>
                    </div>
                    <div>
                        <span className="text-blue-700 font-medium">Location:</span>
                        <p className="text-blue-900">{project.villageName}</p>
                    </div>
                    <div>
                        <span className="text-blue-700 font-medium">Current Progress:</span>
                        <p className="text-blue-900 font-semibold">{project.currentProgress}</p>
                    </div>
                </div>
            </div>

            {/* Progress Report Form */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-6">
                {/* Report Period */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Report Period</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Month *
                            </label>
                            <select
                                value={formData.reportMonth}
                                onChange={(e) => handleInputChange('reportMonth', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.reportMonth ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select Month</option>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            {errors.reportMonth && <p className="text-red-500 text-xs mt-1">{errors.reportMonth}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Year *
                            </label>
                            <select
                                value={formData.reportYear}
                                onChange={(e) => handleInputChange('reportYear', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.reportYear ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select Year</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            {errors.reportYear && <p className="text-red-500 text-xs mt-1">{errors.reportYear}</p>}
                        </div>
                    </div>
                </div>

                {/* Work Progress */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Work Progress</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Work Completed This Month *
                            </label>
                            <textarea
                                rows="4"
                                value={formData.workCompletedThisMonth}
                                onChange={(e) => handleInputChange('workCompletedThisMonth', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.workCompletedThisMonth ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Describe work completed during this month..."
                            />
                            {errors.workCompletedThisMonth && <p className="text-red-500 text-xs mt-1">{errors.workCompletedThisMonth}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Overall Progress (%) *
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.currentOverallProgress}
                                    onChange={(e) => handleInputChange('currentOverallProgress', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.currentOverallProgress ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter percentage (0-100)"
                                />
                                {errors.currentOverallProgress && <p className="text-red-500 text-xs mt-1">{errors.currentOverallProgress}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Milestones Achieved
                                </label>
                                <input
                                    type="text"
                                    value={formData.milestonesAchieved}
                                    onChange={(e) => handleInputChange('milestonesAchieved', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="List milestones achieved"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Details */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Financial Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expenditure This Month (₹)
                            </label>
                            <input
                                type="number"
                                value={formData.expenditureThisMonth}
                                onChange={(e) => handleInputChange('expenditureThisMonth', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter amount"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Total Expenditure Till Date (₹)
                            </label>
                            <input
                                type="number"
                                value={formData.totalExpenditureTillDate}
                                onChange={(e) => handleInputChange('totalExpenditureTillDate', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter amount"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bills Submitted (₹)
                            </label>
                            <input
                                type="number"
                                value={formData.billsSubmitted}
                                onChange={(e) => handleInputChange('billsSubmitted', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter amount"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payments Received (₹)
                            </label>
                            <input
                                type="number"
                                value={formData.paymentsReceived}
                                onChange={(e) => handleInputChange('paymentsReceived', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter amount"
                            />
                        </div>
                    </div>
                </div>

                {/* Workforce Details */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Workforce Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Workers Employed
                            </label>
                            <input
                                type="number"
                                value={formData.workersEmployed}
                                onChange={(e) => handleInputChange('workersEmployed', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Number of workers"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Skill Categories
                            </label>
                            <input
                                type="text"
                                value={formData.skillCategories}
                                onChange={(e) => handleInputChange('skillCategories', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Mason, Plumber, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Safety Incidents
                            </label>
                            <input
                                type="number"
                                value={formData.safetyIncidents}
                                onChange={(e) => handleInputChange('safetyIncidents', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Number of incidents"
                            />
                        </div>
                    </div>
                </div>

                {/* Materials */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Materials</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Materials Used This Month
                            </label>
                            <textarea
                                rows="2"
                                value={formData.materialsUsed}
                                onChange={(e) => handleInputChange('materialsUsed', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="List materials used..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Materials in Stock
                                </label>
                                <input
                                    type="text"
                                    value={formData.materialsInStock}
                                    onChange={(e) => handleInputChange('materialsInStock', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Current stock"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Materials Ordered
                                </label>
                                <input
                                    type="text"
                                    value={formData.materialsOrdered}
                                    onChange={(e) => handleInputChange('materialsOrdered', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Orders placed"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Challenges & Issues */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Challenges & Issues</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Challenges Faced
                            </label>
                            <textarea
                                rows="3"
                                value={formData.challengesFaced}
                                onChange={(e) => handleInputChange('challengesFaced', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Describe any challenges faced..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Delays (if any)
                            </label>
                            <textarea
                                rows="2"
                                value={formData.delaysIfAny}
                                onChange={(e) => handleInputChange('delaysIfAny', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Explain any delays..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Support Required
                            </label>
                            <textarea
                                rows="2"
                                value={formData.supportRequired}
                                onChange={(e) => handleInputChange('supportRequired', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Any support needed from authorities..."
                            />
                        </div>
                    </div>
                </div>

                {/* Next Month Plan */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Next Month Plan</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Planned Activities
                            </label>
                            <textarea
                                rows="3"
                                value={formData.plannedActivities}
                                onChange={(e) => handleInputChange('plannedActivities', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Activities planned for next month..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Expected Progress (%)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.expectedProgress}
                                    onChange={(e) => handleInputChange('expectedProgress', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Expected progress by next month"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Resource Requirements
                                </label>
                                <input
                                    type="text"
                                    value={formData.resourceRequirements}
                                    onChange={(e) => handleInputChange('resourceRequirements', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Resources needed"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overall Status */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Overall Assessment</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Overall Status *
                            </label>
                            <select
                                value={formData.overallStatus}
                                onChange={(e) => handleInputChange('overallStatus', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.overallStatus ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select Status</option>
                                <option value="on-track">On Track</option>
                                <option value="minor-delays">Minor Delays</option>
                                <option value="major-delays">Major Delays</option>
                                <option value="ahead-of-schedule">Ahead of Schedule</option>
                            </select>
                            {errors.overallStatus && <p className="text-red-500 text-xs mt-1">{errors.overallStatus}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Remarks *
                            </label>
                            <textarea
                                rows="4"
                                value={formData.remarks}
                                onChange={(e) => handleInputChange('remarks', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.remarks ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Overall remarks and observations..."
                            />
                            {errors.remarks && <p className="text-red-500 text-xs mt-1">{errors.remarks}</p>}
                        </div>
                    </div>
                </div>

                {/* Progress Photos */}
                <div>
                    <GeoPhotoUpload
                        label="Progress Photos (Geo-Tagged)"
                        description="Upload geo-tagged photos showing current work progress"
                        maxPhotos={10}
                        required={true}
                        onPhotosChange={setProgressPhotos}
                        photoSetName="progress_photos"
                    />
                    {errors.progressPhotos && (
                        <p className="text-red-500 text-sm mt-2">{errors.progressPhotos}</p>
                    )}
                </div>

                {/* Supporting Documents */}
                <div>
                    <DocumentUpload
                        label="Supporting Documents"
                        description="Upload bills, invoices, and other supporting documents"
                        required={false}
                        maxFiles={10}
                        maxSizePerFile={5}
                        acceptedFormats={['.pdf', '.jpg', '.jpeg', '.png', '.xlsx', '.xls']}
                        requiredDocuments={[
                            'Bills/Invoices',
                            'Material Purchase Orders',
                            'Worker Attendance',
                            'Quality Test Reports'
                        ]}
                        onDocumentsChange={setSupportingDocuments}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                    <button
                        onClick={() => navigate(`/agency/projects/${project.id}`)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Submit Progress Report
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
