import { useFormik } from "formik";
import { submitContact } from "@/api/authApi";
import { contactSchema } from "../validation/contactSchema";


export default function Contact() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema: contactSchema,

        onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
            setStatus(null);
            try {
                const response = await submitContact(values);
                resetForm();
                setStatus({
                    type: "success",
                    message: response.message || "Message sent successfully",
                });
            } catch (error) {
                setStatus({
                    type: "error",
                    message: error.message,
                });
            } finally {
                setSubitting(false);
            }
        }
    })

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-xl">
                <header className="text-center">


                    <h1 className="mt-2 text-3xl font-bold text-slate-900 uppercase tracking-wide text-blue-600">
                        Send us a message
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Complete the form and we will get back to you.
                    </p>
                </header>

                <form
                    onSubmit={formik.handleSubmit}
                    className="mt-10 flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    {formik.status && (
                        <p
                            className={
                                formik.status.type === "success"
                                    ? "text-sm text-green-600"
                                    : "text-sm text-red-600"
                            }
                        >
                            {formik.status.message}
                        </p>
                    )}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-slate-700"
                        >
                            Full name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-slate-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-sm text-red-600">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="subject"
                            className="text-sm font-medium text-slate-700"
                        >
                            Subject
                        </label>

                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="message"
                            className="text-sm font-medium text-slate-700"
                        >
                            Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="resize-none rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-11 rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </main>
    );
}