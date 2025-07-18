import type { GroupListingItem, IdNameItem } from "@/lib/interfaces";
import { createContext } from "react";

export interface GroupContextType {
  getDropdownGroups: () => Promise<IdNameItem[]>;
  getFullGroups: () => Promise<GroupListingItem[]>;
  getGroup: (groupId: string) => Promise<GroupListingItem | null>;
  createGroup: (name: string, description?: string) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
}

export const GroupContext = createContext<GroupContextType | null>(null);
