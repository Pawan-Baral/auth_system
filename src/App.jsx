import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route
                    path="/reset-password"
                    element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;