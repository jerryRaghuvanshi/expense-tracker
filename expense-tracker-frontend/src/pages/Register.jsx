import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    async function onSubmit(data) {

        try {

            await registerUser(data);

            alert("Registration successful");

            navigate("/login");

        } catch (error) {

            alert("Registration failed");

            console.error(error);

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold gap-6 text-center">

                    Create Account

                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="gap-4"
                >

                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username")}
                        className="w-full border  p-3"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full border  p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className="w-full border  p-3"
                    />

                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white  p-3"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center gap-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-indigo-600"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;