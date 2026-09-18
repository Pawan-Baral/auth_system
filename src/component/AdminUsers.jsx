import { useState } from "react";
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

import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Pencil, Trash2, TrendingUp, ShieldCheck } from "lucide-react";

function AdminUsers() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();


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

    const { user: currentUser } = useAuth();
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
                            <Button onClick={() => navigate(`/admin/users/${user.id}/edit`)} className="bg-blue-600  hover:bg-blue-700 text-white"> <Pencil /></Button>
                            <Button onClick={() => handleDelete(user)} disabled={user.id === currentUser?.id} className="bg-red-600 hover:bg-red-700 text-white"><Trash2 /></Button>
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
                                        : <ShieldCheck />}
                                </Button>
                            )}
                        </div>
                    )
                }
            }
        ],
        [currentUser, promotingId, navigate]
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
                <Loader />
            </section>
        );
    }

    if (error) {
        toast.error(error.message);
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