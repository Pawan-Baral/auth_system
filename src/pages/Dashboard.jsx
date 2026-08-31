import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getDashboard } from "@/api/authApi";

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboard();
                setDashboardData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (isLoading) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-8">
                Loading dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-8 text-red-700">
                {error}
            </div>
        );
    }
    /*
    const user = dashboardData?.user;
    
    */
    return <>

        {dashboardData && <p>{dashboardData.message}</p>}
        <main>


        </main ></>
}   