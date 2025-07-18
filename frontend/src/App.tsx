import { Toaster } from "@/components/ui/sonner";
import CustomRouter from "@/lib/routes";

function App() {
  return (
    <div>
      <CustomRouter />
      <Toaster />
    </div>
  );
}

export default App;
