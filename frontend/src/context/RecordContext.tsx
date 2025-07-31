import type { CreateRecordDTO, RecordDTO } from "@/lib/interfaces";
import { createContext } from "react";

export interface RecordContextType {
  getRecords: (propertyId: number, year: number) => Promise<RecordDTO[]>;
  saveRecord: (record: CreateRecordDTO) => Promise<void>;
  deleteRecord: (id: number) => Promise<void>;
}

export const RecordContext = createContext<RecordContextType | null>(null);
