import React from 'react';
import { X, MessageCircle, Phone, Mail, FileQuestion } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-blue-600 p-6 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <FileQuestion size={24} />
                            Help & Support
                        </h2>
                        <p className="text-blue-100 text-sm mt-1">How can we assist you today?</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-blue-500 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                            <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                <MessageCircle size={24} className="text-blue-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Live Chat</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                            <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                <Phone size={24} className="text-green-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Call Us</span>
                        </button>
                    </div>

                    {/* FAQs */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Common Questions</h3>
                        <div className="space-y-2">
                            <details className="group border border-gray-200 rounded-lg">
                                <summary className="flex justify-between items-center p-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    How do I submit a new application?
                                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="p-3 pt-0 text-sm text-gray-600">
                                    Navigate to "Applications" → "New Application". Fill all required village details and upload photographs.
                                </div>
                            </details>
                            <details className="group border border-gray-200 rounded-lg">
                                <summary className="flex justify-between items-center p-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    How do I track my application status?
                                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="p-3 pt-0 text-sm text-gray-600">
                                    Go to "Applications" → "Track Status" to view real-time updates on your application progress.
                                </div>
                            </details>
                            <details className="group border border-gray-200 rounded-lg">
                                <summary className="flex justify-between items-center p-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    How do I release a tender?
                                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="p-3 pt-0 text-sm text-gray-600">
                                    Once your application is approved, go to "Tenders" → "Release Tender" to publish tender details.
                                </div>
                            </details>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Contact Support</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Mail size={16} className="text-gray-400" />
                                <span>sarpanch.support@pmajay.gov.in</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Phone size={16} className="text-gray-400" />
                                <span>1800-111-3333 (Toll Free)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <button className="text-blue-600 text-sm font-medium hover:underline">
                        Visit Help Center
                    </button>
                </div>
            </div>
        </div>
    );
}
