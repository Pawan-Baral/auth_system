import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";
import Footer from "../component/Footer";
import { UserRound, LayoutDashboard, ShieldCheck, LogOut, X, } from "lucide-react";

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


                    <aside className="fixed bottom-0 right-0 top-16 z-40 flex w-80 flex-col border-l bg-white p-6 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between  pb-4">
                                <div>
                                    <p className=" mx-3 text-md text-slate-500">
                                        Account menu
                                    </p>
                                </div>

                                <Button
                                    size="md"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className=" mx-18 h-8 w-8 hover:bg-red-500"
                                >
                                    ✕
                                </Button>
                            </div>


                        </div>

                        <nav className="mt-4 flex flex-col gap-2">
                            <Link
                                to="/profile"
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                            >

                                Profile
                            </Link>

                            <Link
                                to="/dashboard"
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                            >

                                Dashboard
                            </Link>

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="flex items-center gap-3 rounded-lg bg-red-50 px-3 py-3 font-semibold text-red-700 transition hover:bg-red-100"
                                >

                                    Admin Dashboard
                                </Link>
                            )}

                            <div className="my-3 border-t" />

                            <Button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center justify-start gap-3 rounded-lg bg-red-600 px-3 py-3 text-white hover:bg-red-700"
                            >
                                Logout
                            </Button>
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