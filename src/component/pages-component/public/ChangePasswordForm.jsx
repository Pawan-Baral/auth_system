import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { changePassword } from "@/service/authApi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const changePasswordSchema = Yup.object({
    currentPassword: Yup.string().required(
        "Current password is required"
    ),

    newPassword: Yup.string()
        .min(
            8,
            "Password must contain at least 8 characters"
        )
        .matches(
            /[A-Z]/,
            "Include an uppercase letter"
        )
        .matches(
            /[a-z]/,
            "Include a lowercase letter"
        )
        .matches(
            /[0-9]/,
            "Include a number"
        )
        .required("New password is required"),

    confirmNewPassword: Yup.string()
        .oneOf(
            [Yup.ref("newPassword")],
            "Passwords must match"
        )
        .required(
            "Confirm your new password"
        ),
});

function ChangePasswordForm({ onCancel }) {
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },

        validationSchema: changePasswordSchema,

        onSubmit: async (
            values,
            { setSubmitting, resetForm }
        ) => {
            try {
                const response =
                    await changePassword(values);

                toast.success(
                    response?.message ||
                    "Password changed successfully"
                );

                resetForm();
                onCancel();
            } catch (error) {
                toast.error(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    function handleCancel() {
        formik.resetForm();
        onCancel();
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="mt-6 space-y-5"
            noValidate
        >
            <h2 className="text-xl font-bold text-slate-900">
                Change password
            </h2>

            <PasswordInput
                formik={formik}
                name="currentPassword"
                label="Current password"
                autoComplete="current-password"
            />

            <PasswordInput
                formik={formik}
                name="newPassword"
                label="New password"
                autoComplete="new-password"
            />

            <PasswordInput
                formik={formik}
                name="confirmNewPassword"
                label="Confirm new password"
                autoComplete="new-password"
            />

            <div className="flex gap-3">
                <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    {formik.isSubmitting
                        ? "Changing..."
                        : "Save password"}
                </Button>

                <Button
                    type="button"
                    onClick={handleCancel}
                    className="bg-slate-200 text-slate-900 hover:bg-slate-300"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}

function PasswordInput({
    formik,
    name,
    label,
    autoComplete,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const hasError =
        formik.touched[name] &&
        formik.errors[name];

    return (
        <div>
            <label
                htmlFor={name}
                className="font-medium text-slate-700"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    autoComplete={autoComplete}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 w-full rounded-md border border-slate-300 p-2 pr-10 outline-none focus:border-blue-500"
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword((visible) => !visible)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    aria-label={
                        showPassword
                            ? `Hide ${label}`
                            : `Show ${label}`
                    }
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {hasError && (
                <p className="mt-1 text-sm text-red-600">
                    {formik.errors[name]}
                </p>
            )}
        </div>
    );
}

export default ChangePasswordForm;