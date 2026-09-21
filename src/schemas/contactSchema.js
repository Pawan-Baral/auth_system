import * as Yup from "yup"

export const contactSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(2, "Name must contain at least 2 characters")
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Enter a valid email address")
        .required("Email is required"),
    subject: Yup.string()
        .trim()
        .min(3, "Subject must contain at least 3 characters")
        .required("Subject is required"),

    message: Yup.string()
        .trim()
        .min(10, "Message must contain at least 10 characters")
        .required("Message is required"),
})