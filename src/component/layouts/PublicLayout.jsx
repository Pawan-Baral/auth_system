
import { Outlet, } from "react-router-dom";
import Navbar from "@/component/layouts/Navbar";
import Footer from "@/component/layouts/Footer";


function PublicLayout() {


    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default PublicLayout;