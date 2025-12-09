import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../../shared/services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                console.error('Failed to parse user data:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password, selectedRole = null) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user: userData } = response.data;

            // Store in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            // Set in state
            setUser(userData);

            // Set default auth header
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return userData;
        } catch (error) {
            // Demo mode: If API fails, use mock data for testing
            console.warn('API login failed, using demo mode');

            // Use the selected role if provided, otherwise extract from email
            let role = selectedRole || 'agency'; // default role

            if (!selectedRole) {
                const emailParts = email.split('@');
                if (emailParts[0].includes('central')) role = 'central';
                else if (emailParts[0].includes('state')) role = 'state';
                else if (emailParts[0].includes('sarpanch')) role = 'sarpanch';
                else if (emailParts[0].includes('field')) role = 'field-officer';
                else if (emailParts[0].includes('iva')) role = 'iva-officer';
            }

            const emailParts = email.split('@');
            const mockUser = {
                id: Date.now(),
                email: email,
                role: role,
                name: emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1)
            };

            // Store mock data
            localStorage.setItem('token', 'demo-token-' + Date.now());
            localStorage.setItem('user', JSON.stringify(mockUser));

            setUser(mockUser);

            return mockUser;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const hasAnyRole = (roles) => {
        return roles.includes(user?.role);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        hasRole,
        hasAnyRole,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
