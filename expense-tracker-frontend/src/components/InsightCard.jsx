import { Lightbulb, TrendingUp, TrendingDown, Wallet, AlertCircle } from "lucide-react";

function InsightCard({ dashboard }) {
    const { 
        topCategory = "No data", 
        remaining = 0, 
        totalBudget = 0, 
        totalSpent = 0,
        month = new Date().toLocaleString('default', { month: 'long' }),
        year = new Date().getFullYear()
    } = dashboard || {};

    const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
    const isOverBudget = remaining < 0;
    const remainingColor = isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
    const progressColor = isOverBudget 
        ? 'bg-red-500 dark:bg-red-400' 
        : spentPercentage > 70 
            ? 'bg-yellow-500 dark:bg-yellow-400' 
            : 'bg-emerald-500 dark:bg-emerald-400';

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-yellow-100 dark:bg-yellow-500/15 flex items-center justify-center transition-colors duration-200">
                        <Lightbulb className="text-yellow-600 dark:text-yellow-400 h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                            Monthly Insight
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {month} {year}
                        </p>
                    </div>
                </div>
                {/* Status indicator */}
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    isOverBudget 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                        : spentPercentage > 70
                            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                            : 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                }`}>
                    {isOverBudget ? 'Over Budget' : spentPercentage > 70 ? 'Near Limit' : 'On Track'}
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Top Category */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Top Category
                        </p>
                    </div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white truncate">
                        {topCategory}
                    </p>
                </div>

                {/* Remaining Budget */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-1">
                        <Wallet className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Remaining Budget
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className={`text-xl font-bold ${remainingColor}`}>
                            ₹{Math.abs(remaining).toLocaleString("en-IN")}
                        </p>
                        {isOverBudget && (
                            <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                                Overspent
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Budget Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    <span>Budget Progress</span>
                    <span>{Math.min(spentPercentage, 100).toFixed(0)}% used</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${progressColor}`}
                        style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>₹0</span>
                    <span>₹{totalBudget.toLocaleString("en-IN")}</span>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 transition-colors duration-200">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Budget</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">
                        ₹{totalBudget.toLocaleString("en-IN")}
                    </p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 transition-colors duration-200">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Spent</p>
                    <p className={`text-base font-bold ${
                        isOverBudget 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-slate-900 dark:text-white'
                    }`}>
                        ₹{totalSpent.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {/* Insight Tip */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-100 dark:border-indigo-500/20 p-4 transition-colors duration-200">
                <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
                            {isOverBudget 
                                ? "⚠️ You've exceeded your monthly budget!"
                                : spentPercentage > 70 
                                    ? "⚠️ You're close to your budget limit!"
                                    : "💡 Keep up the good work! You're on track."}
                        </p>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-0.5">
                            {isOverBudget 
                                ? `You've spent ₹${Math.abs(remaining).toLocaleString("en-IN")} over your budget. Consider reviewing your expenses.`
                                : spentPercentage > 70 
                                    ? `You've used ${Math.min(spentPercentage, 100).toFixed(0)}% of your budget. ${remaining > 0 ? `₹${remaining.toLocaleString("en-IN")} remaining.` : ''}`
                                    : `You have ₹${remaining.toLocaleString("en-IN")} remaining for the rest of the month.`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InsightCard;