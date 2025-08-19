import MonthlySummaryCard from "@/app/Pages/Home/MonthlySummaryCard";
import ParentSummaryCard from "@/app/Pages/Home/ParentSummaryCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";
const Home = () => {
  const [SelectedYear, setSelectedYear] = useState(2025);

  const handlePreviousYear = () => {
    setSelectedYear(SelectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(SelectedYear + 1);
  };

  return (
    <div className="page-full-h flex items-center justify-center gap-4 pb-4">
      <section className="h-full w-1/3 flex flex-col gap-4">
        <ParentSummaryCard year={SelectedYear} type={"INDIVIDUAL"} />
        <ParentSummaryCard year={SelectedYear} type={"GROUPED"} />
      </section>
      <section className="h-full w-2/3 flex flex-col items-center gap-4">
        <Card className="h-1/3 flex flex-row justify-between items-center">
          <Button onClick={handlePreviousYear} className="h-full">
            <ChevronsLeft />
          </Button>
          <span className="text-2xl font-bold">{SelectedYear}</span>
          <Button onClick={handleNextYear} className="h-full">
            <ChevronsRight />
          </Button>
        </Card>
        <MonthlySummaryCard year={SelectedYear} />
      </section>
    </div>
  );
};
export default Home;
