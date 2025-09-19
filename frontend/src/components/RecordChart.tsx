import AddRecord from "@/components/AddRecord";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRecordContext } from "@/context/Record/useRecordContext";
import type { PropertyType, Record, Transaction } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const addIdToTransactions = (transactions: Transaction[]) => {
  return transactions.map((transaction) => ({
    ...transaction,
    temporalId: crypto.randomUUID(),
  }));
};

interface RecordChartProps {
  year: number;
  parentName: string;
  parentId: string;
  parentType: PropertyType;
}

const chartConfig = {
  totalIncome: {
    label: "Ingresos",
    color: "#00bc7d",
  },
  totalExpense: {
    label: "Gastos",
    color: "#ff2056",
  },
} satisfies ChartConfig;

const RecordChart = ({
  year,
  parentId,
  parentName,
  parentType,
}: RecordChartProps) => {
  const { getRecords } = useRecordContext();

  const [DialogOpen, setDialogOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [Records, setRecords] = useState<Record[]>([]);
  const [SelectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const fillRecords = useCallback(
    (records: Record[]) => {
      const filledRecords = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const found = records.find((r) => r.month === month);
        if (found) {
          return {
            ...found,
            parentName: parentName,
            monthName: getMonthName(month),
            transactions: addIdToTransactions(found.transactions),
          };
        }
        const fillerRecord: Record = {
          id: null,
          type: parentType,
          parentId: parentId,
          parentName: parentName,
          month,
          year,
          totalIncome: 0,
          totalExpenses: 0,
          netIncome: 0,
          monthName: getMonthName(month),
          transactions: [],
        };
        fillerRecord.transactions = addIdToTransactions(
          fillerRecord.transactions
        );
        return fillerRecord;
      });
      return filledRecords.sort((a, b) => a.month - b.month);
    },
    [parentId, parentName, parentType, year]
  );

  useEffect(() => {
    const fetchPropertyRecords = async () => {
      if (!parentId || !year) return;
      const records = await getRecords(parentType, parentId, year);
      const filledRecords = fillRecords(records);
      setRecords(filledRecords);
    };
    fetchPropertyRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId, year]);

  useEffect(() => {
    const selectedRecord = Records.find((r) => r.month === selectedMonth);
    setSelectedRecord(selectedRecord || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  interface BarClickData {
    activeLabel?: string;
  }

  const handleBarClick = (data: BarClickData) => {
    if (data && data.activeLabel) {
      const record = Records.find((r) => r.monthName === data.activeLabel);
      if (record) {
        setSelectedMonth(record.month);
        setDialogOpen(true);
      }
    }
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{parentName}</CardTitle>
          <CardDescription>{year}</CardDescription>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={Records}
                onClick={handleBarClick}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={"monthName"}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey={"totalIncome"}
                  fill={"#00bc7d"}
                  radius={4}
                  className="cursor-pointer"
                />
                <Bar
                  dataKey={"totalExpense"}
                  fill={"#ff2056"}
                  radius={4}
                  className="cursor-pointer"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </CardHeader>
      </Card>
      <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="flex flex-col justify-start items-center pb-4 max-h-[80vh] min-h-[300px] overflow-y-scroll custom-sidebar"
        >
          <DialogHeader className="w-full flex items-center">
            <DialogTitle className="alternate-font text-xl w-full text-center pt-4">
              Registro de ingresos para la propiedad <br />
              <Button
                className="w-full mt-4 cursor-default"
                variant={"outline"}
              >
                {parentName}
              </Button>
            </DialogTitle>
          </DialogHeader>
          {SelectedRecord && <AddRecord record={SelectedRecord} />}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default RecordChart;
