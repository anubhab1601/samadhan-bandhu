import React from 'react';
import { X, Phone, Mail, FileText, MessageCircle } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const faqs = [
        {
            question: "How do I review pending applications?",
            answer: "Go to 'Applications' > 'Pending Applications'. Click on 'View Details' to examine the village application. You can then forward it to an IVA for verification or reject it with comments."
        },
        {
            question: "How do I assign an IVA (Information Verifying Agency)?",
            answer: "In the application details page, click 'Assign IVA'. Select a registered IVA from the dropdown list based on the district/block and confirm the assignment."
        },
        {
            question: "How do I forward approved applications to PM-AJAY?",
            answer: "Once the IVA submits a positive verification report, the application status changes to 'Verified'. You can then review the report and click 'Forward to PM-AJAY' for final funding approval."
        },
        {
            question: "Can I schedule inspections manually?",
            answer: "Yes, navigate to 'Inspections' > 'Schedule Inspection'. Select the project and assign a Field Officer or IVA to conduct the inspection on a specific date."
        },
        {
            question: "How do I view fund utilization reports?",
            answer: "Go to 'Reports' > 'Monthly Reports' to view consolidated fund utilization data across all villages in your state."
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-[#1b1b1b] text-white p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <MessageCircle size={24} className="text-orange-400" />
                            Help & Support Center
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">State Officer Assistance</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Contact Support */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Phone size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Technical Helpline</h3>
                                <p className="text-blue-600 font-bold text-lg">1800-111-5555</p>
                                <p className="text-xs text-gray-500">Mon-Sat, 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex items-start gap-3">
                            <div className="bg-orange-100 p-2 rounded-full">
                                <Mail size={20} className="text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Email Support</h3>
                                <p className="text-orange-600 font-bold">state.support@pmajay.gov.in</p>
                                <p className="text-xs text-gray-500">Response within 24 hours</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={20} className="text-gray-500" />
                            Frequently Asked Questions
                        </h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <details className="group">
                                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <span>{faq.question}</span>
                                            <span className="transition group-open:rotate-180">
                                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                            </span>
                                        </summary>
                                        <div className="text-gray-600 p-4 border-t border-gray-200 bg-white leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">
                        For policy related queries, please refer to the <a href="#" className="text-blue-600 hover:underline">PM-AJAY Guidelines 2025</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
