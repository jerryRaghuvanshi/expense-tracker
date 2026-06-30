import React from 'react';
import { useNavigate } from 'react-router-dom'; // Visual redirection action anchor

function RecentExpenses({ expenses }) {
    const navigate = useNavigate();

    const expenseList = Array.isArray(expenses)
        ? expenses
        : expenses?.content || [];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between h-full">
            <div>
                {/* Section Header Module Block */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Recent Transactions
                    </h2>
                    <button
                        onClick={() => navigate('/expenses')}
                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
                    >
                        View All
                    </button>
                </div>

                {/* 🚀 Fix 3: Evaluate against our verified array extraction target pipeline list length */}
                {expenseList.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-sm text-slate-400 dark:text-slate-500">
                            No recent transaction records detected in this scope.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                        {expenseList.map((expense, index) => (
                            <div
                                key={expense.id || index}
                                className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3.5 last:border-none last:pb-0"
                            >
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 tracking-tight">
                                        {expense.description}
                                    </p>
                                    <p className="inline-flex items-center rounded-full bg-indigo-50
dark:bg-indigo-500/10
px-2.5 py-0.5 text-xs font-medium text-indigo-700
dark:text-indigo-300 border border-indigo-100
dark:border-indigo-500/20">
                                        {/* Fallback to legacy structure variable maps if naming schemas shift */}
                                        {expense.categoryName || expense.category || "General"}
                                    </p>
                                </div>

                                <div className="text-right space-y-1">
                                    <p className="font-bold text-sm text-rose-600 dark:text-rose-400 tracking-tight">
                                        - ₹{Number(expense.amount || 0).toLocaleString("en-IN")}
                                    </p>
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        {expense.expenseDate ? (
                                            new Date(expense.expenseDate).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short"
                                            })
                                        ) : "Today"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecentExpenses;
