import { useState } from "react"
import { useLoginMutation } from "../features/api/authApi"
import { Link, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { setCredentials } from "../features/auth/authSlice"

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("")
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(formData).unwrap()
            if (user._id) {
                dispatch(setCredentials({ user }));
                navigate("/");
            }
        } catch (err) {
            setError(err.data.message)
        }
    }

    return (
        <div className="mx-auto flex flex-col items-center justify-center h-screen">
            <div className="container flex flex-col max-w-3xl items-center justify-center mx-auto p-4 rounded-lg bg-blue-50">
                <h1 className="text-3xl font-semibold">Welcome Back!</h1>
                <p className="text-gray-600 mt-2">Login to check you daily tasks.</p>

                <form className="flex flex-col w-full mt-4 p-8" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <label className="text-gray-600 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="johndoe@mail.com"
                        className="p-2 border border-gray-300 rounded mb-4"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <label className="text-gray-600 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        className="p-2 border border-gray-300 rounded mb-4"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">{isLoading ? "Logging In..." : "Login"}</button>
                </form>
                <p className="text-gray-600 mt-2">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </div>
        </div>
    )
}

export default LoginPage