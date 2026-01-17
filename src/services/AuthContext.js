import React, { createContext, useState, useContext, useEffect } from 'react';
import { getExtensions, saveExtension } from '../services/storage';
import { INITIAL_DATA } from '../constants/theme';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [extensions, setExtensions] = useState([]);

    // In a real Expo app with SDK 49+, process.env.EXPO_PUBLIC_ADMIN_PASSWORD would be used.
    // For this local setup, we'll use the provided password directly if .env reading is tricky in this environment,
    // but I'll try to use process.env first.
    const ADMIN_PASSWORD = process.env.EXPO_PUBLIC_ADMIN_PASSWORD || 'Admin007';

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getExtensions();
        if (data.length === 0) {
            // Seed initial data if empty
            // We don't want to seed every time, but for the first run it's helpful
            setExtensions(INITIAL_DATA);
        } else {
            setExtensions(data);
        }
    };

    const login = (password) => {
        if (password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout, extensions, setExtensions, loadData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
