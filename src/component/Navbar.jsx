import { LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function Navbar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const initial = user?.fullName?.charAt(0).toUpperCase() || "U";

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </div>

          <div>
            <p className="text-base font-bold text-slate-900">Auth System</p>
            <p className="text-xs text-slate-500">Secure dashboard</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            {initial}
          </div>

          <div className="hidden text-left sm:block">
            <p className="max-w-48 truncate text-sm font-semibold text-slate-900">
              {user?.fullName || "User"}
            </p>
            <p className="max-w-48 truncate text-xs text-slate-500">
              {user?.email || "No email available"}
            </p>
          </div>

          <Button
            type="button"
            onClick={handleLogout}
            className="h-10 border border-red-200 bg-white px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            aria-label="Log out of your account"
          >
            <LogOut className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
