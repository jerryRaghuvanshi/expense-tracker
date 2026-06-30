import { useEffect, useState } from "react";
import { X, Plus, FolderOpen, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CategoryTable from "../components/CategoryTable";
import CategoryForm from "../components/CategoryForm";
import { getCategories, deleteCategory } from "../services/categoryService";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            setLoading(true);
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        try {
            await deleteCategory(deleteId);
            setDeleteId(null);
            loadCategories();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
            <Sidebar />
            
            <div className="flex-1 flex flex-col">
                <Navbar />
                
                <main className="flex-1 p-8 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <FolderOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                Categories
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Manage your expense categories
                            </p>
                        </div>
                        
                        <button
                            onClick={() => {
                                setSelectedCategory(null);
                                setShowModal(true);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                        >
                            <Plus size={20} />
                            Add Category
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-500 dark:text-slate-400">Loading categories...</p>
                        </div>
                    ) : (
                        <CategoryTable
                            categories={categories}
                            onEdit={(category) => {
                                setSelectedCategory(category);
                                setShowModal(true);
                            }}
                            onDelete={(id) => {
                                setDeleteId(id);
                            }}
                        />
                    )}

                    {/* Add/Edit Category Modal */}
                    {showModal && (
                        <div 
                            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                    setShowModal(false);
                                }
                            }}
                        >
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-slideUp">
                                <div className="flex justify-between items-center gap-6 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {selectedCategory ? "Edit Category" : "Add Category"}
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            {selectedCategory ? "Update category details" : "Create a new expense category"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 group flex-shrink-0"
                                        aria-label="Close modal"
                                    >
                                        <X 
                                            size={20} 
                                            className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200" 
                                        />
                                    </button>
                                </div>
                                
                                <CategoryForm
                                    category={selectedCategory}
                                    onSuccess={() => {
                                        setShowModal(false);
                                        loadCategories();
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {deleteId && (
                        <div 
                            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                    setDeleteId(null);
                                }
                            }}
                        >
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-slideUp">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                                        <Trash2 size={32} className="text-red-600 dark:text-red-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        Delete Category
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Are you sure you want to delete this category?
                                        <span className="block text-sm mt-1 text-red-500 dark:text-red-400 font-medium">
                                            This action cannot be undone.
                                        </span>
                                    </p>
                                </div>
                                
                                <div className="flex flex-col-reverse sm:flex-row justify-center gap-3">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 rounded-xl text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={18} />
                                        Delete Category
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Categories;