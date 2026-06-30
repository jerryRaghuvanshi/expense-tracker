import { useEffect, useState } from "react";
import { Plus, X, Wallet, TrendingUp, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BudgetTable from "../components/BudgetTable";
import BudgetForm from "../components/BudgetForm";
import BudgetProgressCard from "../components/BudgetProgressCard";
import { getExpenses } from "../services/expenseService";
import {
    getBudgets,
    deleteBudget
} from "../services/budgetService";
import { getCategories } from "../services/categoryService";

function Budgets() {
    const [budgets, setBudgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadBudgets();
    }, []);

    async function loadBudgets() {
        try {
            setLoading(true);
            const [budgetData, categoryData] = await Promise.all([
                getBudgets(),
                getCategories(),
            ]);
            setBudgets(budgetData);
            setCategories(categoryData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        try {
            await deleteBudget(deleteId);
            setDeleteId(null);
            loadBudgets();
        } catch (err) {
            console.error(err);
        }
    }

    // Calculate total budget and spent
    const totalBudget = budgets.reduce((sum, b) => sum + Number(b.amount), 0);
    const totalSpent = budgets.reduce((sum, b) => sum + Number(b.spent || 0), 0);

    return (
        <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="flex-1 p-8 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                Budgets
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Manage your monthly budgets and track spending
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedBudget(null);
                                setShowModal(true);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                        >
                            <Plus size={20} />
                            Add Budget
                        </button>
                    </div>

                    {/* Summary Cards */}

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-500 dark:text-slate-400">Loading budgets...</p>
                        </div>
                    ) : budgets.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-12 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                                    <Wallet size={40} className="text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    No budgets yet
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                                    Create your first budget to start tracking your expenses and stay on top of your finances.
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedBudget(null);
                                        setShowModal(true);
                                    }}
                                    className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                                >
                                    <Plus size={18} />
                                    Create Budget
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {budgets.map(budget => (
                                <BudgetProgressCard
                                    key={budget.id}
                                    budget={budget}
                                    onEdit={budget => {
                                        setSelectedBudget(budget);
                                        setShowModal(true);
                                    }}
                                    onDelete={id => {
                                        setDeleteId(id);
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Add/Edit Budget Modal */}
                    {showModal && (
                        <div
                            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                    setShowModal(false);
                                }
                            }}
                        >
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-slideUp max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center gap-6 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {selectedBudget ? "Edit Budget" : "Add Budget"}
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            {selectedBudget
                                                ? "Update your budget details"
                                                : "Set a new monthly budget for a category"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 group flex-shrink-0"
                                        aria-label="Close modal"
                                    >
                                        <X
                                            size={20}
                                            className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200"
                                        />
                                    </button>
                                </div>

                                <BudgetForm
                                    budget={selectedBudget}
                                    categories={categories}
                                    onSuccess={() => {
                                        setShowModal(false);
                                        loadBudgets();
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {deleteId && (
                        <div
                            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                    setDeleteId(null);
                                }
                            }}
                        >
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-slideUp">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                                        <Trash2 size={32} className="text-red-600 dark:text-red-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        Delete Budget
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Are you sure you want to delete this budget?
                                        <span className="block text-sm mt-1 text-red-500 dark:text-red-400 font-medium">
                                            This action cannot be undone.
                                        </span>
                                    </p>
                                </div>

                                <div className="flex flex-col-reverse sm:flex-row justify-center gap-3">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 rounded-xl text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={18} />
                                        Delete Budget
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Budgets;