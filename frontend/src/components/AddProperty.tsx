import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGroupContext } from "@/context/useGroupContext";
import { usePropertyContext } from "@/context/usePropertyContext";
import type { IdNameItem } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface AddPropertyProps {
  PropertyCreated: boolean;
  setPropertyCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  groupId: z.string().optional().nullable(),
});

const AddProperty = ({
  PropertyCreated,
  setPropertyCreated,
}: AddPropertyProps) => {
  const { getDropdownGroups } = useGroupContext();
  const { createProperty } = usePropertyContext();
  const [DropdownGroups, setDropdownGroups] = useState<IdNameItem[]>([]);
  const [Loading, setLoading] = useState(false);
  const [DialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getDropdownGroups().then((data) => setDropdownGroups(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      groupId: null,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setLoading(true);
    createProperty(
      values.name,
      values.groupId ? "GROUPED" : "INDIVIDUAL",
      values.description,
      values.groupId ? Number(values.groupId) : null
    ).finally(() => {
      form.reset();
      setLoading(false);
      setPropertyCreated(!PropertyCreated);
      setDialogOpen(false);
    });
  };

  return (
    <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Agregar Propiedad
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Agregar Propiedad</DialogTitle>
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
              <FormField
                control={form.control}
                name="groupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={undefined}
                      disabled={DropdownGroups.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un grupo (opcional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DropdownGroups.map((group) => (
                          <SelectItem
                            key={group.id}
                            value={group.id.toString()}
                          >
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={Loading}>
                <CirclePlus />
                Crear
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddProperty;
