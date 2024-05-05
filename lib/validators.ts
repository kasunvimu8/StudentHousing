import { furnishing } from "@/constants";
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
  user_id: z
    .string({
      required_error: "user_id is required",
    })
    .min(1),
});

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  user_id: z
    .string()
    .min(5, { message: "ID must be at least 5 characters long" })
    .trim(),
  enrollment_id: z
    .string()
    .min(5, { message: "ID must be at least 5 characters long" })
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
