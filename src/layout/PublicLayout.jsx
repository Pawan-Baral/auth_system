import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";
import Footer from "../component/Footer";

function PublicLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { isAdmin, endSession } = useAuth();

    async function handleLogout() {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            endSession();
            setIsSidebarOpen(false);
            navigate("/login", { replace: true });
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />

            {isSidebarOpen && (
                <>
                    <div
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 top-16 z-30 bg-black/30"
                    />


                    <aside className="fixed bottom-0 right-0 top-16 z-40 flex w-72 flex-col gap-4 border-l border-slate-200 bg-white p-6 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-700">Menu</span>
                            <Button
                                size="sm"
                                onClick={() => setIsSidebarOpen(false)}
                                className="h-8 w-8"
                            >
                                ✕
                            </Button>
                        </div>

                        <nav className="flex flex-col gap-3">
                            <Link
                                to="/profile"
                                onClick={() => setIsSidebarOpen(false)}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Profile
                            </Link>

                            <Link
                                to="/dashboard"
                                onClick={() => setIsSidebarOpen(false)}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Dashboard
                            </Link>


                            <Button
                                type="button"
                                onClick={handleLogout}
                                className="mt-4 bg-red-600 text-white hover:bg-red-700"
                            >
                                Logout
                            </Button>
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                        </nav>
                    </aside>
                </>
            )}

            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default PublicLayout;