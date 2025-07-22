import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GroupDTO } from "@/lib/interfaces";

interface GroupMonthlyTableProps {
  group: GroupDTO;
  year: number;
}

//TODO: Design and implement the table
// Maybe use charts
const GroupMonthlyTable = ({ group, year }: GroupMonthlyTableProps) => {
  return (
    <Table className="">
      <TableCaption>
        Ingresos y Gastos por Propiedad del Grupo {group.name} en el {year}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10%]">Propiedad</TableHead>
          <TableHead>Enero</TableHead>
          <TableHead>Febrero</TableHead>
          <TableHead>Marzo</TableHead>
          <TableHead>Abril</TableHead>
          <TableHead>Mayo</TableHead>
          <TableHead>Junio</TableHead>
          <TableHead>Julio</TableHead>
          <TableHead>Agosto</TableHead>
          <TableHead>Septiembre</TableHead>
          <TableHead>Octubre</TableHead>
          <TableHead>Noviembre</TableHead>
          <TableHead>Diciembre</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

      </TableBody>
    </Table>
  );
};
export default GroupMonthlyTable;
