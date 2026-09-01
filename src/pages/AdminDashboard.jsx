
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAdminUsers, deleteAdminUser, updateAdminUser, getAdminContacts, } from "@/api/authApi";
import { adminUserSchema } from "../validation/adminUserSchema";
import { useFormik } from "formik";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("overview");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser
        ? JSON.parse(storedUser)
        : null;
    const [editingUser, setEditingUser] = useState(null);
    const editFormik = useFormik({
        enableReinitialize: true,

        initialValues: {
            fullName: editingUser?.fullName || "",
            email: editingUser?.email || "",
            phone: editingUser?.phone || "",
            role: editingUser?.role || "user",
        },

        validationSchema: adminUserSchema,

        onSubmit: async (
            values,
            { setSubmitting, resetForm }
        ) => {
            if (!editingUser) {
                return;
            }



            try {
                await updateAdminUser(editingUser.id, values);

                setUsers((currentUsers) =>
                    currentUsers.map((listedUser) =>
                        listedUser.id === editingUser.id
                            ? { ...listedUser, ...values }
                            : listedUser
                    )
                );

                alert("User updated successfully");
                resetForm();
                setEditingUser(null);
            } catch (error) {
                alert(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

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

                <Sheet>
                    <SheetTrigger>Open Sidebar</SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">

                        <nav className="mt-8 flex  flex-col flex-wrap gap-3">
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
                    </SheetContent>
                </Sheet>


            </header>
            {activeSection === "users" && editingUser && (
                <form
                    onSubmit={editFormik.handleSubmit}
                    className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6"
                >
                    <h3 className="text-xl font-semibold">
                        Edit {editingUser.fullName}
                    </h3>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="edit-fullName" className="text-sm font-medium">
                                Full name
                            </label>

                            <input
                                id="edit-fullName"
                                name="fullName"
                                value={editFormik.values.fullName}
                                onChange={editFormik.handleChange}
                                onBlur={editFormik.handleBlur}
                                className="mt-1 h-10 w-full rounded-md border bg-white px-3"
                            />

                            {editFormik.touched.fullName &&
                                editFormik.errors.fullName && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {editFormik.errors.fullName}
                                    </p>
                                )}
                        </div>

                        <div>
                            <label htmlFor="edit-email" className="text-sm font-medium">
                                Email
                            </label>

                            <input
                                id="edit-email"
                                name="email"
                                type="email"
                                value={editFormik.values.email}
                                onChange={editFormik.handleChange}
                                onBlur={editFormik.handleBlur}
                                className="mt-1 h-10 w-full rounded-md border bg-white px-3"
                            />

                            {editFormik.touched.email &&
                                editFormik.errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {editFormik.errors.email}
                                    </p>
                                )}
                        </div>

                        <div>
                            <label htmlFor="edit-phone" className="text-sm font-medium">
                                Phone
                            </label>

                            <input
                                id="edit-phone"
                                name="phone"
                                value={editFormik.values.phone}
                                onChange={editFormik.handleChange}
                                onBlur={editFormik.handleBlur}
                                className="mt-1 h-10 w-full rounded-md border bg-white px-3"
                            />

                            {editFormik.touched.phone &&
                                editFormik.errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {editFormik.errors.phone}
                                    </p>
                                )}
                        </div>

                        <div>
                            <label htmlFor="edit-role" className="text-sm font-medium">
                                Role
                            </label>

                            <select
                                id="edit-role"
                                name="role"
                                value={editFormik.values.role}
                                onChange={editFormik.handleChange}
                                onBlur={editFormik.handleBlur}
                                disabled={editingUser.id === currentUser?.id}
                                className="mt-1 h-10 w-full rounded-md border bg-white px-3"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>

                            {editFormik.touched.role &&
                                editFormik.errors.role && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {editFormik.errors.role}
                                    </p>
                                )}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button
                            type="submit"
                            disabled={editFormik.isSubmitting}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {editFormik.isSubmitting
                                ? "Saving..."
                                : "Save changes"}
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setEditingUser(null)}
                            className="bg-slate-200 text-slate-900"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            )}

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
                                                            onClick={() => setEditingUser(user)}
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