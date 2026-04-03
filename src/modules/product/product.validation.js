import * as z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Name is required min. 3 character!"),
  description: z.string().optional(),
  price: z.number().positive("Harga harus lebih dari 0!"),
  condition: z.enum(["baru", "baik", "cukup"], {
    errorMap: () => ({ message: "Condition harus: baru, baik, atau cukup" }),
  }),
  size: z.string().optional(),
  brand: z.string().optional(),
  stock: z.number().int().min(0).default(1),
});

export const updateProductSchema = z.object({
  name: z.string().min(3, "Name is required min. 3 character!"),
  description: z.string().optional(),
  price: z.number().positive("Harga harus lebih dari 0!"),
  condition: z.enum(["baru", "baik", "cukup"], {
    errorMap: () => ({ message: "Condition harus: baru, baik, atau cukup" }),
  }),
  size: z.string().optional(),
  brand: z.string().optional(),
  stock: z.number().int().min(0).default(1),
  is_active: z.boolean().default(true),
});

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});
