import React, { useState } from 'react';
import { Users, Search, Filter, Plus, UserCheck, UserX, Phone, Mail, Calendar, Briefcase, X, Check } from 'lucide-react';

export default function Workers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSkill, setFilterSkill] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterProject, setFilterProject] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);

    const [workers, setWorkers] = useState([
        {
            id: 'WKR-001',
            name: 'Rajesh Kumar',
            skill: 'Mason',
            phone: '+91 98765 43210',
            email: 'rajesh.kumar@example.com',
            status: 'active',
            project: 'School Building Renovation',
            joinDate: '2025-10-01',
            dailyWage: 800,
            attendance: 95,
            experience: '8 years',
            address: 'Daund, Pune',
            emergencyContact: '+91 98765 43211'
        },
        {
            id: 'WKR-002',
            name: 'Suresh Patil',
            skill: 'Carpenter',
            phone: '+91 98765 43211',
            email: 'suresh.patil@example.com',
            status: 'active',
            project: 'School Building Renovation',
            joinDate: '2025-10-05',
            dailyWage: 750,
            attendance: 92,
            experience: '6 years',
            address: 'Khed, Pune',
            emergencyContact: '+91 98765 43212'
        },
        {
            id: 'WKR-003',
            name: 'Amit Sharma',
            skill: 'Electrician',
            phone: '+91 98765 43212',
            email: 'amit.sharma@example.com',
            status: 'active',
            project: 'School Building Renovation',
            joinDate: '2025-10-10',
            dailyWage: 850,
            attendance: 98,
            experience: '10 years',
            address: 'Shirur, Pune',
            emergencyContact: '+91 98765 43213'
        }
    ]);

    const [newWorker, setNewWorker] = useState({
        name: '',
        skill: '',
        phone: '',
        email: '',
        project: '',
        dailyWage: '',
        experience: '',
        address: '',
        emergencyContact: ''
    });

    const [attendanceData, setAttendanceData] = useState({
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        hours: 8,
        notes: ''
    });

    const skills = ['All Skills', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Helper', 'Painter', 'Welder'];
    const projects = ['All Projects', 'School Building Renovation', 'Village Community Center'];

    const filteredWorkers = workers.filter(worker => {
        const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.phone.includes(searchTerm);
        const matchesSkill = filterSkill === 'all' || worker.skill === filterSkill;
        const matchesStatus = filterStatus === 'all' || worker.status === filterStatus;
        const matchesProject = filterProject === 'all' || worker.project === filterProject;
        return matchesSearch && matchesSkill && matchesStatus && matchesProject;
    });

    const handleAddWorker = (e) => {
        e.preventDefault();
        const worker = {
            id: `WKR-${String(workers.length + 1).padStart(3, '0')}`,
            ...newWorker,
            status: 'active',
            joinDate: new Date().toISOString().split('T')[0],
            attendance: 100
        };
        setWorkers([...workers, worker]);
        setShowAddModal(false);
        setNewWorker({
            name: '',
            skill: '',
            phone: '',
            email: '',
            project: '',
            dailyWage: '',
            experience: '',
            address: '',
            emergencyContact: ''
        });
    };

    const handleViewDetails = (worker) => {
        setSelectedWorker(worker);
        setShowDetailsModal(true);
    };

    const handleAttendance = (worker) => {
        setSelectedWorker(worker);
        setShowAttendanceModal(true);
    };

    const handleSubmitAttendance = (e) => {
        e.preventDefault();
        // Here you would save attendance data
        alert(`Attendance marked for ${selectedWorker.name}`);
        setShowAttendanceModal(false);
        setAttendanceData({
            date: new Date().toISOString().split('T')[0],
            status: 'present',
            hours: 8,
            notes: ''
        });
    };

    const getStatusBadge = (status) => {
        return status === 'active' ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                <UserCheck size={14} />
                Active
            </span>
        ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                <UserX size={14} />
                Inactive
            </span>
        );
    };

    const stats = {
        total: workers.length,
        active: workers.filter(w => w.status === 'active').length,
        inactive: workers.filter(w => w.status === 'inactive').length,
        avgAttendance: Math.round(workers.reduce((sum, w) => sum + w.attendance, 0) / workers.length),
        totalWages: workers.filter(w => w.status === 'active').reduce((sum, w) => sum + w.dailyWage, 0)
    };

    const skillDistribution = skills.slice(1).map(skill => ({
        skill,
        count: workers.filter(w => w.skill === skill).length
    }));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <Users size={32} />
                            Worker Management
                        </h1>
                        <p className="text-orange-100">Manage your workforce and track attendance</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-semibold flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Worker
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Workers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Inactive</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Avg Attendance</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.avgAttendance}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Daily Wages</p>
                    <p className="text-2xl font-bold text-purple-600">₹{stats.totalWages.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Skill Distribution */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Skill Distribution</h3>
                    <div className="space-y-3">
                        {skillDistribution.map(item => (
                            <div key={item.skill}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700">{item.skill}</span>
                                    <span className="font-semibold text-gray-900">{item.count}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-orange-600 h-2 rounded-full"
                                        style={{ width: `${(item.count / stats.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workers List */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search workers..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <select
                                    value={filterSkill}
                                    onChange={(e) => setFilterSkill(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                >
                                    {skills.map(skill => (
                                        <option key={skill} value={skill === 'All Skills' ? 'all' : skill}>
                                            {skill}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <select
                                    value={filterProject}
                                    onChange={(e) => setFilterProject(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                >
                                    {projects.map(project => (
                                        <option key={project} value={project === 'All Projects' ? 'all' : project}>
                                            {project}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Workers Grid */}
                    <div className="bg-white rounded-lg shadow border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Workers ({filteredWorkers.length})
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                            {filteredWorkers.length === 0 ? (
                                <div className="col-span-2 p-8 text-center text-gray-500">
                                    No workers found
                                </div>
                            ) : (
                                filteredWorkers.map((worker) => (
                                    <div key={worker.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                                    <Users className="text-orange-600" size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                                                    <p className="text-sm text-gray-600">{worker.id}</p>
                                                </div>
                                            </div>
                                            {getStatusBadge(worker.status)}
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Briefcase size={14} className="text-gray-400" />
                                                <span className="font-medium text-gray-900">{worker.skill}</span>
                                                <span className="text-gray-400">•</span>
                                                <span>{worker.experience}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                {worker.phone}
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-3 gap-2 text-center text-sm">
                                            <div>
                                                <p className="text-gray-600 text-xs">Daily Wage</p>
                                                <p className="font-semibold text-gray-900">₹{worker.dailyWage}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 text-xs">Attendance</p>
                                                <p className="font-semibold text-green-600">{worker.attendance}%</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 text-xs">Project</p>
                                                <p className="font-semibold text-gray-900 text-xs truncate">{worker.project.split(' ')[0]}</p>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex gap-2">
                                            <button
                                                onClick={() => handleViewDetails(worker)}
                                                className="flex-1 px-3 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => handleAttendance(worker)}
                                                className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                            >
                                                Attendance
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Worker Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold text-gray-900">Add New Worker</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddWorker} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newWorker.name}
                                        onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill *</label>
                                    <select
                                        required
                                        value={newWorker.skill}
                                        onChange={(e) => setNewWorker({ ...newWorker, skill: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="">Select Skill</option>
                                        {skills.slice(1).map(skill => (
                                            <option key={skill} value={skill}>{skill}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={newWorker.phone}
                                        onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={newWorker.email}
                                        onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project *</label>
                                    <select
                                        required
                                        value={newWorker.project}
                                        onChange={(e) => setNewWorker({ ...newWorker, project: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="">Select Project</option>
                                        {projects.slice(1).map(project => (
                                            <option key={project} value={project}>{project}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Daily Wage (₹) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={newWorker.dailyWage}
                                        onChange={(e) => setNewWorker({ ...newWorker, dailyWage: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., 5 years"
                                        value={newWorker.experience}
                                        onChange={(e) => setNewWorker({ ...newWorker, experience: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                                    <input
                                        type="tel"
                                        value={newWorker.emergencyContact}
                                        onChange={(e) => setNewWorker({ ...newWorker, emergencyContact: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <textarea
                                    rows="2"
                                    value={newWorker.address}
                                    onChange={(e) => setNewWorker({ ...newWorker, address: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                >
                                    Add Worker
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Worker Details Modal */}
            {showDetailsModal && selectedWorker && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold text-gray-900">Worker Details</h2>
                            <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Users className="text-orange-600" size={40} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{selectedWorker.name}</h3>
                                    <p className="text-gray-600">{selectedWorker.id}</p>
                                    {getStatusBadge(selectedWorker.status)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Skill</p>
                                    <p className="font-semibold text-gray-900">{selectedWorker.skill}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Experience</p>
                                    <p className="font-semibold text-gray-900">{selectedWorker.experience}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Daily Wage</p>
                                    <p className="font-semibold text-gray-900">₹{selectedWorker.dailyWage}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Attendance</p>
                                    <p className="font-semibold text-green-600">{selectedWorker.attendance}%</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium text-gray-900">{selectedWorker.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium text-gray-900">{selectedWorker.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Current Project</p>
                                    <p className="font-medium text-gray-900">{selectedWorker.project}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Join Date</p>
                                    <p className="font-medium text-gray-900">{new Date(selectedWorker.joinDate).toLocaleDateString('en-IN')}</p>
                                </div>
                                {selectedWorker.address && (
                                    <div>
                                        <p className="text-sm text-gray-600">Address</p>
                                        <p className="font-medium text-gray-900">{selectedWorker.address}</p>
                                    </div>
                                )}
                                {selectedWorker.emergencyContact && (
                                    <div>
                                        <p className="text-sm text-gray-600">Emergency Contact</p>
                                        <p className="font-medium text-gray-900">{selectedWorker.emergencyContact}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Attendance Modal */}
            {showAttendanceModal && selectedWorker && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Mark Attendance</h2>
                            <button onClick={() => setShowAttendanceModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmitAttendance} className="p-6 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Worker</p>
                                <p className="font-semibold text-gray-900">{selectedWorker.name}</p>
                                <p className="text-sm text-gray-600">{selectedWorker.skill}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                                <input
                                    type="date"
                                    required
                                    value={attendanceData.date}
                                    onChange={(e) => setAttendanceData({ ...attendanceData, date: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setAttendanceData({ ...attendanceData, status: 'present' })}
                                        className={`px-4 py-2 rounded-lg border-2 ${attendanceData.status === 'present'
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        Present
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAttendanceData({ ...attendanceData, status: 'absent' })}
                                        className={`px-4 py-2 rounded-lg border-2 ${attendanceData.status === 'absent'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        Absent
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAttendanceData({ ...attendanceData, status: 'half-day' })}
                                        className={`px-4 py-2 rounded-lg border-2 ${attendanceData.status === 'half-day'
                                                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                                : 'border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        Half Day
                                    </button>
                                </div>
                            </div>

                            {attendanceData.status !== 'absent' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hours Worked *</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        max="12"
                                        value={attendanceData.hours}
                                        onChange={(e) => setAttendanceData({ ...attendanceData, hours: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                                <textarea
                                    rows="3"
                                    value={attendanceData.notes}
                                    onChange={(e) => setAttendanceData({ ...attendanceData, notes: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="Any additional notes..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAttendanceModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2"
                                >
                                    <Check size={20} />
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
