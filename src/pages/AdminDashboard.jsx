
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAdminUsers, deleteAdminUser } from "@/api/authApi";

import React from 'react'

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("overview");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser
        ? JSON.parse(storedUser)
        : null;

    async function handleDelete(user) {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${user.fullName}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteAdminUser(user.id);

            setUsers((currentUsers) =>
                currentUsers.filter(
                    (currentUser) => currentUser.id !== user.id
                )
            );
        } catch (error) {
            setError(error.message);
        }
    }
    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await getAdminUsers();

                console.log("Admin users:", data);
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadUsers();
    }, []);
    const totalUsers = users.length;

    const adminCount = users.filter(
        (user) => user.role === "admin"
    ).length;

    const regularUserCount = users.filter(
        (user) => user.role === "user"
    ).length;
    return (
        <main className="mx-auto max-w-7xl px-6 py-10">
            <header>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin Dashbard</h1>

                <nav className="mt-8 flex flex-wrap gap-3">
                    <Button
                        type="button"
                        onClick={() => setActiveSection("overview")}
                        className={
                            activeSection === "overview"
                                ? "bg-red-600 text-white"
                                : "bg-slate-200 text-slate-900"
                        }
                    >Overview</Button>
                    <Button
                        type="button"
                        onClick={() => setActiveSection("users")}
                        className={
                            activeSection === "users"
                                ? "bg-red-600 text-white"
                                : "bg-slate-200 text-slate-900"
                        }
                    >
                        Users
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setActiveSection("messages")}
                        className={
                            activeSection === "messages"
                                ? "bg-red-600 text-white"
                                : "bg-slate-200 text-slate-900"
                        }
                    >
                        Messages
                    </Button>
                </nav>

            </header>

            <section className="mt-8">
                {
                    activeSection === "overview" && (
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>

                            {isLoading && (
                                <p className="mt-4 text-slate-600">Loading statistics...</p>
                            )}

                            {error && (
                                <p className="mt-4 text-red-600">{error}</p>
                            )}
                            {!isLoading && !error && (
                                <div>
                                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <p className="text-sm text-slate-500">Total users</p>
                                        <p className="mt-2 text-3xl font-bold">{totalUsers}</p>
                                    </div>
                                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <p className="text-sm text-slate-500">Total Admin</p>
                                        <p className="mt-2 text-3xl font-bold">{adminCount}</p>
                                    </div>
                                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <p className="text-sm text-slate-500">Regular Users</p>
                                        <p className="mt-2 text-3xl font-bold">{regularUserCount}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
                {activeSection === "users" && (
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Users
                        </h2>
                        {isLoading && (
                            <p className="mt-4 text-slate-600">Loading users...</p>
                        )}

                        {error && (
                            <p className="mt-4 text-red-600">{error}</p>
                        )}
                        {!isLoading && !error && (
                            <div className="mt-6 overflow-x-auto rounded-md border">
                                <table className="w-full  bg-white text-left">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Phone</th>
                                            <th className="px-4 py-3">Role</th>
                                            <th className="px-4 py-3">Joined</th>
                                            <th className="px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-t">
                                                <td className="px-4 py-3">{user.fullName}</td>
                                                <td className="px-4 py-3">{user.email}</td>
                                                <td className="px-4 py-3">{user.phone}</td>

                                                <td className="px-4 py-3">
                                                    <span
                                                        className={
                                                            user.role === "admin"
                                                                ? "rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                                                                : "rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                                                        }
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            type="button"
                                                            className="bg-blue-600 text-white hover:bg-blue-700"
                                                        >
                                                            Edit
                                                        </Button>

                                                        <Button
                                                            type="button"
                                                            onClick={() => handleDelete(user)}
                                                            disabled={user.id === currentUser?.id}
                                                            className="bg-red-600 text-white hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>


                )}

                {activeSection === "messages" && (
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Messages
                        </h2>

                        <p className="mt-2 text-slate-600">
                            Contact statistics and messages will appear here.
                        </p>
                    </div>
                )}
            </section>
        </main >
    )
}

export default AdminDashboard