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
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";

interface PropertyNetIncomeChartProps {
  year: number;
  propertyName: string;
  records: RecordDTO[];
}

const chartConfig = {
  netIncome: {
    label: "Ingreso Neto",
  },
} satisfies ChartConfig;

const PropertyNetIncomeChart = ({
  year,
  propertyName,
  records,
}: PropertyNetIncomeChartProps) => {
  // Fill missing months with empty records
  const filledRecords = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const found = records.find((r) => r.month === month);
    if (found) return found;
    // Use propertyId and groupId/groupName from the first record if available
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
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel hideIndicator />}
              />
              <Bar dataKey={"netIncome"} className="cursor-pointer">
                <LabelList
                  position={"top"}
                  dataKey={"monthName"}
                  fillOpacity={1}
                />
                {recordsWithMonthName.map((item) => (
                  <Cell
                    key={item.id}
                    fill={
                      item.netIncome === 0
                        ? "#e2e8f0"
                        : item.netIncome > 0
                        ? "#00bc7d"
                        : "#ff2056"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
export default PropertyNetIncomeChart;
