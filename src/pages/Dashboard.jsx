import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDashboard } from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
    const { user: loggedInUser } = useAuth();

    const [dashboardData, setDashboardData] =
        useState(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboard();
                setDashboardData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (isLoading) {
        return (
            <main className="mx-auto max-w-6xl px-6 py-10">
                <p>Loading dashboard...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-6xl px-6 py-10">
                <p className="text-red-600">
                    {error}
                </p>
            </main>
        );
    }

    const dashboardUser =
        dashboardData?.user || loggedInUser;

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <section className="rounded-2xl bg-blue-600 p-8 text-white shadow-lg">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
                        Welcome back
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        Hello,{" "}
                        {dashboardUser?.fullName ||
                            "User"}
                    </h1>

                    <p className="mt-3 text-blue-100">
                        {dashboardData?.message ||
                            "Welcome to your dashboard."}
                    </p>
                </section>

                <section className="mt-8 grid gap-5 md:grid-cols-3">
                    <DashboardCard
                        title="My profile"
                        description="View and update your account information."
                        link="/profile"
                        linkText="Open profile"
                    />

                    <DashboardCard
                        title="Services"
                        description="Explore the services available to you."
                        link="/services"
                        linkText="View services"
                    />

                    <DashboardCard
                        title="Contact"
                        description="Send us a message or project inquiry."
                        link="/contact"
                        linkText="Contact us"
                    />
                </section>

                <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">
                        Account details
                    </h2>

                    <div className="mt-4 space-y-3">
                        <DashboardDetail
                            label="Name"
                            value={
                                dashboardUser?.fullName
                            }
                        />

                        <DashboardDetail
                            label="Email"
                            value={dashboardUser?.email}
                        />

                        <DashboardDetail
                            label="Role"
                            value={dashboardUser?.role}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

function DashboardCard({
    title,
    description,
    link,
    linkText,
}) {
    return (
        <article className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
                {title}
            </h2>

            <p className="mt-2 text-slate-600">
                {description}
            </p>

            <Link
                to={link}
                className="mt-5 inline-block font-semibold text-blue-600 hover:underline"
            >
                {linkText}
            </Link>
        </article>
    );
}

function DashboardDetail({ label, value }) {
    return (
        <div className="flex justify-between border-b pb-3">
            <span className="text-slate-500">
                {label}
            </span>

            <span className="font-medium  text-slate-900">
                {value || "Not available"}
            </span>
        </div>
    );
}