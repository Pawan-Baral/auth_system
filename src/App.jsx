import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import ProtectedRoute from "./component/ProtectedRoute";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DashboardLayout from "./component/DashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./component/AdminRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Route>
                    </Route>
                </Route>


                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;