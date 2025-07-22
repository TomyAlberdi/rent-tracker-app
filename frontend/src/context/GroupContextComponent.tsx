import { GroupContext, type GroupContextType } from "@/context/GroupContext";
import type { ReactNode } from "react";
import { toast } from "sonner";

interface GroupContextComponentProps {
  children: ReactNode;
}

const GroupContextComponent: React.FC<GroupContextComponentProps> = ({
  children,
}) => {
  const BASE_URL = "http://localhost:8081/group";

  const getDropdownGroups = async () => {
    try {
      const url = `${BASE_URL}/list/light`;
      const res = await fetch(url);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener los grupos");
        console.warn("No groups found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch groups", err);
      toast.error("Ocurrió un error al obtener los grupos");
      return [];
    }
  };

  const getGroupsWithProperties = async () => {
    try {
      const url = `${BASE_URL}/list/full`;
      const res = await fetch(url);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener los grupos");
        console.warn("No groups found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch groups", err);
      toast.error("Ocurrió un error al obtener los grupos");
      return [];
    }
  };

  const getGroup = async (groupId: string) => {
    try {
      const url = `${BASE_URL}/${groupId}`;
      const res = await fetch(url);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener el grupo");
        console.warn("No group found: ", res);
        return null;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch group", err);
      toast.error("Ocurrió un error al obtener el grupo");
      return null;
    }
  };

  const createGroup = async (name: string, description?: string) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify({ name, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error("Ocurrió un error al crear el grupo");
        console.warn("Failed to create group:", data);
        return;
      }
    } catch (err) {
      console.error("Failed to create group", err);
      toast.error("Ocurrió un error al crear el grupo");
    }
  };

  const deleteGroup = async (groupId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${groupId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Ocurrió un error al eliminar el grupo");
        console.warn("Failed to delete group:", groupId);
        return;
      }
    } catch (err) {
      console.error("Failed to delete group", err);
      toast.error("Ocurrió un error al eliminar el grupo");
    }
  };

  const exportData: GroupContextType = {
    getDropdownGroups,
    getGroupsWithProperties,
    getGroup,
    createGroup,
    deleteGroup,
  };

  return (
    <GroupContext.Provider value={exportData}>{children}</GroupContext.Provider>
  );
};

export default GroupContextComponent;
