import RecordTransactions from "@/components/RecordTransactions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecordContext } from "@/context/useRecordContext";
import type { CreateRecordDTO, Record, Transaction } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
import { CircleSlash, FileCheck, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AddRecordProps {
  record: Record;
}

const AddRecord = ({ record }: AddRecordProps) => {
  const { saveRecord, deleteRecord } = useRecordContext();

  const [Editing, setEditing] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Record, setRecord] = useState<CreateRecordDTO>({
    id: record.id,
    type: record.type,
    parentId: record.parentId,
    month: record.month,
    year: record.year,
    transactions: record.transactions,
  });
  const [CalculatedTotalIncome, setCalculatedTotalIncome] = useState(
    record.totalIncome
  );
  const [CalculatedTotalExpenses, setCalculatedTotalExpenses] = useState(
    record.totalExpenses
  );
  const [CalculatedNetIncome, setCalculatedNetIncome] = useState(
    record.netIncome
  );

  useEffect(() => {
    const totalIncome = Record.transactions.reduce(
      (acc, curr) => (curr.type === "INCOME" ? acc + curr.amount : acc),
      0
    );
    setCalculatedTotalIncome(totalIncome);
    const totalExpenses = Record.transactions.reduce(
      (acc, curr) => (curr.type === "EXPENSE" ? acc + curr.amount : acc),
      0
    );
    setCalculatedTotalExpenses(totalExpenses);
    setCalculatedNetIncome(totalIncome - totalExpenses);
  }, [Record.transactions]);

  const resetRecord = () => {
    setRecord({
      id: record.id || null,
      type: record.type,
      parentId: record.parentId,
      month: record.month,
      year: record.year,
      transactions: record.transactions,
    });
  };

  const checkRecord = (record: CreateRecordDTO) => {
    const transactionsWithoutId = (Record.transactions as Transaction[]).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ temporalId, ...rest }) => rest
    );
    return {
      ...record,
      transactions: transactionsWithoutId,
    };
  };

  const onSubmit = () => {
    setLoading(true);
    const transactionsWithoutId = checkRecord(Record);
    if (transactionsWithoutId) {
      saveRecord(transactionsWithoutId).finally(() => {
        window.location.reload();
      });
    }
  };

  const handleDeleteClick = () => {
    toast.warning("¿Desea eliminar el registro?", {
      description: "Esta acción es irreversible.",
      action: <Button onClick={handleDelete}>Eliminar</Button>,
    });
  };

  const handleDelete = async () => {
    if (!record.id) return;
    deleteRecord(record.id).finally(() => {
      window.location.reload();
    });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-center items-center gap-4 w-full">
          <article className="w-full">
            <span>Año</span>
            <Select
              onValueChange={(value) =>
                setRecord((prev) => ({ ...prev, year: Number(value) }))
              }
              value={Record.year.toString()}
              disabled={Loading || !Editing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un año" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + (2025 - 4)).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </article>
          <article className="w-full">
            <span>Mes</span>
            <Select
              onValueChange={(value) =>
                setRecord((prev) => ({ ...prev, month: Number(value) }))
              }
              value={Record.month.toString()}
              disabled={Loading || !Editing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un mes" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {getMonthName(month)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </article>
        </div>
        <RecordTransactions
          Record={Record}
          setRecord={setRecord}
          editing={Editing}
          CalculatedTotalIncome={CalculatedTotalIncome}
          CalculatedTotalExpenses={CalculatedTotalExpenses}
          CalculatedNetIncome={CalculatedNetIncome}
        />
        <div className="w-full flex justify-center items-center gap-2">
          {Editing ? (
            <>
              <Button
                disabled={Loading}
                type="button"
                className="w-1/4"
                variant={"destructive"}
                onClick={() => {
                  resetRecord();
                  setEditing(false);
                }}
              >
                <CircleSlash />
                Cancelar
              </Button>
              <Button
                disabled={Loading}
                type="submit"
                className="w-1/4"
                onClick={onSubmit}
              >
                <FileCheck />
                Confirmar
              </Button>
              <Button
                disabled={Loading}
                variant={"destructive"}
                type="button"
                onClick={handleDeleteClick}
                className="flex justify-center items-center"
              >
                <Trash2 size={20} />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="w-1/2"
              onClick={() => setEditing(true)}
            >
              <PencilLine />
              Editar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddRecord;
