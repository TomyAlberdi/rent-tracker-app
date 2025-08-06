import { Button } from "@/components/ui/button";
import type { CreateRecordDTO, Transaction } from "@/lib/interfaces";
import { CirclePlus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface TransactionWithId extends Transaction {
  id: number;
}

interface RecordTransactionsProps {
  Record: CreateRecordDTO;
  setRecord: React.Dispatch<React.SetStateAction<CreateRecordDTO>>;
  editing: boolean;
  CalculatedTotalIncome: number;
  CalculatedTotalExpenses: number;
}

const RecordTransactions = ({
  Record,
  setRecord,
  editing,
}: RecordTransactionsProps) => {
  const [TemporalTransactions, setTemporalTransactions] = useState<
    TransactionWithId[]
  >([]);

  useEffect(() => {
    const transactionsWithId = Record.transactions.map((transaction) => ({
      ...transaction,
      id: Date.now() + Math.random(),
    }));
    setTemporalTransactions(transactionsWithId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTransaction = useCallback(() => {
    const newTransactions = [
      ...TemporalTransactions,
      {
        id: Date.now() + Math.random(),
        type: "INCOME" as Transaction["type"],
        title: "",
        description: "",
        amount: 0,
      },
    ];
    setTemporalTransactions((prev) => ({
      ...prev,
      transactions: newTransactions,
    }));
  }, [TemporalTransactions]);

  const removeTransaction = useCallback(
    (id: number) => {
      const newTransactions = TemporalTransactions.filter(
        (transaction) => transaction.id !== id
      );
      setTemporalTransactions(newTransactions);
    },
    [TemporalTransactions]
  );

  useEffect(() => {
    const transactionsWithoutId = TemporalTransactions.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id, ...rest }) => rest
    );
    setRecord((prevRecord) => ({
      ...prevRecord,
      transactions: transactionsWithoutId,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTransaction, removeTransaction]);

  return (
    <div className="w-full bg-rose-900 text-white text-center p-2 rounded-md flex flex-col justify-center items-center gap-2">
      <h2 className="alternate-font">
        {TemporalTransactions.length === 0
          ? "No hay transacciones registradas."
          : "Transacciones Registradas"}
      </h2>
      {/*TODO: Remove comment when transaction cards are implemented
      {TemporalTransactions.map((transaction: TransactionWithId) => (
        <ExpenseCard
          Record={Record}
          setRecord={setRecord}
          key={expense.id}
          expense={expense}
          editing={editing}
          removeExpense={removeExpense}
        />
      ))}
      {TemporalTransactions.length > 0 && (
        <h2 className="alternate-font">Total Gastos: ${}</h2>
      )} */}
      {editing && (
        <Button
          variant={"default"}
          className="w-1/2"
          type="button"
          disabled={!editing}
          onClick={addTransaction}
        >
          <CirclePlus /> Añadir Gasto
        </Button>
      )}
    </div>
  );
};
export default RecordTransactions;
