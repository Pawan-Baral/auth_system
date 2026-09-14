import { useFormik } from "formik";
import { Button } from "@/components/ui/button";

function AdminServiceForm({ service, onSave, onCancel }) {
    const isEditing = Boolean(service);

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: service?.title || "",
            shortDescription: service?.shortDescription || "",
            description: service?.description || "",
            price: service?.price ?? "",
            tags: service?.tags?.join(", ") || "",
            isActive: service?.isActive ?? true,
            image: null,
        },

        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append(
                "shortDescription",
                values.shortDescription
            );
            formData.append("description", values.description);
            formData.append("price", values.price);

            if (values.image) {
                formData.append("image", values.image);
            }
            const tags = values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

            tags.forEach((tag) => {
                formData.append("tags", tag);
            });
            formData.append(
                "isActive",
                String(values.isActive)
            );

            try {
                await onSave(formData, service?.id);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="mt-4 rounded-xl border bg-white p-6"
        >
            <h2 className="mb-5 text-2xl font-bold">
                {isEditing ? "Edit service" : "Add service"}
            </h2>

            <input
                name="title"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="mb-3 w-full rounded border p-2"
            />

            <input
                name="shortDescription"
                placeholder="Short description"
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                className="mb-3 w-full rounded border p-2"
            />

            <textarea
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="mb-3 w-full rounded border p-2"
            />

            <input
                name="price"
                type="number"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                className="mb-3 w-full rounded border p-2"
            />
            <div className="mb-5 flex items-center gap-3">
                <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formik.values.isActive}
                    onChange={formik.handleChange}
                    className="h-4 w-4 rounded border-slate-300"
                />

                <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-slate-700"
                >
                    Service is active
                </label>
            </div>
            <div className="mb-5">

                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        formik.setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                        )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm"
                />

                <p className="mt-1 text-xs text-slate-500">
                    Choose a PNG, JPG, or JPEG image.
                </p>
            </div>
            <input
                name="tags"
                placeholder="Tags separated by commas"
                value={formik.values.tags}
                onChange={formik.handleChange}
                className="mb-3 w-full rounded border p-2"
            />

            <p className="mb-4 text-sm text-slate-500">
                Example: react, nestjs, frontend
            </p>
            <div className="flex gap-3">
                <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    {isEditing ? "Update service" : "Add service"}
                </Button>

                <Button
                    type="button"
                    onClick={onCancel}
                    className="bg-red-600 text-white hover:bg-red-700"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default AdminServiceForm;