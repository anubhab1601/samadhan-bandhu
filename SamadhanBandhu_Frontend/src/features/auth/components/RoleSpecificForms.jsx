import React from 'react';
import { Building, MapPin, Hash, Calendar, CreditCard, FileText, Upload, X } from 'lucide-react';

export function BlockOfficerForm({ formData, handleInputChange, errors }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Village Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Village Name *
                </label>
                <input
                    type="text"
                    value={formData.villageName}
                    onChange={(e) => handleInputChange('villageName', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.villageName ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter village name"
                />
                {errors.villageName && <p className="text-red-500 text-xs mt-1">{errors.villageName}</p>}
            </div>

            {/* Gram Panchayat */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gram Panchayat *
                </label>
                <input
                    type="text"
                    value={formData.gramPanchayat}
                    onChange={(e) => handleInputChange('gramPanchayat', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.gramPanchayat ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter Gram Panchayat"
                />
                {errors.gramPanchayat && <p className="text-red-500 text-xs mt-1">{errors.gramPanchayat}</p>}
            </div>

            {/* Block */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Block
                </label>
                <input
                    type="text"
                    value={formData.block}
                    onChange={(e) => handleInputChange('block', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter block"
                />
            </div>

            {/* PIN Code */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code
                </label>
                <input
                    type="text"
                    value={formData.pin}
                    onChange={(e) => handleInputChange('pin', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="6-digit PIN code"
                    maxLength={6}
                />
            </div>

            {/* Official Block Officer ID */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Official Block Officer ID/Letter Number *
                </label>
                <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={formData.blockOfficerId}
                        onChange={(e) => handleInputChange('blockOfficerId', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.blockOfficerId ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter Block Officer ID"
                    />
                </div>
                {errors.blockOfficerId && <p className="text-red-500 text-xs mt-1">{errors.blockOfficerId}</p>}
            </div>

            {/* Tenure Period */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Period of Tenure
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="date"
                            value={formData.tenureFrom}
                            onChange={(e) => handleInputChange('tenureFrom', e.target.value)}
                            className="w-full pl-9 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="From"
                        />
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="date"
                            value={formData.tenureTo}
                            onChange={(e) => handleInputChange('tenureTo', e.target.value)}
                            className="w-full pl-9 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="To"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AgencyForm({ formData, handleInputChange, errors, documents, handleFileUpload, removeDocument }) {
    return (
        <div className="space-y-6">
            {/* Basic Agency Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Agency Name *
                    </label>
                    <input
                        type="text"
                        value={formData.agencyName}
                        onChange={(e) => handleInputChange('agencyName', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.agencyName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter agency name"
                    />
                    {errors.agencyName && <p className="text-red-500 text-xs mt-1">{errors.agencyName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration Number *
                    </label>
                    <input
                        type="text"
                        value={formData.registrationNumber}
                        onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter registration number"
                    />
                    {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration Authority
                    </label>
                    <input
                        type="text"
                        value={formData.registrationAuthority}
                        onChange={(e) => handleInputChange('registrationAuthority', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Registrar of Companies"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year of Establishment
                    </label>
                    <input
                        type="number"
                        value={formData.yearEstablished}
                        onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="YYYY"
                        min="1900"
                        max={new Date().getFullYear()}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        PAN Number
                    </label>
                    <input
                        type="text"
                        value={formData.panNumber}
                        onChange={(e) => handleInputChange('panNumber', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter PAN number"
                        maxLength={10}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        GST Number
                    </label>
                    <input
                        type="text"
                        value={formData.gstNumber}
                        onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter GST number"
                        maxLength={15}
                    />
                </div>
            </div>

            {/* Bank Details */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CreditCard size={20} className="text-blue-600" />
                    Bank Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bank Name
                        </label>
                        <input
                            type="text"
                            value={formData.bankName}
                            onChange={(e) => handleInputChange('bankName', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter bank name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Branch
                        </label>
                        <input
                            type="text"
                            value={formData.bankBranch}
                            onChange={(e) => handleInputChange('bankBranch', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter branch name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Account Number *
                        </label>
                        <input
                            type="text"
                            value={formData.bankAccountNumber}
                            onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.bankAccountNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter account number"
                        />
                        {errors.bankAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.bankAccountNumber}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            IFSC Code
                        </label>
                        <input
                            type="text"
                            value={formData.ifscCode}
                            onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter IFSC code"
                            maxLength={11}
                        />
                    </div>
                </div>
            </div>

            {/* Document Upload */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText size={20} className="text-blue-600" />
                    Documents
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                        <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                        <label className="cursor-pointer">
                            <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                            <span className="text-gray-600"> or drag and drop</span>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                            Upload Registration Cert, PAN Card, GST Cert (Max 5MB each)
                        </p>
                    </div>
                </div>
                {errors.documents && <p className="text-red-500 text-sm mt-2">{errors.documents}</p>}

                {documents.length > 0 && (
                    <div className="space-y-2 mt-4">
                        {documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FileText className="text-blue-600" size={20} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                        <p className="text-xs text-gray-500">{(doc.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeDocument(index)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function FieldOfficerForm({ formData, handleInputChange, errors }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation *
                </label>
                <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.designation ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="e.g., Junior Engineer"
                />
                {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID *
                </label>
                <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={formData.employeeId}
                        onChange={(e) => handleInputChange('employeeId', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.employeeId ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter employee ID"
                    />
                </div>
                {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
            </div>

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Office Address
                </label>
                <textarea
                    rows="3"
                    value={formData.officeAddress}
                    onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter complete office address"
                />
            </div>
        </div>
    );
}

export function StateOfficerForm({ formData, handleInputChange, errors }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation *
                </label>
                <input
                    type="text"
                    value={formData.stateDesignation}
                    onChange={(e) => handleInputChange('stateDesignation', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.stateDesignation ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="e.g., Deputy Secretary"
                />
                {errors.stateDesignation && <p className="text-red-500 text-xs mt-1">{errors.stateDesignation}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                </label>
                <input
                    type="text"
                    value={formData.stateDepartment}
                    onChange={(e) => handleInputChange('stateDepartment', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rural Development"
                />
            </div>

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Office Address
                </label>
                <textarea
                    rows="3"
                    value={formData.stateOfficeAddress}
                    onChange={(e) => handleInputChange('stateOfficeAddress', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter complete office address"
                />
            </div>
        </div>
    );
}



export function CenterOfficerForm({ formData, handleInputChange, errors }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation *
                </label>
                <input
                    type="text"
                    value={formData.centerDesignation}
                    onChange={(e) => handleInputChange('centerDesignation', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.centerDesignation ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="e.g., Director, Joint Secretary"
                />
                {errors.centerDesignation && <p className="text-red-500 text-xs mt-1">{errors.centerDesignation}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ministry/Department
                </label>
                <input
                    type="text"
                    value={formData.ministry}
                    onChange={(e) => handleInputChange('ministry', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Ministry of Rural Development"
                />
            </div>

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Office Address
                </label>
                <textarea
                    rows="3"
                    value={formData.centerOfficeAddress}
                    onChange={(e) => handleInputChange('centerOfficeAddress', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter complete office address"
                />
            </div>
        </div>
    );
}
