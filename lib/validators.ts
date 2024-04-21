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
