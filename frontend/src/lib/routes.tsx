import Page from "@/app/dashboard/page";
import { routesConfig } from "@/lib/routesConfig";
import { useRoutes } from "react-router-dom";

const CustomRouter = () => {
  return useRoutes([
    {
      path: "/",
      element: <Page />,
      children: routesConfig,
    },
  ]);
};

export default CustomRouter;