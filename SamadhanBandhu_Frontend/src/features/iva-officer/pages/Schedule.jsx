import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, X, Filter, MapPin, Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Schedule() {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedView, setSelectedView] = useState('month');
    const [filterType, setFilterType] = useState('all');
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [eventForm, setEventForm] = useState({
        title: '',
        type: 'village',
        date: '',
        time: '',
        location: '',
        description: ''
    });

    const scheduleItems = [
        {
            id: 'VER-2025-001',
            title: 'Village Eligibility - Shirdi',
            type: 'village',
            date: '2025-12-03',
            time: '10:00 AM',
            location: 'Shirdi, Ahmednagar',
            priority: 'High',
            status: 'Scheduled'
        },
        {
            id: 'VER-2025-002',
            title: 'Committee Verification - Daund',
            type: 'committee',
            date: '2025-12-05',
            time: '2:00 PM',
            location: 'Daund, Pune',
            priority: 'Medium',
            status: 'Scheduled'
        },
        {
            id: 'VER-2025-003',
            title: 'Agency Verification - ABC Constructions',
            type: 'agency',
            date: '2025-12-07',
            time: '11:00 AM',
            location: 'Nashik Village, Nashik',
            priority: 'High',
            status: 'Scheduled'
        },
        {
            id: 'TASK-001',
            title: 'Submit Verification Report',
            type: 'task',
            date: '2025-12-04',
            time: '5:00 PM',
            location: 'Office',
            priority: 'Medium',
            status: 'Pending'
        },
        {
            id: 'MEET-001',
            title: 'State Officer Meeting',
            type: 'meeting',
            date: '2025-12-06',
            time: '3:00 PM',
            location: 'State Office',
            priority: 'Low',
            status: 'Scheduled'
        }
    ];

    const filteredItems = scheduleItems.filter(item =>
        filterType === 'all' || item.type === filterType
    );

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
        return filteredItems.some(item => item.date === dateStr);
    };

    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return filteredItems.filter(item => item.date === dateStr);
    };

    const getTypeColor = (type) => {
        const colors = {
            'village': 'bg-purple-100 text-purple-700',
            'committee': 'bg-indigo-100 text-indigo-700',
            'agency': 'bg-teal-100 text-teal-700',
            'task': 'bg-green-100 text-green-700',
            'meeting': 'bg-orange-100 text-orange-700'
        };
        return colors[type] || colors['village'];
    };

    const stats = {
        total: scheduleItems.length,
        village: scheduleItems.filter(s => s.type === 'village').length,
        committee: scheduleItems.filter(s => s.type === 'committee').length,
        agency: scheduleItems.filter(s => s.type === 'agency').length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <Calendar size={32} />
                            My Schedule
                        </h1>
                        <p className="text-purple-100">View and manage your verification schedule</p>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedDate(new Date().toISOString().split('T')[0]);
                            setEventForm({
                                ...eventForm,
                                date: new Date().toISOString().split('T')[0]
                            });
                            setShowEventModal(true);
                        }}
                        className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-semibold flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Event
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Village</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.village}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Committee</p>
                    <p className="text-2xl font-bold text-indigo-600">{stats.committee}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Agency</p>
                    <p className="text-2xl font-bold text-teal-600">{stats.agency}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="all">All Types</option>
                                <option value="village">Village Verification</option>
                                <option value="committee">Committee Verification</option>
                                <option value="agency">Agency Verification</option>
                                <option value="task">Tasks</option>
                                <option value="meeting">Meetings</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedView('month')}
                            className={`px-4 py-2 rounded-lg ${selectedView === 'month' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => setSelectedView('list')}
                            className={`px-4 py-2 rounded-lg ${selectedView === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
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
                                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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
                            const events = getEventsForDay(day);
                            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                            return (
                                <div
                                    key={day}
                                    onClick={() => {
                                        setSelectedDate(dateStr);
                                        setEventForm({
                                            ...eventForm,
                                            date: dateStr
                                        });
                                        setShowEventModal(true);
                                    }}
                                    className={`min-h-[100px] border rounded-lg p-2 ${today ? 'bg-purple-50 border-purple-500 border-2' : 'border-gray-200'
                                        } ${event ? 'bg-green-50' : ''} hover:shadow-md transition-shadow cursor-pointer`}
                                >
                                    <div className={`text-sm font-semibold mb-1 ${today ? 'text-purple-600' : 'text-gray-900'}`}>
                                        {day}
                                    </div>
                                    {events.length > 0 && (
                                        <div className="space-y-1">
                                            {events.slice(0, 2).map((event, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`text-xs p-1 rounded truncate ${getTypeColor(event.type)}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (event.type === 'village' || event.type === 'committee' || event.type === 'agency') {
                                                            navigate(`/iva-officer/verifications/${event.type}/${event.id}`);
                                                        }
                                                    }}
                                                >
                                                    <span className="truncate">{event.title}</span>
                                                </div>
                                            ))}
                                            {events.length > 2 && (
                                                <div className="text-xs text-purple-600 font-medium">
                                                    +{events.length - 2} more
                                                </div>
                                            )}
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
                            Scheduled Events ({filteredItems.length})
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {filteredItems.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No events found
                            </div>
                        ) : (
                            filteredItems.map((item) => (
                                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                            <p className="text-sm text-gray-600">ID: {item.id}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(item.date).toLocaleDateString('en-IN')}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {item.time}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {item.location}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            <span className={`px-3 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
                                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                            </span>
                                            {(item.type === 'village' || item.type === 'committee' || item.type === 'agency') && (
                                                <button
                                                    onClick={() => navigate(`/iva-officer/verifications/${item.type}/${item.id}`)}
                                                    className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-1"
                                                >
                                                    <Eye size={14} />
                                                    View
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Add Event Modal */}
            {showEventModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold text-gray-900">Add New Event</h2>
                            <button
                                onClick={() => {
                                    setShowEventModal(false);
                                    setEventForm({
                                        title: '',
                                        type: 'village',
                                        date: '',
                                        time: '',
                                        location: '',
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
                                alert(`Event "${eventForm.title}" has been added!`);
                                setShowEventModal(false);
                                setEventForm({
                                    title: '',
                                    type: 'village',
                                    date: '',
                                    time: '',
                                    location: '',
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
                                    value={eventForm.title}
                                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter event title"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type *
                                    </label>
                                    <select
                                        required
                                        value={eventForm.type}
                                        onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="village">Village Verification</option>
                                        <option value="committee">Committee Verification</option>
                                        <option value="agency">Agency Verification</option>
                                        <option value="task">Task</option>
                                        <option value="meeting">Meeting</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={eventForm.date}
                                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={eventForm.time}
                                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={eventForm.location}
                                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter location"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    rows="4"
                                    value={eventForm.description}
                                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter event description..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEventModal(false);
                                        setEventForm({
                                            title: '',
                                            type: 'village',
                                            date: '',
                                            time: '',
                                            location: '',
                                            description: ''
                                        });
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} />
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
