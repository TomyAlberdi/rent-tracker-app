import ExpenseCard from "@/components/ExpenseCard";
import { Button } from "@/components/ui/button";
import { getTotalExpenses } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import z from "zod";

const CreateExpenseDTOSchema = z.object({
  title: z.string(),
  description: z.string(),
  amount: z.number(),
  share: z.number().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  propertyId: z.number(),
  month: z.number("Seleccione un mes").min(1, "El mes es obligatorio"),
  year: z.number("Seleccione un año").min(1, "El año es obligatorio"),
  income: z.string(),
  expenses: z.array(CreateExpenseDTOSchema),
});

type FormSchema = z.infer<typeof formSchema>;
interface RecordExpensesProps {
  form: UseFormReturn<FormSchema>;
  editing: boolean;
}

const RecordExpenses = ({ form, editing }: RecordExpensesProps) => {
  const expenses = form.getValues("expenses");

  return (
    <div className="w-full bg-rose-900 text-white text-center p-2 rounded-md flex flex-col justify-center items-center gap-2">
      <h2 className="alternate-font">
        {expenses.length === 0
          ? "No hay gastos registrados."
          : "Gastos Registrados"}
      </h2>
      {expenses.map((expense, index) => (
        <ExpenseCard key={index} expense={expense} form={form} />
      ))}
      {expenses.length > 0 && (
        <h2 className="alternate-font">
          Total Gastos: ${getTotalExpenses(expenses)}
        </h2>
      )}
      <Button variant={"default"} className="w-1/2" disabled={!editing}>
        {/* TODO: Implement adding expense to form data */}
        {/* ransform expense card into a form with default values and add new expense to form data */}
        <CirclePlus /> Añadir Gasto
      </Button>
    </div>
  );
};
export default RecordExpenses;
