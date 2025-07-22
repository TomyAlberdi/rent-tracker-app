import type { RecordDTO } from "@/lib/interfaces";
import { createContext } from "react";

export interface RecordContextType {
  getRecords: (propertyId: number, year: number) => Promise<RecordDTO[]>;
}

export const RecordContext = createContext<RecordContextType | null>(null);