import { PropertyContext } from "@/context/Property/PropertyContext";
import { useContext } from "react";

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error(
      "usePropertyContext must be used within a PropertyContextProvider"
    );
  }
  return context;
};
