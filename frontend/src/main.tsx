import App from "@/App.tsx";
import GroupContextComponent from "@/context/GroupContextComponent";
import PropertyContextComponent from "@/context/PropertyContextComponent";
import "@/index.css";
import { ThemeProvider } from "@/theme/theme-provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GroupContextComponent>
        <PropertyContextComponent>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PropertyContextComponent>
      </GroupContextComponent>
    </ThemeProvider>
  </StrictMode>
);
