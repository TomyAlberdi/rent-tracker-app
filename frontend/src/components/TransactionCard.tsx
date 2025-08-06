import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import type { CreateExpenseDTO } from "@/lib/interfaces";
import type { CreateExpenseDTO, CreateRecordDTO } from "@/lib/interfaces";
import { Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface TransactionCardProps {
  Record: CreateRecordDTO;
  setRecord: React.Dispatch<React.SetStateAction<CreateRecordDTO>>;
  expense: CreateExpenseDTO;
  editing: boolean;
  removeExpense: (id: number) => void;
}

//TODO: Update to new interfaces and functionality
const TransactionCard = ({
  Record,
  setRecord,
  expense,
  editing,
  removeExpense,
}: TransactionCardProps) => {
  const [NewExpense, setNewExpense] = useState<CreateExpenseDTO>({
    title: expense.title || "",
    description: expense.description || "",
    amount: expense.amount ?? 0,
    share: expense.share ?? undefined,
  });

  const addExpense = () => {
    if (!NewExpense.title || NewExpense.amount === undefined || NewExpense.amount === null) {
      toast.warning("Debe ingresar un título y un monto.");
      return;
    }
    const newExpenses: CreateExpenseDTO[] = Record.expenses || [];
    if (expense.id !== undefined) {
      const updatedExpenses = newExpenses.map((exp) =>
        exp.id === expense.id ? { ...exp, ...NewExpense, id: expense.id } : exp
      );
      setRecord((prev) => ({ ...prev, expenses: updatedExpenses }));
    } else {
      setRecord((prev) => ({
        ...prev,
        expenses: [
          ...newExpenses,
          { ...NewExpense, id: Date.now() + Math.random() },
        ],
      }));
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
              amount: e.target.value === "" ? 0 : Number(e.target.value),
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
export default TransactionCard;
