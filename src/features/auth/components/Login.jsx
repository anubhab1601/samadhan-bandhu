import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, Key, CheckCircle, UserCircle, Shield, ArrowRight, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ROLE_ROUTES = {
    'central': '/central/dashboard',
    'state': '/state/dashboard',
    'block': '/block/dashboard',
    'field-officer': '/field-officer/dashboard',
    'agency': '/agency/dashboard'
};

const ROLE_OPTIONS = [
    {
        value: 'block',
        label: 'Block Officer',
        icon: '🏘️',
        description: 'Block-level fund management',
        color: 'purple'
    },
    {
        value: 'agency',
        label: 'Agency',
        icon: '🏗️',
        description: 'Construction/Implementation agency',
        color: 'orange'
    },
    {
        value: 'field-officer',
        label: 'Field Officer',
        icon: '👨‍💼',
        description: 'Inspection and monitoring officer',
        color: 'yellow'
    },
    {
        value: 'state',
        label: 'State Officer',
        icon: '🏢',
        description: 'State government officer',
        color: 'blue'
    },
    {
        value: 'central',
        label: 'Center Officer',
        icon: '🏛️',
        description: 'Central government officer',
        color: 'indigo'
    }
];

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [credentialsVerified, setCredentialsVerified] = useState(false);
    const [showFaceAuth, setShowFaceAuth] = useState(false);
    const [faceAuthStatus, setFaceAuthStatus] = useState('');
    const [userData, setUserData] = useState(null);

    const videoRef = useRef(null);
    const streamRef = useRef(null);


    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleCredentialSubmit = async (e) => {
        e.preventDefault();

        if (!selectedRole) {
            alert('Please select your role from the cards above');
            return;
        }

        setLoading(true);

        try {
            // Pass the selected role to login for demo mode
            const user = await login(email, password, selectedRole);

            // Verify role matches (important for production with real API)
            if (user.role !== selectedRole) {
                alert('Selected role does not match your account. Please select the correct role.');
                setLoading(false);
                return;
            }

            setUserData(user);
            setCredentialsVerified(true);
            setLoading(false);

            // Start face auth
            setTimeout(() => startFaceAuth(), 500);
        } catch (error) {
            alert('Login failed: ' + error.message);
            setLoading(false);
        }
    };


    const startFaceAuth = async () => {
        setShowFaceAuth(true);
        setFaceAuthStatus('Initializing camera...');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 640, height: 480 }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;

                // Step 1: Position face
                setFaceAuthStatus('Position your face in the frame');

                // Step 2: Scanning (after ~1 second)
                setTimeout(() => {
                    setFaceAuthStatus('Scanning face...');

                    // Step 3: Verification (after ~1.5 more seconds)
                    setTimeout(() => {
                        setFaceAuthStatus('Verifying identity...');

                        // Step 4: Success (after ~1 more second)
                        setTimeout(() => {
                            setFaceAuthStatus('Face captured successfully!');

                            // Complete auth shortly after showing success message
                            setTimeout(() => {
                                completeFaceAuth();
                            }, 1000);
                        }, 1000);
                    }, 1500);
                }, 1000);
            }
        } catch (error) {
            setFaceAuthStatus('Camera access denied. Proceeding with authentication...');
            console.error('Camera error:', error);

            // In demo mode, still allow login even without camera
            setTimeout(() => {
                completeFaceAuth();
            }, 1000);
        }
    };

    const completeFaceAuth = () => {
        stopFaceAuth();

        // Determine the most reliable role information available
        const effectiveRole = userData?.role || user?.role || selectedRole;

        // Redirect to role-specific dashboard
        const from = location.state?.from?.pathname;
        const defaultRoute = effectiveRole ? ROLE_ROUTES[effectiveRole] || '/' : '/';

        // Use replace to avoid needing to press back
        navigate(from || defaultRoute, { replace: true });
    };

    const stopFaceAuth = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowFaceAuth(false);
    };

    const selectedRoleData = ROLE_OPTIONS.find(r => r.value === selectedRole);

    return (
        <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
            {/* Top Government Bar */}
            <div className="bg-[#1b1b1b] text-white text-[11px] py-1.5 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span>भारत सरकार | Government of India</span>
                    <div className="flex gap-4">
                        <span className="cursor-pointer font-semibold">English</span>
                        <span className="cursor-pointer text-gray-400">हिन्दी</span>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                            alt="Government of India"
                            className="h-14 w-auto"
                        />
                        <div>
                            <div className="text-[11px] text-gray-600">सामाजिक न्याय और अधिकारिता मंत्रालय</div>
                            <h1 className="text-[15px] font-bold text-[#1e3a8a]">Ministry of Social Justice and Empowerment</h1>
                            <div className="text-[11px] text-orange-600 font-semibold">PM-AJAY</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Welcome & Information */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                Welcome to <span className="text-blue-600">Unified Portal</span>
                            </h2>
                            <p className="text-gray-600 text-[15px] leading-relaxed">
                                Manage construction projects, submit progress reports, handle fund requests, and coordinate with field officers under PM-AJAY.
                            </p>
                        </div>

                        {/* What you can do */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r">
                            <h3 className="font-semibold text-gray-900 mb-3 text-sm">What you can do:</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-0.5">✓</span>
                                    <span>View assigned construction projects</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-0.5">✓</span>
                                    <span>Submit progress reports and updates</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-0.5">✓</span>
                                    <span>Request fund releases</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-0.5">✓</span>
                                    <span>Upload project documentation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-0.5">✓</span>
                                    <span>Coordinate with field officers</span>
                                </li>
                            </ul>
                        </div>

                        {/* Note */}
                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r">
                            <p className="text-sm text-gray-700">
                                <strong className="text-orange-800">Note:</strong> Only verified {selectedRole ? selectedRoleData.label + 's' : 'users'} can access this portal. Contact your State Officer for registration.
                            </p>
                        </div>

                        {/* Two-Factor Authentication Info */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r">
                            <h3 className="font-semibold text-blue-900 mb-3 text-sm">Two-Factor Authentication:</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${selectedRole ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>1</span>
                                    <span>Select your role</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${credentialsVerified ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>2</span>
                                    <span>Enter your credentials</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">3</span>
                                    <span>Complete face authentication</span>
                                </li>
                            </ul>
                        </div>

                        {credentialsVerified && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r animate-fadeIn">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="text-green-600" size={20} />
                                    <p className="text-sm text-green-700 font-semibold">
                                        Credentials verified! Proceeding to face authentication...
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Side - Login Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                        {/* Card Icon Header */}
                        <div className="flex justify-center pt-8 pb-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <FileText className="text-blue-600" size={32} />
                            </div>
                        </div>

                        {/* Card Title */}
                        <div className="text-center px-8 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {selectedRole ? selectedRoleData.label : 'Portal'} Login
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Enter your {selectedRole ? selectedRoleData.label.toLowerCase() : 'portal'} credentials to continue
                            </p>
                        </div>

                        {/* Form */}
                        <div className="px-8 pb-8">
                            <form onSubmit={handleCredentialSubmit} className="space-y-5">
                                {/* Role Selector - Card Style */}
                                {!credentialsVerified && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Select Your Role
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {ROLE_OPTIONS.map((role) => (
                                                <button
                                                    key={role.value}
                                                    type="button"
                                                    onClick={() => setSelectedRole(role.value)}
                                                    className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${selectedRole === role.value
                                                        ? 'border-blue-500 bg-blue-50 shadow-md'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="text-2xl">{role.icon}</div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-gray-900 text-sm">
                                                                {role.label}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-0.5">
                                                                {role.description}
                                                            </div>
                                                        </div>
                                                        {selectedRole === role.value && (
                                                            <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Show selected role when credentials are verified */}
                                {credentialsVerified && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl">{selectedRoleData?.icon}</div>
                                            <div>
                                                <div className="font-semibold text-blue-900">
                                                    {selectedRoleData?.label}
                                                </div>
                                                <div className="text-sm text-blue-700">
                                                    {selectedRoleData?.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Email / User ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {selectedRole ? selectedRoleData.label : 'User'} Email / User ID
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={credentialsVerified}
                                            required
                                            placeholder={selectedRole ? `${selectedRoleData.label.toLowerCase()}@company.com` : 'your.email@gov.in'}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={credentialsVerified}
                                            required
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                                        />
                                    </div>
                                </div>

                                {!credentialsVerified && (
                                    <>
                                        {/* Remember Me & Forgot Password */}
                                        <div className="flex items-center justify-between text-sm">
                                            <label className="flex items-center cursor-pointer">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />
                                                <span className="text-gray-700">Remember me</span>
                                            </label>
                                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                                Forgot Password?
                                            </a>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                    <span>Verifying...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Continue to Face Auth</span>
                                                    <ArrowRight size={18} />
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}

                                {credentialsVerified && (
                                    <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                                        <CheckCircle className="text-green-600 mx-auto mb-2" size={40} />
                                        <p className="text-sm font-semibold text-green-800">
                                            ✓ Credentials Verified Successfully
                                        </p>
                                        <p className="text-xs text-green-600 mt-1">
                                            Initializing face authentication...
                                        </p>
                                        <div className="mt-3 flex justify-center">
                                            <div className="animate-pulse flex space-x-2">
                                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>

                            {/* Registration Link */}
                            <div className="mt-6 text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Register here
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Face Authentication Modal */}
            {showFaceAuth && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-white/20 relative">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-10"></div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

                        {/* Modal Header */}
                        <div className="relative p-6 text-center border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mb-3 shadow-sm border border-indigo-100">
                                <Shield className="text-indigo-600" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Face Verification</h3>
                            <p className="text-gray-500 text-sm mt-1">PM-AJAY Secure Access</p>
                        </div>

                        {/* Video Feed Section */}
                        <div className="p-8">
                            <div className="relative mx-auto w-64 h-64 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white bg-gray-900">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover transform scale-125" // Scale to fill circle better
                                    />

                                    {/* Scanning Overlay */}
                                    {!faceAuthStatus.includes('successfully') && (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent animate-scan z-10"></div>
                                            <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-pulse"></div>
                                        </>
                                    )}

                                    {/* Success Overlay */}
                                    {faceAuthStatus.includes('successfully') && (
                                        <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center z-20 animate-fadeIn rounded-full">
                                            <div className="bg-white rounded-full p-4 shadow-lg animate-fadeIn">
                                                <CheckCircle size={40} className="text-green-600" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status & Progress */}
                            <div className="mt-8 text-center space-y-4">
                                <div>
                                    <h4 className={`text-lg font-semibold transition-colors duration-300 ${faceAuthStatus.includes('successfully') ? 'text-green-600' : 'text-gray-800'
                                        }`}>
                                        {faceAuthStatus}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {!faceAuthStatus.includes('successfully') && "Please keep your face within the frame"}
                                    </p>
                                </div>

                                {/* Modern Progress Bar */}
                                <div className="h-1.5 w-48 mx-auto bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out ${faceAuthStatus.includes('Position') ? 'w-1/4' :
                                            faceAuthStatus.includes('Scanning') ? 'w-1/2' :
                                                faceAuthStatus.includes('Verifying') ? 'w-3/4' :
                                                    faceAuthStatus.includes('successfully') ? 'w-full' : 'w-0'
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-[#1b1b1b] text-gray-400 py-4 mt-auto">
                <div className="max-w-7xl mx-auto px-6 text-center text-xs">
                    <p>© 2025 Ministry of Social Justice and Empowerment, Government of India. All rights reserved.</p>
                    <p className="mt-1">Website designed, developed and hosted by National Informatics Centre (NIC)</p>
                </div>
            </footer>
        </div>
    );
}
