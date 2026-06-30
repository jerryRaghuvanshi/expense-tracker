function BudgetProgress({ budgets }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">

                Budget Progress

            </h2>

            {

                budgets.length === 0 ?

                    <p className="text-slate-500">

                        No budgets found.

                    </p>

                :

                    <div className="space-y-6">

                        {

                            budgets.map(budget => {

                                const percentage =
                                    budget.budget === 0
                                        ? 0
                                        : (budget.spent / budget.budget) * 100;

                                let color = "bg-green-500";

                                if (percentage > 80)
                                    color = "bg-red-500";
                                else if (percentage > 60)
                                    color = "bg-yellow-500";

                                return (

                                    <div key={budget.categoryName}>

                                        <div className="flex justify-between mb-2">

                                            <span className="font-medium">

                                                {budget.categoryName}

                                            </span>

                                            <span className="text-sm">

                                                ₹{budget.spent} / ₹{budget.budget}

                                            </span>

                                        </div>

                                        <div className="w-full h-3 bg-slate-200 rounded-full">

                                            <div
                                                className={`${color} h-3 rounded-full transition-all`}
                                                style={{
                                                    width: `${Math.min(percentage, 100)}%`
                                                }}
                                            />

                                        </div>

                                        <p className="text-xs text-slate-500 mt-1">

                                            ₹{budget.remaining} remaining

                                        </p>

                                    </div>

                                );

                            })

                        }

                    </div>

            }

        </div>

    );

}

export default BudgetProgress;