import React, { createContext, useContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/api";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("adminToken"));

    // Verify token on mount
    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = localStorage.getItem("adminToken");

            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(API_ENDPOINTS.USER_VERIFY, {
                    headers: {
                        "Authorization": `Bearer ${storedToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAdmin(data.admin);
                    setToken(storedToken);
                } else {
                    // Token is invalid
                    localStorage.removeItem("adminToken");
                    setToken(null);
                    setAdmin(null);
                }
            } catch (error) {
                console.error("Token verification error:", error);
                localStorage.removeItem("adminToken");
                setToken(null);
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(API_ENDPOINTS.USER_SIGNIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Sign in failed");
            }

            // Store token and admin data
            localStorage.setItem("adminToken", data.token);
            setToken(data.token);
            setAdmin(data.admin);

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const signup = async (email, password) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.USERS}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Sign up failed");
            }

            // Store token and admin data
            localStorage.setItem("adminToken", data.token);
            setToken(data.token);
            setAdmin(data.admin);

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        setToken(null);
        setAdmin(null);
    };

    const value = {
        admin,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!admin
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
