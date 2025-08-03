import NotFound from "@/app/Pages/Error/NotFound";
import Group from "@/app/Pages/Group/Group";
import Home from "@/app/Pages/Home/Home";
import Property from "@/app/Pages/Property/Property";

export const routesConfig = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/group/:id",
    element: <Group />,
  },
  {
    path: "/property/:id",
    element: <Property />,
  }
];
