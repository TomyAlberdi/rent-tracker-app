import type { IdNameItem, PropertyDTO } from "@/lib/interfaces";
import { createContext } from "react";

export interface PropertyContextType {
  getIndividualProperties: () => Promise<IdNameItem[]>;
  getPropertyById: (id: number) => Promise<PropertyDTO | null>;
  createProperty: (
    name: string,
    type: string,
    description?: string,
    groupId?: number | null
  ) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);