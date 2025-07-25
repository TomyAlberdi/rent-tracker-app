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

  const createRecord = async (
    propertyId: number,
    month: number,
    year: number,
    income: number
  ) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify({ propertyId, month, year, income }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.warn("Failed to create record:", data);
        return;
      }
    } catch (err) {
      console.error("Failed to create record", err);
    }
  };

  const updateRecord = async (
    id: number,
    propertyId: number,
    month: number,
    year: number,
    income: number
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ propertyId, month, year, income }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.warn("Failed to update record:", data);
        return;
      }
    } catch (err) {
      console.error("Failed to update record", err);
    }
  };

  const exportData: RecordContextType = {
    getRecords,
    createRecord,
    updateRecord,
  };

  return (
    <RecordContext.Provider value={exportData}>
      {children}
    </RecordContext.Provider>
  );
};

export default RecordContextComponent;
