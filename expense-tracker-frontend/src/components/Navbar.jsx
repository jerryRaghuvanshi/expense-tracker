import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {

    const location = useLocation();
    const { user } = useAuth();
    const displayName = user?.username ?? "Guest";

    const formattedName =
        displayName.charAt(0).toUpperCase() +
        displayName.slice(1);

    const avatar = displayName.charAt(0).toUpperCase();

    console.log(user);


    const pages = {

        "/dashboard": {

            title: "Dashboard",

            subtitle: "Track your finances and stay on budget."

        },

        "/expenses": {

            title: "Expenses",

            subtitle: "Manage all your expenses."

        },

        "/categories": {

            title: "Categories",

            subtitle: "Organize your expense categories."

        },

        "/budgets": {

            title: "Budgets",

            subtitle: "Manage your monthly budgets."

        }

    };

    const page =

        pages[location.pathname] ||

        {

            title: "Expense Tracker",

            subtitle: ""

        };

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";

    else if (hour < 17) greeting = "Good Afternoon";

    return (

        <header className="p-5.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between transition-colors">

            {/* Left */}

            <div className="flex flex-col gap-1">

                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

                    {page.title}

                </h1>

                <p className="text-sm text-slate-500 dark:text-slate-400">

                    {page.subtitle}

                </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                <div className="relative">

                    <Search

                        size={18}

                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"

                    />

                    <input
                        placeholder="Search..."
                        className="
        w-72
        rounded-xl
        border
        border-slate-200
        dark:border-slate-700
        bg-slate-50
        dark:bg-slate-800
        py-2.5
        pl-11
        pr-4
        outline-none
        focus:border-indigo-500
        focus:bg-white
        dark:focus:bg-slate-900
        text-slate-900
        dark:text-white
        placeholder-slate-400
        dark:placeholder-white 
        transition
    "
                    />

                </div>

                <div className="flex items-center gap-3">

                    <div className="

                        h-11

                        w-11

                        rounded-full

                        bg-gradient-to-br

                        from-indigo-500

                        to-violet-600

                        flex

                        items-center

                        justify-center

                        text-white

                        font-semibold

                    ">

                        {avatar}

                    </div>

                    <div>

                        <p className="font-semibold text-slate-900 dark:text-white">

                            {displayName}

                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">

                            {greeting} 👋

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;