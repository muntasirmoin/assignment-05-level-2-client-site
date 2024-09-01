import { ReactNode } from "react";
import { TRoute, TUserPath } from "../types/Dashboard.type";
// import { TRoute, TUserPath } from "../types";

export const routeGenerator = (items: TUserPath[]) => {
  console.log("routeGenerator:", items);
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);

  return routes;
};
