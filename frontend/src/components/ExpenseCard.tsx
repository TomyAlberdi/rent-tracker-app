import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecordContext } from "@/context/useRecordContext";
import type { ExpenseDTO } from "@/lib/interfaces";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ExpenseCardProps {
  expense: ExpenseDTO;
  reloadExpenses: boolean;
  setReloadExpenses: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpenseCard = ({
  expense,
  reloadExpenses,
  setReloadExpenses,
}: ExpenseCardProps) => {
  const { deleteExpense } = useRecordContext();

  const onDeleteClick = () => {
    //TODO: fix toast layout
    toast("¿Desea eliminar el gasto?", {
      description: "Esta acción es irreversible.",
      action: <Button onClick={() => handleDelete()}>Eliminar</Button>,
    });
  };

  const handleDelete = async () => {
    deleteExpense(expense.id).finally(() => {
      setReloadExpenses(!reloadExpenses);
    });
  };

  return (
    <Card className="w-full relative">
      <div className="absolute top-2 right-2 flex justify-center items-center p-2 rounded-md bg-rose-900 cursor-pointer hover:bg-rose-800">
        <Trash2 size={20} onClick={onDeleteClick} />
      </div>
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
};
export default ExpenseCard;
