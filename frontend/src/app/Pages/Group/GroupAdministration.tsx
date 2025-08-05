import CreateGroup from "@/components/CreateGroup";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useGroupContext } from "@/context/useGroupContext";
import type { Group } from "@/lib/interfaces";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface GroupAdministrationProps {
  GroupUpdated: boolean;
  setGroupUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  Group: Group;
}

const GroupAdministration = ({
  GroupUpdated,
  setGroupUpdated,
  Group,
}: GroupAdministrationProps) => {
  const { deleteGroup } = useGroupContext();
  const navigate = useNavigate();
  const [LoadingDelete, setLoadingDelete] = useState(false);

  const onDeleteClick = () => {
    if (Group.properties?.length) {
      toast.error("No se puede eliminar un grupo con propiedades asociadas.");
      return;
    }
    toast("¿Desea eliminar el grupo?", {
      description: "Se perderán todos los registros asociados.",
      action: <Button onClick={() => handleDelete()}>Eliminar</Button>,
    });
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    deleteGroup(Group.id.toString())
      .then(() => {
        setGroupUpdated(!GroupUpdated);
      })
      .finally(() => {
        setLoadingDelete(false);
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <CardContent className="flex flex-col gap-2">
      <CreateGroup
        GroupCreated={GroupUpdated}
        setGroupCreated={setGroupUpdated}
        DefaultGroup={Group}
      />
      <Button
        variant={"destructive"}
        className="w-full"
        disabled={LoadingDelete}
        onClick={onDeleteClick}
      >
        <Trash2 />
        Eliminar Grupo
      </Button>
    </CardContent>
  );
};

export default GroupAdministration;
