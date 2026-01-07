import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    FolderOpen,
    BarChart3,
    DollarSign,
    Map,
    FileText,
    Bell,
    Users,
    ClipboardList,
    MapPin,
    CheckSquare,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    TrendingUp,
    CheckCircle,
    User,
    Megaphone
} from 'lucide-react';

const ROLE_MENUS = {
    'central': [
        { path: '/central/dashboard', label: 'Dashboard', icon: Home },
        { path: '/central/projects', label: 'Projects', icon: FolderOpen },
        { path: '/central/analytics', label: 'Analytics', icon: BarChart3 },
        { path: '/central/funds', label: 'Fund Allocation', icon: DollarSign },
        { path: '/central/gis', label: 'GIS Mapping', icon: Map },
        { path: '/central/reports', label: 'Reports', icon: FileText },
        { path: '/central/alerts', label: 'Alerts', icon: Bell },
        { path: '/central/broadcast', label: 'Broadcasts', icon: Megaphone }
    ],
    'state': [
        { path: '/state/dashboard', label: 'Dashboard', icon: Home },
        { path: '/state/applications', label: 'Applications', icon: FileText },
        { path: '/state/projects', label: 'Projects', icon: FolderOpen },
        { path: '/state/inspections/schedule', label: 'Inspections', icon: Calendar },
        { path: '/state/funds', label: 'Fund Management', icon: DollarSign },
        { path: '/state/funds/blocks', label: 'Block Fund Releases', icon: TrendingUp },
        { path: '/state/districts', label: 'Districts', icon: Map },
        { path: '/state/reports', label: 'Reports', icon: BarChart3 },
        { path: '/state/users/pending', label: 'User Management', icon: Users },
        { path: '/state/profile', label: 'Profile', icon: User }
    ],
    'block': [
        { path: '/block/dashboard', label: 'Dashboard', icon: Home },
        { path: '/block/fund-management', label: 'Fund Management', icon: DollarSign },
        { path: '/block/tenders', label: 'Tenders', icon: Briefcase },
        { path: '/block/ongoing-projects', label: 'Ongoing Projects', icon: TrendingUp },
        { path: '/block/completed-projects', label: 'Completed Projects', icon: CheckCircle },
        { path: '/block/notifications', label: 'Notifications', icon: Bell },
        { path: '/block/profile', label: 'Profile', icon: User }
    ],
    'field-officer': [
        { path: '/field-officer/dashboard', label: 'Dashboard', icon: Home },
        { path: '/field-officer/inspections', label: 'Inspections', icon: CheckSquare },
        { path: '/field-officer/schedule', label: 'Schedule', icon: Calendar },
        { path: '/field-officer/tasks', label: 'Tasks', icon: ClipboardList },
        { path: '/field-officer/history', label: 'History', icon: FileText },
        { path: '/field-officer/reports', label: 'Reports', icon: BarChart3 },
        { path: '/field-officer/notifications', label: 'Notifications', icon: Bell },
        { path: '/field-officer/profile', label: 'Profile', icon: Users }
    ],
    'agency': [
        { path: '/agency/dashboard', label: 'Dashboard', icon: Home },
        { path: '/agency/tenders', label: 'Tenders', icon: FileText },
        { path: '/agency/projects', label: 'Projects', icon: FolderOpen },
        { path: '/agency/tasks', label: 'Tasks', icon: ClipboardList },
        { path: '/agency/notifications', label: 'Notifications', icon: Bell },
        { path: '/agency/payments', label: 'Payments', icon: DollarSign },
        { path: '/agency/workers', label: 'Workers', icon: Users },
        { path: '/agency/schedule', label: 'Schedule', icon: Calendar },
        { path: '/agency/profile', label: 'Profile', icon: Users }
    ]
};

const ROLE_COLORS = {
    'central': 'text-blue-600 bg-blue-50 border-blue-600',
    'state': 'text-green-600 bg-green-50 border-green-600',
    'block': 'text-purple-600 bg-purple-50 border-purple-600',
    'field-officer': 'text-indigo-600 bg-indigo-50 border-indigo-600',
    'agency': 'text-orange-600 bg-orange-50 border-orange-600'
};

export default function Sidebar({ role }) {
    const [collapsed, setCollapsed] = useState(false);
    const menuItems = ROLE_MENUS[role] || [];
    const activeColors = ROLE_COLORS[role] || ROLE_COLORS['central'];

    return (
        <div className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 flex flex-col`}>
            {/* Collapse Toggle */}
            <div className="p-4 border-b border-gray-200 flex justify-end">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? `${activeColors} border-l-4 font-semibold shadow-sm`
                                    : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                                }`
                            }
                        >
                            <Icon size={20} className="flex-shrink-0" />
                            {!collapsed && <span className="text-sm">{item.label}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                        <p className="font-semibold">PM-AJAY Portal</p>
                        <p className="mt-1">Version 2.0.0</p>
                    </div>
                </div>
            )}
        </div>
    );
}
