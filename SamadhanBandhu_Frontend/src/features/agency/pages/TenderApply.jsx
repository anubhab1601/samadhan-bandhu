import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, CheckCircle } from 'lucide-react';

export default function TenderApply() {
    const { tenderId } = useParams();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        companyName: '',
        registrationNumber: '',
        experience: '',
        proposedAmount: '',
        completionTime: '',
        technicalProposal: '',
        financialProposal: '',
        pastProjects: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
        setTimeout(() => {
            navigate('/agency/tenders');
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                    <p className="text-gray-600 mb-4">
                        Your tender application has been submitted successfully. You will be notified about the status.
                    </p>
                    <p className="text-sm text-gray-500">Redirecting to tenders page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate(`/agency/tenders/${tenderId}`)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Tender Details
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Tender</h1>
                <p className="text-gray-600">Tender ID: {tenderId}</p>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Company Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter company name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Registration Number *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.registrationNumber}
                                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter registration number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Years of Experience *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter years"
                            />
                        </div>
                    </div>
                </div>

                {/* Bid Information */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Bid Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Proposed Amount (₹) *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.proposedAmount}
                                onChange={(e) => setFormData({ ...formData, proposedAmount: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter amount in rupees"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Proposed Completion Time (months) *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.completionTime}
                                onChange={(e) => setFormData({ ...formData, completionTime: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter months"
                            />
                        </div>
                    </div>
                </div>

                {/* Technical Proposal */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Proposal</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Methodology and Approach *
                        </label>
                        <textarea
                            required
                            rows="6"
                            value={formData.technicalProposal}
                            onChange={(e) => setFormData({ ...formData, technicalProposal: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your technical approach, methodology, and execution plan..."
                        />
                    </div>
                </div>

                {/* Past Projects */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Past Projects</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            List of Similar Projects Completed *
                        </label>
                        <textarea
                            required
                            rows="4"
                            value={formData.pastProjects}
                            onChange={(e) => setFormData({ ...formData, pastProjects: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="List your past similar projects with details..."
                        />
                    </div>
                </div>

                {/* Document Upload */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-600 mb-2">Company Registration Certificate</p>
                            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Upload File
                            </button>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-600 mb-2">Financial Documents</p>
                            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Upload File
                            </button>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-600 mb-2">Past Project Certificates</p>
                            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Upload File
                            </button>
                        </div>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            required
                            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="text-sm text-gray-700">
                            <p className="font-medium mb-2">I agree to the terms and conditions</p>
                            <ul className="space-y-1 text-gray-600">
                                <li>• All information provided is accurate and complete</li>
                                <li>• I have read and understood the tender requirements</li>
                                <li>• I accept the terms and conditions of the tender</li>
                                <li>• I understand that false information may lead to disqualification</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(`/agency/tenders/${tenderId}`)}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <FileText size={20} />
                            Submit Application
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
