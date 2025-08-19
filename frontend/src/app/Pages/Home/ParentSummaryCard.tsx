import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useRecordContext } from "@/context/useRecordContext";
import type { ParentSummaryRecordDTO, PropertyType } from "@/lib/interfaces";
import { getFillColor } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

interface ParentSummaryCardProps {
  type: PropertyType;
  year: number;
}

interface ChartConfigType {
  [key: string]: {
    label: string;
    color: string;
  };
}

const ParentSummaryCard = ({ type, year }: ParentSummaryCardProps) => {
  const { getParentSummary } = useRecordContext();

  const [ParentData, setParentData] = useState<ParentSummaryRecordDTO[]>([]);

  const fillParentData = useCallback((data: ParentSummaryRecordDTO[]) => {
    return data.map((record, index) => {
      return {
        ...record,
        fillColor: getFillColor(index),
      };
    });
  }, []);

  useEffect(() => {
    const fetchParentSummary = async () => {
      const data = await getParentSummary(year, type);
      const filledData = fillParentData(data);
      setParentData(filledData);
    };
    fetchParentSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, type]);

  const [ChartConfig, setChartConfig] = useState<ChartConfigType>({});
  useEffect(() => {
    const newConfig: ChartConfigType = {};
    ParentData.forEach((record) => {
      newConfig[record.parentName] = {
        label: record.parentName,
        color: record.fillColor || "",
      };
    });
    setChartConfig(newConfig);
  }, [ParentData]);

  //FIXME: fill color is not working
  return (
    <Card className="w-full h-1/2">
      <CardHeader>
        <CardTitle className="text-xl">
          Ingresos Netos por {type === "INDIVIDUAL" ? "Propiedad" : "Grupo"} en{" "}
          {year}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex justify-center items-center">
        <ChartContainer config={ChartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={ParentData} dataKey="netIncome" nameKey="parentName" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default ParentSummaryCard;
