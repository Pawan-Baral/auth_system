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
import DashboardLayout from "./layout/DashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./component/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import PublicLayout from "./layout/PublicLayout";
import ServiceDetails from "@/pages/ServiceDetails";
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />

                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/services/:idOrSlug"
                            element={<ServiceDetails />}
                        />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            <Route
                                path="/dashboard"
                                element={<Dashboard />}
                            />

                            <Route
                                path="/profile"
                                element={<Profile />}
                            />

                            <Route element={<AdminRoute />}>
                                <Route
                                    path="/admin"
                                    element={<AdminDashboard />}
                                />
                            </Route>
                        </Route>
                    </Route>

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                    <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                    />
                </Routes>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    closeOnClick
                    pauseOnHover
                />
            </AuthProvider>
        </BrowserRouter>
    );
}
export default App;