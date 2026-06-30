import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ExpenseTable from "../components/ExpenseTable";
import { getCategories } from "../services/categoryService";

import { getExpenses, deleteExpense, updateExpense } from "../services/expenseService";
import Pagination from "../components/Pagination";
import ExpenseForm from "../components/ExpenseForm";
import { X } from "lucide-react";


function Expenses() {
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [expenses, setExpenses] = useState([]);
    const [sort, setSort] = useState("expenseDate,desc");

    const [page, setPage] = useState(0);
    const [categoryId, setCategoryId] = useState("");

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {

        loadExpenses();

    }, [page, keyword, categoryId, month, year, sort]);

    async function loadExpenses() {

        try {

            const [expenseData, categoryData] = await Promise.all([

                getExpenses({ page, keyword, categoryId, sort, month, year }),

                getCategories()

            ]);

            setExpenses(expenseData.content);

            setTotalPages(expenseData.totalPages);

            setCategories(categoryData);


        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }
    async function handleDelete() {
        try {
            await
                deleteExpense(deleteId);
            setDeleteId(null);
            loadExpenses();
        }
        catch (err) {
            console.error(err);
        }
    }

    return (

        <div className="flex h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="flex-1 overflow-y-auto p-8 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

                    <div className="flex justify-between items-center gap-8">

                        <div>

                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

                                Expenses

                            </h1>

                            <p className="text-slate-500 dark:text-slate-400">

                                Manage all your expenses

                            </p>

                        </div>

                        <button
                            onClick={() => {
                                setShowModal(true);
                                setSelectedExpense(null);
                            }}
                            className="

bg-indigo-600

hover:bg-indigo-700

text-white

rounded-xl

px-5

py-3

font-medium

shadow-sm

hover:shadow-lg

transition-all

duration-300

"
                        >
                            + Add Expense
                        </button>

                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 mb-6">
                        <input type="text" placeholder="Search expenses..."
                            value={keyword} onChange={(e) => { setPage(0); setKeyword(e.target.value); }}
                            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-200"
                        />
                        <div className="mt-4 space-x-2">
                            <select value={categoryId} onChange={(e) => { setPage(0); setCategoryId(e.target.value); }}
                                className="md:w-56 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-200" >
                                <option value=""> All Categories </option>
                                {categories.map(category =>
                                (<option key={category.id} value={category.id} >
                                    {category.name} </option>))}
                            </select>
                            <select value={sort} onChange={(e) => { setPage(0); setSort(e.target.value); }}
                                className="md:w-56 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-200" >
                                <option value="expenseDate,desc">
                                    Latest First </option>
                                <option value="expenseDate,asc"> Oldest First </option>
                                <option value="amount,desc"> Amount: High → Low </option>
                                <option value="amount,asc"> Amount: Low → High </option>
                            </select>
                            <select value={month} onChange={(e) => { setPage(0); setMonth(e.target.value); }}
                                className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-200" >
                                <option value=""> All Months </option>
                                <option value="JANUARY">January</option>
                                <option value="FEBRUARY">February</option>
                                <option value="MARCH">March</option>
                                <option value="APRIL">April</option>
                                <option value="MAY">May</option>
                                <option value="JUNE">June</option>
                                <option value="JULY">July</option>
                                <option value="AUGUST">August</option>
                                <option value="SEPTEMBER">September</option>
                                <option value="OCTOBER">October</option>
                                <option value="NOVEMBER">November</option>
                                <option value="DECEMBER">December</option>
                            </select>
                            <select
                                value={year} onChange={(e) => { setPage(0); setYear(e.target.value); }}
                                className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-200" >
                                <option value=""> All Years </option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                            </select>

                        </div>
                    </div>


                    {
                        loading ?

                            <p>Loading...</p>

                            :

                            <ExpenseTable

                                expenses={expenses}

                                onEdit={(expense) => {

                                    setSelectedExpense(expense);

                                    setShowModal(true);

                                }}
                                onDelete={(id) => setDeleteId(id)}

                            />

                    }
                    {deleteId && (<div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-slideUp">

                            {/* Warning Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    Delete Expense
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400">
                                    Are you sure you want to delete this expense?
                                    <span className="block text-sm mt-1 text-red-500 dark:text-red-400 font-medium">
                                        This action cannot be undone.
                                    </span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col-reverse sm:flex-row justify-center gap-3">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 rounded-xl text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
                                >
                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </div>

                            
                        </div>
                    </div>)}
                    {
                        showModal && (

                            <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                                {/* Modal Container */}
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slideUp">

                                    {/* Modal Header */}
                                    <div className="flex justify-between items-center gap-6 mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                                {selectedExpense ? "Edit Expense" : "Add Expense"}
                                            </h2>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                {selectedExpense ? "Update your expense details" : "Create a new expense entry"}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 flex-shrink-0 group"
                                            aria-label="Close modal"
                                        >
                                            <X
                                                size={20}
                                                className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200"
                                            />
                                        </button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="relative">
                                        {/* Decorative gradient line */}
                                        <div className="absolute -top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                                        <ExpenseForm
                                            expense={selectedExpense}
                                            categories={categories}
                                            onSuccess={() => {
                                                setShowModal(false);
                                                loadExpenses();
                                            }}
                                        />
                                    </div>


                                </div>
                            </div>
                        )
                    }
                    <Pagination

                        page={page}

                        totalPages={totalPages}

                        onPrevious={() => setPage(page - 1)}

                        onNext={() => setPage(page + 1)}

                    />

                </main>

            </div>

        </div>

    );

}

export default Expenses;