import { RecordContext, type RecordContextType } from "@/context/RecordContext";
import type { CreateRecordDTO, PropertyType } from "@/lib/interfaces";
import type { ReactNode } from "react";
import { toast } from "sonner";

interface RecordContextComponentProps {
  children: ReactNode;
}

const RecordContextComponent: React.FC<RecordContextComponentProps> = ({
  children,
}) => {
  const BASE_URL = "http://localhost:8081";

  const getRecords = async (
    type: PropertyType,
    parentId: string,
    year: number
  ) => {
    try {
      const url = `${BASE_URL}/record?type=${type}&parentId=${parentId}&year=${year}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn("No records found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch records", err);
      toast.error("No se pudieron recuperar los registros.", {
        description: "Intentelo nuevamente más tarde.",
      });
      return [];
    }
  };

  const saveRecord = async (record: CreateRecordDTO) => {
    try {
      const response = await fetch(`${BASE_URL}/record`, {
        method: "POST",
        body: JSON.stringify(record),
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
      toast.error("No se pudo crear el registro.", {
        description: "Intentelo nuevamente más tarde.",
      });
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/record/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        console.warn("Failed to delete record:", data);
        return;
      }
    } catch (err) {
      console.error("Failed to delete record", err);
      toast.error("No se pudo eliminar el registro.", {
        description: "Intentelo nuevamente más tarde.",
      });
    }
  };

  const getMonthlySummary = async (year: number) => {
    try {
      const url = `${BASE_URL}/record/MonthlySummary/${year}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn("No records found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch records", err);
      toast.error("No se pudieron recuperar los registros.", {
        description: "Intentelo nuevamente más tarde.",
      });
      return [];
    }
  };

  const getParentSummary = async (year: number, parentType: PropertyType) => {
    try {
      const url = `${BASE_URL}/record/ParentSummary/${year}?type=${parentType}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn("No records found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch records", err);
      toast.error("No se pudieron recuperar los registros.", {
        description: "Intentelo nuevamente más tarde.",
      });
      return [];
    }
  };

  const exportData: RecordContextType = {
    getRecords,
    saveRecord,
    deleteRecord,
    getMonthlySummary,
    getParentSummary,
  };

  return (
    <RecordContext.Provider value={exportData}>
      {children}
    </RecordContext.Provider>
  );
};

export default RecordContextComponent;
