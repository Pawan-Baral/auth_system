import PublicLayout from "@/component/layouts/PublicLayout";
import DashboardLayout from "@/component/layouts/DashboardLayout";

import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminRoute from "@/routes/AdminRoute";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import Contact from "@/pages/Contact";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUserEdit from "@/pages/AdminUserEdit";

export const publicRoutes = [
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "services",
                element: <Services />,
            },
            {
                path: "services/:idOrSlug",
                element: <ServiceDetails />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Register />,
    },
];

export const privateRoutes = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "/profile",
                        element: <Profile />,
                    },
                    {
                        element: <AdminRoute />,
                        children: [
                            {
                                path: "/admin",
                                element: <AdminDashboard />,
                            },
                            {
                                path: "/admin/users/:id/edit",
                                element: <AdminUserEdit />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];