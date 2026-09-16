import { useRef, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/component/ConfirmDialog";
import { getAdminUsers, deleteAdminUser, updateAdminUser } from "@/api/authApi";
import { useMemo } from "react";
import DataTable from "@/component/DataTable";

import { adminUserSchema } from "@/validation/adminUserSchema";

function AdminUsers() {
    const queryClient = useQueryClient();
    const editFormRef = useRef(null);

    const [editingUser, setEditingUser] =
        useState(null);

    const [deleteTarget, setDeleteTarget] =
        useState(null);

    const [promotingId, setPromotingId] =
        useState(null);
    const [promoteTarget, setPromoteTarget] =
        useState(null);

    const [currentPage, setCurrentPage] =
        useState(1);

    const usersPerPage = 7;

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
    const userColumns = useMemo(
        () => [
            {
                accessorKey: "fullName",
                header: "Name",

            },
            {
                accessorKey: "email",
                header: "Email",

            },
            {
                accessorKey: "phone",
                header: "Phone",
            },
            {
                accessorKey: "role",
                header: "Role",
                cell: ({ row }) => {
                    const user = row.original;

                    return (
                        <span className={user.role === "admin"
                            ? "rounded-full bg-red-100 px-3 py-1 text-red-700"
                            : "rounded-full bg-blue-100 px-3 py-1 text-blue-700"
                        }
                        > {user.role}
                        </span>
                    );
                },
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => {
                    const user = row.original;
                    return (
                        <div className="flex flex-wrap gap-2">
                            <Button onClick={() => handleStartEdit(user)} className="bg-blue-600  hover:bg-blue-700 text-white">Edit</Button>
                            <Button onClick={() => handleDelete(user)} disabled={user.id === currentUser?.id} className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
                            {user.role !== "admin" && (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setPromoteTarget(user);

                                    }
                                    }
                                    disabled={
                                        promotingId === user.id
                                    }
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                    {promotingId === user.id
                                        ? "Promoting..."
                                        : "Promote"}
                                </Button>
                            )}
                        </div>
                    )
                }
            }
        ],
        [currentUser, promotingId]
    )


    const totalPages = Math.max(
        1,
        Math.ceil(users.length / usersPerPage)
    );

    const startIndex =
        (currentPage - 1) * usersPerPage;

    const paginatedUsers = users.slice(
        startIndex,
        startIndex + usersPerPage
    );

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
                await updateAdminUser(
                    editingUser.id,
                    values
                );

                await queryClient.invalidateQueries({
                    queryKey: ["admin-users"],
                });

                toast.success(
                    "User updated successfully"
                );

                resetForm();
                setEditingUser(null);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    function handleStartEdit(user) {
        setEditingUser(user);

        setTimeout(() => {
            editFormRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 0);
    }

    function handleDelete(user) {
        setDeleteTarget(user);
    }

    async function confirmDelete() {
        if (!deleteTarget) {
            return;
        }

        try {
            await deleteAdminUser(deleteTarget.id);

            await queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });

            toast.success(
                "User deleted successfully"
            );

            setDeleteTarget(null);
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setDeleteTarget(null);
        }
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

            toast.success(
                `${user.fullName} is now an admin`
            );
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPromotingId(null);
        }
    }

    if (isLoading) {
        return (
            <section className="mt-8">
                <p>Loading users...</p>
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
                Users
            </h2>

            {editingUser && (
                <form
                    ref={editFormRef}
                    onSubmit={editFormik.handleSubmit}
                    className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6"
                >
                    <h3 className="text-xl font-semibold">
                        Edit {editingUser.fullName}
                    </h3>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <input
                            name="fullName"
                            placeholder="Full name"
                            value={editFormik.values.fullName}
                            onChange={editFormik.handleChange}
                            className="h-10 rounded-md border bg-white px-3"
                        />

                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={editFormik.values.email}
                            onChange={editFormik.handleChange}
                            className="h-10 rounded-md border bg-white px-3"
                        />

                        <input
                            name="phone"
                            placeholder="Phone"
                            value={editFormik.values.phone}
                            onChange={editFormik.handleChange}
                            className="h-10 rounded-md border bg-white px-3"
                        />

                        <select
                            name="role"
                            value={editFormik.values.role}
                            onChange={editFormik.handleChange}
                            disabled={
                                editingUser.id === currentUser?.id
                            }
                            className="h-10 rounded-md border bg-white px-3"
                        >
                            <option value="user">
                                User
                            </option>

                            <option value="admin">
                                Admin
                            </option>
                        </select>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button
                            type="submit"
                            disabled={editFormik.isSubmitting}
                            className="bg-blue-600 text-white"
                        >
                            {editFormik.isSubmitting
                                ? "Saving..."
                                : "Save changes"}
                        </Button>

                        <Button
                            type="button"
                            onClick={() =>
                                setEditingUser(null)
                            }
                            className="bg-slate-200 text-slate-900"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            )}

            <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
                <DataTable
                    data={paginatedUsers}
                    columns={userColumns}
                />

                <div className="flex items-center justify-between border-t p-4">
                    <Button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(
                                (page) => page - 1
                            )
                        }
                    >
                        Previous
                    </Button>

                    <span className="text-sm text-slate-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <Button
                        type="button"
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                (page) => page + 1
                            )
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title={`Delete ${deleteTarget?.fullName}?`}
                description="This action cannot be undone."
                confirmText="Delete"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
            <ConfirmDialog
                open={Boolean(promoteTarget)}
                title={`Promote ${promoteTarget?.fullName}?`}
                description="This will give this user admin permissions."
                confirmText="Promote"
                onConfirm={async () => {
                    await handlePromoteToAdmin(promoteTarget);
                    setPromoteTarget(null);
                }}
                onCancel={() => setPromoteTarget(null)}
            />
        </section>
    );
}

export default AdminUsers;