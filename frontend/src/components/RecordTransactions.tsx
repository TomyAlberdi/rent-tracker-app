import TransactionRow from "@/components/TransactionRow";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CreateRecordDTO, Transaction } from "@/lib/interfaces";
import { CirclePlus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export interface TransactionWithId extends Transaction {
  id: number;
}

interface RecordTransactionsProps {
  Record: CreateRecordDTO;
  setRecord: React.Dispatch<React.SetStateAction<CreateRecordDTO>>;
  editing: boolean;
  CalculatedTotalIncome: number;
  CalculatedTotalExpenses: number;
  CalculatedNetIncome: number;
}

const RecordTransactions = ({
  Record,
  setRecord,
  editing,
  CalculatedTotalIncome,
  CalculatedTotalExpenses,
  CalculatedNetIncome,
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
  }, [TemporalTransactions]);

  return (
    <div className="w-full bg-secondary text-white text-center p-2 rounded-md flex flex-col justify-center items-center gap-2">
      <h2 className="alternate-font">
        {TemporalTransactions.length === 0
          ? "No hay transacciones registradas."
          : "Transacciones Registradas"}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">Tipo</TableHead>
            <TableHead className="w-6/12">Información</TableHead>
            <TableHead className="w-4/12 text-center">Monto</TableHead>
            <TableHead className="w-1/12 text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            TemporalTransactions.map((transaction: TransactionWithId) => (
              <TransactionRow
                key={transaction.id}
                TemporalTransactions={TemporalTransactions}
                setTemporalTransactions={setTemporalTransactions}
                transaction={transaction}
                editing={editing}
                removeTransaction={removeTransaction}
              />
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow className="hover:bg-emerald-800 bg-emerald-800">
            <TableCell colSpan={3} className="text-left">
              Total Ingresos
            </TableCell>
            <TableCell>$ {CalculatedTotalIncome}</TableCell>
          </TableRow>
          <TableRow className="hover:bg-rose-800 bg-rose-800">
            <TableCell colSpan={3} className="text-left">
              Total Gastos
            </TableCell>
            <TableCell>$ {CalculatedTotalExpenses}</TableCell>
          </TableRow>
          <TableRow className="hover:bg-primary-foreground bg-primary-foreground">
            <TableCell colSpan={3} className="text-left">Ingreso Neto</TableCell>
            <TableCell>
              {CalculatedNetIncome >= 0
                ? `$ ${CalculatedNetIncome}`
                : `- $ ${Math.abs(CalculatedNetIncome)}`}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
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
