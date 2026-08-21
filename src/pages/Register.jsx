import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Register() {
    return (
        <>
            <div className="items-center justify-center h-screen gap-6 p-4">
                <form className="flex items-center justify-center  flex-col h-screen gap-6 m-4">
                    <Input type="text" placeholder="Username" className="bg-white text-black placeholder:text-gray-500" />
                    <Input type="email" placeholder="jondoe@example.com" className="bg-white text-black placeholder:text-gray-500" />
                    <Input type="password" placeholder="Password" className="bg-white text-black placeholder:text-gray-500" />
                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-700" >
                        Sign Up
                    </Button>
                </form>
            </div>
        </>
    );
}
export default Register;