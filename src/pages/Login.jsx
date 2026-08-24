import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "@/api/authApi"

function Login() {
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password")
            // rememberMe: false,
        }
        try {
            const data = await loginUser(loginData);

            console.log("Login response: ", data);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard", { replace: true })
        }
        catch (error) {
            console.error("Error Message ", error);
            alert(error.message);
        }
    }
    return (
        <>
            <div className="items-center justify-center h-screen gap-6 p-4">
                <form onSubmit={handleSubmit} className="flex items-center justify-center  flex-col h-screen gap-6 m-4">
                    <Input name="email" type="email" placeholder="jondoe@example.com" className="bg-white text-black placeholder:text-gray-500" />
                    <Input name="password" type="password" placeholder="Password" className="bg-white text-black placeholder:text-gray-500" />

                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-700">
                        Login
                    </Button>
                    <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary"> Forgot Password? </Link>
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{'    '}
                        <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}
export default Login; 