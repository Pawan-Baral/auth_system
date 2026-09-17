

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserDropdownMenu from "./UserDropdownMenu";
export default function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();


    return (<>

        <div className="grid items-center grid-cols-[1fr_auto_1fr] h-16 px-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
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

                    <li> <Link to="/home" className="text-slate-200 transition-colors hover:text-white" >Home</Link></li>
                    <li> <Link to="/services" className="text-slate-200 transition-colors hover:text-white"  >Services</Link></li>
                    <li><Link to="/contact" className="text-slate-200 transition-colors hover:text-white" >Contact</Link></li>
                </ul>
            </nav>
            <div className="flex items-center justify-self-end gap-3">
                {user ? (
                    <UserDropdownMenu />

                ) : (
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Log in
                    </button>
                )}
            </div>
        </div>
    </>);
}
