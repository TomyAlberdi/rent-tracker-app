import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGroupContext } from "@/context/useGroupContext";
import type { GroupDTO } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, PencilLine } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateGroupProps {
  GroupCreated?: boolean;
  setGroupCreated?: React.Dispatch<React.SetStateAction<boolean>>;
  DefaultGroup?: GroupDTO;
}

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
});


const CreateGroup = ({ GroupCreated, setGroupCreated, DefaultGroup }: CreateGroupProps) => {
  const { createGroup, updateGroup } = useGroupContext();
  const [DialogOpen, setDialogOpen] = useState(false);
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: DefaultGroup?.name || "",
      description: DefaultGroup?.description || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    if (DefaultGroup) {
      updateGroup(DefaultGroup.id, values.name, values.description).finally(() => {
        form.reset();
        setLoading(false);
        window.location.reload();
        setDialogOpen(false);
      });
    } else {
      createGroup(values.name, values.description).finally(() => {
        form.reset();
        setLoading(false);
        if (setGroupCreated) {
          setGroupCreated(!GroupCreated);
        }
        setDialogOpen(false);
      });
    }
  };

  return (
    <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {DefaultGroup ? (
          <Button variant={"secondary"} className="w-full">
            <PencilLine />
            Editar Grupo
          </Button>
        ) : (
          <Button>
            <CirclePlus />
            Crear Grupo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {DefaultGroup ? "Editar" : "Crear"} Grupo
          </DialogTitle>
          <DialogDescription>
            Crear un grupo para asociar 2 o más propiedades.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={Loading}>
                {DefaultGroup ? (
                  <>
                    <PencilLine />
                    Editar
                  </>
                ) : (
                  <>
                    <CirclePlus />
                    Crear
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CreateGroup;
