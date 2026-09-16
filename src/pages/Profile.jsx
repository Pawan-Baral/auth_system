import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
    getProfile,
    updateProfile,
} from "@/api/authApi";

import ChangePasswordForm from "@/component/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import Loader from "../component/Loader";

const profileSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),

    phone: Yup.string(),
});

function Profile() {
    const [profile, setProfile] = useState(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] = useState("");

    const [activeForm, setActiveForm] =
        useState(null);

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            fullName: profile?.fullName || "",
            email: profile?.email || "",
            phone: profile?.phone || "",
        },

        validationSchema: profileSchema,

        onSubmit: async (
            values,
            { setSubmitting }
        ) => {
            try {
                const response =
                    await updateProfile(values);

                /*
                 * Supports both:
                 *
                 * { message, user }
                 *
                 * or a direct user object.
                 */
                const returnedUser =
                    response?.user ||
                    (response?.fullName
                        ? response
                        : {});

                const updatedProfile = {
                    ...profile,
                    ...values,
                    ...returnedUser,
                };

                setProfile(updatedProfile);

                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedProfile)
                );

                setActiveForm(null);

                toast.success(
                    response?.message ||
                    "Profile updated successfully"
                );
            } catch (error) {
                toast.error(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadProfile();
    }, []);

    function cancelProfileEditing() {
        formik.resetForm();
        setActiveForm(null);
    }

    if (isLoading) {
        return (
            <p className="p-6">
                <Loader />
            </p>
        );
    }

    if (error) {
        return (
            <p className="p-6 text-red-600">
                {error}
            </p>
        );
    }

    const firstLetter =
        profile?.fullName
            ?.charAt(0)
            .toUpperCase() || "U";

    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <section className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-5">
                    <div className="flex items-center gap-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                            {firstLetter}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {profile.fullName}
                            </h1>

                            <p className="text-slate-500">
                                {profile.email}
                            </p>
                        </div>
                    </div>

                    {activeForm === null && (
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                onClick={() =>
                                    setActiveForm(
                                        "profile"
                                    )
                                }
                                className="bg-blue-600 text-white hover:bg-slate-800"
                            >
                                Edit profile
                            </Button>

                            <Button
                                type="button"
                                onClick={() =>
                                    setActiveForm(
                                        "password"
                                    )
                                }
                                className="bg-blue-600 text-white hover:bg-slate-800"
                            >
                                Change password
                            </Button>
                        </div>
                    )}
                </div>

                {activeForm === "profile" && (
                    <form
                        onSubmit={formik.handleSubmit}
                        className="mt-6 space-y-5"
                        noValidate
                    >
                        <h2 className="text-xl font-bold text-slate-900">
                            Edit profile
                        </h2>

                        <ProfileInput
                            formik={formik}
                            name="fullName"
                            label="Full name"
                        />

                        <ProfileInput
                            formik={formik}
                            name="email"
                            label="Email"
                            type="email"
                        />

                        <ProfileInput
                            formik={formik}
                            name="phone"
                            label="Phone number"
                            type="tel"
                        />

                        <div className="flex gap-3">
                            <Button
                                type="submit"
                                disabled={
                                    formik.isSubmitting
                                }
                                className="bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {formik.isSubmitting
                                    ? "Saving..."
                                    : "Save changes"}
                            </Button>

                            <Button
                                type="button"
                                onClick={
                                    cancelProfileEditing
                                }
                                className="bg-slate-200 text-slate-900 hover:bg-slate-300"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}

                {activeForm === "password" && (
                    <ChangePasswordForm
                        onCancel={() =>
                            setActiveForm(null)
                        }
                    />
                )}

                {activeForm === null && (
                    <div className="mt-6 space-y-4">
                        <ProfileItem
                            label="Full name"
                            value={profile.fullName}
                        />

                        <ProfileItem
                            label="Email"
                            value={profile.email}
                        />

                        <ProfileItem
                            label="Phone number"
                            value={
                                profile.phone ||
                                "Not provided"
                            }
                        />

                        <ProfileItem
                            label="Role"
                            value={profile.role}
                        />
                    </div>
                )}
            </section>
        </main>
    );
}

function ProfileInput({
    formik,
    name,
    label,
    type = "text",
}) {
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

            <input
                id={name}
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full rounded-md border border-slate-300 p-2 outline-none focus:border-blue-500"
            />

            {hasError && (
                <p className="mt-1 text-sm text-red-600">
                    {formik.errors[name]}
                </p>
            )}
        </div>
    );
}

function ProfileItem({ label, value }) {
    return (
        <div className="flex items-center justify-between border-b pb-3">
            <span className="text-sm capitalize font-medium text-slate-500">
                {label}
            </span>

            <span className="font-medium  text-slate-900">
                {value}
            </span>
        </div>
    );
}

export default Profile;