import React, { useState } from 'react';
import { ListTodo, Search, Filter, Plus, AlertCircle, Clock, CheckCircle, User, Calendar, X } from 'lucide-react';

export default function Tasks() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPriority, setFilterPriority] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Complete inspection report for School Building',
            description: 'Submit detailed inspection report with photos and assessment',
            priority: 'high',
            status: 'pending',
            dueDate: '2025-12-05',
            type: 'Inspection',
            assignedBy: 'State Officer',
            completed: false
        },
        {
            id: 2,
            title: 'Site visit for Community Hall project',
            description: 'Conduct site visit and document progress',
            priority: 'high',
            status: 'in-progress',
            dueDate: '2025-12-03',
            type: 'Site Visit',
            assignedBy: 'State Officer',
            completed: false
        },
        {
            id: 3,
            title: 'Review safety compliance at Water Supply project',
            description: 'Check safety protocols and submit compliance report',
            priority: 'medium',
            status: 'pending',
            dueDate: '2025-12-08',
            type: 'Safety Check',
            assignedBy: 'District Officer',
            completed: false
        },
        {
            id: 4,
            title: 'Upload geo-tagged photos for Road Development',
            description: 'Upload construction site photos with GPS coordinates',
            priority: 'medium',
            status: 'in-progress',
            dueDate: '2025-12-06',
            type: 'Documentation',
            assignedBy: 'State Officer',
            completed: false
        },
        {
            id: 5,
            title: 'Coordinate with agency for next inspection',
            description: 'Schedule and coordinate inspection date with agency',
            priority: 'low',
            status: 'pending',
            dueDate: '2025-12-10',
            type: 'Coordination',
            assignedBy: 'State Officer',
            completed: false
        },
        {
            id: 6,
            title: 'Submit monthly inspection summary',
            description: 'Compile and submit monthly summary of all inspections',
            priority: 'high',
            status: 'completed',
            dueDate: '2025-11-30',
            type: 'Report',
            assignedBy: 'State Officer',
            completed: true
        }
    ]);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        dueDate: '',
        type: '',
        assignedBy: ''
    });

    const taskTypes = ['All Types', 'Inspection', 'Site Visit', 'Safety Check', 'Documentation', 'Coordination', 'Report'];

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
        const matchesType = filterType === 'all' || task.type === filterType;
        return matchesSearch && matchesPriority && matchesStatus && matchesType;
    });

    const handleToggleTask = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const newCompleted = !task.completed;
                return {
                    ...task,
                    completed: newCompleted,
                    status: newCompleted ? 'completed' : 'pending'
                };
            }
            return task;
        }));
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        const task = {
            id: tasks.length + 1,
            ...newTask,
            completed: false
        };
        setTasks([...tasks, task]);
        setShowAddModal(false);
        setNewTask({
            title: '',
            description: '',
            priority: 'medium',
            status: 'pending',
            dueDate: '',
            type: '',
            assignedBy: ''
        });
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            high: { label: 'High', color: 'bg-red-100 text-red-700', icon: AlertCircle },
            medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
            low: { label: 'Low', color: 'bg-green-100 text-green-700', icon: CheckCircle }
        };
        const config = priorityConfig[priority];
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${config.color}`}>
                <Icon size={12} />
                {config.label}
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700' },
            'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
            completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
            overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700' }
        };
        const config = statusConfig[status];
        return <span className={`px-2 py-1 text-xs font-medium rounded ${config.color}`}>{config.label}</span>;
    };

    const isOverdue = (dueDate, status) => {
        if (status === 'completed') return false;
        const today = new Date();
        const due = new Date(dueDate);
        return due < today;
    };

    const stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
        overdue: tasks.filter(t => isOverdue(t.dueDate, t.status)).length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <ListTodo size={32} />
                            Task Management
                        </h1>
                        <p className="text-indigo-100">Organize and track all your inspection tasks</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 font-semibold flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Task
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            {taskTypes.map(type => (
                                <option key={type} value={type === 'All Types' ? 'all' : type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Tasks ({filteredTasks.length})</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {filteredTasks.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No tasks found
                        </div>
                    ) : (
                        filteredTasks.map((task) => {
                            const overdue = isOverdue(task.dueDate, task.status);
                            return (
                                <div
                                    key={task.id}
                                    className={`p-4 hover:bg-gray-50 transition-colors ${task.completed ? 'bg-gray-50 opacity-75' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Checkbox */}
                                        <div className="flex-shrink-0 pt-1">
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => handleToggleTask(task.id)}
                                                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                            />
                                        </div>

                                        {/* Task Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <h3 className={`font-semibold text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''
                                                        }`}>
                                                        {task.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                                </div>
                                                <div className="flex items-center gap-2 ml-4">
                                                    {getPriorityBadge(task.priority)}
                                                    {overdue ? (
                                                        <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-700">
                                                            Overdue
                                                        </span>
                                                    ) : (
                                                        getStatusBadge(task.status)
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    Due: {new Date(task.dueDate).toLocaleDateString('en-IN')}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User size={14} />
                                                    Assigned by: {task.assignedBy}
                                                </span>
                                                <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">
                                                    {task.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Add Task Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold text-gray-900">Add New Task</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddTask} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter task title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    rows="3"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter task description"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                                    <select
                                        required
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                                    <select
                                        required
                                        value={newTask.status}
                                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={newTask.dueDate}
                                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned By *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newTask.assignedBy}
                                        onChange={(e) => setNewTask({ ...newTask, assignedBy: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter assigner name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Task Type *</label>
                                <select
                                    required
                                    value={newTask.type}
                                    onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Select Type</option>
                                    {taskTypes.slice(1).map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
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
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} />
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
