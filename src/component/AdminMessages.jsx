import { useState } from "react";
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
} from "@/components/ui/alert-dialog";

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

    if (contactsQuery.isPending) {
        return <p>Loading messages...</p>;
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
        stats.readCount;

    const unreadCount =
        stats.unread ??
        stats.unreadCount;

    const totalCount =
        stats.total ??
        stats.totalCount ??
        contacts.length;

    function handleDelete(contact) {
        setDeleteTarget(contact);

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
                {contacts.map((contact) => {
                    const isRead = Boolean(
                        contact.isRead
                    );

                    return (
                        <article
                            key={contact.id}
                            className={`rounded-lg border bg-white p-4 ${isRead
                                ? "border-slate-200"
                                : "border-amber-400"
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold">
                                        {contact.name ||
                                            contact.fullName}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        {contact.email}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-2 py-1 text-xs ${isRead
                                        ? "bg-green-100 text-green-700"
                                        : "bg-amber-100 text-amber-700"
                                        }`}
                                >
                                    {isRead
                                        ? "Read"
                                        : "Unread"}
                                </span>
                            </div>

                            <p className="mt-3 font-medium">
                                {contact.subject}
                            </p>

                            <p className="mt-2 text-slate-700">
                                {contact.message}
                            </p>

                            <div className="mt-4 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        readMutation.mutate({
                                            contactId:
                                                contact.id,
                                            isRead: !isRead,
                                        })
                                    }
                                    disabled={
                                        readMutation.isPending
                                    }
                                    className="rounded-md border px-3 py-2 text-sm hover:bg-slate-100"
                                >
                                    {isRead
                                        ? "Mark unread"
                                        : "Mark read"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(contact.id)
                                    }
                                    disabled={
                                        deleteMutation.isPending
                                    }
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    );
                })}

                {contacts.length === 0 && (
                    <p>No contact messages found.</p>
                )}
            </div>
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
                            Delete this message?
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
                                deleteMutation.mutate(deleteTarget);

                                setDeleteTarget(null);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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