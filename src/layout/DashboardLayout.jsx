import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

function DashboardLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default DashboardLayout;