import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export default function AdminRoute() {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}