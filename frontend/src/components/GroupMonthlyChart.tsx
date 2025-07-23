import PropertyNetIncomeChart from "@/components/PropertyNetIncomeChart";
import { useRecordContext } from "@/context/useRecordContext";
import type { GroupDTO, RecordDTO } from "@/lib/interfaces";
import { useEffect, useState } from "react";

interface GroupMonthlyTableProps {
  group: GroupDTO;
  year: number;
}

const GroupMonthlyChart = ({ group, year }: GroupMonthlyTableProps) => {
  const { getRecords } = useRecordContext();

  const [GroupRecords, setGroupRecords] = useState<RecordDTO[]>([]);

  useEffect(() => {
    const fetchGroupRecords = async () => {
      if (!group || !year) return;
      const allRecords: RecordDTO[] = [];
      if (group.properties) {
        const recordsArrays = await Promise.all(
          group.properties.map((property) => getRecords(property.id, year))
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

  const recordsByProperty: { [propertyId: number]: RecordDTO[] } = {};
  GroupRecords.forEach((record) => {
    if (!recordsByProperty[record.propertyId]) {
      recordsByProperty[record.propertyId] = [];
    }
    recordsByProperty[record.propertyId].push(record);
  });

  return (
    <div className="flex flex-col gap-4 pb-4">
      {group.properties?.map((property) => (
        <PropertyNetIncomeChart
          key={property.id}
          year={year}
          propertyName={property.name}
          records={recordsByProperty[property.id] || []}
        />
      ))}
    </div>
  );
};
export default GroupMonthlyChart;
