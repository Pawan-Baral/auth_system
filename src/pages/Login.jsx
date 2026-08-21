import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Login() {
    return (
        <>
            <div className="items-center justify-center h-screen gap-6 p-4">
                <form className="flex items-center justify-center  flex-col h-screen gap-6 m-4">
                    <Input type="email" placeholder="jondoe@example.com" className="bg-white text-black placeholder:text-gray-500" />
                    <Input type="password" placeholder="Password" className="bg-white text-black placeholder:text-gray-500" />

                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-700">
                        Login
                    </Button>
                    <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary"> Forgot Password? </Link>
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{'         '}
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