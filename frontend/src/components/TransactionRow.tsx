import type { TransactionWithId } from "@/components/RecordTransactions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Save, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TransactionRowProps {
  TemporalTransactions: TransactionWithId[];
  setTemporalTransactions: React.Dispatch<
    React.SetStateAction<TransactionWithId[]>
  >;
  transaction: TransactionWithId;
  editing: boolean;
  removeTransaction: (id: number) => void;
}

const TransactionRow = ({
  TemporalTransactions,
  setTemporalTransactions,
  transaction,
  editing,
  removeTransaction,
}: TransactionRowProps) => {
  const [NewTransaction, setNewTransaction] = useState<TransactionWithId>({
    id: transaction.id,
    type: transaction.type,
    title: transaction.title || "",
    description: transaction.description || "",
    amount: transaction.amount ?? 0,
  });

  const saveTransaction = () => {
    if (!NewTransaction.title || !NewTransaction.amount) {
      toast.warning("Debe ingresar un título y un monto.");
      return;
    }
    const newTransactions = TemporalTransactions.map((transaction) => {
      if (transaction.id === NewTransaction.id) {
        return NewTransaction;
      }
      return transaction;
    });
    setTemporalTransactions(newTransactions);
  };

  if (!editing)
    return (
      <TableRow>
        <TableCell className="text-center">
          {NewTransaction.type === "INCOME" ? (
            <TrendingUp size={20} color="green" />
          ) : (
            <TrendingDown size={20} color="red" />
          )}
        </TableCell>
        <TableCell className="text-left">
          <span>{NewTransaction.title}</span><br />
          {NewTransaction.description && (
            <span>{NewTransaction.description}</span>
          )}
        </TableCell>
        <TableCell>
          {NewTransaction.type === "INCOME"
            ? `$ ${NewTransaction.amount}`
            : `- $ ${NewTransaction.amount}`}
        </TableCell>
        <TableCell className="flex justify-center gap-1">
          <Button
            variant={"destructive"}
            className="bg-rose-900!"
            type="button"
            onClick={() => transaction.id && removeTransaction(transaction.id)}
          >
            <Trash2 size={20} />
          </Button>
        </TableCell>
      </TableRow>
    );

    //TODO: Implement edit transaction inputs and functionality
  return (
    <Card
      className={`w-full ${
        transaction.type === "INCOME" ? "bg-emerald-700" : "bg-rose-900"
      }`}
    >
      <CardHeader>
        <Input
          value={NewTransaction.title}
          placeholder="Título"
          onChange={(e) =>
            setNewTransaction((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          className="w-full"
        />
        <div className="flex items-center gap-2">
          <Input
            value={NewTransaction.description ?? ""}
            placeholder="Descripción"
            onChange={(e) =>
              setNewTransaction((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-3/4"
          />
        </div>
        <Input
          type="number"
          value={NewTransaction.amount}
          min={0}
          onChange={(e) =>
            setNewTransaction((prev) => ({
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
            onClick={() => transaction.id && removeTransaction(transaction.id)}
          >
            <Trash2 size={20} />
            Eliminar
          </Button>
          <Button className="w-1/4" type="button" onClick={saveTransaction}>
            <Save size={20} />
            Guardar
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
export default TransactionRow;
