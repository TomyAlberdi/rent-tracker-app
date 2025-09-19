import RecordChart from "@/components/RecordChart";
import { useRecordContext } from "@/context/Record/useRecordContext";
import type { Group, Record } from "@/lib/interfaces";
import { useEffect, useState } from "react";

interface GroupMonthlyTableProps {
  group: Group;
  year: number;
}

const GroupMonthlyChart = ({ group, year }: GroupMonthlyTableProps) => {
  const { getRecords } = useRecordContext();

  const groupProperties = group.properties || [];
  const [GroupRecords, setGroupRecords] = useState<Record[]>([]);

  useEffect(() => {
    const fetchGroupRecords = async () => {
      if (!group || !year) return;
      const allRecords: Record[] = [];
      if (groupProperties) {
        const recordsArrays = await Promise.all(
          groupProperties.map((property) =>
            getRecords("INDIVIDUAL", property.id, year)
          )
        );
        recordsArrays.forEach((records) => {
          allRecords.push(...records);
        });
      }
      setGroupRecords(allRecords);
    };
    fetchGroupRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, year]);

  const recordsByProperty: { [propertyId: string]: Record[] } = {};
  GroupRecords.forEach((record) => {
    if (!recordsByProperty[record.parentId]) {
      recordsByProperty[record.parentId] = [];
    }
    recordsByProperty[record.parentId].push(record);
  });

  return (
    <div className="flex flex-col">
      {groupProperties?.map((property) => (
        <RecordChart
          key={property.id}
          year={year}
          parentName={property.name}
          parentId={property.id}
          parentType="INDIVIDUAL"
        />
      ))}
    </div>
  );
};
export default GroupMonthlyChart;
