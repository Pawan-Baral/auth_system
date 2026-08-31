import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button";

function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                            <p>LogOut</p>
                        </aside>
                    </>
                )
            }
            <Outlet />
        </>
    )
}

export default DashboardLayout