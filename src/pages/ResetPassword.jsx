import { useFormik } from "formik";
import {
    Link,
    useSearchParams,
} from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { resetPassword } from "@/api/authApi";
import { resetPasswordSchema } from "@/validation/authSchema";

function ResetPassword() {
    const [searchParams] = useSearchParams();

    // Extracts the token from:
    // /reset-password?token=reset-token-value
    const token = searchParams.get("token");

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },

        validationSchema: resetPasswordSchema,

        onSubmit: async (
            values,
            { setSubmitting, setStatus, resetForm }
        ) => {
            setStatus(null);

            if (!token) {
                setStatus({
                    type: "error",
                    message: "The password reset token is missing.",
                });

                setSubmitting(false);
                return;
            }

            const resetData = {
                token,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            };

            try {
                const data = await resetPassword(resetData);

                resetForm();

                setStatus({
                    type: "success",
                    message: data.message,
                });
            } catch (error) {
                setStatus({
                    type: "error",
                    message: error.message,
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
            <form
                onSubmit={formik.handleSubmit}
                className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
                noValidate
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Reset Password
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Create a new password for your account.
                    </p>
                </div>

                {!token && (
                    <p className="rounded-md bg-red-100 p-3 text-sm text-red-700">
                        This reset link is invalid because its token is missing.
                    </p>
                )}

                {formik.status && (
                    <p
                        className={
                            formik.status.type === "success"
                                ? "rounded-md bg-green-100 p-3 text-sm text-green-700"
                                : "rounded-md bg-red-100 p-3 text-sm text-red-700"
                        }
                    >
                        {formik.status.message}
                    </p>
                )}

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="newPassword"
                        className="text-sm font-medium text-slate-700"
                    >
                        New password
                    </label>

                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Enter your new password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        aria-invalid={
                            formik.touched.newPassword &&
                            Boolean(formik.errors.newPassword)
                        }
                        className="h-11 border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                    />

                    <div className="min-h-5">
                        {formik.touched.newPassword &&
                            formik.errors.newPassword && (
                                <p className="text-sm text-red-600">
                                    {formik.errors.newPassword}
                                </p>
                            )}
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-slate-700"
                    >
                        Confirm new password
                    </label>

                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        aria-invalid={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        className="h-11 border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                    />

                    <div className="min-h-5">
                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <p className="text-sm text-red-600">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={!token || formik.isSubmitting}
                    className="h-11 w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                    {formik.isSubmitting
                        ? "Resetting password..."
                        : "Reset Password"}
                </Button>

                <Link
                    to="/login"
                    className="text-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Back to Login
                </Link>
            </form>
        </main>
    );
}

export default ResetPassword;