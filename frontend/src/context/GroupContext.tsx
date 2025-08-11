import type { CreateGroupDTO, Group, IdNameItem } from "@/lib/interfaces";
import { createContext } from "react";

export interface GroupContextType {
  getDropdownGroups: () => Promise<IdNameItem[]>;
  getGroups: () => Promise<Group[]>;
  getGroup: (groupId: string) => Promise<Group | null>;
  createGroup: (group: CreateGroupDTO) => Promise<void>;
  updateGroup: (groupId: string, group: CreateGroupDTO) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
}

export const GroupContext = createContext<GroupContextType | null>(null);
