import { useFormik } from "formik";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/api/authApi";
import { registerSchema } from "@/validation/authSchema";

function Register() {
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },

        validationSchema: registerSchema,

        onSubmit: async (
            values,
            { setSubmitting, setStatus }
        ) => {
            // Remove any message from the previous submission
            setStatus(null);

            try {
                const data = await registerUser(values);

                setStatus({
                    type: "success",
                    message: data.message || "Registration successful",
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
                className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white px-4 py-8 shadow-lg"
                noValidate
            >
                <h1 className="text-center text-2xl font-bold text-black">
                    Create Account
                </h1>


                {formik.status && (
                    <p
                        className={
                            formik.status.type === "success"
                                ? "rounded-md bg-green-100 p-2 text-sm text-green-700"
                                : "rounded-md bg-red-100 p-2 text-sm text-red-700"
                        }
                    >
                        {formik.status.message}
                    </p>
                )}


                <div className="flex flex-col gap-1">
                    <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-white text-black"
                    />

                    {formik.touched.fullName &&
                        formik.errors.fullName && (
                            <p className="text-sm text-red-600">
                                {formik.errors.fullName}
                            </p>
                        )}
                </div>


                <div className="flex flex-col gap-1">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-white text-black"
                    />

                    {formik.touched.email && formik.errors.email && (
                        <p className="text-sm text-red-600">
                            {formik.errors.email}
                        </p>
                    )}
                </div>


                <div className="flex flex-col gap-1">
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="9800000000"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-white text-black"
                    />

                    {formik.touched.phone && formik.errors.phone && (
                        <p className="text-sm text-red-600">
                            {formik.errors.phone}
                        </p>
                    )}
                </div>


                <div className="flex flex-col gap-1">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-white text-black"
                    />

                    {formik.touched.password &&
                        formik.errors.password && (
                            <p className="text-sm text-red-600">
                                {formik.errors.password}
                            </p>
                        )}
                </div>


                <div className="flex flex-col gap-1">
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-white text-black"
                    />

                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <p className="text-sm text-red-600">
                                {formik.errors.confirmPassword}
                            </p>
                        )}
                </div>

                <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                    {formik.isSubmitting
                        ? "Creating account..."
                        : "Sign Up"}
                </Button>
            </form>
        </main>
    );
}

export default Register;