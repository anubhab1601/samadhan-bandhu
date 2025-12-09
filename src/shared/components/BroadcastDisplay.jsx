import React, { useState, useEffect } from 'react';
import { Bell, X, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const BroadcastDisplay = ({ role }) => {
    const [broadcast, setBroadcast] = useState(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const loadBroadcast = () => {
            const stored = localStorage.getItem('pm_ajay_broadcast');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);

                    // Check if specific recipients are defined, and if so, if current role is included
                    if (parsed.recipients && parsed.recipients.length > 0 && role) {
                        const roleKeyMap = {
                            'state': 'state',
                            'block': 'block',
                            'agency': 'agency',
                            'field-officer': 'field_officer' // Map prop to stored key format if different
                        };

                        // If the role isn't in recipients, don't show
                        // We check if the recipient list includes the role
                        if (!parsed.recipients.includes(role) && !parsed.recipients.includes(roleKeyMap[role])) {
                            setBroadcast(null);
                            return;
                        }
                    }

                    // Only show if we haven't dismissed this specific message ID in this session
                    // (Optional: could persist dismissals, but for now session-based is fine or just manual close)
                    setBroadcast(parsed);
                    setVisible(true);
                } catch (e) {
                    console.error("Failed to parse broadcast message", e);
                }
            } else {
                setBroadcast(null);
            }
        };

        // Load initially
        loadBroadcast();

        // Listen for storage changes (from other tabs)
        const handleStorageChange = (e) => {
            if (e.key === 'pm_ajay_broadcast') {
                loadBroadcast();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (!broadcast || !visible) return null;

    const getStyles = (priority) => {
        switch (priority) {
            case 'warning':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
                    closeHover: 'hover:bg-red-100'
                };
            case 'joy':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
                    closeHover: 'hover:bg-green-100'
                };
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-800',
                    icon: <Info className="w-5 h-5 text-blue-600" />,
                    closeHover: 'hover:bg-blue-100'
                };
        }
    };

    const styles = getStyles(broadcast.priority);

    return (
        <div className={`mb-6 p-4 rounded-lg border ${styles.bg} ${styles.border} shadow-sm flex items-start justify-between gap-4 transition-all duration-300 animate-in slide-in-from-top-2`}>
            <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                    {styles.icon}
                </div>
                <div>
                    <h3 className={`text-xs font-bold ${styles.text} uppercase tracking-wider mb-1 flex items-center gap-2`}>
                        <Bell size={12} className="fill-current" />
                        {broadcast.sender || 'System Broadcast'}
                    </h3>
                    <p className={`text-sm ${styles.text} leading-relaxed font-medium`}>
                        {broadcast.message}
                    </p>
                    <span className={`text-[10px] ${styles.text} opacity-70 mt-2 block`}>
                        {new Date(broadcast.timestamp).toLocaleString()}
                    </span>
                </div>
            </div>
            <button
                onClick={() => setVisible(false)}
                className={`p-1.5 rounded-full transition-colors ${styles.closeHover} ${styles.text}`}
                title="Dismiss"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default BroadcastDisplay;
