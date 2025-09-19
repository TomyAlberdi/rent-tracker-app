import type {
  CreateRecordDTO,
  MonthlySummaryRecordDTO,
  ParentSummaryRecordDTO,
  PropertyType,
  Record,
} from "@/lib/interfaces";
import { createContext } from "react";

export interface RecordContextType {
  getRecords: (
    type: PropertyType,
    parentId: string,
    year: number
  ) => Promise<Record[]>;
  saveRecord: (record: CreateRecordDTO) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
  getMonthlySummary: (year: number) => Promise<MonthlySummaryRecordDTO[]>;
  getParentSummary: (
    year: number,
    parentType: PropertyType
  ) => Promise<ParentSummaryRecordDTO[]>;
}

export const RecordContext = createContext<RecordContextType | null>(null);
