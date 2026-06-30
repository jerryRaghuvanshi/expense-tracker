import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../context/ThemeContext";

import {

    LayoutDashboard,
    Receipt,
    Tags,
    Wallet,
    LogOut,
    CreditCard,
    Sun,
    Moon

} from "lucide-react";

function Sidebar() {

    const { logout } = useAuth();
    const { darkMode, toggleTheme } = useTheme();


    const menuItems = [

        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/dashboard"
        },

        {
            name: "Expenses",
            icon: <Receipt size={20} />,
            path: "/expenses"
        },

        {
            name: "Categories",
            icon: <Tags size={20} />,
            path: "/categories"
        },

        {
            name: "Budgets",
            icon: <Wallet size={20} />,
            path: "/budgets"
        }

    ];


    return (

        <aside className="w-64 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-300">

            {/* Logo */}

            <div className="p-7 border-b border-slate-200 dark:border-slate-800">

                <div className="flex items-center gap-3">

                    <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">

                        <CreditCard size={24} />

                    </div>
                    <div>

                        <h1 className="text-xl font-bold">

                            ExpenseTracker

                        </h1>

                        <p className="text-sm text-slate-600 dark:text-slate-400">

                            Personal Finance

                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 p-4 flex flex-col gap-2">

                {

                    menuItems.map(item => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center  gap-4 px-4 py-3 rounded-md transition-all duration-200

                                ${isActive

                                    ?

                                    "font-semibold text-indigo-600 dark:text-indigo-400"

                                    :

                                    "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"

                                }`

                            }

                        >

                            {item.icon}

                            <span>

                                {item.name}

                            </span>

                        </NavLink>

                    ))

                }

            </nav>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 p-4">

                <button

                    onClick={toggleTheme}

                    className="w-full flex items-center justify-between rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"

                >

                    <div className="flex items-center gap-3">

                        {

                            darkMode

                                ?

                                <Moon size={20} />

                                :

                                <Sun size={20} />

                        }

                        <span>

                            {

                                darkMode

                                    ?

                                    "Dark Mode"

                                    :

                                    "Light Mode"

                            }

                        </span>

                    </div>

                    <div

                        className={`

                w-12

                h-6

                rounded-full

                transition

                ${darkMode

                                ?

                                "bg-indigo-600"

                                :

                                "bg-slate-300"

                            }

            `}

                    >

                        <div

                            className={`

                    h-5

                    w-5

                    bg-white

                    rounded-full

                    mt-0.5

                    transition-transform

                    ${darkMode

                                    ?

                                    "translate-x-6"

                                    :

                                    "translate-x-0.5"

                                }

                `}

                        />

                    </div>

                </button>

            </div>

            <div className="border-t border-slate-200 p-3">

                <button

                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    onClick={logout}

                >

                    <LogOut size={30} />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;