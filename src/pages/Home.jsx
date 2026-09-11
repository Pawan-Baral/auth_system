import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Home() {
    const { user, isAdmin } = useAuth();

    const services = [
        {
            title: "UI/UX & Product Design",
            description: "Crafting intuitive, user-centered interfaces and engaging digital experiences using modern design systems.",
            keywords: ["Wireframing", "Figma Prototyping", "User Research", "Design Systems"],
            link: "/services"
        },
        {
            title: "Web Development",
            description: "Building scalable, high-performance web applications tailored to enterprise and startup needs alike.",
            keywords: ["React / Next.js", "Full-Stack Architecture", "REST & GraphQL APIs", "SEO & Performance"],
            link: "/services"
        },
        {
            title: "Mobile App Development",
            description: "Delivering native and cross-platform mobile solutions designed for high speed and seamless usability.",
            keywords: ["React Native", "iOS & Android", "Cross-Platform", "App Store Deployment"],
            link: "/services"
        },
        {
            title: "Software Testing & QA",
            description: "Ensuring fault-tolerant, secure, and bug-free software releases through rigorous manual and automated testing.",
            keywords: ["Automated Testing", "CI/CD Pipeline QA", "Performance & Security", "E2E Testing"],
            link: "/services"
        },
        {
            title: "Cloud & DevOps Solutions",
            description: "Optimizing cloud infrastructure for maximum uptime, high scalability, and seamless continuous delivery.",
            keywords: ["AWS / Azure", "Docker & Kubernetes", "CI/CD Integration", "Microservices"],
            link: "/services"
        },
        {
            title: "AI & Custom Software",
            description: "Leveraging modern AI technologies and custom software solutions to automate and transform business workflows.",
            keywords: ["LLM Integration", "Machine Learning", "Workflow Automation", "Enterprise Solutions"],
            link: "/services"
        }
    ];

    return (
        <>
            <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-10">
                <div className="mx-auto max-w-6xl space-y-12">

                    {/* Hero Banner Section */}
                    <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 md:p-12 text-white shadow-xl">
                        <span className="inline-block rounded-full bg-blue-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100">
                            Welcome back, {user?.fullName || "Valued Guest"}
                        </span>
                        <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
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

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service, index) => (
                                <article
                                    key={index}
                                    className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {service.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {service.keywords.map((kw, i) => (
                                                <span
                                                    key={i}
                                                    className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600  hover:bg-blue-50 hover:text-blue-600 cursor-default"
                                                >
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        to={service.link}
                                        className="group mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        Learn more
                                        <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                            &rarr;
                                        </span>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* Admin Dashboard Card */}
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
                    )}

                </div>
            </main>
        </>
    );
}