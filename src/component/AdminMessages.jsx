import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "@/component/ConfirmDialog";
import Loader from "./Loader";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    deleteContact,
    getAdminContacts,
    getContactStats,
    setContactRead,
} from "@/api/authApi";
import DataTable from "@/component/DataTable";
import { Button } from "@/components/ui/button";

function AdminMessages() {
    const queryClient = useQueryClient();
    const [deleteTarget, setDeleteTarget] = useState(null);
    const contactsQuery = useQuery({
        queryKey: ["admin-contacts"],
        queryFn: getAdminContacts,
    });

    const statsQuery = useQuery({
        queryKey: ["contact-stats"],
        queryFn: getContactStats,
    });

    const readMutation = useMutation({
        mutationFn: ({ contactId, isRead }) =>
            setContactRead(contactId, isRead),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin-contacts"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["contact-stats"],
            });

            toast.success("Message status updated");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteContact,

        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: ["admin-contacts"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["contact-stats"],
            });

            toast.success(
                response?.message ||
                "Message deleted successfully"
            );
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    const messageColumns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                cell: ({ row }) => {
                    const contact = row.original;

                    return (
                        contact.name ||
                        contact.fullName ||
                        "Unknown"
                    );
                },
            },

            {
                accessorKey: "email",
                header: "Email",
            },

            {
                accessorKey: "subject",
                header: "Subject",
            },

            {
                accessorKey: "message",
                header: "Message",
                cell: ({ row }) => (
                    <p className="max-w-xs truncate">
                        {row.original.message}
                    </p>
                ),
            },

            {
                id: "status",
                header: "Status",
                cell: ({ row }) => {
                    const contact = row.original;
                    const isRead = Boolean(contact.isRead);

                    return (
                        <span
                            className={
                                isRead
                                    ? "rounded-full bg-green-100 px-3 py-1 text-green-700"
                                    : "rounded-full bg-amber-100 px-3 py-1 text-amber-700"
                            }
                        >
                            {isRead ? "Read" : "Unread"}
                        </span>
                    );
                },
            },

            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => {
                    const contact = row.original;
                    const isRead = Boolean(contact.isRead);

                    return (
                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                disabled={readMutation.isPending}
                                onClick={() =>
                                    readMutation.mutate({
                                        contactId: contact.id,
                                        isRead: !isRead,
                                    })
                                }
                                className="border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
                            >
                                {isRead
                                    ? "Mark unread"
                                    : "Mark read"}
                            </Button>

                            <Button
                                type="button"
                                disabled={deleteMutation.isPending}
                                onClick={() =>
                                    handleDelete(contact.id)
                                }
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </Button>
                        </div>
                    );
                },
            },
        ],
        [
            readMutation,
            deleteMutation,
            readMutation
        ]
    );
    if (contactsQuery.isPending) {
        return <Loader />;
    }

    if (contactsQuery.error) {
        return (
            <p className="text-red-600">
                {contactsQuery.error.message}
            </p>
        );
    }

    const contacts = contactsQuery.data || [];
    const stats = statsQuery.data || {};

    const readCount =
        stats.read ??
        stats.readCount ??
        0;

    const unreadCount =
        stats.unread ??
        stats.unreadCount ??
        0;

    const totalCount =
        stats.total ??
        stats.totalCount ??
        contacts.length ??
        0;

    function handleDelete(contactId) {
        setDeleteTarget(contactId);

    }

    return (
        <section>
            <h2 className="text-2xl font-semibold">
                Contact messages
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <StatCard
                    label="Total"
                    value={totalCount}
                />

                <StatCard
                    label="Read"
                    value={readCount}
                />

                <StatCard
                    label="Unread"
                    value={unreadCount}
                />
            </div>

            <div className="mt-6 space-y-4">
                {contacts.length > 0 ? (
                    <div className="mt-6">
                        <DataTable
                            data={contacts}
                            columns={messageColumns}
                        />
                    </div>
                ) : (
                    <p className="mt-6">
                        No contact messages found.
                    </p>
                )}
            </div>
            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title="Delete this message?"
                description="This message will be permanently deleted."
                confirmText="Delete"
                onConfirm={() => {
                    deleteMutation.mutate(deleteTarget);
                    setDeleteTarget(null);
                }}
                onCancel={() => setDeleteTarget(null)}
            />
        </section>
    );
}


function StatCard({ label, value }) {
    return (
        <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-2xl font-bold">
                {value}
            </p>
        </div>
    );
}

export default AdminMessages;