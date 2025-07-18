import NotFound from "@/app/Pages/Error/NotFound";
import Home from "@/app/Pages/Home/Home";

export const routesConfig = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    index: true,
    element: <Home />,
  },
];
