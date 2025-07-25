import * as z from "zod";

export const propertyFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1),
  address: z
    .string({
      required_error: "Address is required",
    })
    .min(1),
  property_id: z
    .string({
      required_error: "Property Id is required",
    })
    .min(1),
  room_id: z
    .string({
      required_error: "Room Id is required",
    })
    .min(1),
  type: z
    .string({
      required_error: "Furnishing Type is required",
    })
    .min(1),
  status: z
    .string({
      required_error: "Status Id is required",
    })
    .min(1),
  property_type: z
    .string({
      required_error: "Property type Id is required",
    })
    .min(1),
  longitude: z.number(),
  latitude: z.number(),
  warm_rent: z.number(),
  size: z.number(),
  from: z.string(),
});

export const reservationPayloadSchema = z.object({
  property_ref_id: z
    .string({
      required_error: "property_ref_id is required",
    })
    .min(1),
});

// Define the Mobile type using zod
export const mobileSchema = z.object({
  number: z
    .string()
    .min(5, { message: "Phone number must be at least 5 characters long" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .trim(),
  countryCode: z
    .string()
    .min(1, { message: "Country code must be at least 1 character long" })
    .regex(/^[A-Za-z]{2}$/, {
      message: "Country code must contain only letters",
    })
    .trim(),
});

// Extend the formOneSchema
export const formOneSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long" })
    .trim(),
  last_name: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" })
    .trim(),
  dob: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
  gender: z.enum(["male", "female", "diverse"], {
    message: "Gender must be either Male, Female, or Diverse",
  }),
  country: z.string().min(1, { message: "Country must be provided" }).trim(),
  phone: mobileSchema,
});

export const SignupFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long" })
    .trim(),
  last_name: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  user_id: z
    .string()
    .min(5, { message: "ID must be at least 5 characters long" })
    .trim(),
  passport: z
    .string()
    .min(5, { message: "Passport ID must be at least 5 characters long" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character",
    })
    .trim(),
  dob: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
  gender: z.enum(["male", "female", "diverse"], {
    message: "Gender must be either Male, Female, or Diverse",
  }),
  country: z.string().min(1, { message: "Country must be provided" }).trim(),
  phone: mobileSchema,
});

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character",
    })
    .trim(),
});

export const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email" })
  .trim();

export const PasswordResetSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character",
      })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character",
      })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const profileUpdateSchema = z.object({
  last_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .trim(),
  first_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .trim(),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(["male", "female", "diverse"], {
    message: "Gender must be either Male, Female, or Diverse",
  }),
  country: z.string().min(1, { message: "Country must be provided" }).trim(),
  phone: mobileSchema,
});
