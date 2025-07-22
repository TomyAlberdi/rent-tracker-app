import GroupMonthlyChart from "@/components/GroupMonthlyChart";
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
import { type GroupDTO } from "@/lib/interfaces";
import {
  AlertCircleIcon,
  Building2,
  ChevronsLeft,
  ChevronsRight,
  GroupIcon,
  PencilLine,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Group = () => {
  const { id } = useParams();
  const { getGroup } = useGroupContext();
  const [GroupData, setGroupData] = useState<GroupDTO | null>(null);
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
  }, [id]);

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
        <Skeleton className="h-full w-2/3" />
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
            <CardDescription>{GroupData.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-4">
            <h3 className="alternate-font text-md font-medium flex gap-2">
              <Building2 size={22} /> Propiedades Incluidas
            </h3>
            <ul className="flex flex-col gap-2">
              {GroupData.properties?.map((property) => (
                <li key={property.id} className="text-sm">
                  • {property.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="alternate-font text-lg font-semibold">
              Administración
            </h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant={"secondary"} className="w-full" disabled>
              <PencilLine />
              Editar
            </Button>
            <Button variant={"destructive"} className="w-full" disabled>
              <Trash2 />
              Eliminar
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="h-full w-3/4 flex flex-col border border-red-500">
        <div className="w-full flex justify-center items-center gap-10 py-2">
          <Button onClick={handlePreviousYear}>
            <ChevronsLeft />
          </Button>
          <span className="text-2xl font-bold">{RecordDataYear}</span>
          <Button onClick={handleNextYear}>
            <ChevronsRight />
          </Button>
        </div>
        <GroupMonthlyChart group={GroupData} year={RecordDataYear} />
      </div>
    </div>
  );
};
export default Group;
