import type { GroupDTO, GroupListingItem, IdNameItem } from "@/lib/interfaces";
import { createContext } from "react";

export interface GroupContextType {
  getDropdownGroups: () => Promise<IdNameItem[]>;
  getGroupsWithProperties: () => Promise<GroupListingItem[]>;
  getGroup: (groupId: string) => Promise<GroupDTO | null>;
  createGroup: (name: string, description?: string) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
}

export const GroupContext = createContext<GroupContextType | null>(null);
