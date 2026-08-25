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

