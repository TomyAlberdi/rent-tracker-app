import type { CreatePropertyDTO, Property } from "@/lib/interfaces";
import { createContext } from "react";

export interface PropertyContextType {
  getProperties: () => Promise<Property[]>;
  getPropertyById: (id: string) => Promise<Property | null>;
  createProperty: (property: CreatePropertyDTO) => Promise<void>;
  updateProperty: (
    groupId: string,
    property: CreatePropertyDTO
  ) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);
