import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../validation/authSchema";
import { forgotPassword } from "../api/authApi";
import { Link } from "react-router-dom";



function ForgotPassword() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },

        validationSchema: forgotPasswordSchema,

        onSubmit: async (
            values,
            { setSubmitting, setStatus }
        ) => {
            setStatus(null);

            try {
                const data = await forgotPassword(values.email);

                setStatus({
                    type: "success",
                    message: data.message,
                });

                console.log("Reset link:", data.resetLink);
            } catch (error) {
                console.error(error.message);
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
            <form onSubmit={formik.handleSubmit} className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8" noValidate>
                <div className="text-center">
                    <h1>Forgot Password</h1>

                </div>
                <p className="text-gray-600 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-sm text-red-600">
                            {formik.errors.email}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="h-11 w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                    {formik.isSubmitting
                        ? "Sending..."
                        : "Send Reset Link"
                    }
                </Button>
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
                <Link to="/login" className=" text-sm ">
                    Back to Login
                </Link>
            </form>
        </main>
    )
}
export default ForgotPassword;