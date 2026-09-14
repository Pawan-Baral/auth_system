import { useQuery } from "@tanstack/react-query";
import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
} from "recharts";

import { getAdminUsers } from "@/api/authApi";

function AdminOverview() {
    const {
        data: users = [],
        isPending,
        error,
    } = useQuery({
        queryKey: ["admin-users"],
        queryFn: getAdminUsers,
    });

    const totalUsers = users.length;

    const adminCount = users.filter(
        (user) => user.role === "admin"
    ).length;

    const regularUserCount = users.filter(
        (user) => user.role === "user"
    ).length;

    if (isPending) {
        return (
            <section className="mt-8">
                <p className="text-slate-600">
                    Loading statistics...
                </p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="mt-8">
                <p className="text-red-600">
                    {error.message}
                </p>
            </section>
        );
    }

    return (
        <section className="mt-8">
            <h2 className="text-2xl font-semibold text-slate-900">
                Overview
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Total users
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {totalUsers}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Total admins
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-600">
                        {adminCount}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Regular users
                    </p>

                    <p className="mt-2 text-3xl font-bold text-blue-600">
                        {regularUserCount}
                    </p>
                </div>
            </div>

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                    User distribution
                </h3>

                <div className="mt-4 h-72">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <PieChart>
                            <Pie
                                data={[
                                    {
                                        name: "Admins",
                                        value: adminCount,
                                        fill: "#dc2626",
                                    },
                                    {
                                        name: "Users",
                                        value: regularUserCount,
                                        fill: "#2563eb",
                                    },
                                ]}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={95}
                                label={({ name, percent }) =>
                                    `${name}: ${(
                                        percent * 100
                                    ).toFixed(0)}%`
                                }
                            />

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}

export default AdminOverview;