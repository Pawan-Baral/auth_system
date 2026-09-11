
import { useState, useRef } from "react";
import {
    useQuery,
    useQueryClient,

} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getAdminUsers, deleteAdminUser, updateAdminUser, getAdminContacts, } from "@/api/authApi";
import { adminUserSchema } from "../validation/adminUserSchema";
import { useFormik } from "formik";
import AdminSidebar from "@/component/AdminSidebar";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import AdminServices from "@/component/AdminServices";
import AdminMessages from "@/component/AdminMessages";
import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
} from "recharts";
import { toast } from "react-toastify";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("overview");
    const [promotingId, setPromotingId] = useState(null);
    const queryClient = useQueryClient();
    const editFormRef = useRef(null);

    const {
        data: users = [],
        isPending: isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-users"],
        queryFn: getAdminUsers,
    });

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser
        ? JSON.parse(storedUser)
        : null;
    const [editingUser, setEditingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 7;
    const totalPages = Math.ceil(users.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);
    const [deleteTarget, setDeleteTarget] = useState(null);
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

                await queryClient.invalidateQueries({
                    queryKey: ["admin-users"],
                });


                toast.success("User updated successfully");
                resetForm();
                setEditingUser(null);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    async function handleDelete(user) {
        setDeleteTarget(user);
    }
    async function handlePromoteToAdmin(user) {


        try {
            setPromotingId(user.id);
            await updateAdminUser(user.id, {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: "admin",
            });

            await queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });

            toast.success(`${user.fullName} has been promoted to admin.`);
        } catch (error) {
            toast.error("Failed to demote user.");
        } finally {
            setPromotingId(null);
        }
    }

    function handleStartEdit(user) {
        setEditingUser(user);
        setTimeout(() => {
            editFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        })
    }
    const totalUsers = users.length;

    const adminCount = users.filter(
        (user) => user.role === "admin"
    ).length;

    const regularUserCount = users.filter(
        (user) => user.role === "user"
    ).length;
    return (

        <SidebarProvider className="min-h-[calc(100svh-4rem)]">
            <AdminSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />

            <SidebarInset>
                <main className="px-6 py-10">
                    <header className="flex items-center gap-4">
                        <SidebarTrigger />

                        <h1 className="text-3xl font-bold text-slate-900">
                            Admin Dashboard
                        </h1>
                    </header>
                    {activeSection === "users" && editingUser && (
                        <form
                            ref={editFormRef}
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
                                        <p className="mt-4 text-red-600">{error.message}</p>
                                    )}
                                    {!isLoading && !error && (
                                        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6  shadow-sm" >
                                            <div className="border-b border-slate-100 pb-4 mb-6">
                                                <h3 className="text-lg font-semibold text-slate-900">User Distribution Overview</h3>
                                            </div>
                                            <div className="grid gap-6 md:grid-cols-2 md:items-center">

                                                <div className="space-y-3">


                                                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                                                        <p className="text-lg text-slate-500">Total users</p>
                                                        <p className=" text-3xl font-bold">{totalUsers}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                                                        <p className="text-lg text-slate-500">Total Admin</p>
                                                        <p className=" text-3xl font-bold">{adminCount}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                                                        <p className="text-lg text-slate-500">Regular Users</p>
                                                        <p className=" text-3xl font-bold">{regularUserCount}</p>
                                                    </div>
                                                </div>

                                                <div className="rounded-xl  max-w-lgborder bg-white p-6 shadow-sm">
                                                    <h3 className="max-w-sm text-lg font-semibold text-slate-800 mb-4">
                                                        Role Ratio (Pie Chart)
                                                    </h3>
                                                    <div className="h-64 w-full">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <PieChart>
                                                                <Pie
                                                                    data={[
                                                                        { name: "Admins", value: adminCount, fill: "#dc2626" },
                                                                        { name: "Regular Users", value: regularUserCount, fill: "#2563eb" },
                                                                    ]}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    innerRadius={40}
                                                                    outerRadius={80}
                                                                    paddingAngle={5}
                                                                    dataKey="value"
                                                                    label={({ name, percent }) =>
                                                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                                                    }
                                                                >
                                                                    {/* Blue for User */}
                                                                </Pie>
                                                                <Tooltip />
                                                            </PieChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                    )}
                                </div>
                            )
                        }
                        {activeSection === "services" && (
                            <div>
                                <AdminServices />
                            </div>
                        )}
                        {activeSection === "users" && (
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    Users
                                </h2>
                                {isLoading && (
                                    <p className="mt-4 text-slate-600">Loading users...</p>
                                )}

                                {error && (
                                    <p className="mt-4 text-red-600">{error.message}</p>
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
                                                {paginatedUsers.map((user) => (
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
                                                                    onClick={() => handleStartEdit(user)}
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
                                                                {user.role !== "admin" && (

                                                                    <AlertDialog>
                                                                        <AlertDialogTrigger asChild>
                                                                            <Button
                                                                                type="button"
                                                                                className="bg-emerald-600 text-white hover:bg-emerald-700"
                                                                                disabled={promotingId === user.id}
                                                                            >
                                                                                {promotingId === user.id ? "Promoting..." : "Promote"}
                                                                            </Button>
                                                                        </AlertDialogTrigger>

                                                                        {/* Enforce solid white background and crisp border */}
                                                                        <AlertDialogContent className="bg-white border border-slate-200 shadow-xl opacity-100">
                                                                            <AlertDialogHeader>
                                                                                <AlertDialogTitle className="text-slate-900 font-bold text-lg">
                                                                                    Promote {user.fullName}?
                                                                                </AlertDialogTitle>
                                                                                <AlertDialogDescription className="text-slate-600 text-sm">
                                                                                    This will change their role from regular user to <strong>Admin</strong>.
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter className="mt-4">
                                                                                <AlertDialogCancel className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">
                                                                                    Cancel
                                                                                </AlertDialogCancel>
                                                                                <AlertDialogAction
                                                                                    onClick={() => handlePromoteToAdmin(user)}
                                                                                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                                                                                >
                                                                                    Confirm Promote
                                                                                </AlertDialogAction>
                                                                            </AlertDialogFooter>
                                                                        </AlertDialogContent>
                                                                    </AlertDialog>

                                                                )}

                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="mt-4 flex items-center justify-between">
                                            <Button
                                                type="button"
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage((page) => page - 1)}
                                            >
                                                Previous
                                            </Button>

                                            <span>
                                                Page {currentPage} of {totalPages}
                                            </span>

                                            <Button
                                                type="button"
                                                disabled={currentPage === totalPages}
                                                onClick={() => setCurrentPage((page) => page + 1)}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>


                        )}

                        {activeSection === "messages" && (
                            <AdminMessages />
                        )}
                        <AlertDialog
                            open={Boolean(deleteTarget)}
                            onOpenChange={(open) => {
                                if (!open) {
                                    setDeleteTarget(null);
                                }
                            }}
                        >
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Delete this user?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            deleteAdminUser(deleteTarget.id);
                                            queryClient.invalidateQueries({
                                                queryKey: ["admin-users"],
                                            });
                                            setDeleteTarget(null);
                                        }}
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </section>
                </main>
            </SidebarInset>
        </SidebarProvider >
    );
}
export default AdminDashboard