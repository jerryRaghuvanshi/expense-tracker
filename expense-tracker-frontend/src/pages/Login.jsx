import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../auth/AuthContext";
import { FcGoogle } from "react-icons/fc";

function handleGoogleLogin() {

    window.location.href =

        "http://localhost:8080/oauth2/authorization/google";

}

function Login() {

    const { register, handleSubmit } = useForm();

    const { login } = useAuth();

    const navigate = useNavigate();

    async function onSubmit(data) {

        try {

            const response = await loginUser(data);

            login(response.token);

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid email or password");

            console.error(error);

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold gap-6 text-center">

                    Expense Tracker

                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3"
                    >
                        Login
                    </button>
                    <div className="mt-6">

                        <button

                            onClick={handleGoogleLogin}

                            className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-slate-100"

                        >

                            <FcGoogle size={22} />

                            Continue with Google

                        </button>

                    </div>

                </form>

                <p className="text-center gap-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-indigo-600"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;