import z from "zod";

export const CreateExpenseDTOSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  amount: z.number(),
  share: z.number().optional(),
});

export const formSchema = z.object({
  propertyId: z.number(),
  month: z.number("Seleccione un mes").min(1, "El mes es obligatorio"),
  year: z.number("Seleccione un año").min(1, "El año es obligatorio"),
  income: z.string(),
  expenses: z.array(CreateExpenseDTOSchema),
});

export type FormSchema = z.infer<typeof formSchema>;
