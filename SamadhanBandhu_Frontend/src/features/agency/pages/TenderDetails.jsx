import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, MapPin, IndianRupee, Calendar, Users, Download, ArrowLeft, Send } from 'lucide-react';

export default function TenderDetails() {
    const { tenderId } = useParams();
    const navigate = useNavigate();

    // Mock tender data
    const tender = {
        id: 'TENDER-2025-MH-001',
        projectId: 'PMAJAY-2025-MH-12345',
        projectTitle: 'Community Hall Construction',
        villageName: 'Khed',
        district: 'Pune',
        state: 'Maharashtra',
        estimatedCost: 5000000,
        tenderAmount: 4800000,
        publishedDate: '2025-11-30',
        closingDate: '2025-12-15',
        status: 'open',
        applicationsReceived: 3,
        myApplicationStatus: null,
        description: 'Construction of a modern community hall with all necessary facilities for village gatherings, meetings, and social events.',
        scope: [
            'Site preparation and leveling',
            'Foundation work with RCC',
            'Brick masonry walls',
            'RCC roof slab',
            'Plastering and finishing',
            'Electrical wiring and fittings',
            'Plumbing and sanitation',
            'Painting and final touches'
        ],
        specifications: {
            area: '2000 sq ft',
            duration: '6 months',
            workers: '15-20 workers',
            materials: 'As per IS standards'
        },
        documents: [
            { name: 'Tender Document', size: '2.5 MB', type: 'PDF' },
            { name: 'Technical Specifications', size: '1.8 MB', type: 'PDF' },
            { name: 'BOQ (Bill of Quantities)', size: '850 KB', type: 'Excel' },
            { name: 'Site Plan', size: '3.2 MB', type: 'PDF' }
        ],
        eligibility: [
            'Valid contractor license',
            'Minimum 3 years experience in similar projects',
            'Financial capacity to handle ₹50 Lakhs project',
            'No ongoing legal disputes',
            'Good track record with government projects'
        ]
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate('/agency/tenders')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Tenders
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{tender.projectTitle}</h1>
                        <p className="text-gray-600">Tender ID: {tender.id}</p>
                        <p className="text-gray-600">Project ID: {tender.projectId}</p>
                    </div>
                    <div className="text-right">
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                            {tender.status === 'open' ? 'Open for Bidding' : 'Closed'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin className="text-blue-600" size={24} />
                        <p className="text-sm text-gray-600">Location</p>
                    </div>
                    <p className="font-semibold text-gray-900">{tender.villageName}</p>
                    <p className="text-sm text-gray-600">{tender.district}, {tender.state}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <IndianRupee className="text-green-600" size={24} />
                        <p className="text-sm text-gray-600">Tender Amount</p>
                    </div>
                    <p className="font-semibold text-green-600 text-xl">₹{(tender.tenderAmount / 100000).toFixed(2)}L</p>
                    <p className="text-sm text-gray-600">Est: ₹{(tender.estimatedCost / 100000).toFixed(2)}L</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="text-orange-600" size={24} />
                        <p className="text-sm text-gray-600">Closing Date</p>
                    </div>
                    <p className="font-semibold text-gray-900">{new Date(tender.closingDate).toLocaleDateString('en-IN')}</p>
                    <p className="text-sm text-orange-600">5 days remaining</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="text-purple-600" size={24} />
                        <p className="text-sm text-gray-600">Applications</p>
                    </div>
                    <p className="font-semibold text-gray-900 text-xl">{tender.applicationsReceived}</p>
                    <p className="text-sm text-gray-600">agencies applied</p>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Description</h2>
                <p className="text-gray-700 leading-relaxed">{tender.description}</p>
            </div>

            {/* Scope of Work */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Scope of Work</h2>
                <ul className="space-y-2">
                    {tender.scope.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Specifications */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(tender.specifications).map(([key, value]) => (
                        <div key={key} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 capitalize">{key}</p>
                            <p className="font-semibold text-gray-900">{value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
                <ul className="space-y-2">
                    {tender.eligibility.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Documents */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tender Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tender.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                                <FileText className="text-blue-600" size={24} />
                                <div>
                                    <p className="font-semibold text-gray-900">{doc.name}</p>
                                    <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Download size={16} />
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Last date to apply</p>
                        <p className="font-semibold text-gray-900">{new Date(tender.closingDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/agency/tenders')}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        {tender.status === 'open' && !tender.myApplicationStatus && (
                            <button
                                onClick={() => navigate(`/agency/tenders/${tender.id}/apply`)}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Send size={20} />
                                Apply for this Tender
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
