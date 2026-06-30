import React from "react";
import { Pencil, Trash2, TrendingUp, TrendingDown, Wallet } from "lucide-react";

function BudgetTable({ budgets, onEdit, onDelete }) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors duration-200">
            {/* Table Container with horizontal scroll for mobile */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="text-right p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Budget
                            </th>
                            <th className="text-right p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Spent
                            </th>
                            <th className="text-right p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Remaining
                            </th>
                            <th className="text-center p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Period
                            </th>
                            <th className="text-center p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {budgets.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-12">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <Wallet size={32} className="text-slate-400 dark:text-slate-600" />
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                                            No budgets found
                                        </p>
                                        <p className="text-sm text-slate-400 dark:text-slate-500">
                                            Create a budget to start tracking your spending
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            budgets.map((budget, index) => {
                                const remaining = Number(budget.remaining) || 0;
                                const spent = Number(budget.spent) || 0;
                                const budgetAmount = Number(budget.budget) || 0;
                                const spentPercentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
                                const isOverBudget = spent > budgetAmount;

                                return (
                                    <tr 
                                        key={budget.id} 
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150 group"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div 
                                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                                    style={{ 
                                                        backgroundColor: budget.categoryColor || '#6366f1'
                                                    }}
                                                />
                                                <span className="font-semibold text-slate-900 dark:text-white">
                                                    {budget.categoryName || 'Uncategorized'}
                                                </span>
                                            </div>
                                        </td>
                                        
                                        <td className="p-4 text-right">
                                            <span className="font-medium text-slate-900 dark:text-white">
                                                ₹{budgetAmount.toLocaleString("en-IN")}
                                            </span>
                                        </td>
                                        
                                        <td className="p-4 text-right">
                                            <div className="flex flex-col items-end gap-1">
                                                <span className={`font-medium ${
                                                    isOverBudget 
                                                        ? 'text-red-600 dark:text-red-400' 
                                                        : 'text-slate-700 dark:text-slate-300'
                                                }`}>
                                                    ₹{spent.toLocaleString("en-IN")}
                                                </span>
                                                {/* Progress bar */}
                                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all duration-500 ${
                                                            isOverBudget 
                                                                ? 'bg-red-500 dark:bg-red-400' 
                                                                : spentPercentage > 70 
                                                                    ? 'bg-yellow-500 dark:bg-yellow-400' 
                                                                    : 'bg-emerald-500 dark:bg-emerald-400'
                                                        }`}
                                                        style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {remaining >= 0 ? (
                                                    <TrendingUp size={16} className="text-emerald-600 dark:text-emerald-400" />
                                                ) : (
                                                    <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
                                                )}
                                                <span className={`font-semibold ${
                                                    remaining >= 0 
                                                        ? 'text-emerald-600 dark:text-emerald-400' 
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                    ₹{Math.abs(remaining).toLocaleString("en-IN")}
                                                    {remaining < 0 && (
                                                        <span className="text-xs font-normal text-red-500 dark:text-red-400 ml-1">
                                                            over
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </td>
                                        
                                        <td className="p-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                                                {budget.month || 'N/A'}/{budget.year || 'N/A'}
                                            </span>
                                        </td>
                                        
                                        <td className="p-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => onEdit(budget)}
                                                    className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200"
                                                    aria-label="Edit budget"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(budget.id)}
                                                    className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
                                                    aria-label="Delete budget"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Table Footer with summary */}
            {budgets.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex flex-wrap justify-between items-center gap-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Showing <span className="font-semibold text-slate-900 dark:text-white">{budgets.length}</span> budgets
                    </span>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                            Total Budget: <span className="font-semibold text-slate-900 dark:text-white">
                                ₹{budgets.reduce((sum, b) => sum + Number(b.budget), 0).toLocaleString("en-IN")}
                            </span>
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                            Total Spent: <span className="font-semibold text-slate-900 dark:text-white">
                                ₹{budgets.reduce((sum, b) => sum + Number(b.spent), 0).toLocaleString("en-IN")}
                            </span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BudgetTable;