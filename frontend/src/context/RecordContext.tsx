import type { CreateRecordDTO, PropertyType, Record } from "@/lib/interfaces";
import { createContext } from "react";

export interface RecordContextType {
  getRecords: (type: PropertyType, parentId: string, year: number) => Promise<Record[]>;
  saveRecord: (record: CreateRecordDTO) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>; 
}

export const RecordContext = createContext<RecordContextType | null>(null);
