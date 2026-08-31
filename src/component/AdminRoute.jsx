import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user?.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}