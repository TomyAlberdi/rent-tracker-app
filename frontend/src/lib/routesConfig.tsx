import NotFound from "@/app/Pages/Error/NotFound";
import Group from "@/app/Pages/Home/Group";
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
  {
    path: "/group/:id",
    element: <Group />,
  },
];
