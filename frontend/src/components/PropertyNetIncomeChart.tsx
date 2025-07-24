import AddRecord from "@/components/AddRecord";
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { RecordDTO } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface PropertyNetIncomeChartProps {
  year: number;
  propertyName: string;
  records: RecordDTO[];
}

const chartConfig = {
  income: {
    label: "Ingresos",
    color: "#00bc7d",
  },
  expenses: {
    label: "Gastos",
    color: "#ff2056",
  },
} satisfies ChartConfig;

const PropertyNetIncomeChart = ({
  year,
  propertyName,
  records,
}: PropertyNetIncomeChartProps) => {
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const filledRecords = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const found = records.find((r) => r.month === month);
    if (found) return found;
    const base = records[0] || {};
    return {
      id: typeof base.id === "number" ? base.id : month,
      propertyId: base.propertyId || 0,
      propertyName: propertyName,
      groupId: base.groupId || null,
      groupName: base.groupName || null,
      month,
      year,
      income: 0,
      expenses: 0,
      netIncome: 0,
    };
  });

  const recordsWithMonthName = filledRecords.map((record) => ({
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
        setDrawerOpen(true);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{propertyName}</CardTitle>
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
                  dataKey={"income"}
                  fill={"#00bc7d"}
                  radius={4}
                  className="cursor-pointer"
                />
                <Bar
                  dataKey={"expenses"}
                  fill={"#ff2056"}
                  radius={4}
                  className="cursor-pointer"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </CardHeader>
      </Card>
      <Drawer open={DrawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="flex flex-col justify-center items-center pb-4">
          <DrawerHeader>
            <DrawerTitle>{selectedRecord?.monthName}</DrawerTitle>
          </DrawerHeader>
          <AddRecord
            propertyId={selectedRecord?.propertyId || 0}
            month={selectedRecord?.month || 0}
            year={selectedRecord?.year || 0}
            income={selectedRecord?.netIncome || 0}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default PropertyNetIncomeChart;
