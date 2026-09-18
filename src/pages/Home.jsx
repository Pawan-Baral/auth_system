import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getServices } from "@/api/authApi";
import { API_BASE_URL } from "../api/authApi";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

export default function Home() {

    const { user, isAdmin } = useAuth();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        async function loadServices() {
            try {
                const data = await getServices();

                console.log("Services:", data);
                setServices(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadServices();
    }, []);


    return (
        <>
            <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-10">
                <div className="mx-auto max-w-6xl space-y-12">

                    {/* Hero Banner Section */}
                    <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8  text-white shadow-xl">
                        <span className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100">
                            Welcome back, {user?.fullName || "Valued Guest"}
                        </span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                            Innovating the Digital Future
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 md:text-lg">
                            We are proud to deliver cutting-edge IT solutions designed to transform businesses.
                            From conceptual design to robust software deployment, global brands trust us to bring their vision to life.
                        </p>
                        <Link
                            to="/services"
                            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-md transition-all duration-200 hover:bg-blue-50 hover:scale-105 active:scale-95"
                        >
                            Explore Services
                        </Link>
                    </section>

                    {/* Core Services Section */}
                    <section>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                                Our Core Services
                            </h2>
                            <p className="mt-1 text-slate-600">
                                End-to-end digital expertise tailored for growing businesses.
                            </p>
                        </div>
                        {isLoading && (<Loader />)}


                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <article
                                    key={service.id}
                                    onClick={() => navigate(`/services/${service.id}`)}
                                    className="flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    {service.image && (
                                        <img
                                            src={`${API_BASE_URL}/public/${service.image}`}
                                            alt={service.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    )}

                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold">
                                            {service.title}
                                        </h2>

                                        <p className="mt-3 text-gray-600">
                                            {service.shortDescription || service.description}
                                        </p>

                                        <p className="mt-4 font-semibold">
                                            {service.currency} {service.price}
                                        </p>


                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* Admin Dashboard Card
                    {isAdmin && (
                        <section className="rounded-2xl border border-red-200 bg-red-50/70 p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-red-800">
                                Admin Control Panel
                            </h3>
                            <p className="mt-1 text-sm text-red-600">
                                Manage user permissions, client inquiries, and system metrics.
                            </p>
                            <Link
                                to="/admin"
                                className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                            >
                                Open Admin Dashboard &rarr;
                            </Link>
                        </section>
                    )} */}

                </div>
            </main>
        </>
    );
}