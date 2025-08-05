import ExpenseCard from "@/components/ExpenseCard";
import { Button } from "@/components/ui/button";
import type { CreateExpenseDTO, CreateRecordDTO } from "@/lib/interfaces";
import { getTotalExpenses } from "@/lib/utils";
import { CirclePlus } from "lucide-react";

interface RecordExpensesProps {
  Record: CreateRecordDTO;
  setRecord: React.Dispatch<React.SetStateAction<CreateRecordDTO>>;
  editing: boolean;
}

//TODO: update to new interfaces
const RecordExpenses = ({
  Record,
  setRecord,
  editing,
}: RecordExpensesProps) => {
  const addEmptyExpense = () => {
    const currentExpenses = Record.expenses || [];
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
    setRecord((prev) => ({ ...prev, expenses: newExpenses }));
  };

  const removeExpense = (id: number) => {
    const currentExpenses: CreateExpenseDTO[] = Record.expenses || [];
    const newExpenses = currentExpenses.filter((expense) => expense.id !== id);
    setRecord((prev) => ({ ...prev, expenses: newExpenses }));
  };

  return (
    <div className="w-full bg-rose-900 text-white text-center p-2 rounded-md flex flex-col justify-center items-center gap-2">
      <h2 className="alternate-font">
        {Record.expenses.length === 0
          ? "No hay gastos registrados."
          : "Gastos Registrados"}
      </h2>
      {Record.expenses.map((expense: CreateExpenseDTO) => (
        <ExpenseCard
          Record={Record}
          setRecord={setRecord}
          key={expense.id}
          expense={expense}
          editing={editing}
          removeExpense={removeExpense}
        />
      ))}
      {Record.expenses.length > 0 && (
        <h2 className="alternate-font">
          Total Gastos: ${getTotalExpenses(Record.expenses)}
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
