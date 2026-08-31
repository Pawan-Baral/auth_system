import { getServices } from "@/api/authApi";

export default function Services() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <header className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        What we offer
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Our Services
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        Explore the services currently available through our
                        application.
                    </p>
                </header>

                <section className="mt-10 grid gap-6 md:grid-cols-3">
                    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Authentication
                        </h2>

                        <p className="mt-2 text-sm text-slate-600">
                            Secure login, registration and account access.
                        </p>
                    </article>

                    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Profile Management
                        </h2>

                        <p className="mt-2 text-sm text-slate-600">
                            View and manage your personal account information.
                        </p>
                    </article>

                    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Account Security
                        </h2>

                        <p className="mt-2 text-sm text-slate-600">
                            Password reset and account-security features.
                        </p>
                    </article>
                </section>
            </div>
        </main>
    );
}