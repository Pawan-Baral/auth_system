import { getServices } from "@/api/authApi";
import { useEffect, useState } from "react";

export default function Services() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const API_URL = "http://192.168.150.169:3000";

    useEffect(() => {
        async function loadServices() {
            try {
                const data = await getServices();

                console.log("Services:", data);
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
        return <p>Loading services...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }


    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold">Our Services</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <article
                        key={service.id}
                        className="overflow-hidden rounded-xl border bg-white shadow-sm"
                    >
                        {service.image && (
                            <img
                                src={`${API_URL}/public/${service.image}`}
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
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
