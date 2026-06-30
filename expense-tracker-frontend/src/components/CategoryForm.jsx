import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addCategory, updateCategory } from "../services/categoryService";

function CategoryForm({ category, onSuccess }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: category || { name: "" }
    });

    async function onSubmit(data) {
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            if (category) {
                await updateCategory(category.id, data);
            } else {
                await addCategory(data);
            }
            reset();
            onSuccess();
        } catch (err) {
            console.error(err);
            setSubmitError(err.message || "Failed to save category. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Category Name Field */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category Name <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <input
                    {...register("name", { 
                        required: "Category name is required",
                        minLength: { 
                            value: 2, 
                            message: "Category name must be at least 2 characters" 
                        },
                        maxLength: { 
                            value: 50, 
                            message: "Category name cannot exceed 50 characters" 
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9\s\-_&]+$/,
                            message: "Category name contains invalid characters"
                        }
                    })}
                    placeholder="Enter category name..."
                    className={`w-full border rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition duration-200 ${
                        errors.name 
                            ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                />
                {errors.name && (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Character Counter */}
            <div className="flex justify-end">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                    {register("name").value?.length || 0}/50
                </span>
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
                        {category ? "Update Category" : "Save Category"}
                    </>
                )}
            </button>

            {/* Cancel Button (when editing) */}
            {category && (
                <button
                    type="button"
                    onClick={() => {
                        reset(category);
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

export default CategoryForm;