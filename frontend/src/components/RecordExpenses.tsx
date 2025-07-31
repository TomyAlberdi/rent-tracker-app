import ExpenseCard from "@/components/ExpenseCard";
import { Button } from "@/components/ui/button";
import { CreateExpenseDTOSchema, formSchema } from "@/lib/expenseSchemas";
import { getTotalExpenses } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import z from "zod";

type FormSchema = z.infer<typeof formSchema>;
interface RecordExpensesProps {
  form: UseFormReturn<FormSchema>;
  editing: boolean;
}

const RecordExpenses = ({ form, editing }: RecordExpensesProps) => {
  const expenses: z.infer<typeof CreateExpenseDTOSchema>[] =
    form.watch("expenses");

  const addEmptyExpense = () => {
    const currentExpenses = form.getValues("expenses") || [];
    const newExpenses = [
      ...currentExpenses,
      {
        id: Date.now() + Math.random(), // unique id
        title: "",
        description: "",
        amount: 0,
        share: undefined,
      },
    ];
    form.setValue("expenses", newExpenses);
  };

  const removeExpense = (id: number) => {
    const currentExpenses: z.infer<typeof CreateExpenseDTOSchema>[] =
      form.getValues("expenses") || [];
    const newExpenses = currentExpenses.filter((expense) => expense.id !== id);
    form.setValue("expenses", newExpenses);
  };

  return (
    <div className="w-full bg-rose-900 text-white text-center p-2 rounded-md flex flex-col justify-center items-center gap-2">
      <h2 className="alternate-font">
        {expenses.length === 0
          ? "No hay gastos registrados."
          : "Gastos Registrados"}
      </h2>
      {expenses.map((expense: z.infer<typeof CreateExpenseDTOSchema>) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          form={form}
          editing={editing}
          removeExpense={removeExpense}
        />
      ))}
      {expenses.length > 0 && (
        <h2 className="alternate-font">
          Total Gastos: ${getTotalExpenses(expenses)}
        </h2>
      )}
      {editing && (
        <Button
          variant={"default"}
          className="w-1/2"
          type="button"
          disabled={!editing}
          onClick={addEmptyExpense}
        >
          <CirclePlus /> Añadir Gasto
        </Button>
      )}
    </div>
  );
};
export default RecordExpenses;
