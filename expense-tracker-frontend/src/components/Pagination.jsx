function Pagination({

    page,

    totalPages,

    onPrevious,

    onNext

}) {

    return (

        <div className="flex justify-between items-center mt-6">

            <button
                onClick={onPrevious}
                disabled={page === 0}
                className="px-4 py-2 rounded-lg bg-slate-200 disabled:opacity-50"
            >
                Previous
            </button>

            <span>

                Page {page + 1} of {totalPages}

            </span>

            <button
                onClick={onNext}
                disabled={page + 1 === totalPages}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 hover:scale-105"
            >
                Next
            </button>

        </div>

    );

}

export default Pagination;