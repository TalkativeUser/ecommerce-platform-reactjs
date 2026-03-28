import * as yup from "yup";

export const checkoutSchema = yup
    .object({
      firstName: yup
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(20, "First name is too long")
        .required("First name is required"),

      lastName: yup
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),

      email: yup
        .string()
        .trim()
        .email("Invalid email format")
        .required("Email address is required"),

      phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits"),

      address: yup
        .string()
        .trim()
        .min(10, "Address must be at least 10 characters long")
        .required("Shipping address is required"),

      city: yup.string().required("Please select or enter your city"),

      zipCode: yup
        .string()
        .required("Zip code is required")
        .matches(/^[0-9]{5}$/, "Zip code must be exactly 5 digits"),

      country: yup.string().required("Please select your country"),
    })
    .required("All form fields are required");