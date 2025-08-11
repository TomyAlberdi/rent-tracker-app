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
  const addTransaction = () => {
    const newTransactions = [
      ...Record.transactions,
      {
        temporalId: crypto.randomUUID(),
        type: "INCOME" as Transaction["type"],
        title: `Transacción ${Record.transactions.length + 1}`,
        description: "",
        amount: 0,
      },
    ];
    setRecord((prev) => ({
      ...prev,
      transactions: newTransactions,
    }));
  };

  const removeTransaction = (id: string) => {
    const newTransactions = Record.transactions.filter(
      (transaction) => transaction.temporalId !== id
    );
    console.log(newTransactions);
    setRecord((prev) => ({
      ...prev,
      transactions: newTransactions,
    }));
  };

  return (
    <div className="w-full bg-secondary text-white text-center p-2 rounded-md flex flex-col justify-center items-center gap-2">
      <h2 className="alternate-font">
        {Record.transactions.length === 0
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
          {Record.transactions.map(
            (transaction: Transaction) => (
              <TransactionRow
                key={transaction.temporalId}
                setRecord={setRecord}
                transaction={transaction}
                editing={editing}
                removeTransaction={removeTransaction}
              />
            )
          )}
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
            <TableCell colSpan={3} className="text-left">
              Ingreso Neto
            </TableCell>
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
          <CirclePlus /> Añadir Transacción
        </Button>
      )}
    </div>
  );
};
export default RecordTransactions;
