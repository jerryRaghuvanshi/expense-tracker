import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addBudget, updateBudget } from "../services/budgetService";

function BudgetForm({ budget, categories, onSuccess }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: budget || {
            categoryId: "",
            month: "",
            year: new Date().getFullYear(),
            amount: ""
        }
    });

    const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

    async function onSubmit(data) {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            if (budget) {
                await updateBudget(budget.id, data);
            } else {
                await addBudget(data);
            }
            reset();
            onSuccess();
        } catch (err) {
            console.error(err);
            setSubmitError(err.message || "Failed to save budget. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Category Field */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <select
                    {...register("categoryId", {
                        required: "Please select a category"
                    })}
                    className={`w-full border rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition duration-200 cursor-pointer ${errors.categoryId
                            ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                        }`}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 mt-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400"></span>
                        {errors.categoryId.message}
                    </p>
                )}
            </div>

            {/* Month and Year Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Month Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Month <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <select
                        {...register("month", {
                            required: "Please select a month"
                        })}
                        className={`w-full border rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition duration-200 cursor-pointer ${errors.month
                                ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                            }`}
                    >
                        <option value="">Select Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month.charAt(0) + month.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                    {errors.month && (
                        <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 mt-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400"></span>
                            {errors.month.message}
                        </p>
                    )}
                </div>

                {/* Year Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Year <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <select
                        {...register("year", {
                            required: "Please select a year"
                        })}
                        className={`w-full border rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition duration-200 cursor-pointer ${errors.year
                                ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                            }`}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.year && (
                        <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 mt-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400"></span>
                            {errors.year.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Budget Amount Field */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Budget Amount <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
                        ₹
                    </span>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Enter budget amount"
                        {...register("amount", {
                            required: "Budget amount is required",
                            min: {
                                value: 0.01,
                                message: "Amount must be greater than 0"
                            },
                            max: {
                                value: 999999999.99,
                                message: "Amount is too large"
                            }
                        })}
                        className={`w-full pl-8 pr-4 py-3 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition duration-200 ${errors.amount
                                ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                            }`}
                    />
                </div>
                {errors.amount && (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 mt-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400"></span>
                        {errors.amount.message}
                    </p>
                )}
            </div>

            {/* Submit Error */}
            {submitError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {submitError}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-xl py-3.5 px-6 font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                        {budget ? "Update Budget" : "Save Budget"}
                    </>
                )}
            </button>

            {/* Cancel Button (when editing) */}
            {budget && (
                <button
                    type="button"
                    onClick={() => {
                        reset(budget);
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

export default BudgetForm;