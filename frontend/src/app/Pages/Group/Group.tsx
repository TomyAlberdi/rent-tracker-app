import GroupAdministration from "@/app/Pages/Group/GroupAdministration";
import GroupMonthlyChart from "@/components/GroupMonthlyChart";
import RecordChart from "@/components/RecordChart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGroupContext } from "@/context/useGroupContext";
import { useRecordContext } from "@/context/useRecordContext";
import type { Group, Record } from "@/lib/interfaces";
import {
  AlertCircleIcon,
  Building2,
  ChevronsLeft,
  ChevronsRight,
  GroupIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Group = () => {
  const { id } = useParams();
  const { getGroup } = useGroupContext();
  const { getRecords } = useRecordContext();

  const [GroupData, setGroupData] = useState<Group | null>(null);
  const [GroupRecords, setGroupRecords] = useState<Record[]>([]);
  const [GroupUpdated, setGroupUpdated] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [RecordDataYear, setRecordDataYear] = useState(2025);

  useEffect(() => {
    setLoading(true);
    getGroup(id as string)
      .then((data) => {
        setGroupData(data);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, GroupUpdated]);

  useEffect(() => {
    const fetchGroupRecords = async () => {
      if (!GroupData || !RecordDataYear) return;
      getRecords("GROUPED", GroupData.id, RecordDataYear).then((records) => {
        setGroupRecords(records);
      });
    };
    fetchGroupRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GroupData, RecordDataYear]);

  const handlePreviousYear = () => {
    setRecordDataYear(RecordDataYear - 1);
  };

  const handleNextYear = () => {
    setRecordDataYear(RecordDataYear + 1);
  };

  if (Loading)
    return (
      <div className="page-full-h flex justify-start items-center gap-4 pb-4">
        <div className="h-full w-1/4 flex flex-col gap-4">
          <Skeleton className="h-1/2 w-full" />
          <Skeleton className="h-1/2 w-full" />
        </div>
        <Skeleton className="h-full w-3/4" />
      </div>
    );

  if (!GroupData)
    return (
      <div className="page-full-h flex justify-center items-center">
        <Alert className="w-auto" variant={"destructive"}>
          <AlertCircleIcon />
          <AlertTitle>No se encontró el grupo.</AlertTitle>
          <AlertDescription>Por favor, inténtelo más tarde.</AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div className="page-full-h flex justify-start items-center gap-4 pb-4">
      <div className="h-full w-1/4 flex flex-col gap-4">
        <Card>
          <h2 className="alternate-font text-md font-medium flex gap-2">
            <GroupIcon size={25} /> Grupo
          </h2>
          <CardHeader>
            <CardTitle className="text-2xl">{GroupData.name}</CardTitle>
            {GroupData.description && (
              <CardDescription>{GroupData.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h3 className="alternate-font text-md font-medium flex gap-2">
              <Building2 size={22} /> Propiedades Incluidas
            </h3>
            <div className="flex flex-col gap-2">
              {GroupData.properties?.map((property) => (
                <Button
                  key={property.id}
                  variant={"outline"}
                  className="text-sm"
                  asChild
                >
                  <Link to={`/property/${property.id}`}>{property.name}</Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="alternate-font text-lg font-semibold">
              Administración
            </h2>
          </CardHeader>
          <GroupAdministration
            Group={GroupData}
            GroupUpdated={GroupUpdated}
            setGroupUpdated={setGroupUpdated}
          />
        </Card>
        <Card className="flex flex-row justify-between">
          <Button onClick={handlePreviousYear}>
            <ChevronsLeft />
          </Button>
          <span className="text-2xl font-bold">{RecordDataYear}</span>
          <Button onClick={handleNextYear}>
            <ChevronsRight />
          </Button>
        </Card>
      </div>
      <div className="h-full w-3/4 flex flex-col">
        <RecordChart
          year={RecordDataYear}
          parentName={GroupData.name}
          parentId={GroupData.id}
          parentType={"GROUPED"}
          records={GroupRecords}
        />
        <GroupMonthlyChart group={GroupData} year={RecordDataYear} />
      </div>
    </div>
  );
};
export default Group;
