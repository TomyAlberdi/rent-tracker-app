import RecordExpenses from "@/components/RecordExpenses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecordContext } from "@/context/useRecordContext";
import type { CreateRecordDTO, RecordDTO } from "@/lib/interfaces";
import { getMonthName, getTotalExpenses } from "@/lib/utils";
import { CircleSlash, FileCheck, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AddRecordProps {
  record: RecordDTO;
}

const AddRecord = ({ record }: AddRecordProps) => {
  const { saveRecord, deleteRecord } = useRecordContext();

  const [Editing, setEditing] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Record, setRecord] = useState<CreateRecordDTO>({
    propertyId: record.propertyId,
    month: record.month,
    year: record.year,
    income: record.income,
    expenses: record.expenses ? [...record.expenses] : [],
  });
  const [CalculatedNetIncome, setCalculatedNetIncome] = useState(
    record.netIncome
  );

  useEffect(() => {
    setCalculatedNetIncome(Record.income - getTotalExpenses(Record.expenses));
  }, [Record.income, Record.expenses]);

  const resetRecord = () => {
    setRecord({
      propertyId: record.propertyId,
      month: record.month,
      year: record.year,
      income: record.income,
      expenses: record.expenses ? [...record.expenses] : [],
    });
  };

  const onSubmit = () => {
    setLoading(true);
    const recordToSave = {
      ...Record,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      expenses: Record.expenses.map(({ id, ...rest }) => rest),
    };
    saveRecord(recordToSave)
      .finally(() => {
        setLoading(false);
        setEditing(false);
        window.location.reload();
      });
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
    <div className="w-full flex flex-col justify-center items-center">
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
                {Array.from({ length: 10 }, (_, i) => i + 2025).map((year) => (
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
        <article className="w-full">
          <span>Ingresos</span>
          <Input
            min={0}
            type="number"
            className="w-1/2"
            placeholder="Ingresos"
            value={Record.income}
            disabled={Loading || !Editing}
            onChange={(e) =>
              setRecord((prev) => ({
                ...prev,
                income: Number(e.target.value),
              }))
            }
          />
        </article>
        <RecordExpenses
          Record={Record}
          setRecord={setRecord}
          editing={Editing}
        />
        <div className="w-full text-center">
          <h2 className="alternate-font flex flex-col">
            Ingreso neto
            <span className="text-xl font-semibold">
              {CalculatedNetIncome >= 0
                ? `$ ${CalculatedNetIncome}`
                : `- $ ${Math.abs(CalculatedNetIncome)}`}
            </span>
          </h2>
        </div>
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
