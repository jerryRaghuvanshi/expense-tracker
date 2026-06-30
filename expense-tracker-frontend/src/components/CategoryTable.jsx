import React from "react";
import { Pencil, Trash2, FolderOpen } from "lucide-react";

function CategoryTable({ categories, onEdit, onDelete }) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors duration-200">
            {/* Table Container with horizontal scroll for mobile */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <FolderOpen size={16} className="text-slate-400 dark:text-slate-500" />
                                    Category Name
                                </div>
                            </th>
                            <th className="text-center p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="text-center py-12">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <FolderOpen size={32} className="text-slate-400 dark:text-slate-600" />
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                                            No categories found
                                        </p>
                                        <p className="text-sm text-slate-400 dark:text-slate-500">
                                            Create your first category to get started
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            categories.map((category, index) => (
                                <tr 
                                    key={category.id} 
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150 group"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {/* Colored dot based on category (if you have color property) */}
                                            <div 
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ 
                                                    backgroundColor: category.color || '#6366f1'
                                                }}
                                            />
                                            <span className="text-slate-900 dark:text-white font-medium">
                                                {category.name}
                                            </span>
                                            {/* Optional: Show expense count if available */}
                                            {category._count?.expenses > 0 && (
                                                <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                                    {category._count.expenses} expenses
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => onEdit(category)}
                                                className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200"
                                                aria-label="Edit category"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(category.id)}
                                                className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
                                                aria-label="Delete category"
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

            {/* Table Footer with category count */}
            {categories.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Total Categories: <span className="font-semibold text-slate-900 dark:text-white">{categories.length}</span>
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        {categories.length === 1 ? '1 category' : `${categories.length} categories`}
                    </span>
                </div>
            )}
        </div>
    );
}

export default CategoryTable;