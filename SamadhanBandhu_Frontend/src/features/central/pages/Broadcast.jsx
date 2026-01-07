import React, { useState, useEffect } from 'react';
import { Send, Trash2, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import api from '../../../shared/services/api';

export default function Broadcast() {
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('info'); // info, warning, joy
    const [selectedRecipients, setSelectedRecipients] = useState({
        state: true,
        block: true,
        agency: true,
        field_officer: true
    });
    const [activeBroadcast, setActiveBroadcast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Load current broadcast from local storage (simulating backend/persistent state)
        const storedBroadcast = localStorage.getItem('pm_ajay_broadcast');
        if (storedBroadcast) {
            setActiveBroadcast(JSON.parse(storedBroadcast));
        }

        // Load history
        const storedHistory = localStorage.getItem('pm_ajay_broadcast_history');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    const handleBroadcast = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);

        const newBroadcast = {
            id: Date.now(),
            message,
            priority,
            timestamp: new Date().toISOString(),
            sender: 'Central Ministry',
            recipients: Object.keys(selectedRecipients).filter(key => selectedRecipients[key])
        };

        // Simulate API call
        try {
            // await api.post('/broadcasts', newBroadcast); // Uncomment when backend is ready

            // Save to localStorage for cross-tab communication
            localStorage.setItem('pm_ajay_broadcast', JSON.stringify(newBroadcast));

            // Update History
            const newHistory = [newBroadcast, ...history];
            setHistory(newHistory);
            localStorage.setItem('pm_ajay_broadcast_history', JSON.stringify(newHistory));

            setActiveBroadcast(newBroadcast);
            setMessage('');
        } catch (error) {
            console.error('Broadcast failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearBroadcast = () => {
        localStorage.removeItem('pm_ajay_broadcast');
        setActiveBroadcast(null);
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'warning': return 'bg-red-50 text-red-700 border-red-200';
            case 'joy': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-blue-50 text-blue-700 border-blue-200';
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Broadcast Management</h1>
                <p className="text-sm text-gray-500">Send notifications to all State, Block, and Agency portals.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Create Broadcast */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Send size={20} className="text-blue-600" />
                        New Broadcast
                    </h2>

                    <form onSubmit={handleBroadcast} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter important announcement..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority / Type</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="info"
                                        checked={priority === 'info'}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-200">
                                        <Info size={14} /> Info
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="warning"
                                        checked={priority === 'warning'}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="text-red-600 focus:ring-red-500"
                                    />
                                    <span className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-medium border border-red-200">
                                        <AlertTriangle size={14} /> Urgent
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="joy"
                                        checked={priority === 'joy'}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="text-green-600 focus:ring-green-500"
                                    />
                                    <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium border border-green-200">
                                        <CheckCircle size={14} /> Success
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedRecipients.state}
                                        onChange={(e) => setSelectedRecipients({ ...selectedRecipients, state: e.target.checked })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">State Portals</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedRecipients.block}
                                        onChange={(e) => setSelectedRecipients({ ...selectedRecipients, block: e.target.checked })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Block Portals</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedRecipients.agency}
                                        onChange={(e) => setSelectedRecipients({ ...selectedRecipients, agency: e.target.checked })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Agency Portals</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedRecipients.field_officer}
                                        onChange={(e) => setSelectedRecipients({ ...selectedRecipients, field_officer: e.target.checked })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Field Officers</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Bell size={18} />
                            {loading ? 'Broadcasting...' : 'Broadcast Now'}
                        </button>
                    </form>
                </div>

                {/* Active & History */}
                <div className="space-y-6">
                    {/* Currently Active */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Bell size={20} className="text-green-600" />
                            Active Broadcast
                        </h2>
                        {activeBroadcast ? (
                            <div className={`p-4 rounded-lg border ${getPriorityColor(activeBroadcast.priority)} flex justify-between items-start gap-3`}>
                                <div>
                                    <p className="font-medium">{activeBroadcast.message}</p>
                                    <p className="text-xs opacity-75 mt-1">Posted: {new Date(activeBroadcast.timestamp).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={clearBroadcast}
                                    className="p-1 hover:bg-black/10 rounded text-current"
                                    title="Stop Broadcasting"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-center py-4">No active broadcast message.</p>
                        )}
                    </div>

                    {/* History */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex-1">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Info size={20} className="text-gray-600" />
                            Recent History
                        </h2>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                            {history.length > 0 ? history.map(item => (
                                <div key={item.id} className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm">
                                    <p className="text-gray-800">{item.message}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase font-medium ${getPriorityColor(item.priority)}`}>
                                            {item.priority}
                                        </span>
                                        <span className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-sm">No broadcast history.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
