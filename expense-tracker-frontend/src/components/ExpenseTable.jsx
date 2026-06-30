import { Pencil, Trash2 } from "lucide-react";

function ExpenseTable({

    expenses,

    onEdit,
    onDelete

}) {

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors duration-200">
            {/* Table Container with horizontal scroll for mobile */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="text-right p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="text-center p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-12">
                                    <div className="flex flex-col items-center gap-3">
                                        <svg className="w-12 h-12 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium">No expenses found</p>
                                        <p className="text-sm text-slate-400 dark:text-slate-500">Try adjusting your filters</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            expenses.map((expense, index) => (
                                <tr
                                    key={expense.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150 group"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {/* Colored dot or icon based on category */}
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0"></div>
                                            <span className="text-slate-900 dark:text-white font-medium">
                                                {expense.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                            {expense.categoryName || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="font-semibold text-slate-900 dark:text-white">
                                            ₹{Number(expense.amount).toLocaleString("en-IN")}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-slate-600 dark:text-slate-400 text-sm">
                                            {new Date(expense.expenseDate).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => onEdit(expense)}
                                                className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200"
                                                aria-label="Edit expense"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(expense.id)}
                                                className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
                                                aria-label="Delete expense"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Optional: Table Footer with total */}
            {expenses.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Showing {expenses.length} expense{expenses.length > 1 ? 's' : ''}
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Total: ₹{expenses.reduce((sum, exp) => sum + Number(exp.amount), 0).toLocaleString("en-IN")}
                    </span>
                </div>
            )}
        </div>
    );

}

export default ExpenseTable;