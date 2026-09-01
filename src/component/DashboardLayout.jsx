import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/api/authApi";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const { isAdmin, endSession } = useAuth();
    async function handleLogout() {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Log out error:", error);
        } finally {
            endSession();
            navigate("/login", { replace: true });
        }

    }
    return (
        <>
            <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
            {
                isSidebarOpen && (
                    <>
                        <button type="button" aria-label="Close Sidebar" onClick={() => setIsSidebarOpen(false)} className="fixed inset-x-0 bottom-0 top-16 z-30 bg-black/30" />
                        <aside className="fixed right-0 top-16 w-72 flex flex-col bg-white p-6 border-2 border-slate-200  gap-4 shadow-2xl z-40 bottom-0" >
                            <Button onClick={() => setIsSidebarOpen(false)} className="bg-red-500 size-10 text-2xl  ">X</Button>
                            <Link to="/profile" onClick={() => setIsSidebarOpen(false)}>Profile</Link>
                            <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>Dashboard</Link>
                            <Button
                                type="button"
                                onClick={handleLogout}
                                className="bg-red-600 text-white rounded-full hover:bg-red-700"
                            >Logout</Button>

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="font-semibold text-red-600"
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                        </aside>
                    </>
                )
            }
            <Outlet />
        </>
    )
}

export default DashboardLayout