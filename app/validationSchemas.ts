import { z } from "zod";

export const createIssueSchema = z
  .object({
    title: z.string().min(3).max(255),
    description: z.string().min(15).max(65535),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  })
  .strict();

export const patchIssueSchema = z
  .object({
    title: z.string().min(3).max(255).optional(),
    description: z.string().min(15).max(65535).optional(),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
    assignedToUserId: z
      .string()
      .min(1, "assignedToUserId is required")
      .max(255)
      .optional()
      .nullable(),
  })
  .strict();
