function BreakdownCard({ breakdown }) {

    const maxAmount =
        breakdown.length > 0
            ? Math.max(...breakdown.map(item => Number(item.spent)))
            : 0;


    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">

                Category Breakdown

            </h2>

            {
                breakdown.length === 0 ?

                    <p className="text-slate-500">

                        No expenses found.

                    </p>

                    :

                    <div className="space-y-5">

                        {

                            breakdown.map(item => {


                                const percentage =
                                    maxAmount === 0
                                        ? 0
                                        : (Number(item.spent) / maxAmount) * 100;

                                return (

                                    <div key={item.categoryName}>

                                        <div className="flex justify-between mb-2">

                                            <span>

                                                {item.categoryName}

                                            </span>

                                            <span className="font-semibold">

                                                ₹{Number(item.spent).toLocaleString("en-IN")}




                                            </span>

                                        </div>

                                        <div className="w-full h-2 bg-slate-200 rounded-full">

                                            <div
                                                className="h-2 bg-indigo-600 rounded-full"
                                                style={{
                                                    width: `${percentage}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                );

                            })

                        }

                    </div>

            }

        </div>

    );

}

export default BreakdownCard;