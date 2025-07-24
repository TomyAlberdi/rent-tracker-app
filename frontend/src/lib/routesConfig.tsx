import NotFound from "@/app/Pages/Error/NotFound";
import Group from "@/app/Pages/Group/Group";
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
  //TODO: Create Property page (Possibly adapt property net income chart component)
];
