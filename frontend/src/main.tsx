import App from "@/App.tsx";
import GroupContextComponent from "@/context/Group/GroupContextComponent";
import PropertyContextComponent from "@/context/Property/PropertyContextComponent";
import RecordContextComponent from "@/context/Record/RecordContextComponent";
import "@/index.css";
import { ThemeProvider } from "@/theme/theme-provider";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <GroupContextComponent>
      <PropertyContextComponent>
        <RecordContextComponent>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecordContextComponent>
      </PropertyContextComponent>
    </GroupContextComponent>
  </ThemeProvider>
);
