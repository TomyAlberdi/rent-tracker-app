import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CreateExpenseDTO } from "@/lib/interfaces";
import { Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
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
interface ExpenseCardProps {
  expense: CreateExpenseDTO;
  form: UseFormReturn<FormSchema>;
}

const ExpenseCard = ({ expense, form }: ExpenseCardProps) => {
  const onDeleteClick = () => {
    //TODO: fix toast layout
    toast.warning("¿Desea eliminar el gasto?", {
      // TODO: Implement expense removal from form data
      action: <Button onClick={() => {}}>Eliminar</Button>,
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
