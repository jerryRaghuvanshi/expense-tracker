import { Pencil, Trash2, TrendingUp, TrendingDown, Wallet } from "lucide-react";

function BudgetProgressCard({
    budget,
    onEdit,
    onDelete
}) {
    const spent = Number(budget.spent) || 0;
    const budgetAmount = Number(budget.budget) || 0;
    const remaining = Number(budget.remaining) || 0;
    const percentage = budgetAmount > 0 ? Math.min((spent / budgetAmount) * 100, 100) : 0;
    const isOverBudget = spent > budgetAmount;

    let progressColor = "bg-emerald-500 dark:bg-emerald-400";
    let statusText = "On Track";
    let statusColor = "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800";

    if (isOverBudget) {
        progressColor = "bg-red-500 dark:bg-red-400";
        statusText = "Over Budget";
        statusColor = "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    } else if (percentage >= 80) {
        progressColor = "bg-red-500 dark:bg-red-400";
        statusText = "Critical";
        statusColor = "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    } else if (percentage >= 60) {
        progressColor = "bg-yellow-500 dark:bg-yellow-400";
        statusText = "Warning";
        statusColor = "text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
    } else if (percentage >= 30) {
        progressColor = "bg-blue-500 dark:bg-blue-400";
        statusText = "Progressing";
        statusColor = "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    }

    const remainingColor = isOverBudget
        ? 'text-red-600 dark:text-red-400'
        : 'text-emerald-600 dark:text-emerald-400';

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 group">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{
                                backgroundColor: budget.categoryColor || '#6366f1'
                            }}
                        />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                            {budget.categoryName || 'Uncategorized'}
                        </h2>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {budget.month || 'N/A'} {budget.year || ''}
                    </p>
                </div>

                <div className="flex gap-2 ml-4">
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
            </div>

            {/* Status Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusColor} mb-4`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                {statusText}
            </div>

            {/* Amount and Progress */}
            <div className="space-y-3">
                {/* Amount display */}
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Budget</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            ₹{budgetAmount.toLocaleString("en-IN")}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Spent</p>
                        <p className={`text-sm font-semibold ${isOverBudget
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-slate-900 dark:text-white'
                            }`}>
                            ₹{spent.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">
                            {percentage.toFixed(0)}% used
                        </span>
                        <span className={`font-medium ${remainingColor}`}>
                            {isOverBudget ? 'Overspent' : 'Remaining'}: ₹{Math.abs(remaining).toLocaleString("en-IN")}
                        </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
                            style={{
                                width: `${Math.min(percentage, 100)}%`
                            }}
                        />
                    </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                        {isOverBudget ? (
                            <TrendingDown size={14} className="text-red-500 dark:text-red-400" />
                        ) : (
                            <TrendingUp size={14} className="text-emerald-500 dark:text-emerald-400" />
                        )}
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                            {isOverBudget ? 'Overspent' : 'On track'}
                        </span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                        <Wallet size={14} className="text-slate-400 dark:text-slate-500" />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            {budgetAmount > 0 ? `${Math.round(percentage)}%` : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hover Tooltip (Optional) */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-1 -right-1 w-20 h-20 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-1 -left-1 w-20 h-20 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-2xl"></div>
            </div>
        </div>
    );
}

export default BudgetProgressCard;