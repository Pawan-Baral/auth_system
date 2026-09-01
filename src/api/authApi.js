import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://192.168.150.169:3000";
const api = axios.create({
    baseURL: "http://192.168.150.169:3000",
});

// Runs before every request made with this Axios instance.
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
const noRefreshPaths = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
];
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        const shouldSkipRefresh =
            noRefreshPaths.includes(originalRequest?.url);

        if (
            status !== 401 || originalRequest?._retry || shouldSkipRefresh) {
            return Promise.reject(error);
        }
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            clearSession();
            return Promise.reject(error);
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`,
                { refreshToken },
            );
            const data = response.data;

            localStorage.setItem(
                "accessToken",
                data.accessToken
            );
            localStorage.setItem(
                "refreshToken",
                data.refreshToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

            return api.request(originalRequest);
        } catch (refreshError) {
            clearSession();
            return Promise.reject(refreshError);
        }
    }
);
function clearSession() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.replace("/login");
}

export async function registerUser(userData) {
    try {
        const response = await api.post(
            "/api/auth/register",
            userData
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Registration failed");
    }
}

export async function loginUser(loginData) {
    try {
        const response = await api.post(
            "/api/auth/login",
            loginData
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Login failed");
    }
}

export async function forgotPassword(email) {
    try {
        const response = await api.post(
            "/api/auth/forgot-password",
            {
                email,
            }
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(
            message || "Unable to send password reset link"
        );
    }
}

export async function resetPassword(resetData) {
    try {
        const response = await api.post(
            "/api/auth/reset-password",
            resetData
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(
            message || "Unable to reset your password"
        );
    }
}

export async function getDashboard() {
    try {
        const response = await api.get(
            "/api/auth/dashboard"
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(
            message || "Unable to load dashboard"
        );
    }
}

export async function getProfile() {
    try {
        const response = await api.get("/api/profile");

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to load profile");
    }
}

export async function getServices() {
    try {
        const response = await api.get("/api/services");

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(
            message || "Unable to load services"
        );
    }
}

export async function submitContact(contactData) {
    try {
        const response = await api.post(
            "/api/contact",
            contactData
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to send message");
    }
}

export async function logoutUser() {
    try {
        const response = await api.post(
            "/api/auth/logout",
            {}
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to log out");
    }
}

export async function getAdminUsers() {
    try {
        const response = await api.get(
            "/api/admin/users"
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to load users");
    }
}

export async function deleteAdminUser(userId) {
    try {
        const response = await api.delete(
            `/api/admin/users/${userId}`
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to delete user");
    }
}

export async function updateAdminUser(
    userId,
    updatedData
) {
    try {
        const response = await api.patch(
            `/api/admin/users/${userId}`,
            updatedData
        );

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to update user");
    }
}

export async function getAdminContacts() {
    try {
        const response = await api.get("/api/contact");

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(
            message || "Unable to load messages"
        );
    }
}