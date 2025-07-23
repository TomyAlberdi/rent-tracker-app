import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { RecordDTO } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
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
  const filledRecords = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const found = records.find((r) => r.month === month);
    if (found) return found;
    const base = records[0] || {};
    return {
      id: `empty-${month}`,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{propertyName}</CardTitle>
        <CardDescription>{year}</CardDescription>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={recordsWithMonthName}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={"monthName"}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              {/* TODO: Navigate to record page on month click */}
              <Bar dataKey={"income"} fill={"#00bc7d"} radius={4} />
              <Bar dataKey={"expenses"} fill={"#ff2056"} radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
export default PropertyNetIncomeChart;
