import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function HeroSection({ dashboard }) {

    const { user } = useAuth();

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    const username = user?.username ?? "User";

    return (

        <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 p-10 text-white shadow-xl">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-indigo-100 text-lg">

                        {greeting} 👋

                    </p>

                    <h1 className="mt-2 text-5xl font-bold">

                        {username}

                    </h1>

                    <p className="mt-4 text-indigo-100 text-lg max-w-xl">

                        Here's your financial overview for this month.

                    </p>

                </div>

                <div className="text-right">

                    <p className="text-indigo-100">

                        Remaining Budget

                    </p>

                    <h2 className="mt-2 text-5xl font-bold">

                        ₹{dashboard.remaining.toLocaleString("en-IN")}

                    </h2>

                </div>

            </div>

            <div className="mt-10 flex items-center gap-4">

                <Link
                    to="/expenses"
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-sm transition hover:bg-slate-100"
                >

                    <Plus size={18} />

                    Add Expense

                </Link>

                <Link
                    to="/expenses"
                    className="flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 text-white transition hover:bg-white/10"
                >

                    View Expenses

                    <ArrowRight size={18} />

                </Link>

            </div>

        </section>

    );

}

export default HeroSection;