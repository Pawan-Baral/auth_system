import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ForgotPassword() {
    function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        console.log("Email submitted:", email);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4" >
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-black-900 mb-4 dark:text-black">Forgot Password</h2>
                <p className="text-gray-600 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address
                    </label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="jondoe@example.com"
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Send Reset Link
                </Button>
            </form>
        </main>
    )
}
export default ForgotPassword;