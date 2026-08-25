import {
    CheckCircle2,
    Clock3,
    KeyRound,
    LogIn,
    ShieldCheck,
    UserRound,
} from "lucide-react";

import { getDashboard } from "@/api/authApi";
import Navbar from "@/component/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
        return null;
    }
}


function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const user = getStoredUser();
    const displayName = user?.fullName || "User";
    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboard();

                console.log("Dashboard response:", data);
                setDashboardData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            {isLoading && (
                <p className="p-4 text-blue-600">
                    Loading dashboard...
                </p>
            )}

            {error && (
                <p className="p-4 text-red-600">
                    {error}
                </p>
            )}

            {dashboardData && (
                <p className="p-4 text-green-600">
                    {dashboardData.message}
                </p>
            )}
            <div className="mx-auto w-full max-w-6xl px-4 py-8 ">
                <section className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Dashboard
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-950 ">
                        Welcome back, {displayName}!
                    </h1>
                    <p className="mt-2 text-base text-slate-600">
                        Here is a quick overview of your account.
                    </p>
                </section>

                <section className="grid gap-5 md:grid-cols-3">
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <UserRound className="size-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
                        <p className="mt-3 font-medium text-slate-800">{displayName}</p>
                        <p className="mt-1 break-all text-sm text-slate-500">
                            {user?.email || "No email available"}
                        </p>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <CheckCircle2 className="size-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Account status
                        </h2>
                        <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                            Active
                        </span>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <ShieldCheck className="size-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                            <KeyRound className="size-4 text-violet-500" />
                            Password protected
                        </div>
                    </article>
                </section>

                <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Recent activity
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Your latest account activity appears here.
                            </p>
                        </div>
                        <Clock3 className="size-5 text-slate-400" />
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <LogIn className="size-4" />
                        </div>
                        <div>
                            <p className="font-medium text-slate-800">
                                Signed in successfully
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Your current session is active.
                            </p>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}

export default Dashboard;
