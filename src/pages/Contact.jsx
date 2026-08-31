export default function Contact() {
    function handleSubmit(event) {
        event.preventDefault();

        console.log("Contact form submitted");
    }

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-xl">
                <header className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Contact
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Send us a message
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Complete the form and we will get back to you.
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="fullName"
                            className="text-sm font-medium text-slate-700"
                        >
                            Full name
                        </label>

                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-slate-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="subject"
                            className="text-sm font-medium text-slate-700"
                        >
                            Subject
                        </label>

                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="message"
                            className="text-sm font-medium text-slate-700"
                        >
                            Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="resize-none rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-11 rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </main>
    );
}