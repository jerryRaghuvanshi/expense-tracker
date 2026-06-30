import { useState } from "react";
import { useForm } from "react-hook-form";
import { addExpense, updateExpense } from "../services/expenseService";

function ExpenseForm({
    categories,
    expense,
    onSuccess
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: expense || {
            description: "",
            amount: "",
            expenseDate: "",
            categoryId: ""
        }
    });

    async function onSubmit(data) {
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            if (expense) {
                await updateExpense(expense.id, data);
            } else {
                await addExpense(data);
            }
            reset();
            onSuccess();
        } catch (err) {
            console.error(err);
            setSubmitError(err.message || "Failed to save expense. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Description Field */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Description
                </label>
                <input
                    {...register("description", { 
                        required: "Description is required",
                        minLength: { 
                            value: 3, 
                            message: "Description must be at least 3 characters" 
                        },
                        maxLength: { 
                            value: 100, 
                            message: "Description cannot exceed 100 characters" 
                        }
                    })}
                    placeholder="Enter expense description..."
                    className={`w-full border rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition duration-200 ${
                        errors.description 
                            ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                />
                {errors.description && (
                    <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Amount Field */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Amount
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
                        ₹
                    </span>
                    <input
                        type="number"
                        step="0.01"
                        {...register("amount", { 
                            required: "Amount is required",
                            min: { 
                                value: 0.01, 
                                message: "Amount must be greater than 0" 
                            },
                            max: { 
                                value: 999999999.99, 
                                message: "Amount is too large" 
                            }
                        })}
                        placeholder="0.00"
                        className={`w-full pl-8 pr-4 py-3 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition duration-200 ${
                            errors.amount 
                                ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                                : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                        }`}
                    />
                </div>
                {errors.amount && (
                    <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                        {errors.amount.message}
                    </p>
                )}
            </div>

            {/* Date Field */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Date
                </label>
                <input
                    type="date"
                    {...register("expenseDate", { 
                        required: "Date is required"
                    })}
                    className={`w-full border rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition duration-200 ${
                        errors.expenseDate 
                            ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                />
                {errors.expenseDate && (
                    <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                        {errors.expenseDate.message}
                    </p>
                )}
            </div>

            {/* Category Field */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Category
                </label>
                <select
                    {...register("categoryId", { 
                        required: "Please select a category"
                    })}
                    className={`w-full border rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition duration-200 cursor-pointer ${
                        errors.categoryId 
                            ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && (
                    <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                        {errors.categoryId.message}
                    </p>
                )}
            </div>

            {/* Submit Error */}
            {submitError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                    {submitError}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-xl py-3.5 px-6 font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {expense ? "Update Expense" : "Save Expense"}
                    </>
                )}
            </button>

            {/* Cancel Button (when editing) */}
            {expense && (
                <button
                    type="button"
                    onClick={() => {
                        reset(expense);
                        onSuccess();
                    }}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors duration-200"
                >
                    Cancel Editing
                </button>
            )}
        </form>
    );
}

export default ExpenseForm;