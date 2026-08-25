import * as Yup from "yup";

export const registerSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format (e.g., name@example.com)'
        )
        .required("Email is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must contain 10 digits")
        .required("Phone is required"),

    password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Include an uppercase letter")
        .matches(/[a-z]/, "Include a lowercase letter")
        .matches(/[0-9]/, "Include a number")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export const loginSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),

    password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Include an uppercase letter")
        .matches(/[a-z]/, "Include a lowercase letter")
        .matches(/[0-9]/, "Include a number")
        .required("Password is required"),
});

export const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
    newPassword: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Include an uppercase letter")
        .matches(/[a-z]/, "Include a lowercase letter")
        .matches(/[0-9]/, "Include a number")
        .required("New password is required"),

    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("newPassword")],
            "Passwords must match"
        )
        .required("Confirm password is required"),
});