import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useRecordContext } from "@/context/Record/useRecordContext";
import type { ParentSummaryRecordDTO, PropertyType } from "@/lib/interfaces";
import { getFillColor } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [ParentData, setParentData] = useState<ParentSummaryRecordDTO[]>([]);

  const fillParentData = useCallback((data: ParentSummaryRecordDTO[]) => {
    return data.map((record, index) => {
      return {
        ...record,
        fill: getFillColor(index),
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
        color: record.fill || "var(--chart-1)",
      };
    });
    setChartConfig(newConfig);
    console.log(newConfig)
  }, [ParentData]);

  const handlePieClick = useCallback(
    (payloadOrWrapper: ParentSummaryRecordDTO | { payload?: ParentSummaryRecordDTO }) => {
      const isWrapper = (p: unknown): p is { payload?: ParentSummaryRecordDTO } =>
        typeof p === "object" && p !== null && "payload" in (p as object);

      const record = isWrapper(payloadOrWrapper)
        ? payloadOrWrapper.payload
        : (payloadOrWrapper as ParentSummaryRecordDTO);

      const parentId = record?.parentId;
      if (!parentId) return;
      const route = type === "INDIVIDUAL" ? `/property/${parentId}` : `/group/${parentId}`;
      navigate(route);
    },
    [navigate, type]
  );
  return (
    <Card className="w-full h-1/2">
      <CardHeader>
        <CardTitle className="text-xl">
          Ingresos Anuales Netos por {type === "INDIVIDUAL" ? "Propiedad" : "Grupo"}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex justify-center items-center">
        <ChartContainer config={ChartConfig} className="h-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={ParentData} dataKey="netIncome" nameKey="parentName" onClick={handlePieClick} className="cursor-pointer" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default ParentSummaryCard;
