import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Enter a valid email"),
  budgetRange: z.enum(["<1k", "1k-5k", "5k-20k", "20k+"]),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
