import AddProperty from "@/components/AddProperty";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { usePropertyContext } from "@/context/usePropertyContext";
import type { PropertyDTO } from "@/lib/interfaces";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PropertyAdministrationProps {
  PropertyUpdated: boolean;
  setPropertyUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  Property: PropertyDTO;
}

const PropertyAdministration = ({
  PropertyUpdated,
  setPropertyUpdated,
  Property,
}: PropertyAdministrationProps) => {
  const { deleteProperty } = usePropertyContext();
  const navigate = useNavigate();
  const [LoadingDelete, setLoadingDelete] = useState(false);

  const onDeleteClick = () => {
    toast("¿Desea eliminar la propiedad?", {
      description: "Se perderán todos los registros asociados.",
      action: <Button onClick={() => handleDelete()}>Eliminar</Button>,
    });
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    deleteProperty(Property.id)
      .finally(() => {
        setLoadingDelete(false);
        navigate("/");
        window.location.reload()
      });
  };

  return (
    <CardContent className="flex flex-col gap-2">
      <AddProperty
        PropertyCreated={PropertyUpdated}
        setPropertyCreated={setPropertyUpdated}
        DefaultProperty={Property}
      />
      <Button
        variant={"destructive"}
        className="w-full"
        disabled={LoadingDelete}
        onClick={onDeleteClick}
      >
        <Trash2 />
        Eliminar Propiedad
      </Button>
    </CardContent>
  );
};
export default PropertyAdministration;
