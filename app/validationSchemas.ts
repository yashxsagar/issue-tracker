import { z } from "zod";

export const createIssueSchema = z
  .object({
    title: z.string().min(3).max(255),
    description: z.string().min(15),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  })
  .strict();
