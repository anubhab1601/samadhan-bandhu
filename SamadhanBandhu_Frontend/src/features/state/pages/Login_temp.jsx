import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, User, Key } from 'lucide-react';
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response?.data?.error || error.message);
            alert('Login failed: ' + (error.response?.data?.error || 'Server error'));
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async (role) => {
        const demoCredentials = {
            centre: { email: 'admin@gov.in', password: '123456' },
            state: { email: 'ka_admin@gov.in', password: '123456' },
            agency: { email: 'agency@ngo.org', password: '123456' }
        };

        const creds = demoCredentials[role];
        setEmail(creds.email);
        setPassword(creds.password);

        // Auto-submit after a brief delay
        setTimeout(() => {
            handleLogin({ preventDefault: () => { } });
        }, 500);
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
                            <div className="text-xs text-orange-600 font-semibold tracking-wide">PM-AJAY UNIFIED PLATFORM</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Swachh_Bharat_Mission_Logo.svg"
                            alt="Swachh Bharat"
                            className="h-12 opacity-90"
                        />
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
                                Welcome to <span className="text-blue-600">PM-AJAY</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Unified Monitoring and Management Platform for Pradhan Mantri Anusuchit Jaati Abhyuday Yojana
                            </p>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                            <h3 className="font-bold text-gray-900 mb-3">Quick Demo Access</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Try the platform with pre-configured demo accounts:
                            </p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleDemoLogin('centre')}
                                    className="w-full px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 font-medium text-sm flex items-center justify-between"
                                >
                                    <span>Centre Admin Demo</span>
                                    <ArrowRight size={16} />
                                </button>
                                <button
                                    onClick={() => handleDemoLogin('state')}
                                    className="w-full px-4 py-2 bg-white border border-green-300 text-green-700 rounded-md hover:bg-green-50 font-medium text-sm flex items-center justify-between"
                                >
                                    <span>State Admin Demo</span>
                                    <ArrowRight size={16} />
                                </button>
                                <button
                                    onClick={() => handleDemoLogin('agency')}
                                    className="w-full px-4 py-2 bg-white border border-orange-300 text-orange-700 rounded-md hover:bg-orange-50 font-medium text-sm flex items-center justify-between"
                                >
                                    <span>Agency User Demo</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                            <p className="text-sm text-gray-700">
                                <strong>Note:</strong> This is a secure government portal. Unauthorized access is prohibited and punishable under IT Act 2000.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <Lock className="text-blue-600" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Login to Portal</h2>
                            <p className="text-sm text-gray-600 mt-2">Enter your credentials to access the system</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address / User ID
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="your.email@gov.in"
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

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
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                New user? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Register here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#1b1b1b] text-gray-400 py-4 text-center text-xs">
                <p>© 2025 Ministry of Social Justice and Empowerment, Government of India. All rights reserved.</p>
                <p className="mt-1">Website designed, developed and hosted by National Informatics Centre (NIC)</p>
            </div>
        </div>
    );
}
