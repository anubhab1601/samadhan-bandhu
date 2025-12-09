import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Shield, Lock, RefreshCw } from 'lucide-react';

export default function FundTransaction() {
    const location = useLocation();
    const navigate = useNavigate();
    const { request } = location.state || {};

    const [step, setStep] = useState(1); // 1: Details, 2: OTP + Captcha, 3: Success
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [showVerified, setShowVerified] = useState(false);

    const otpRefs = useRef([]);

    useEffect(() => {
        if (!request) {
            navigate('/central/funds');
        }
    }, [request, navigate]);

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(result);
        setCaptchaInput('');
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const verifyOtpAndCaptcha = () => {
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            alert('Please enter complete OTP');
            return;
        }

        if (captchaInput !== captcha) {
            alert('Captcha does not match. Please try again.');
            generateCaptcha();
            return;
        }

        // Show verification success
        setShowVerified(true);

        // Move to success after 2 seconds
        setTimeout(() => {
            setStep(3);
            // Redirect after 3 more seconds
            setTimeout(() => {
                navigate('/central/funds');
            }, 3000);
        }, 2000);
    };

    if (!request) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Progress Steps */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex items-center justify-between">
                        {['Transaction Details', 'Verification', 'Complete'].map((label, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step > index + 1 ? 'bg-green-500 text-white' :
                                        step === index + 1 ? 'bg-blue-500 text-white' :
                                            'bg-gray-200 text-gray-500'
                                    }`}>
                                    {step > index + 1 ? <Check size={20} /> : index + 1}
                                </div>
                                {index < 2 && (
                                    <div className={`w-32 h-1 mx-2 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 1: Transaction Details */}
                {step === 1 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Fund Release Details</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between py-3 border-b">
                                <span className="text-gray-600">Request ID</span>
                                <span className="font-bold text-gray-900">{request.id}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b">
                                <span className="text-gray-600">Project</span>
                                <span className="font-bold text-gray-900">{request.project}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b">
                                <span className="text-gray-600">State</span>
                                <span className="font-bold text-gray-900">{request.state}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b">
                                <span className="text-gray-600">Approved Amount</span>
                                <span className="font-bold text-green-600 text-xl">₹{request.approvedAmount}</span>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-yellow-800">
                                <Shield className="inline mr-2" size={16} />
                                This transaction requires OTP and Captcha verification for security.
                            </p>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
                        >
                            Proceed to Verification
                        </button>
                    </div>
                )}

                {/* Step 2: OTP + Captcha Verification */}
                {step === 2 && !showVerified && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="text-blue-600" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Required</h2>
                            <p className="text-gray-600">Enter OTP and Captcha to complete the transaction</p>
                        </div>

                        {/* OTP Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Enter OTP</label>
                            <div className="flex justify-center gap-3 mb-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => otpRefs.current[index] = el}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 text-center">Code sent to your registered mobile number</p>
                        </div>

                        {/* Captcha Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Enter Captcha</label>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-1 bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center">
                                    <span className="text-2xl font-bold text-gray-800 tracking-widest select-none" style={{
                                        fontFamily: 'monospace',
                                        letterSpacing: '8px',
                                        textDecoration: 'line-through',
                                        textDecorationStyle: 'wavy'
                                    }}>
                                        {captcha}
                                    </span>
                                </div>
                                <button
                                    onClick={generateCaptcha}
                                    className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300"
                                    title="Refresh Captcha"
                                >
                                    <RefreshCw size={20} className="text-gray-700" />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value)}
                                placeholder="Enter captcha code"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-bold"
                            />
                        </div>

                        <button
                            onClick={verifyOtpAndCaptcha}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 mb-3"
                        >
                            Verify & Complete Transaction
                        </button>

                        <button
                            onClick={() => setStep(1)}
                            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                    </div>
                )}

                {/* Verification Success Message */}
                {step === 2 && showVerified && (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <Check className="text-green-600" size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">OTP Verified Successfully!</h2>
                        <p className="text-gray-600">Processing your transaction...</p>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="text-green-600" size={48} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Transaction Successful!</h2>
                        <p className="text-gray-600 mb-4">Fund release has been completed successfully</p>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600 mb-2">Transaction ID</p>
                            <p className="text-xl font-bold text-gray-900">TXN-{Math.floor(Math.random() * 1000000)}</p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-green-800">
                                ✓ Amount: ₹{request.approvedAmount}<br />
                                ✓ Project: {request.project}<br />
                                ✓ State: {request.state}
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">Redirecting to Fund Allocation page...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
