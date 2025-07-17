import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";

const AddProperty = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Agregar Propiedad
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Agregar Propiedad
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AddProperty;
