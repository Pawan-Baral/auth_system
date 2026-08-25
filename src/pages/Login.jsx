import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";


import { loginUser } from "@/api/authApi"
import { useFormik } from "formik";
import { loginSchema } from "../validation/authSchema";

function Login() {
    const navigate = useNavigate();
    const Formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus(null);

            try {
                const data = await loginUser(values);

                console.log("Login response: ", data);
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("user", JSON.stringify(data.user));
                setStatus({
                    type: "success",
                    message: data.message || "Successful login!",
                })
                navigate("/dashboard", { replace: true })
            }
            catch (error) {
                console.error("Error Message ", error);
                setStatus({
                    type: "error",
                    message: error.message,
                })
                alert(error.message);
            }
            finally {
                setSubmitting(false);
            }
        }
    })

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8 ">
            <form
                onSubmit={Formik.handleSubmit}
                className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg "
            >
                <div className="mb-1 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to continue to your account.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jondoe@example.com"
                        value={Formik.values.email}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        className="h-11 border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-400"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={Formik.values.password}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        className="h-11 border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-400"
                    />
                </div>

                <Link
                    to="/forgot-password"
                    className="self-end text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Forgot Password?
                </Link>

                <Button type="submit"
                    disabled={Formik.isSubmitting}
                    className="h-11 w-full bg-blue-600 text-white hover:bg-blue-700">
                    {
                        Formik.isSubmitting ? "Logging in..." : "Log in"
                    }
                </Button>

                <p className="text-center text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </main>
    );
}
export default Login; 
