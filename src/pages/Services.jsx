import { getServices } from "@/api/authApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api/authApi";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

export default function Services() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        async function loadServices() {
            try {
                const data = await getServices();

                console.log("Services:", data);
                await delay(2000);
                setServices(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadServices();
    }, []);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return toast.error(error.message);
    }


    return (
        <main className="mx-auto max-w-6xl flex flex-col px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold">Our Services</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <article
                        key={service.id}
                        className="flex flex-col overflow-hidden transition hover:-translate-y-1 rounded-xl border bg-white shadow-sm"
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
                            <p
                                className={
                                    service.isActive
                                        ? "mt-4 font-semibold text-green-600"
                                        : "mt-4 font-semibold text-red-600"
                                }
                            >
                                {service.isActive ? "Active" : "Inactive"}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {service.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <Link
                                to={`/services/${service.id}`}
                                className="mt-5 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                View details
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
