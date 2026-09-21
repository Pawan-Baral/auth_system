import { useRoutes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routeConfig";

function AppRoutes() {
    return useRoutes([
        ...publicRoutes,
        ...privateRoutes,
    ]);
}

export default AppRoutes;