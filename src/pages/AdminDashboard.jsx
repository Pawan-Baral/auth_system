import { useState } from "react";

import AdminSidebar from "@/component/AdminSidebar";
import AdminOverview from "@/component/AdminOverview";
import AdminUsers from "@/component/AdminUsers";
import AdminMessages from "@/component/AdminMessages";
import AdminServices from "@/component/AdminServices";

import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

function AdminDashboard() {
    const [activeSection, setActiveSection] =
        useState("overview");

    return (
        <SidebarProvider className="min-h-[calc(100svh-4rem)]">
            <AdminSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />

            <SidebarInset>
                <main className="px-6 py-10">
                    <header className="flex items-center gap-4 border-b pb-5">
                        <SidebarTrigger />

                        <h1 className="text-3xl font-bold text-slate-900">
                            Admin Dashboard
                        </h1>
                    </header>

                    {activeSection === "overview" && (
                        <AdminOverview />
                    )}

                    {activeSection === "users" && (
                        <AdminUsers />
                    )}

                    {activeSection === "messages" && (
                        <AdminMessages />
                    )}

                    {activeSection === "services" && (
                        <AdminServices />
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default AdminDashboard;