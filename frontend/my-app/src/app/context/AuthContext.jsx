import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            
            const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.data.valid) {
                setUser({ id: response.data.user_id });
            }
        } catch (error) {
            console.error("Error verificando autenticación:", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email, password
            });
            
            localStorage.setItem('token', response.data.token);
            setUser({ 
                id: response.data.user_id,
                email: response.data.email
            });
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.error || 'Error al iniciar sesión' 
            };
        }
    };

    const register = async (userData) => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', userData);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.error || 'Error al registrar'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);