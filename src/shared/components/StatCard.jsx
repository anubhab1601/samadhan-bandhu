import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
    title,
    value,
    icon: Icon,
    color = 'blue',
    trend,
    trendValue
}) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
        red: 'bg-red-50 text-red-600',
        purple: 'bg-purple-50 text-purple-600',
        yellow: 'bg-yellow-50 text-yellow-600'
    };

    const iconBgClass = colorClasses[color] || colorClasses.blue;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${iconBgClass}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>

            <div>
                <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
