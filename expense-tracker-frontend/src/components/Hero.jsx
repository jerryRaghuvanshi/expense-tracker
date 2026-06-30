function Hero() {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (

        <div className="bg-white rounded-xl shadow p-8">

            <h1 className="text-4xl font-bold">

                {greeting} 👋

            </h1>

            <p className="text-slate-500 mt-2">

                Welcome back! Here's your financial overview.

            </p>

        </div>

    );

}

export default Hero;