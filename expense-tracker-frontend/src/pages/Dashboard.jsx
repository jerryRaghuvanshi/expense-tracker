import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DashboardCard from "../components/DashboardCard";
import {
    getDashboard,
    getBreakdown

} from "../services/dashboardService";
import { getExpenses } from "../services/expenseService";
import RecentExpenses from "../components/RecentExpenses";
import BreakdownCard from "../components/BreakdownCard";
import { getBudgets } from "../services/budgetService";
import BudgetProgress from "../components/BudgetProgress";
import { useEffect, useState } from "react";
import BudgetProgressCard from "../components/BudgetProgressCard";
import HeroSection from "../components/HeroSection";
import InsightCard from "../components/InsightCard";
import CategoryBreakdownChart from "../components/CategoryBreakdownChart";

import {
    Wallet,
    IndianRupee,
    PiggyBank,
    Trophy
} from "lucide-react";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentExpenses, setRecentExpenses] = useState([]);
    const [breakdown, setBreakdown] = useState([]);
    const [budgets, setBudgets] = useState([]);
    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const month = new Date()
                .toLocaleString("en-US", { month: "long" })
                .toUpperCase();

            const year = new Date().getFullYear();

            const [
                dashboardData,
                recentExpenseData,
                breakdownData,
                budgetData
            ] = await Promise.all([
                getDashboard(month, year),
                getExpenses(0),
                getBreakdown(month, year),
                getBudgets(),
            ]);

            setDashboard(dashboardData);
            setRecentExpenses(recentExpenseData);
            setBreakdown(breakdownData);
            setBudgets(budgetData);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }
    if (loading) {

        return (

            <div className="flex justify-center items-center min-h-screen">

                <h2 className="text-xl font-semibold">

                    Loading...

                </h2>

            </div>

        );

    }


    return (

        <div className="flex h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Navbar />

                <main className="flex-1 overflow-y-auto p-8 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

                    <HeroSection

                        dashboard={dashboard}

                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 mb-8">

                        <DashboardCard

                            title="Total Budget"

                            value={`₹${dashboard.totalBudget.toLocaleString("en-IN")}`}

                            description="Allocated for this month"

                            icon={<Wallet size={26} className="text-blue-600" />}

                            iconColor="bg-blue-100 dark:bg-blue-500/15"

                        />

                        <DashboardCard

                            title="Spent"

                            value={`₹${dashboard.totalSpent.toLocaleString("en-IN")}`}

                            description="Money already spent"

                            icon={<IndianRupee size={26} className="text-red-600" />}

                            iconColor="bg-red-100 dark:bg-red-500/15"

                        />

                        <DashboardCard

                            title="Remaining"

                            value={`₹${dashboard.remaining.toLocaleString("en-IN")}`}

                            description="Still available"

                            icon={<PiggyBank size={26} className="text-green-600" />}

                           iconColor="bg-green-100 dark:bg-green-500/15"
                        />

                        <DashboardCard

                            title="Top Category"

                            value={dashboard.topCategory}

                            description="Highest spending"

                            icon={<Trophy size={26} className="text-yellow-600" />}

                           iconColor="bg-yellow-100 dark:bg-yellow-500/15"

                        />

                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">

                        <div className="lg:col-span-2">

                            <CategoryBreakdownChart breakdown={breakdown}/>

                        </div>

                        <InsightCard dashboard={dashboard} />

                    </div>
                    <section className="mt-8">

                        <RecentExpenses

                            expenses={recentExpenses}

                        />

                    </section>

                    <section className="mt-8">

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">

                            Monthly Budgets

                        </h2>

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {

                                budgets.map(budget => (

                                    <BudgetProgressCard

                                        key={budget.id}

                                        budget={budget}

                                    />

                                ))

                            }

                        </div>

                    </section>


                    {/* Bottom Section */}


                </main>

            </div>

        </div>

    );

}

export default Dashboard;