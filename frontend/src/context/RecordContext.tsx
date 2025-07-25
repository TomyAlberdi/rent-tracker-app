import type { RecordDTO } from "@/lib/interfaces";
import { createContext } from "react";

export interface RecordContextType {
  getRecords: (propertyId: number, year: number) => Promise<RecordDTO[]>;
  createRecord: (
    propertyId: number,
    month: number,
    year: number,
    income: number
  ) => Promise<void>;
  updateRecord: (
    id: number,
    propertyId: number,
    month: number,
    year: number,
    income: number
  ) => Promise<void>;
}

export const RecordContext = createContext<RecordContextType | null>(null);