import { GroupContext } from "@/context/Group/GroupContext";
import { useContext } from "react";

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error(
      "useGroupContext must be used within a GroupContextProvider"
    );
  }
  return context;
};
