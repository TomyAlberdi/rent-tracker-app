import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import type { CreateRecordDTO, Transaction } from "@/lib/interfaces";
import { Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface TransactionRowProps {
  setRecord: React.Dispatch<React.SetStateAction<CreateRecordDTO>>;
  transaction: Transaction;
  editing: boolean;
  removeTransaction: (id: string) => void;
}

const TransactionRow = ({
  setRecord,
  transaction,
  editing,
  removeTransaction,
}: TransactionRowProps) => {
  const [NewTransaction, setNewTransaction] = useState<Transaction>({
    temporalId: transaction.temporalId,
    type: transaction.type,
    title: transaction.title || "",
    description: transaction.description || "",
    amount: transaction.amount ?? 0,
  });

  useEffect(() => {
    // Skip invalid cases
    if (!NewTransaction.title || NewTransaction.amount <= 0) return;
    setRecord((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) =>
        t.temporalId === NewTransaction.temporalId ? NewTransaction : t
      ),
    }));
  }, [NewTransaction, setRecord]);

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
          <span>{NewTransaction.title}</span>
          <br />
          {NewTransaction.description && (
            <span>{NewTransaction.description}</span>
          )}
        </TableCell>
        <TableCell>
          {NewTransaction.type === "EXPENSE" && "-"} ${" "}
          {NewTransaction.amount ? NewTransaction.amount.toLocaleString() : 0}
        </TableCell>
        <TableCell className="text-center">
          <Button
            variant={"destructive"}
            className="bg-rose-900!"
            type="button"
            disabled
          >
            <Trash2 size={20} />
          </Button>
        </TableCell>
      </TableRow>
    );

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col justify-center items-center gap-2">
          {NewTransaction.type === "INCOME" ? (
            <TrendingUp size={20} color="green" />
          ) : (
            <TrendingDown size={20} color="red" />
          )}
          <Switch
            checked={NewTransaction.type === "INCOME"}
            onCheckedChange={(checked) =>
              setNewTransaction((prev) => ({
                ...prev,
                type: checked ? "INCOME" : "EXPENSE",
              }))
            }
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col justify-center items-center gap-2">
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
          <Input
            value={NewTransaction.description ?? ""}
            placeholder="Descripción (opcional)"
            onChange={(e) =>
              setNewTransaction((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full"
          />
        </div>
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>
        <Button
          variant={"destructive"}
          className="bg-rose-900!"
          type="button"
          onClick={() => {
            if (NewTransaction.temporalId !== undefined) {
              removeTransaction(NewTransaction.temporalId);
            }
          }}
        >
          <Trash2 size={20} />
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default TransactionRow;
