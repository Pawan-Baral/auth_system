import axios from "axios";


const api = axios.create({
    baseURL: "http://192.168.150.169:3000",
});

export async function registerUser(userData) {
    try {
        const response = await api.post("/api/auth/register", userData);

        return response.data;
    }
    catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Registration failed");
    }


}
export async function loginUser(loginData) {

    try {
        const response = await api.post("/api/auth/login", loginData);
        return response.data;

    }
    catch (error) {
        const apiMessage = error.response?.data?.message;

        let message;
        if (Array.isArray(apiMessage)) {
            message = apiMessage.join(", ")
        }
        else {
            message = apiMessage;
        }
        throw new Error(message || "Login Failed");

    }
}
export async function forgotPassword(email) {
    try {
        const response = await api.post(
            "/api/auth/forgot-password",
            {
                email: email
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
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("You are not authenticated");
    }

    try {
        const response = await api.get("/api/auth/dashboard", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to load dashboard");
    }
}
export async function getProfile() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("You are not authenticated");
    }

    try {
        const response = await api.get("/api/profile", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

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
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        throw new Error("You are not authenticated");

    }
    try {
        const response = await api.get("/api/services", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        });
        return response.data;
    }
    catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to load services");
    }
}
export async function submitContact(contactData) {
    try {
        const response = await api.post("api/contact", contactData);
        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message;
        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;
        throw new Error(message || "Unable to send message ");
    }
}
export async function logoutUser() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        throw new Error("You are not authenticated");

    }
    try {
        const response = await api.post("/api/auth/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    }
    catch (error) {
        const apiMessage = error.response?.data?.message;

        const message = Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage;

        throw new Error(message || "Unable to log out");
    }
}
export async function getAdminUsers() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("You are not authenticated");
    }

    try {
        const response = await api.get("/api/admin/users", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

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
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("You are not authenticated");
    }

    try {
        const response = await api.delete(
            `/api/admin/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
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
export async function updateAdminUser(userId, updatedData) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("You are not authenticated");
    }

    try {
        const response = await api.patch(
            `/api/admin/users/${userId}`,
            updatedData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
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