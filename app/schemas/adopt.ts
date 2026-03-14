import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const adoptSchema = toTypedSchema(
  z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(14, "Please enter a valid phone number"),
    catAge: z.string().min(1, "Please select a preferred age range"),
    message: z.string().min(10, "Tell us a bit more — at least 10 characters"),
    terms: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
  }),
);
