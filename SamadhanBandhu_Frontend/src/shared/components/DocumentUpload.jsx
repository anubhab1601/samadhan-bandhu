import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react';

/**
 * DocumentUpload Component
 * Reusable component for uploading multiple documents with preview
 * Used across all portals for various document submissions
 */
export default function DocumentUpload({
    label = "Upload Documents",
    description = "Upload required documents (PDF, JPG, PNG)",
    required = false,
    maxFiles = 10,
    maxSizePerFile = 5, // in MB
    acceptedFormats = ['.pdf', '.jpg', '.jpeg', '.png'],
    requiredDocuments = [], // Array of required document types
    onDocumentsChange,
    existingDocuments = []
}) {
    const [documents, setDocuments] = useState(existingDocuments);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    // Validate file
    const validateFile = (file) => {
        // Check file size
        const maxSizeBytes = maxSizePerFile * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            return `File size must be less than ${maxSizePerFile}MB`;
        }

        // Check file type
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!acceptedFormats.includes(fileExtension)) {
            return `File type not supported. Accepted: ${acceptedFormats.join(', ')}`;
        }

        return null;
    };

    // Handle file selection
    const handleFileSelect = (files) => {
        setError('');
        const fileArray = Array.from(files);

        // Check max files limit
        if (documents.length + fileArray.length > maxFiles) {
            setError(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const newDocuments = [];
        const errors = [];

        fileArray.forEach((file) => {
            const validationError = validateFile(file);
            if (validationError) {
                errors.push(`${file.name}: ${validationError}`);
            } else {
                newDocuments.push({
                    id: Date.now() + Math.random(),
                    file: file,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: URL.createObjectURL(file),
                    uploadedAt: new Date().toISOString(),
                    documentType: '' // User can specify document type
                });
            }
        });

        if (errors.length > 0) {
            setError(errors.join('; '));
        }

        if (newDocuments.length > 0) {
            const updatedDocuments = [...documents, ...newDocuments];
            setDocuments(updatedDocuments);
            if (onDocumentsChange) {
                onDocumentsChange(updatedDocuments);
            }
        }
    };

    // Handle file input change
    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelect(e.target.files);
        }
    };

    // Handle drag and drop
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileSelect(files);
        }
    };

    // Remove document
    const removeDocument = (docId) => {
        const updatedDocuments = documents.filter(doc => doc.id !== docId);
        setDocuments(updatedDocuments);
        if (onDocumentsChange) {
            onDocumentsChange(updatedDocuments);
        }
    };

    // Update document type
    const updateDocumentType = (docId, type) => {
        const updatedDocuments = documents.map(doc =>
            doc.id === docId ? { ...doc, documentType: type } : doc
        );
        setDocuments(updatedDocuments);
        if (onDocumentsChange) {
            onDocumentsChange(updatedDocuments);
        }
    };

    // Get file icon
    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        if (extension === 'pdf') {
            return <FileText className="text-red-600" size={24} />;
        } else if (['jpg', 'jpeg', 'png'].includes(extension)) {
            return <FileText className="text-blue-600" size={24} />;
        }
        return <FileText className="text-gray-600" size={24} />;
    };

    return (
        <div className="space-y-4">
            {/* Label */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                {description && (
                    <p className="text-xs text-gray-500">{description}</p>
                )}
            </div>

            {/* Required Documents List */}
            {requiredDocuments.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs font-medium text-blue-900 mb-2">Required Documents:</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                        {requiredDocuments.map((doc, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>{doc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Upload Area */}
            {documents.length < maxFiles && (
                <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                        }`}
                >
                    <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Click to upload
                        </button>
                        <span className="text-gray-600"> or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {acceptedFormats.join(', ').toUpperCase()} (Max {maxSizePerFile}MB per file)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {documents.length} / {maxFiles} files uploaded
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={acceptedFormats.join(',')}
                        onChange={handleFileInputChange}
                        className="hidden"
                    />
                </div>
            )}

            {/* Documents List */}
            {documents.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">
                            Uploaded Documents ({documents.length}/{maxFiles})
                        </p>
                        {documents.length >= maxFiles && (
                            <span className="text-xs text-orange-600 flex items-center gap-1">
                                <AlertCircle size={14} />
                                Maximum files reached
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    {/* File Icon */}
                                    <div className="flex-shrink-0">
                                        {getFileIcon(doc.name)}
                                    </div>

                                    {/* File Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {doc.name}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadedAt).toLocaleTimeString()}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                {doc.url && (
                                                    <a
                                                        href={doc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Preview"
                                                    >
                                                        <Eye size={16} />
                                                    </a>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeDocument(doc.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                    title="Remove"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Document Type Selector */}
                                        {requiredDocuments.length > 0 && (
                                            <div className="mt-2">
                                                <select
                                                    value={doc.documentType}
                                                    onChange={(e) => updateDocumentType(doc.id, e.target.value)}
                                                    className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">Select document type</option>
                                                    {requiredDocuments.map((docType, index) => (
                                                        <option key={index} value={docType}>
                                                            {docType}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-700">
                    <strong>Supported formats:</strong> {acceptedFormats.join(', ').toUpperCase()}
                    <br />
                    <strong>Maximum file size:</strong> {maxSizePerFile}MB per file
                    <br />
                    <strong>Maximum files:</strong> {maxFiles} files
                </p>
            </div>
        </div>
    );
}
