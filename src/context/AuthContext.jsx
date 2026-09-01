import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);

function readStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("user") || "null");

    } catch {
        return null;
    }

}

export function AuthProvider({ children }) {

    useEffect(() => {
        function handleSessionExpired() {
            setUser(null);
            setIsAuthenticated(false);
        }
        function handleSessionRefreshed(event) {
            setUser(event.detail);
            setIsAuthenticated(true);
        }
        window.addEventListener(
            "auth:session-expired",
            handleSessionExpired
        );
        window.addEventListener(
            "auth:session-refreshed",
            handleSessionRefreshed
        );
        return () => {
            window.removeEventListener(
                "auth:session-expired",
                handleSessionExpired
            );

            window.removeEventListener(
                "auth:session-refreshed",
                handleSessionRefreshed
            );
        };

    }, []);
    const [user, setUser] = useState(readStoredUser);
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => Boolean(localStorage.getItem("accessToken"))
    );

    function startSession(loginData) {
        localStorage.setItem(
            "accessToken",
            loginData.accessToken
        );
        localStorage.setItem(
            "refreshToken",
            loginData.refreshToken
        );
        localStorage.setItem(
            "user",
            JSON.stringify(loginData.user)
        );
        setUser(loginData.user);
        setIsAuthenticated(true);
    }

    function endSession() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        setUser(null);
        setIsAuthenticated(false);
    }

    const isAdmin = user?.role === "admin";
    const value = {
        user,
        isAuthenticated,
        isAdmin,
        startSession,
        endSession,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider."
        );
    }
    return context;
}
