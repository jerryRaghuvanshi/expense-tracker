function DashboardCard({

    title,

    value,

    description,

    icon,

    iconColor

}) {

    return (

        <div
            className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >

            <div
                className={`h-14 w-14 rounded-2xl ${iconColor} flex items-center justify-center`}
            >

                {icon}

            </div>

            <h3 className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">

                {title}

            </h3>

            <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">

                {value}

            </h2>

            <p className="mt-3 text-sm text-slate-400 dark:text-slate-500">

                {description}

            </p>

        </div>

    );

}

export default DashboardCard;