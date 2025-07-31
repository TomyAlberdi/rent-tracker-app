import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import type { CreateExpenseDTO } from "@/lib/interfaces";
import { CreateExpenseDTOSchema, formSchema } from "@/lib/expenseSchemas";
import { Save, Trash2 } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import z from "zod";
import { Input } from "./ui/input";

type FormSchema = z.infer<typeof formSchema>;
interface ExpenseCardProps {
  expense: z.infer<typeof CreateExpenseDTOSchema>;
  form: UseFormReturn<FormSchema>;
  editing: boolean;
  removeExpense: (id: number) => void;
}

const ExpenseCard = ({
  expense,
  form,
  editing,
  // index, // removed unused prop
  removeExpense,
}: ExpenseCardProps) => {
  const [NewExpense, setNewExpense] = useState<
    z.infer<typeof CreateExpenseDTOSchema>
  >({
    title: expense.title || "",
    description: expense.description || "",
    amount: expense.amount || 0,
    share: expense.share || undefined,
  });

  const addExpense = () => {
    if (!NewExpense.title || !NewExpense.amount) return;
    const newExpenses: z.infer<typeof CreateExpenseDTOSchema>[] =
      form.getValues("expenses") || [];
    if (expense.id) {
      const updatedExpenses = newExpenses.map((exp) =>
        exp.id === expense.id ? { ...exp, ...NewExpense } : exp
      );
      form.setValue("expenses", updatedExpenses);
    } else {
      form.setValue("expenses", [
        ...newExpenses,
        { ...NewExpense, id: Date.now() + Math.random() },
      ]);
    }
  };

  if (!editing)
    return (
      <Card className="w-full relative">
        <CardHeader>
          <CardTitle>{expense.title}</CardTitle>
          {(expense.description || expense.share) && (
            <CardDescription>
              {expense.description}{" "}
              {expense.share && `(Cuota N° ${expense.share})`}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>- $ {expense.amount}</CardContent>
      </Card>
    );

  return (
    <Card className="w-full">
      <CardHeader>
        <Input
          value={NewExpense.title}
          placeholder="Título"
          onChange={(e) =>
            setNewExpense((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full"
        />
        <div className="flex items-center gap-2">
          <Input
            value={NewExpense.description}
            placeholder="Descripción"
            onChange={(e) =>
              setNewExpense((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-3/4"
          />
          <Input
            value={NewExpense.share ?? ""}
            placeholder="Cuota"
            type="number"
            min={0}
            onChange={(e) =>
              setNewExpense((prev) => ({
                ...prev,
                share:
                  e.target.value === "" ? undefined : Number(e.target.value),
              }))
            }
            className="w-1/4"
          />
        </div>
        <Input
          type="number"
          value={NewExpense.amount}
          min={0}
          onChange={(e) =>
            setNewExpense((prev) => ({
              ...prev,
              amount: Number(e.target.value),
            }))
          }
          className="w-full"
        />
        <div className="flex justify-center items-center gap-2 pt-2">
          <Button
            variant={"destructive"}
            className="w-1/4 bg-rose-900!"
            type="button"
            onClick={() => expense.id && removeExpense(expense.id)}
          >
            <Trash2 size={20} />
            Eliminar
          </Button>
          <Button className="w-1/4" type="button" onClick={addExpense}>
            <Save size={20} />
            Guardar
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
export default ExpenseCard;
