import PropertyAdministration from "@/app/Pages/Property/PropertyAdministration";
import RecordChart from "@/components/RecordChart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyContext } from "@/context/usePropertyContext";
import { useRecordContext } from "@/context/useRecordContext";
import type { Property, Record } from "@/lib/interfaces";
import {
  AlertCircleIcon,
  Building2,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Property = () => {
  const { id } = useParams();
  const { getPropertyById } = usePropertyContext();
  const { getRecords } = useRecordContext();

  const [PropertyData, setPropertyData] = useState<Property | null>(null);
  const [PropertyRecords, setPropertyRecords] = useState<Record[]>([]);
  const [PropertyUpdated, setPropertyUpdated] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [RecordDataYear, setRecordDataYear] = useState(2025);

  useEffect(() => {
    setLoading(true);
    getPropertyById(id as string)
      .then((data) => {
        setPropertyData(data);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, PropertyUpdated]);

  useEffect(() => {
    const fetchPropertyRecords = async () => {
      if (!PropertyData || !RecordDataYear) return;
      getRecords("INDIVIDUAL", PropertyData.id, RecordDataYear).then((records) => {
        setPropertyRecords(records);
      });
    };
    fetchPropertyRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PropertyData, RecordDataYear]);

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

  if (!PropertyData)
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
            <Building2 size={25} /> Propiedad
          </h2>
          <CardHeader>
            <CardTitle className="text-2xl">{PropertyData.name}</CardTitle>
            {PropertyData.description && (
              <CardDescription>{PropertyData.description}</CardDescription>
            )}
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="alternate-font text-lg font-semibold">
              Administración
            </h2>
          </CardHeader>
          <PropertyAdministration
            Property={PropertyData}
            PropertyUpdated={PropertyUpdated}
            setPropertyUpdated={setPropertyUpdated}
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
      <div className="h-full w-3/4 flex flex-col gap-4 pb-4">
        <RecordChart
          year={RecordDataYear}
          parentName={PropertyData.name}
          parentId={PropertyData.id}
          parentType={"INDIVIDUAL"}
          records={PropertyRecords}
        />
      </div>
    </div>
  );
};
export default Property;
