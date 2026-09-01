import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user, isAdmin } = useAuth();

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <section className="rounded-2xl bg-blue-600 p-8 text-white shadow-lg">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                        Welcome back
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        Hello, {user?.fullName || "User"}
                    </h1>

                    <p className="mt-3 max-w-2xl text-blue-100">
                        Manage your profile, explore our services, and contact us from your
                        dashboard.
                    </p>
                </section>

                <section className="mt-10">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Quick links
                    </h2>

                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Services
                            </h3>

                            <p className="mt-2 text-slate-600">
                                Explore the services currently available.
                            </p>

                            <Link
                                to="/services"
                                className="mt-5 inline-block font-semibold text-blue-600 hover:underline"
                            >
                                View services
                            </Link>
                        </article>

                        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Contact
                            </h3>

                            <p className="mt-2 text-slate-600">
                                Send us a question or project inquiry.
                            </p>

                            <Link
                                to="/contact"
                                className="mt-5 inline-block font-semibold text-blue-600 hover:underline"
                            >
                                Contact us
                            </Link>
                        </article>

                        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900">
                                My profile
                            </h3>

                            <p className="mt-2 text-slate-600">
                                View and manage your account information.
                            </p>

                            <Link
                                to="/profile"
                                className="mt-5 inline-block font-semibold text-blue-600 hover:underline"
                            >
                                View profile
                            </Link>
                        </article>

                        {isAdmin && (
                            <article className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
                                <h3 className="text-xl font-semibold text-red-700">
                                    Admin Dashboard
                                </h3>

                                <p className="mt-2 text-red-600">
                                    Manage users, messages, and application statistics.
                                </p>

                                <Link
                                    to="/admin"
                                    className="mt-5 inline-block font-semibold text-red-700 hover:underline"
                                >
                                    Open admin dashboard
                                </Link>
                            </article>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}