import { useState } from "react";
import { toast } from "react-toastify";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

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
    createService,
    deleteService,
    getServices,
    updateService,
} from "@/api/authApi";

import { Button } from "@/components/ui/button";
import AdminServiceForm from "@/component/AdminServiceForm";

function AdminServices() {
    const queryClient = useQueryClient();
    const [editingService, setEditingService] = useState(null);
    const [viewMode, setViewMode] = useState("cards");
    const [showForm, setShowForm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const {
        data: services = [],
        isPending,
        error,
    } = useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });


    const saveServiceMutation = useMutation({
        mutationFn: ({ serviceId, formData }) => {
            if (serviceId) {
                return updateService(
                    serviceId,
                    formData
                );
            }

            return createService(formData);
        },

        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: ["services"],
            });

            setEditingService(null);
            setShowForm(false);

            toast.success(
                response?.message ||
                "Service saved successfully"
            );
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });



    const deleteServiceMutation = useMutation({
        mutationFn: deleteService,

        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: ["services"],
            });

            toast.success(
                response?.message ||
                "Service deleted successfully"
            );
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    function openCreateForm() {
        setEditingService(null);
        setShowForm(true);
    }

    function openEditForm(service) {
        setEditingService(service);
        setShowForm(true);
    }

    function closeForm() {
        setEditingService(null);
        setShowForm(false);
    }
    async function handleSaveService(formData, serviceId) {
        return saveServiceMutation.mutateAsync({
            serviceId,
            formData,
        });
    }

    function handleDelete(service) {
        setDeleteTarget(service);

    }

    return (
        <section>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Services
                    </h2>
                </div>

                <div className="flex items-center justify-between">

                    {!showForm && (
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={openCreateForm}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Add service
                            </Button>

                            <Button
                                type="button"
                                onClick={() =>
                                    setViewMode(
                                        viewMode === "cards"
                                            ? "table"
                                            : "cards"
                                    )
                                }
                                className="bg-blue-600 text-white"
                            >
                                {viewMode === "cards"
                                    ? "Table View"
                                    : "Card View"}
                            </Button>
                        </div>
                    )}
                </div>

            </div>

            {showForm ? (
                <AdminServiceForm
                    service={editingService}
                    onSave={handleSaveService}
                    onCancel={closeForm}
                />
            ) : (
                <>

                    {isPending && (
                        <p className="mt-6">
                            Loading services...
                        </p>
                    )}

                    {error && (
                        <p className="mt-6 text-red-600">
                            {error.message}
                        </p>
                    )}

                    {!isPending && !error && (
                        <>
                            {viewMode === "cards" ? (
                                /* Keep your existing cards grid container here */
                                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {services.map((service) => (
                                        <article
                                            key={service.id}
                                            className="rounded-xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1  hover:shadow-lg "
                                        >
                                            <h3 className="text-xl font-semibold">
                                                {service.title}
                                            </h3>
                                            {(service.image) && (
                                                <img
                                                    src={`https://auth.durlavparajuli.com.np/public/${service.image}`}
                                                    alt={service.title}
                                                    className="mb-4 h-40 w-full rounded-lg object-cover"
                                                />

                                            )}
                                            {console.log(service.image)}

                                            <p className="mt-2 text-sm text-slate-500">
                                                {
                                                    service.shortDescription
                                                }
                                            </p>

                                            <p className="mt-4 text-slate-700">
                                                {service.description}
                                            </p>
                                            <p className="mt-4 text-lg font-bold text-slate-900">
                                                {service.price !== null &&
                                                    service.price !== undefined
                                                    ? `${service.currency || "USD"} ${service.price}`
                                                    : "Price not provided"}
                                            </p>
                                            <span
                                                className={
                                                    service.isActive
                                                        ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                                                        : "rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                                                }
                                            >
                                                {service.isActive ? "Active" : "Inactive"}
                                            </span>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {service.tags?.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-5 flex gap-2">
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditForm(
                                                            service
                                                        )
                                                    }
                                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            service
                                                        )
                                                    }
                                                    disabled={
                                                        deleteServiceMutation.isPending
                                                    }
                                                    className="bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (

                                <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-100 text-xs uppercase text-slate-700">
                                            <tr>
                                                <th className="px-4 py-3">Title</th>
                                                <th className="px-4 py-3">Description</th>
                                                <th className="px-4 py-3">Price</th>
                                                <th className="px-4 py-3">Status</th>
                                                <th className="px-4 py-3">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {services.map((service) => (
                                                <tr
                                                    key={service.id}
                                                    className="border-t hover:bg-slate-50"
                                                >
                                                    <td className="px-4 py-3 font-medium text-slate-900">
                                                        {service.title}
                                                    </td>

                                                    <td className="px-4 py-3 text-slate-600">
                                                        {service.shortDescription ||
                                                            service.description}
                                                    </td>

                                                    <td className="px-4 py-3 font-medium">
                                                        {service.price !== null &&
                                                            service.price !== undefined
                                                            ? `${service.currency || "USD"} ${service.price}`
                                                            : "N/A"}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={
                                                                service.isActive
                                                                    ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                                                                    : "rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                                                            }
                                                        >
                                                            {service.isActive
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <Button
                                                                type="button"
                                                                onClick={() =>
                                                                    openEditForm(service)
                                                                }
                                                                className="bg-blue-600 text-white hover:bg-blue-700"
                                                            >
                                                                Edit
                                                            </Button>

                                                            <Button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(service)
                                                                }
                                                                disabled={
                                                                    deleteServiceMutation.isPending
                                                                }
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
                        </>
                    )}

                    {!isPending &&
                        !error &&
                        services.length === 0 && (
                            <p className="mt-6 text-slate-500">
                                No services found.
                            </p>
                        )}
                </>
            )
            }
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
                            Delete this service?
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
                                deleteServiceMutation.mutate(
                                    deleteTarget.id
                                );

                                setDeleteTarget(null);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </section >
    );
}

export default AdminServices;