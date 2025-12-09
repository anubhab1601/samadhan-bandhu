import React from 'react';
import {
    CheckCircle, Clock, XCircle, AlertCircle,
    FileText, UserCheck, Send, DollarSign,
    Eye, Hammer, TrendingUp, Award
} from 'lucide-react';

/**
 * ProjectTimeline Component
 * Flipkart-style order tracking for PM-AJAY projects
 * Shows complete project journey from application to completion
 */
export default function ProjectTimeline({
    projectId,
    currentStage,
    stages = [],
    showDetails = true
}) {
    // Default stages if not provided
    const defaultStages = [
        {
            id: 1,
            name: 'Application Submitted',
            description: 'Sarpanch submitted Format I & II',
            status: 'completed',
            date: '2025-11-15',
            icon: FileText,
            actor: 'Sarpanch - Ram Patil',
            details: 'Village: Khed, District: Pune'
        },
        {
            id: 2,
            name: 'IVA Verification',
            description: 'Village eligibility verification',
            status: 'completed',
            date: '2025-11-18',
            icon: UserCheck,
            actor: 'IVA Officer - Suresh Kumar',
            details: 'All documents verified and approved'
        },
        {
            id: 3,
            name: 'State Review',
            description: 'Application reviewed by State',
            status: 'completed',
            date: '2025-11-20',
            icon: Eye,
            actor: 'State Officer - Priya Sharma',
            details: 'Forwarded to Center for consent'
        },
        {
            id: 4,
            name: 'Center Consent',
            description: 'Consent note from Center',
            status: 'in-progress',
            date: null,
            icon: Award,
            actor: 'Pending',
            details: 'Awaiting consent note approval'
        },
        {
            id: 5,
            name: 'Tender Process',
            description: 'Tender released and agency selection',
            status: 'pending',
            date: null,
            icon: Send,
            actor: 'Not Started',
            details: 'Will begin after consent'
        },
        {
            id: 6,
            name: 'Fund Release',
            description: 'First installment released',
            status: 'pending',
            date: null,
            icon: DollarSign,
            actor: 'Not Started',
            details: 'Pending tender completion'
        },
        {
            id: 7,
            name: 'Work in Progress',
            description: 'Construction/implementation ongoing',
            status: 'pending',
            date: null,
            icon: Hammer,
            actor: 'Not Started',
            details: 'Pending fund release'
        },
        {
            id: 8,
            name: 'Inspections',
            description: 'Field officer inspections',
            status: 'pending',
            date: null,
            icon: Eye,
            actor: 'Not Started',
            details: 'Scheduled during work progress'
        },
        {
            id: 9,
            name: 'Project Completion',
            description: 'Final inspection and closure',
            status: 'pending',
            date: null,
            icon: CheckCircle,
            actor: 'Not Started',
            details: 'Pending work completion'
        }
    ];

    const timelineStages = stages.length > 0 ? stages : defaultStages;

    // Get status icon and color
    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    icon: CheckCircle,
                    color: 'text-green-600',
                    bgColor: 'bg-green-100',
                    borderColor: 'border-green-600',
                    lineColor: 'bg-green-600'
                };
            case 'in-progress':
                return {
                    icon: Clock,
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-100',
                    borderColor: 'border-blue-600',
                    lineColor: 'bg-blue-600'
                };
            case 'rejected':
            case 'failed':
                return {
                    icon: XCircle,
                    color: 'text-red-600',
                    bgColor: 'bg-red-100',
                    borderColor: 'border-red-600',
                    lineColor: 'bg-red-600'
                };
            case 'on-hold':
                return {
                    icon: AlertCircle,
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-100',
                    borderColor: 'border-orange-600',
                    lineColor: 'bg-orange-600'
                };
            default: // pending
                return {
                    icon: Clock,
                    color: 'text-gray-400',
                    bgColor: 'bg-gray-100',
                    borderColor: 'border-gray-300',
                    lineColor: 'bg-gray-300'
                };
        }
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp size={24} className="text-blue-600" />
                    Project Timeline
                </h2>
                {projectId && (
                    <p className="text-sm text-gray-600 mt-1">Project ID: {projectId}</p>
                )}
            </div>

            {/* Timeline */}
            <div className="relative">
                {timelineStages.map((stage, index) => {
                    const config = getStatusConfig(stage.status);
                    const StageIcon = stage.icon || config.icon;
                    const isLast = index === timelineStages.length - 1;

                    return (
                        <div key={stage.id} className="relative pb-8">
                            {/* Connecting Line */}
                            {!isLast && (
                                <div
                                    className={`absolute left-5 top-12 w-0.5 h-full ${stage.status === 'completed' || stage.status === 'in-progress'
                                            ? config.lineColor
                                            : 'bg-gray-300'
                                        }`}
                                />
                            )}

                            {/* Stage Content */}
                            <div className="relative flex gap-4">
                                {/* Icon Circle */}
                                <div className="flex-shrink-0">
                                    <div
                                        className={`w-10 h-10 rounded-full border-2 ${config.borderColor} ${config.bgColor} flex items-center justify-center`}
                                    >
                                        <StageIcon className={config.color} size={20} />
                                    </div>
                                </div>

                                {/* Stage Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        {/* Stage Header */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    {stage.name}
                                                    {stage.status === 'completed' && (
                                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                                            Completed
                                                        </span>
                                                    )}
                                                    {stage.status === 'in-progress' && (
                                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full animate-pulse">
                                                            In Progress
                                                        </span>
                                                    )}
                                                    {stage.status === 'rejected' && (
                                                        <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                                            Rejected
                                                        </span>
                                                    )}
                                                    {stage.status === 'on-hold' && (
                                                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                                                            On Hold
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {stage.description}
                                                </p>
                                            </div>

                                            {/* Date */}
                                            {stage.date && (
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(stage.date).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-0.5">
                                                        {new Date(stage.date).toLocaleTimeString('en-IN', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Additional Details */}
                                        {showDetails && (stage.actor || stage.details) && (
                                            <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                                                {stage.actor && (
                                                    <p className="text-xs text-gray-600">
                                                        <span className="font-medium">By:</span> {stage.actor}
                                                    </p>
                                                )}
                                                {stage.details && (
                                                    <p className="text-xs text-gray-600">
                                                        <span className="font-medium">Details:</span> {stage.details}
                                                    </p>
                                                )}
                                                {stage.remarks && (
                                                    <p className="text-xs text-gray-600">
                                                        <span className="font-medium">Remarks:</span> {stage.remarks}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Action Items (if any) */}
                                        {stage.actions && stage.actions.length > 0 && (
                                            <div className="mt-3 flex gap-2">
                                                {stage.actions.map((action, actionIndex) => (
                                                    <button
                                                        key={actionIndex}
                                                        onClick={action.onClick}
                                                        className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    >
                                                        {action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Progress Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            <span className="text-gray-600">
                                Completed: {timelineStages.filter(s => s.status === 'completed').length}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-600">
                                In Progress: {timelineStages.filter(s => s.status === 'in-progress').length}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <span className="text-gray-600">
                                Pending: {timelineStages.filter(s => s.status === 'pending').length}
                            </span>
                        </div>
                    </div>
                    <div className="text-gray-600">
                        Progress: {Math.round((timelineStages.filter(s => s.status === 'completed').length / timelineStages.length) * 100)}%
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{
                            width: `${(timelineStages.filter(s => s.status === 'completed').length / timelineStages.length) * 100}%`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
