import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, DollarSign, TrendingUp, CheckCircle, Filter, Search, Building2, Users, MapPin, Briefcase, ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BroadcastDisplay from '../../../shared/components/BroadcastDisplay';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const stateName = user.state || 'Maharashtra';

    // Filter states
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedBlock, setSelectedBlock] = useState('all');
    const [selectedComponent, setSelectedComponent] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedDistrict, setExpandedDistrict] = useState(null);
    const [expandedBlock, setExpandedBlock] = useState(null);

    // State budget - 10 Cr from Centre
    const stateBudget = {
        total: 1000, // 10 Cr in lakhs
        allocated: 900, // 9 Cr allocated to districts
        utilized: 675, // 6.75 Cr utilized
        available: 100 // 1 Cr available
    };

    // Mock data - Districts with hierarchical structure
    const districtsData = [
        {
            id: 1,
            name: 'Pune',
            allocated: 300,
            utilized: 225,
            blocks: [
                {
                    id: 1,
                    name: 'Haveli',
                    allocated: 100,
                    utilized: 75,
                    components: {
                        adarshgram: { allocated: 40, utilized: 30, projects: 5, beneficiaries: 250, agencies: 1 },
                        grantInAid: { allocated: 35, utilized: 28, projects: 8, beneficiaries: 180, agencies: 1 },
                        hosteller: { allocated: 25, utilized: 17, projects: 12, beneficiaries: 320, agencies: 1 }
                    },
                    agencies: [
                        { id: 1, name: 'Rural Development Agency', component: 'adarshgram', allocated: 40, utilized: 30, status: 'active', projects: 5 },
                        { id: 2, name: 'Education Support Foundation', component: 'grantInAid', allocated: 35, utilized: 28, status: 'active', projects: 8 },
                        { id: 3, name: 'Student Welfare Trust', component: 'hosteller', allocated: 25, utilized: 17, status: 'active', projects: 12 }
                    ]
                },
                {
                    id: 2,
                    name: 'Mulshi',
                    allocated: 80,
                    utilized: 60,
                    components: {
                        adarshgram: { allocated: 30, utilized: 22, projects: 4, beneficiaries: 200, agencies: 1 },
                        grantInAid: { allocated: 28, utilized: 20, projects: 6, beneficiaries: 150, agencies: 1 },
                        hosteller: { allocated: 22, utilized: 18, projects: 9, beneficiaries: 240, agencies: 1 }
                    },
                    agencies: [
                        { id: 4, name: 'Tribal Development Corp', component: 'adarshgram', allocated: 30, utilized: 22, status: 'active', projects: 4 },
                        { id: 5, name: 'Skill Training Institute', component: 'grantInAid', allocated: 28, utilized: 20, status: 'active', projects: 6 }
                    ]
                },
                {
                    id: 3,
                    name: 'Bhor',
                    allocated: 120,
                    utilized: 90,
                    components: {
                        adarshgram: { allocated: 45, utilized: 34, projects: 6, beneficiaries: 280, agencies: 1 },
                        grantInAid: { allocated: 42, utilized: 32, projects: 9, beneficiaries: 200, agencies: 1 },
                        hosteller: { allocated: 33, utilized: 24, projects: 14, beneficiaries: 360, agencies: 1 }
                    },
                    agencies: [
                        { id: 6, name: 'Village Development Society', component: 'adarshgram', allocated: 45, utilized: 34, status: 'active', projects: 6 },
                        { id: 7, name: 'Educational Aid Trust', component: 'grantInAid', allocated: 42, utilized: 32, status: 'active', projects: 9 }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Mumbai',
            allocated: 400,
            utilized: 320,
            blocks: [
                {
                    id: 4,
                    name: 'Kurla',
                    allocated: 150,
                    utilized: 120,
                    components: {
                        adarshgram: { allocated: 50, utilized: 40, projects: 6, beneficiaries: 300, agencies: 1 },
                        grantInAid: { allocated: 55, utilized: 45, projects: 10, beneficiaries: 220, agencies: 1 },
                        hosteller: { allocated: 45, utilized: 35, projects: 15, beneficiaries: 400, agencies: 1 }
                    },
                    agencies: [
                        { id: 8, name: 'Urban Development Agency', component: 'adarshgram', allocated: 50, utilized: 40, status: 'active', projects: 6 },
                        { id: 9, name: 'Community Education Trust', component: 'grantInAid', allocated: 55, utilized: 45, status: 'active', projects: 10 }
                    ]
                },
                {
                    id: 5,
                    name: 'Andheri',
                    allocated: 130,
                    utilized: 100,
                    components: {
                        adarshgram: { allocated: 45, utilized: 35, projects: 5, beneficiaries: 260, agencies: 1 },
                        grantInAid: { allocated: 48, utilized: 38, projects: 8, beneficiaries: 190, agencies: 1 },
                        hosteller: { allocated: 37, utilized: 27, projects: 12, beneficiaries: 330, agencies: 1 }
                    },
                    agencies: [
                        { id: 10, name: 'Social Welfare Agency', component: 'adarshgram', allocated: 45, utilized: 35, status: 'active', projects: 5 },
                        { id: 11, name: 'Education Development Board', component: 'grantInAid', allocated: 48, utilized: 38, status: 'active', projects: 8 }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: 'Nashik',
            allocated: 200,
            utilized: 130,
            blocks: [
                {
                    id: 6,
                    name: 'Igatpuri',
                    allocated: 100,
                    utilized: 65,
                    components: {
                        adarshgram: { allocated: 38, utilized: 25, projects: 4, beneficiaries: 220, agencies: 1 },
                        grantInAid: { allocated: 35, utilized: 22, projects: 7, beneficiaries: 160, agencies: 1 },
                        hosteller: { allocated: 27, utilized: 18, projects: 10, beneficiaries: 280, agencies: 1 }
                    },
                    agencies: [
                        { id: 12, name: 'Nashik Development Corp', component: 'adarshgram', allocated: 38, utilized: 25, status: 'active', projects: 4 },
                        { id: 13, name: 'Tribal Education Society', component: 'grantInAid', allocated: 35, utilized: 22, status: 'active', projects: 7 }
                    ]
                }
            ]
        }
    ];

    // Get filtered data
    const getFilteredData = () => {
        let data = districtsData;
        if (selectedDistrict !== 'all') {
            data = data.filter(d => d.name === selectedDistrict);
        }
        return data;
    };

    // Get component summary based on filters
    const getComponentSummary = () => {
        const summary = {
            adarshgram: { allocated: 0, utilized: 0, projects: 0, beneficiaries: 0, agencies: 0 },
            grantInAid: { allocated: 0, utilized: 0, projects: 0, beneficiaries: 0, agencies: 0 },
            hosteller: { allocated: 0, utilized: 0, projects: 0, beneficiaries: 0, agencies: 0 }
        };

        const filteredDistricts = getFilteredData();
        filteredDistricts.forEach(district => {
            district.blocks.forEach(block => {
                if (selectedBlock === 'all' || block.name === selectedBlock) {
                    Object.keys(summary).forEach(comp => {
                        summary[comp].allocated += block.components[comp].allocated;
                        summary[comp].utilized += block.components[comp].utilized;
                        summary[comp].projects += block.components[comp].projects;
                        summary[comp].beneficiaries += block.components[comp].beneficiaries;
                        summary[comp].agencies += block.components[comp].agencies;
                    });
                }
            });
        });

        return summary;
    };

    // Get all agencies based on filters
    const getAllAgencies = () => {
        const agencies = [];
        const filteredDistricts = getFilteredData();

        filteredDistricts.forEach(district => {
            district.blocks.forEach(block => {
                if (selectedBlock === 'all' || block.name === selectedBlock) {
                    block.agencies.forEach(agency => {
                        if (selectedComponent === 'all' || agency.component === selectedComponent) {
                            agencies.push({
                                ...agency,
                                district: district.name,
                                block: block.name
                            });
                        }
                    });
                }
            });
        });

        return agencies.filter(a =>
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.district.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const componentSummary = getComponentSummary();
    const allAgencies = getAllAgencies();

    // Get unique districts and blocks for filters
    const districts = ['all', ...districtsData.map(d => d.name)];
    const blocks = selectedDistrict === 'all'
        ? ['all']
        : ['all', ...districtsData.find(d => d.name === selectedDistrict)?.blocks.map(b => b.name) || []];

    const componentNames = {
        adarshgram: 'Adarshgram',
        grantInAid: 'Grant-in-Aid',
        hosteller: 'Hosteller'
    };

    return (
        <div className="space-y-6">
            <BroadcastDisplay role="state" />
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">State Dashboard - {stateName}</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Hierarchical fund management: State → Districts → Blocks → Components
                </p>
            </div>

            {/* State Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign size={32} className="opacity-80" />
                        <div className="text-right">
                            <p className="text-xs opacity-80 uppercase tracking-wider">State Total Budget</p>
                            <h3 className="text-3xl font-bold">₹{stateBudget.total / 100} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs opacity-90">{districtsData.length} Districts | From Centre</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle size={24} className="text-green-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Allocated to Districts</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{stateBudget.allocated / 100} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((stateBudget.allocated / stateBudget.total) * 100).toFixed(1)}% of total</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={24} className="text-indigo-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Utilized</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{stateBudget.utilized / 100} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((stateBudget.utilized / stateBudget.total) * 100).toFixed(1)}% of total</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={24} className="text-orange-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Available</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{stateBudget.available / 100} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((stateBudget.available / stateBudget.total) * 100).toFixed(1)}% remaining</div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={20} className="text-gray-600" />
                    <h3 className="font-bold text-gray-900">Filter by Location & Component</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">District</label>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => {
                                setSelectedDistrict(e.target.value);
                                setSelectedBlock('all');
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            {districts.map(district => (
                                <option key={district} value={district}>
                                    {district === 'all' ? 'All Districts' : district}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Block</label>
                        <select
                            value={selectedBlock}
                            onChange={(e) => setSelectedBlock(e.target.value)}
                            disabled={selectedDistrict === 'all'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                        >
                            {blocks.map(block => (
                                <option key={block} value={block}>
                                    {block === 'all' ? 'All Blocks' : block}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Component</label>
                        <select
                            value={selectedComponent}
                            onChange={(e) => setSelectedComponent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="all">All Components</option>
                            <option value="adarshgram">Adarshgram</option>
                            <option value="grantInAid">Grant-in-Aid</option>
                            <option value="hosteller">Hosteller</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Search Agencies</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Component Summary Cards - Fund Records for Each Component */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-green-600 rounded"></span>
                    PM-AJAY Components - Fund Records & Beneficiaries
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
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Working Agencies:</span>
                                <span className="font-semibold text-purple-700">{componentSummary.adarshgram.agencies}</span>
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
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Working Agencies:</span>
                                <span className="font-semibold text-purple-700">{componentSummary.grantInAid.agencies}</span>
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
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Working Agencies:</span>
                                <span className="font-semibold text-purple-700">{componentSummary.hosteller.agencies}</span>
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

            {/* Hierarchical View - Districts and Blocks */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-green-600 rounded"></span>
                    Hierarchical Fund Distribution
                </h2>
                <div className="space-y-4">
                    {getFilteredData().map(district => (
                        <div key={district.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div
                                className="bg-green-50 p-4 cursor-pointer hover:bg-green-100 transition-colors"
                                onClick={() => setExpandedDistrict(expandedDistrict === district.id ? null : district.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {expandedDistrict === district.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        <MapPin size={20} className="text-green-600" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{district.name}</h4>
                                            <p className="text-xs text-gray-600">{district.blocks.length} Blocks</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">₹{(district.allocated / 100).toFixed(2)} Cr</p>
                                        <p className="text-xs text-gray-600">Utilized: ₹{(district.utilized / 100).toFixed(2)} Cr</p>
                                    </div>
                                </div>
                            </div>

                            {expandedDistrict === district.id && (
                                <div className="p-4 bg-gray-50 space-y-3">
                                    {district.blocks.map(block => (
                                        <div key={block.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                            <div
                                                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                                onClick={() => setExpandedBlock(expandedBlock === block.id ? null : block.id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        {expandedBlock === block.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                                        <Building2 size={18} className="text-blue-600" />
                                                        <div>
                                                            <h5 className="font-semibold text-gray-900">{block.name}</h5>
                                                            <p className="text-xs text-gray-600">{block.agencies.length} Agencies</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-gray-900">₹{(block.allocated / 100).toFixed(2)} Cr</p>
                                                        <p className="text-xs text-gray-600">Utilized: ₹{(block.utilized / 100).toFixed(2)} Cr</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {expandedBlock === block.id && (
                                                <div className="p-3 bg-gray-50">
                                                    {/* Component breakdown */}
                                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                                        {Object.keys(block.components).map(comp => (
                                                            <div key={comp} className="bg-white rounded p-3 border border-gray-200">
                                                                <p className="text-xs font-semibold text-gray-700 mb-1">{componentNames[comp]}</p>
                                                                <p className="text-xs text-gray-600">₹{(block.components[comp].allocated / 100).toFixed(2)} Cr</p>
                                                                <p className="text-xs text-green-600">Used: ₹{(block.components[comp].utilized / 100).toFixed(2)} Cr</p>
                                                                <p className="text-xs text-blue-600">{block.components[comp].projects} projects</p>
                                                                <p className="text-xs text-orange-600">{block.components[comp].beneficiaries} beneficiaries</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Agencies */}
                                                    <div className="border-t border-gray-200 pt-2">
                                                        <p className="text-xs font-semibold text-gray-700 mb-2">Working Agencies ({block.agencies.length})</p>
                                                        <div className="space-y-1">
                                                            {block.agencies.map(agency => (
                                                                <div key={agency.id} className="flex items-center justify-between text-xs bg-blue-50 rounded p-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <Briefcase size={14} className="text-blue-600" />
                                                                        <span className="font-medium text-gray-900">{agency.name}</span>
                                                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                                                            {componentNames[agency.component]}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-gray-600">₹{(agency.allocated / 100).toFixed(2)} Cr</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Working Agencies Details Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-green-600 rounded"></span>
                        Working Agencies Details ({allAgencies.length})
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Agency Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Component</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Projects</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Allocated</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Utilized</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Utilization %</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {allAgencies.map((agency, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{agency.name}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                            {componentNames[agency.component]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {agency.block}, {agency.district}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{agency.projects}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{(agency.allocated / 100).toFixed(2)} Cr</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-green-700">₹{(agency.utilized / 100).toFixed(2)} Cr</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full"
                                                    style={{ width: `${(agency.utilized / agency.allocated) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">
                                                {((agency.utilized / agency.allocated) * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {agency.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
