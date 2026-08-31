

import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button";
export default function Navbar({ onOpenSidebar }) {
    function getStoredUser() {
        try {

            return JSON.parse(localStorage.getItem("user") || "null");
        }
        catch {
            return null;
        }
    }
    return (<>
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="grid items-center grid-cols-[1fr_auto_1fr] h-16 px-6">
                <div className="flex items-center gap-2">

                    <img
                        src="/authentication-system-logo.svg"
                        alt="Auth System"
                        className="h-10 w-10"
                    />
                    <span>Auth System</span>
                </div>
                <nav className=" ">
                    <ul className="flex items-center   gap-6 list-none">

                        <li> <Link to="/dashboard"  >Home</Link></li>
                        <li> <Link to="/services"  >Services</Link></li>
                        <li><Link to="/contact"  >Contact</Link></li>
                    </ul>
                </nav>
                <div className="flex items-center justify-self-end gap-3">

                    <Button>{getStoredUser()?.fullName || "User"} </Button>
                    <Button type="button" onClick={onOpenSidebar}> Menu</Button>
                </div>
            </div>
        </header>
    </>);
}