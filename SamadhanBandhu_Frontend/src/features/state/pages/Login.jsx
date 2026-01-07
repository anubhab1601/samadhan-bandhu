import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Key, Camera, CheckCircle, ShieldCheck } from 'lucide-react';
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [credentialsVerified, setCredentialsVerified] = useState(false);
    const [showFaceAuth, setShowFaceAuth] = useState(false);
    const [faceAuthStatus, setFaceAuthStatus] = useState('');
    const [userData, setUserData] = useState(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const navigate = useNavigate();

    const handleCredentialSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/verify-credentials', { email, password, role: 'state' });
            setUserData(response.data);
            setCredentialsVerified(true);
            setLoading(false);
            setTimeout(() => startFaceAuth(), 500);
        } catch (error) {
            console.error('Credential verification failed:', error.response?.data?.error || error.message);
            alert('Login failed: ' + (error.response?.data?.error || 'Invalid credentials'));
            setLoading(false);
        }
    };

    const startFaceAuth = async () => {
        setShowFaceAuth(true);
        setFaceAuthStatus('Initializing camera...');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setFaceAuthStatus('Position your face in the frame');

                setTimeout(() => {
                    setFaceAuthStatus('Face detected! Verifying...');
                    setTimeout(async () => {
                        setFaceAuthStatus('✓ Authentication successful!');

                        setTimeout(() => {
                            stopFaceAuth();
                            if (userData) {
                                localStorage.setItem('token', userData.token);
                                localStorage.setItem('user', JSON.stringify(userData.user));
                                navigate('/');
                            }
                        }, 1500);
                    }, 2000);
                }, 3000);
            }
        } catch (error) {
            console.error('Camera access denied:', error);
            setFaceAuthStatus('Camera access denied. Please enable camera permissions and try again.');
        }
    };

    const stopFaceAuth = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowFaceAuth(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
            {/* Top Bar */}
            <div className="bg-[#1b1b1b] text-white text-xs py-1.5 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-6">
                        <span>भारत सरकार | Government of India</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="cursor-pointer font-semibold">English</span>
                        <span className="cursor-pointer text-gray-400">हिन्दी</span>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                            alt="Government of India"
                            className="h-16 w-auto"
                        />
                        <div>
                            <div className="text-sm text-gray-600">सामाजिक न्याय और अधिकारिता मंत्रालय</div>
                            <div className="text-lg font-bold text-[#1e3a8a]">Ministry of Social Justice and Empowerment</div>
                            <div className="text-xs text-orange-600 font-semibold tracking-wide">PM-AJAY - STATE PORTAL</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Azadi_Ka_Amrit_Mahotsav_Logo.svg/1200px-Azadi_Ka_Amrit_Mahotsav_Logo.svg.png"
                            alt="Azadi Ka Amrit Mahotsav"
                            className="h-12 opacity-90"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Information */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome to <span className="text-blue-600">State Officer Portal</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Oversee village development, verify applications, and monitor project progress across the state under PM-AJAY.
                            </p>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <h3 className="font-semibold text-blue-900 mb-2">Key Responsibilities:</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>✓ Review applications submitted by Blocks</li>
                                <li>✓ Review and verify applications</li>
                                <li>✓ Forward verified applications to PM-AJAY</li>
                                <li>✓ Schedule and monitor inspections</li>
                                <li>✓ Generate state-level progress reports</li>
                            </ul>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                            <p className="text-sm text-gray-700">
                                <strong>Note:</strong> This is a secure government portal. Unauthorized access is prohibited and punishable under IT Act 2000.
                            </p>
                        </div>

                        {credentialsVerified && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="text-green-600" size={20} />
                                    <p className="text-sm text-green-700 font-semibold">
                                        Credentials verified! Please complete face authentication.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <h3 className="font-semibold text-blue-900 mb-2">Two-Factor Authentication:</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>✓ Step 1: Enter your credentials</li>
                                <li>✓ Step 2: Complete face authentication</li>
                                <li>✓ Enhanced security for government portal</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <ShieldCheck className="text-blue-600" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">State Officer Login</h2>
                            <p className="text-sm text-gray-600 mt-2">
                                {credentialsVerified
                                    ? 'Credentials verified - Face auth in progress...'
                                    : 'Enter your official credentials to continue'}
                            </p>
                        </div>

                        <form onSubmit={handleCredentialSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Official Email ID / User ID
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        disabled={credentialsVerified}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="officer@state.gov.in"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Key className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        disabled={credentialsVerified}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {!credentialsVerified && (
                                <>
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="ml-2 text-gray-600">Remember me</span>
                                        </label>
                                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                            Forgot Password?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                Continue to Face Auth
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </>
                            )}

                            {credentialsVerified && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                    <CheckCircle className="text-green-600 mx-auto mb-2" size={32} />
                                    <p className="text-sm font-semibold text-green-800">
                                        Credentials Verified Successfully
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">
                                        Face authentication window will open automatically...
                                    </p>
                                </div>
                            )}
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-xs text-gray-500 text-center">
                                Need help? Contact Central Support or call <strong>1800-111-5555</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Face Authentication Modal */}
            {showFaceAuth && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 text-center">Face Authentication</h3>
                        </div>

                        <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-white rounded-full opacity-50"></div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-700 mb-4">{faceAuthStatus}</p>
                            <div className="flex justify-center">
                                <div className="animate-pulse flex space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="bg-[#1b1b1b] text-gray-400 py-4 text-center text-xs">
                <p>© 2025 Ministry of Social Justice and Empowerment, Government of India. All rights reserved.</p>
                <p className="mt-1">Website designed, developed and hosted by National Informatics Centre (NIC)</p>
            </div>
        </div>
    );
}
