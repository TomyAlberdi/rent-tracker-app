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
import { useRecordContext } from "@/context/useRecordContext";
import type { PropertyType, Record } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  const [UpdateRecords, setUpdateRecords] = useState(false);
  const [FilledRecords, setFilledRecords] = useState<Record[]>([]);

  useEffect(() => {
    const fetchPropertyRecords = async () => {
      if (!parentId || !year) return;
      getRecords(parentType, parentId, year).then((records) => {
        setRecords(records);
      });
    };
    fetchPropertyRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId, year, UpdateRecords]);

  useEffect(() => {
    const filledRecords = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const found = Records.find((r) => r.month === month);
      if (found) {
        return {
          ...found,
          parentName: parentName,
        };
      }
      return {
        id: null,
        type: parentType,
        parentId: parentId,
        parentName: parentName,
        month,
        year,
        transactions: [],
        totalIncome: 0,
        totalExpenses: 0,
        netIncome: 0,
      };
    });
    setFilledRecords(filledRecords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Records]);

  const recordsWithMonthName = FilledRecords.map((record) => ({
    ...record,
    monthName: getMonthName(record.month),
  }));

  const selectedRecord =
    selectedMonth != null
      ? recordsWithMonthName.find((r) => r.month === selectedMonth)
      : null;

  interface BarClickData {
    activeLabel?: string;
  }

  const handleBarClick = (data: BarClickData) => {
    if (data && data.activeLabel) {
      const record = recordsWithMonthName.find(
        (r) => r.monthName === data.activeLabel
      );
      if (record) {
        setSelectedMonth(record.month);
        setDialogOpen(true);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{parentName}</CardTitle>
          <CardDescription>{year}</CardDescription>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={recordsWithMonthName}
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
          {selectedRecord && (
            <AddRecord
              record={selectedRecord}
              UpdateRecords={UpdateRecords}
              setUpdateRecords={setUpdateRecords}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default RecordChart;
