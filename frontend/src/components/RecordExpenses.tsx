import ExpenseCard from "@/components/ExpenseCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecordContext } from "@/context/useRecordContext";
import { type ExpenseDTO, type RecordDTO } from "@/lib/interfaces";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

interface RecordExpensesProps {
  record: RecordDTO;
  editing: boolean;
}

const RecordExpenses = ({ record, editing }: RecordExpensesProps) => {
  const { getExpenses, addExpense, updateExpense, deleteExpense } =
    useRecordContext();

  const [Expenses, setExpenses] = useState<ExpenseDTO[]>([]);
  const [reloadExpenses, setReloadExpenses] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ExpensesAmount, setExpensesAmount] = useState(0);

  useEffect(() => {
    if (!record.id) return;
    setLoading(true);
    getExpenses(record.id)
      .then((expenses) => {
        setExpenses(expenses);
        setExpensesAmount(expenses.length);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record.id, reloadExpenses]);

  if (Loading)
    return (
      <Skeleton className="w-full bg-rose-900 text-white text-center py-2 rounded-md">
        <h2 className="alternate-font">Cargando gastos...</h2>
      </Skeleton>
    );

  return (
    <div className="w-full bg-rose-900 text-white text-center p-2 rounded-md flex flex-col justify-center items-center gap-2">
      <h2 className="alternate-font">
        {ExpensesAmount === 0
          ? "No hay gastos registrados."
          : "Gastos Registrados"}
      </h2>
      {Expenses.map((expense, index) => (
        <ExpenseCard
          key={index}
          expense={expense}
          reloadExpenses={reloadExpenses}
          setReloadExpenses={setReloadExpenses}
        />
      ))}
      <Button variant={"default"} className="w-1/2" disabled={!editing}>
        <CirclePlus /> Añadir Gasto
      </Button>
    </div>
  );
};
export default RecordExpenses;
