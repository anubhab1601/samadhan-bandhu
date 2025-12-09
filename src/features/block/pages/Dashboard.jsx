import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, Building2, Users, MapPin, Filter, Search, ChevronDown, ChevronRight, Briefcase, FileText, CheckCircle, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BroadcastDisplay from '../../../shared/components/BroadcastDisplay';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const blockName = user.block || 'Haveli Block';
    const districtName = user.district || 'Pune';
    const stateName = user.state || 'Maharashtra';

    // Filter states
    const [selectedVillage, setSelectedVillage] = useState('all');
    const [selectedComponent, setSelectedComponent] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedVillage, setExpandedVillage] = useState(null);

    // Block budget - Received from State
    const blockBudget = {
        total: 100, // 1 Cr from State
        allocated: 90, // 90 lakhs allocated to villages
        utilized: 68, // 68 lakhs utilized
        available: 10 // 10 lakhs available
    };

    // Mock data - Villages with 3 PM-AJAY components
    const villagesData = [
        {
            id: 1,
            name: 'Shirdi Village',
            population: 5000,
            scPopulation: 2800,
            allocated: 40,
            utilized: 30,
            components: {
                adarshgram: {
                    allocated: 15,
                    utilized: 11,
                    projects: 2,
                    beneficiaries: 150,
                    status: 'active'
                },
                grantInAid: {
                    allocated: 14,
                    utilized: 11,
                    projects: 3,
                    beneficiaries: 95,
                    status: 'active'
                },
                hosteller: {
                    allocated: 11,
                    utilized: 8,
                    projects: 4,
                    beneficiaries: 120,
                    status: 'active'
                }
            }
        },
        {
            id: 2,
            name: 'Khed Village',
            population: 3500,
            scPopulation: 1960,
            allocated: 30,
            utilized: 23,
            components: {
                adarshgram: {
                    allocated: 11,
                    utilized: 8,
                    projects: 2,
                    beneficiaries: 110,
                    status: 'active'
                },
                grantInAid: {
                    allocated: 10,
                    utilized: 8,
                    projects: 2,
                    beneficiaries: 70,
                    status: 'active'
                },
                hosteller: {
                    allocated: 9,
                    utilized: 7,
                    projects: 3,
                    beneficiaries: 90,
                    status: 'active'
                }
            }
        },
        {
            id: 3,
            name: 'Rajgurunagar',
            population: 4200,
            scPopulation: 2352,
            allocated: 20,
            utilized: 15,
            components: {
                adarshgram: {
                    allocated: 7,
                    utilized: 5,
                    projects: 1,
                    beneficiaries: 80,
                    status: 'active'
                },
                grantInAid: {
                    allocated: 7,
                    utilized: 5,
                    projects: 2,
                    beneficiaries: 60,
                    status: 'active'
                },
                hosteller: {
                    allocated: 6,
                    utilized: 5,
                    projects: 2,
                    beneficiaries: 70,
                    status: 'active'
                }
            }
        }
    ];

    // Get filtered data
    const getFilteredData = () => {
        let data = villagesData;
        if (selectedVillage !== 'all') {
            data = data.filter(v => v.name === selectedVillage);
        }
        return data;
    };

    // Get component summary
    const getComponentSummary = () => {
        const summary = {
            adarshgram: { allocated: 0, utilized: 0, projects: 0, beneficiaries: 0 },
            grantInAid: { allocated: 0, utilized: 0, projects: 0, beneficiaries: 0 },
            hosteller: { allocated: 0, utilized: 0, projects: 0, beneficiaries: 0 }
        };

        const filteredVillages = getFilteredData();
        filteredVillages.forEach(village => {
            Object.keys(summary).forEach(comp => {
                summary[comp].allocated += village.components[comp].allocated;
                summary[comp].utilized += village.components[comp].utilized;
                summary[comp].projects += village.components[comp].projects;
                summary[comp].beneficiaries += village.components[comp].beneficiaries;
            });
        });

        return summary;
    };

    const componentSummary = getComponentSummary();
    const villages = ['all', ...villagesData.map(v => v.name)];

    const componentNames = {
        adarshgram: 'Adarshgram',
        grantInAid: 'Grant-in-Aid',
        hosteller: 'Hosteller'
    };

    return (
        <div className="space-y-6">
            <BroadcastDisplay role="block" />
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-purple-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Block Dashboard - {blockName}</h1>
                <p className="text-sm text-gray-600 mt-1">
                    {districtName} District, {stateName} | Fund Distribution: Block → Villages → Components
                </p>
            </div>

            {/* Block Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign size={32} className="opacity-80" />
                        <div className="text-right">
                            <p className="text-xs opacity-80 uppercase tracking-wider">Block Total Budget</p>
                            <h3 className="text-3xl font-bold">₹{blockBudget.total / 100} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs opacity-90">{villagesData.length} Villages | From State</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle size={24} className="text-green-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Allocated to Villages</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{blockBudget.allocated / 100} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((blockBudget.allocated / blockBudget.total) * 100).toFixed(1)}% of total</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={24} className="text-indigo-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Utilized</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{blockBudget.utilized / 100} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((blockBudget.utilized / blockBudget.total) * 100).toFixed(1)}% of total</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={24} className="text-orange-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Available</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{blockBudget.available / 100} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((blockBudget.available / blockBudget.total) * 100).toFixed(1)}% remaining</div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={20} className="text-gray-600" />
                    <h3 className="font-bold text-gray-900">Filter by Village & Component</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Village</label>
                        <select
                            value={selectedVillage}
                            onChange={(e) => setSelectedVillage(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            {villages.map(village => (
                                <option key={village} value={village}>
                                    {village === 'all' ? 'All Villages' : village}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Component</label>
                        <select
                            value={selectedComponent}
                            onChange={(e) => setSelectedComponent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="all">All Components</option>
                            <option value="adarshgram">Adarshgram</option>
                            <option value="grantInAid">Grant-in-Aid</option>
                            <option value="hosteller">Hosteller</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search villages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Component Summary Cards */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-600 rounded"></span>
                    PM-AJAY Components - Village-wise Fund Distribution
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md border-l-4 border-l-blue-500 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Building2 size={28} className="text-blue-600" />
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                {componentSummary.adarshgram.projects} Projects
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Adarshgram</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Allocated:</span>
                                <span className="font-semibold text-gray-900">₹{(componentSummary.adarshgram.allocated / 100).toFixed(2)} Cr</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Utilized:</span>
                                <span className="font-semibold text-green-700">₹{(componentSummary.adarshgram.utilized / 100).toFixed(2)} Cr</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Beneficiaries:</span>
                                <span className="font-semibold text-blue-700">{componentSummary.adarshgram.beneficiaries}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${(componentSummary.adarshgram.utilized / componentSummary.adarshgram.allocated) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md border-l-4 border-l-green-500 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <FileText size={28} className="text-green-600" />
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                {componentSummary.grantInAid.projects} Projects
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Grant-in-Aid</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Allocated:</span>
                                <span className="font-semibold text-gray-900">₹{(componentSummary.grantInAid.allocated / 100).toFixed(2)} Cr</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Utilized:</span>
                                <span className="font-semibold text-green-700">₹{(componentSummary.grantInAid.utilized / 100).toFixed(2)} Cr</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Beneficiaries:</span>
                                <span className="font-semibold text-blue-700">{componentSummary.grantInAid.beneficiaries}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${(componentSummary.grantInAid.utilized / componentSummary.grantInAid.allocated) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md border-l-4 border-l-orange-500 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Users size={28} className="text-orange-600" />
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                                {componentSummary.hosteller.projects} Projects
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Hosteller</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Allocated:</span>
                                <span className="font-semibold text-gray-900">₹{(componentSummary.hosteller.allocated / 100).toFixed(2)} Cr</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Utilized:</span>
                                <span className="font-semibold text-green-700">₹{(componentSummary.hosteller.utilized / 100).toFixed(2)} Cr</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Beneficiaries:</span>
                                <span className="font-semibold text-blue-700">{componentSummary.hosteller.beneficiaries}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div
                                    className="bg-orange-600 h-2 rounded-full"
                                    style={{ width: `${(componentSummary.hosteller.utilized / componentSummary.hosteller.allocated) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Village-wise Fund Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-600 rounded"></span>
                    Village-wise Fund Distribution
                </h2>
                <div className="space-y-4">
                    {getFilteredData().map(village => (
                        <div key={village.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div
                                className="bg-purple-50 p-4 cursor-pointer hover:bg-purple-100 transition-colors"
                                onClick={() => setExpandedVillage(expandedVillage === village.id ? null : village.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {expandedVillage === village.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        <MapPin size={20} className="text-purple-600" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{village.name}</h4>
                                            <p className="text-xs text-gray-600">Population: {village.population} | SC: {village.scPopulation} ({((village.scPopulation / village.population) * 100).toFixed(1)}%)</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">₹{(village.allocated / 100).toFixed(2)} Cr</p>
                                        <p className="text-xs text-gray-600">Utilized: ₹{(village.utilized / 100).toFixed(2)} Cr</p>
                                    </div>
                                </div>
                            </div>

                            {expandedVillage === village.id && (
                                <div className="p-4 bg-gray-50">
                                    {/* Component breakdown */}
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        {Object.keys(village.components).map(comp => (
                                            <div key={comp} className="bg-white rounded-lg p-4 border border-gray-200">
                                                <p className="text-xs font-semibold text-gray-700 mb-2">{componentNames[comp]}</p>
                                                <p className="text-sm text-gray-600">Allocated: ₹{(village.components[comp].allocated / 100).toFixed(2)} Cr</p>
                                                <p className="text-sm text-green-600">Utilized: ₹{(village.components[comp].utilized / 100).toFixed(2)} Cr</p>
                                                <p className="text-sm text-blue-600">{village.components[comp].projects} projects</p>
                                                <p className="text-sm text-orange-600">{village.components[comp].beneficiaries} beneficiaries</p>
                                                <div className="mt-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${village.components[comp].status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {village.components[comp].status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/block/fund-management?village=${village.name}`}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
                                        >
                                            Manage Funds
                                        </Link>
                                        <Link
                                            to={`/block/ongoing-projects?village=${village.name}`}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                                        >
                                            View Projects
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-600 rounded"></span>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/block/fund-management" className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center">
                        <DollarSign size={32} className="mx-auto text-purple-600 mb-2" />
                        <p className="font-semibold text-gray-900 text-sm">Fund Management</p>
                    </Link>
                    <Link to="/block/ongoing-projects" className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                        <Building2 size={32} className="mx-auto text-blue-600 mb-2" />
                        <p className="font-semibold text-gray-900 text-sm">Ongoing Projects</p>
                    </Link>
                    <Link to="/block/tenders" className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center">
                        <FileText size={32} className="mx-auto text-green-600 mb-2" />
                        <p className="font-semibold text-gray-900 text-sm">Tenders</p>
                    </Link>
                    <Link to="/block/notifications" className="p-4 border-2 border-orange-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-center">
                        <Users size={32} className="mx-auto text-orange-600 mb-2" />
                        <p className="font-semibold text-gray-900 text-sm">Notifications</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
