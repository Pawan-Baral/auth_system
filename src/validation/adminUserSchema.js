
import * as Yup from "yup";

export const adminUserSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must contain 10 digits")
        .required("Phone is required"),

    role: Yup.string()
        .oneOf(["admin", "user"], "Invalid role")
        .required("Role is required"),
});