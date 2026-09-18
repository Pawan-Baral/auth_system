import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { getAdminUser, updateAdminUser } from "@/api/authApi";
import { useFormik } from "formik";
import { adminUserSchema } from "../validation/adminUserSchema";
import Loader from "../component/Loader";
import { useAuth } from "../context/AuthContext";

function AdminUserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user: currentUser } = useAuth();


    const { data: user, isPending, error } = useQuery({
        queryKey: ["admin-user", id],
        queryFn: () => getAdminUser(id),
    });
    const editFormik = useFormik({
        enableReinitialize: true,

        initialValues: {
            fullName: user?.fullName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            role: user?.role || "user",
        },

        validationSchema: adminUserSchema,

        onSubmit: async (
            values,
            { setSubmitting, resetForm }
        ) => {
            if (!user) {
                return;
            }

            try {
                await updateAdminUser(id, values);

                await queryClient.invalidateQueries({
                    queryKey: ["admin-users"],
                });

                toast.success(
                    "User updated successfully"
                );

                resetForm();
                navigate("/admin");
            } catch (error) {
                toast.error(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });
    if (isPending) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-600">{error.message}</p>;
    }

    if (!user) {
        return <p>User not found.</p>;
    }

    return (<form

        onSubmit={editFormik.handleSubmit}
        className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6"
    >
        <h3 className="text-xl font-semibold">
            Edit {user.fullName}
        </h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
                name="fullName"
                placeholder="Full name"
                value={editFormik.values.fullName}
                onChange={editFormik.handleChange}
                className="h-10 rounded-md border bg-white px-3"
            />
            {editFormik.touched.fullName && editFormik.errors.fullName && (
                <p className="text-sm text-red-600">
                    {editFormik.errors.fullName}
                </p>
            )}

            <input
                name="email"
                type="email"
                placeholder="Email"
                value={editFormik.values.email}
                onChange={editFormik.handleChange}
                className="h-10 rounded-md border bg-white px-3"
            />
            {editFormik.touched.email && editFormik.errors.email && (
                <p className="text-sm text-red-600">
                    {editFormik.errors.email}
                </p>
            )}

            <input
                name="phone"
                placeholder="Phone"
                value={editFormik.values.phone}
                onChange={editFormik.handleChange}
                className="h-10 rounded-md border bg-white px-3"
            />
            {editFormik.touched.phone && editFormik.errors.phone && (
                <p className="text-sm text-red-600">
                    {editFormik.errors.phone}
                </p>
            )}

            <select
                name="role"
                value={editFormik.values.role}
                onChange={editFormik.handleChange}
                disabled={
                    user.id === currentUser?.id
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
                onClick={() => navigate("/admin")}
                className="bg-slate-200 text-slate-900"
            >
                Cancel
            </Button>
        </div>
    </form>)
}
export default AdminUserEdit;