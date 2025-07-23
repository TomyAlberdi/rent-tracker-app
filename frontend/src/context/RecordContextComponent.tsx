import { RecordContext, type RecordContextType } from "@/context/RecordContext";
import type { ReactNode } from "react";

interface RecordContextComponentProps {
  children: ReactNode;
}

const RecordContextComponent: React.FC<RecordContextComponentProps> = ({
  children,
}) => {
  const BASE_URL = "http://localhost:8081/record";

  const getRecords = async (propertyId: number, year: number) => {
    try {
      const url = `${BASE_URL}?propertyId=${propertyId}&year=${year}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn("No records found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch records", err);
      return [];
    }
  };

  const exportData: RecordContextType = {
    getRecords,
  };

  return (
    <RecordContext.Provider value={exportData}>{children}</RecordContext.Provider>
  );
};

export default RecordContextComponent;