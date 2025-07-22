import type { GroupDTO } from "@/lib/interfaces";

interface GroupMonthlyTableProps {
  group: GroupDTO;
  year: number;
}

//TODO: Design and implement the table
// Maybe use charts
const GroupMonthlyChart = ({ group, year }: GroupMonthlyTableProps) => {
  return (
    <div>test</div>
  );
};
export default GroupMonthlyChart;
