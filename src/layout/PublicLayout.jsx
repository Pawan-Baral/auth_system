
import { Outlet, } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


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