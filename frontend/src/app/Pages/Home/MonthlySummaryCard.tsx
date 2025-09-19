import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useRecordContext } from "@/context/Record/useRecordContext";
import type { MonthlySummaryRecordDTO } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface MonthlySummaryCardProps {
  year: number;
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

const MonthlySummaryCard = ({ year }: MonthlySummaryCardProps) => {
  const { getMonthlySummary } = useRecordContext();

  const [MonthlySummaryData, setMonthlySummaryData] = useState<
    MonthlySummaryRecordDTO[]
  >([]);

  const fillMonthlySummaryData = useCallback(
    (data: MonthlySummaryRecordDTO[]) => {
      return data.map((record) => {
        return {
          ...record,
          monthName: getMonthName(record.month),
        };
      });
    },
    []
  );

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      const data = await getMonthlySummary(year);
      const filledData = fillMonthlySummaryData(data);
      setMonthlySummaryData(filledData);
    };
    fetchMonthlySummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          Ingresos y Gastos Anuales Totales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={MonthlySummaryData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"monthName"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey={"totalExpense"}
              fill={"#ff2056"}
              radius={[0, 0, 4, 4]}
              stackId="a"
            />
            <Bar
              dataKey={"totalIncome"}
              fill={"#00bc7d"}
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default MonthlySummaryCard;
