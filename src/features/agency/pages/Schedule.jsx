import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Filter, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

export default function Schedule() {
    const [selectedView, setSelectedView] = useState('month');
    const [selectedProject, setSelectedProject] = useState('all');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showWorkModal, setShowWorkModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingWork, setEditingWork] = useState(null);

    const [workForm, setWorkForm] = useState({
        title: '',
        project: '',
        type: 'task',
        startDate: '',
        endDate: '',
        status: 'pending',
        description: ''
    });

    const projects = ['All Projects', 'School Building Renovation', 'Water Supply System'];

    const scheduleItems = [
        {
            id: 1,
            title: 'Site Preparation',
            project: 'School Building Renovation',
            startDate: '2025-10-01',
            endDate: '2025-10-15',
            status: 'completed',
            progress: 100,
            type: 'milestone'
        },
        {
            id: 2,
            title: 'Foundation Work',
            project: 'School Building Renovation',
            startDate: '2025-10-16',
            endDate: '2025-11-05',
            status: 'completed',
            progress: 100,
            type: 'milestone'
        },
        {
            id: 3,
            title: 'Structural Work',
            project: 'School Building Renovation',
            startDate: '2025-11-06',
            endDate: '2025-12-15',
            status: 'in-progress',
            progress: 45,
            type: 'milestone'
        },
        {
            id: 4,
            title: 'Progress Report Submission',
            project: 'School Building Renovation',
            startDate: '2025-12-05',
            endDate: '2025-12-05',
            status: 'pending',
            progress: 0,
            type: 'task'
        },
        {
            id: 5,
            title: 'Site Inspection',
            project: 'School Building Renovation',
            startDate: '2025-12-05',
            endDate: '2025-12-05',
            status: 'pending',
            progress: 0,
            type: 'inspection'
        },
        {
            id: 6,
            title: 'Electrical Work',
            project: 'School Building Renovation',
            startDate: '2025-12-16',
            endDate: '2026-01-10',
            status: 'pending',
            progress: 0,
            type: 'milestone'
        },
        {
            id: 7,
            title: 'Plumbing Work',
            project: 'School Building Renovation',
            startDate: '2025-12-20',
            endDate: '2026-01-15',
            status: 'pending',
            progress: 0,
            type: 'milestone'
        },
        {
            id: 8,
            title: 'Finishing Work',
            project: 'School Building Renovation',
            startDate: '2026-01-16',
            endDate: '2026-02-15',
            status: 'pending',
            progress: 0,
            type: 'milestone'
        },
        {
            id: 9,
            title: 'Final Inspection',
            project: 'School Building Renovation',
            startDate: '2026-02-20',
            endDate: '2026-02-20',
            status: 'pending',
            progress: 0,
            type: 'inspection'
        }
    ];

    const filteredSchedule = scheduleItems.filter(item =>
        selectedProject === 'all' || item.project === selectedProject
    );

    const getStatusColor = (status) => {
        const colors = {
            completed: 'bg-green-100 text-green-700 border-green-300',
            'in-progress': 'bg-blue-100 text-blue-700 border-blue-300',
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
            delayed: 'bg-red-100 text-red-700 border-red-300'
        };
        return colors[status] || colors.pending;
    };

    const getTypeIcon = (type) => {
        const icons = {
            milestone: <CheckCircle size={16} />,
            task: <Clock size={16} />,
            inspection: <AlertCircle size={16} />
        };
        return icons[type] || icons.task;
    };

    const getTypeColor = (type) => {
        const colors = {
            milestone: 'bg-purple-100 text-purple-700',
            task: 'bg-blue-100 text-blue-700',
            inspection: 'bg-orange-100 text-orange-700'
        };
        return colors[type] || colors.task;
    };

    // Calculate days in current month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const previousMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
    };

    const hasEvent = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return filteredSchedule.some(item => {
            const start = new Date(item.startDate);
            const end = new Date(item.endDate);
            const current = new Date(dateStr);
            return current >= start && current <= end;
        });
    };

    const stats = {
        total: scheduleItems.length,
        completed: scheduleItems.filter(s => s.status === 'completed').length,
        inProgress: scheduleItems.filter(s => s.status === 'in-progress').length,
        pending: scheduleItems.filter(s => s.status === 'pending').length,
        thisMonth: scheduleItems.filter(s => {
            const start = new Date(s.startDate);
            return start.getMonth() === month && start.getFullYear() === year;
        }).length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <Calendar size={32} />
                    Project Schedule
                </h1>
                <p className="text-orange-100">Track project timelines and milestones</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.thisMonth}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            >
                                {projects.map(project => (
                                    <option key={project} value={project === 'All Projects' ? 'all' : project}>
                                        {project}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedView('month')}
                            className={`px-4 py-2 rounded-lg ${selectedView === 'month' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => setSelectedView('list')}
                            className={`px-4 py-2 rounded-lg ${selectedView === 'list' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>

            {selectedView === 'month' ? (
                /* Calendar View */
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {monthNames[month]} {year}
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={previousMonth}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setCurrentMonth(new Date())}
                                className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                            >
                                Today
                            </button>
                            <button
                                onClick={nextMonth}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                        {/* Day Headers */}
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center font-semibold text-gray-700 py-2">
                                {day}
                            </div>
                        ))}

                        {/* Empty cells for days before month starts */}
                        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                            <div key={`empty-${index}`} className="aspect-square"></div>
                        ))}

                        {/* Calendar days */}
                        {Array.from({ length: daysInMonth }).map((_, index) => {
                            const day = index + 1;
                            const today = isToday(day);
                            const event = hasEvent(day);
                            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                            return (
                                <div
                                    key={day}
                                    onClick={() => {
                                        setSelectedDate(dateStr);
                                        setWorkForm({
                                            ...workForm,
                                            startDate: dateStr,
                                            endDate: dateStr
                                        });
                                        setShowWorkModal(true);
                                    }}
                                    className={`aspect-square border rounded-lg p-2 ${today ? 'bg-orange-50 border-orange-500' : 'border-gray-200'
                                        } ${event ? 'bg-blue-50' : ''} hover:shadow-md transition-shadow cursor-pointer`}
                                >
                                    <div className={`text-sm font-semibold ${today ? 'text-orange-600' : 'text-gray-900'}`}>
                                        {day}
                                    </div>
                                    {event && (
                                        <div className="mt-1">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                /* List View */
                <div className="bg-white rounded-lg shadow border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Schedule Items ({filteredSchedule.length})
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {filteredSchedule.map((item) => (
                            <div key={item.id} className="p-4 hover:bg-gray-50">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(item.type)}`}>
                                                {getTypeIcon(item.type)}
                                                <span className="ml-1">{item.type}</span>
                                            </span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(item.status)}`}>
                                                {item.status.replace('-', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{item.project}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {new Date(item.startDate).toLocaleDateString('en-IN')}
                                        {item.startDate !== item.endDate && (
                                            <> → {new Date(item.endDate).toLocaleDateString('en-IN')}</>
                                        )}
                                    </span>
                                    {item.type === 'milestone' && (
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${item.status === 'completed' ? 'bg-green-600' :
                                                            item.status === 'in-progress' ? 'bg-blue-600' :
                                                                'bg-gray-300'
                                                            }`}
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">{item.progress}%</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add/Edit Work Modal */}
            {showWorkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingWork ? 'Edit Work' : 'Add New Work'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowWorkModal(false);
                                    setEditingWork(null);
                                    setWorkForm({
                                        title: '',
                                        project: '',
                                        type: 'task',
                                        startDate: '',
                                        endDate: '',
                                        status: 'pending',
                                        description: ''
                                    });
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // Here you would save the work item
                                alert(`Work item "${workForm.title}" has been ${editingWork ? 'updated' : 'added'}!`);
                                setShowWorkModal(false);
                                setEditingWork(null);
                                setWorkForm({
                                    title: '',
                                    project: '',
                                    type: 'task',
                                    startDate: '',
                                    endDate: '',
                                    status: 'pending',
                                    description: ''
                                });
                            }}
                            className="p-6 space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={workForm.title}
                                    onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter work title"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Project *
                                    </label>
                                    <select
                                        required
                                        value={workForm.project}
                                        onChange={(e) => setWorkForm({ ...workForm, project: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="">Select Project</option>
                                        {projects.slice(1).map(project => (
                                            <option key={project} value={project}>{project}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type *
                                    </label>
                                    <select
                                        required
                                        value={workForm.type}
                                        onChange={(e) => setWorkForm({ ...workForm, type: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="task">Task</option>
                                        <option value="milestone">Milestone</option>
                                        <option value="inspection">Inspection</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={workForm.startDate}
                                        onChange={(e) => setWorkForm({ ...workForm, startDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        End Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={workForm.endDate}
                                        onChange={(e) => setWorkForm({ ...workForm, endDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setWorkForm({ ...workForm, status: 'pending' })}
                                        className={`px-4 py-2 rounded-lg border-2 ${workForm.status === 'pending'
                                                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                                : 'border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setWorkForm({ ...workForm, status: 'in-progress' })}
                                        className={`px-4 py-2 rounded-lg border-2 ${workForm.status === 'in-progress'
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        In Progress
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setWorkForm({ ...workForm, status: 'completed' })}
                                        className={`px-4 py-2 rounded-lg border-2 ${workForm.status === 'completed'
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        Completed
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setWorkForm({ ...workForm, status: 'delayed' })}
                                        className={`px-4 py-2 rounded-lg border-2 ${workForm.status === 'delayed'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        Delayed
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    rows="4"
                                    value={workForm.description}
                                    onChange={(e) => setWorkForm({ ...workForm, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter work description..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowWorkModal(false);
                                        setEditingWork(null);
                                        setWorkForm({
                                            title: '',
                                            project: '',
                                            type: 'task',
                                            startDate: '',
                                            endDate: '',
                                            status: 'pending',
                                            description: ''
                                        });
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} />
                                    {editingWork ? 'Update Work' : 'Add Work'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
