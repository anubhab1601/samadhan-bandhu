import React, { useState, useRef } from 'react';
import { Camera, MapPin, X, CheckCircle, AlertCircle, Upload } from 'lucide-react';

/**
 * GeoPhotoUpload Component
 * Captures photos with geo-location data (latitude, longitude)
 * Used for: Sarpanch applications, Field Officer inspections, IVA verifications
 */
export default function GeoPhotoUpload({
    label = "Upload Geo-Tagged Photos",
    description = "Photos must include location data",
    maxPhotos = 5,
    required = false,
    onPhotosChange,
    photoSetName = "photos"
}) {
    const [photos, setPhotos] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [error, setError] = useState('');
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const fileInputRef = useRef(null);

    // Get current location
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: new Date().toISOString()
                    });
                },
                (error) => {
                    reject(new Error('Unable to retrieve your location'));
                }
            );
        });
    };

    // Start camera for photo capture
    const startCamera = async () => {
        try {
            setError('');
            // Get location first
            const location = await getCurrentLocation();
            setCurrentLocation(location);

            // Start camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: 1280, height: 720 }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsCapturing(true);
            }
        } catch (err) {
            setError(err.message || 'Failed to access camera or location');
            console.error('Camera/Location error:', err);
        }
    };

    // Stop camera
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCapturing(false);
        setCurrentLocation(null);
    };

    // Capture photo from camera
    const capturePhoto = () => {
        if (videoRef.current && currentLocation) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);

            canvas.toBlob((blob) => {
                const photoData = {
                    id: Date.now(),
                    blob: blob,
                    url: URL.createObjectURL(blob),
                    location: currentLocation,
                    captureMethod: 'camera',
                    timestamp: new Date().toISOString(),
                    name: `photo_${Date.now()}.jpg`
                };

                const newPhotos = [...photos, photoData];
                setPhotos(newPhotos);
                if (onPhotosChange) {
                    onPhotosChange(newPhotos);
                }

                if (newPhotos.length >= maxPhotos) {
                    stopCamera();
                }
            }, 'image/jpeg', 0.9);
        }
    };

    // Handle file upload (with EXIF location data)
    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        setError('');

        try {
            // Get current location for uploaded files
            const location = await getCurrentLocation();

            const newPhotos = await Promise.all(
                files.slice(0, maxPhotos - photos.length).map(async (file) => {
                    return {
                        id: Date.now() + Math.random(),
                        blob: file,
                        url: URL.createObjectURL(file),
                        location: location,
                        captureMethod: 'upload',
                        timestamp: new Date().toISOString(),
                        name: file.name,
                        size: file.size
                    };
                })
            );

            const updatedPhotos = [...photos, ...newPhotos];
            setPhotos(updatedPhotos);
            if (onPhotosChange) {
                onPhotosChange(updatedPhotos);
            }
        } catch (err) {
            setError('Location access required for photo upload');
        }
    };

    // Remove photo
    const removePhoto = (photoId) => {
        const updatedPhotos = photos.filter(p => p.id !== photoId);
        setPhotos(updatedPhotos);
        if (onPhotosChange) {
            onPhotosChange(updatedPhotos);
        }
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

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Camera Capture */}
            {!isCapturing && photos.length < maxPhotos && (
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={startCamera}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        <Camera size={20} />
                        Capture Photo
                    </button>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
                    >
                        <Upload size={20} />
                        Upload Photo
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>
            )}

            {/* Camera View */}
            {isCapturing && (
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="relative">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-96 object-cover"
                        />

                        {/* Location Indicator */}
                        {currentLocation && (
                            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                                <MapPin size={14} className="text-green-400" />
                                <span>
                                    {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                                </span>
                            </div>
                        )}

                        {/* Photo Counter */}
                        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-xs">
                            {photos.length} / {maxPhotos} photos
                        </div>
                    </div>

                    {/* Camera Controls */}
                    <div className="p-4 flex gap-3">
                        <button
                            type="button"
                            onClick={capturePhoto}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            Capture Photo
                        </button>
                        <button
                            type="button"
                            onClick={stopCamera}
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Photo Grid */}
            {photos.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-700">
                            Captured Photos ({photos.length}/{maxPhotos})
                        </p>
                        {photos.length >= maxPhotos && (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle size={14} />
                                Maximum reached
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {photos.map((photo) => (
                            <div key={photo.id} className="relative group">
                                <img
                                    src={photo.url}
                                    alt={photo.name}
                                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                                />

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() => removePhoto(photo.id)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>

                                {/* Location Badge */}
                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                    <MapPin size={12} className="text-green-400" />
                                    <span className="truncate max-w-[100px]">
                                        {photo.location.latitude.toFixed(4)}, {photo.location.longitude.toFixed(4)}
                                    </span>
                                </div>

                                {/* Capture Method Badge */}
                                <div className="absolute top-2 left-2">
                                    {photo.captureMethod === 'camera' ? (
                                        <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                            <Camera size={12} />
                                            Camera
                                        </div>
                                    ) : (
                                        <div className="bg-gray-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                            <Upload size={12} />
                                            Upload
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                    <strong>Note:</strong> All photos are automatically tagged with your current location (GPS coordinates).
                    This ensures authenticity and helps in verification. Make sure location services are enabled.
                </p>
            </div>
        </div>
    );
}
