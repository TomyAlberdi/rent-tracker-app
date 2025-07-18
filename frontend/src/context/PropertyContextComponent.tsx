import {
  PropertyContext,
  type PropertyContextType,
} from "@/context/PropertyContext";
import type { ReactNode } from "react";
import { toast } from "sonner";

interface PropertyContextComponentProps {
  children: ReactNode;
}

const PropertyContextComponent: React.FC<PropertyContextComponentProps> = ({
  children,
}) => {
  const BASE_URL = "http://localhost:8081/property";

  const getIndividualProperties = async () => {
    try {
      const res = await fetch(`${BASE_URL}`);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener las propiedades");
        console.warn("No properties found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch properties", err);
      toast.error("Ocurrió un error al obtener las propiedades");
      return [];
    }
  };

  const getPropertyById = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener la propiedad");
        console.warn("No property found: ", res);
        return null;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch property", err);
      toast.error("Ocurrió un error al obtener la propiedad");
      return null;
    }
  };

  const createProperty = async (
    name: string,
    type: string,
    description?: string,
    groupId?: number | null
  ) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify({ name, type, description, groupId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error("Ocurrió un error al crear la propiedad");
        console.warn("Failed to create property:", data);
        return;
      }
    } catch (err) {
      console.error("Failed to create property", err);
      toast.error("Ocurrió un error al crear la propiedad");
    }
  };

  const deleteProperty = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Ocurrió un error al eliminar la propiedad");
        console.warn("Failed to delete property:", id);
        return;
      }
    } catch (err) {
      console.error("Failed to delete property", err);
      toast.error("Ocurrió un error al eliminar la propiedad");
    }
  };

  const exportData: PropertyContextType = {
    getIndividualProperties,
    getPropertyById,
    createProperty,
    deleteProperty,
  };

  return (
    <PropertyContext.Provider value={exportData}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContextComponent;
