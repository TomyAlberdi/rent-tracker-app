import RecordExpenses from "@/components/RecordExpenses";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecordContext } from "@/context/useRecordContext";
import type { RecordDTO } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleSlash, FileCheck, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface AddRecordProps {
  record: RecordDTO;
}

const formSchema = z.object({
  propertyId: z.number(),
  month: z.number("Seleccione un mes").min(1, "El mes es obligatorio"),
  year: z.number("Seleccione un año").min(1, "El año es obligatorio"),
  income: z.string(),
});

const AddRecord = ({ record }: AddRecordProps) => {
  const { createRecord, updateRecord } = useRecordContext();

  const [Editing, setEditing] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [CalculatedNetIncome, setCalculatedNetIncome] = useState(
    record.netIncome
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyId: record.propertyId,
      month: record.month,
      year: record.year,
      income: record.income.toString(),
    },
  });

  useEffect(() => {
    //TODO: abstact get expenses to parent component and pass it to this component to calculate net income
    setCalculatedNetIncome(record.income);
  }, [record.income]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (record.id) {
      updateRecord(
        record.id,
        values.propertyId,
        values.month,
        values.year,
        Number(values.income)
      ).finally(() => {
        form.reset();
        setLoading(false);
        window.location.reload();
        setEditing(false);
      });
    } else {
      createRecord(
        values.propertyId,
        values.month,
        values.year,
        Number(values.income)
      ).finally(() => {
        form.reset();
        setLoading(false);
        window.location.reload();
        setEditing(false);
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex justify-center items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Año</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={record.year.toString()}
                    disabled={Loading || !Editing}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un año" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 2025).map(
                        (year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mes</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={record.month.toString()}
                    disabled={Loading || !Editing}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un mes" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {getMonthName(month)}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ingresos</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    min={0}
                    type="number"
                    className="w-1/2"
                    placeholder="Ingresos"
                    disabled={Loading || !Editing}
                    onChange={(e) => {
                      field.onChange(e);
                      setCalculatedNetIncome(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <RecordExpenses record={record} editing={Editing} />
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
                  onClick={() => setEditing(false)}
                >
                  <CircleSlash />
                  Cancelar
                </Button>
                <Button disabled={Loading} type="submit" className="w-1/4">
                  <FileCheck />
                  Confirmar
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
        </form>
      </Form>
    </div>
  );
};
export default AddRecord;
