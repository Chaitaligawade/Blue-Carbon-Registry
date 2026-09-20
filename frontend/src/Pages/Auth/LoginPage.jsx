import React, { useState } from "react";
import logo from "../../assets/logo.png";
import useAuthStore from "../../stores/useAuthStore"; // ✅ import your auth store
import { Eye, EyeClosed, PackageSearch, PanelBottomDashed, ServerIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [isImplementerSelected, setIsImplementerSelected] = useState(true);
    const { login, isLoggingIn } = useAuthStore(); // ✅ store hook
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: formData.email,
            password: formData.password,
            role: isImplementerSelected ? "NGO" : "Verifier", // ✅ role switch
        };

        await login(payload);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[600px]">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Orbis Logo" className="w-20 h-20 object-contain" />
                    <h1 className="text-3xl font-bold text-blue-600 mt-2">Orbis</h1>
                </div>

                {/* Greeting */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Sign in to access your Blue Carbon Registry account.
                    </p>
                </div>

                {/* User Type Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                        onClick={() => setIsImplementerSelected(true)}
                        className={`p-4 border-2 rounded-xl cursor-pointer text-center transition-all ${isImplementerSelected
                            ? "border-blue-600 ring-2 ring-blue-200 bg-blue-50"
                            : "border-gray-300 hover:border-blue-300"
                            }`}
                    >
                        <h3 className="text-sm font-semibold text-gray-800">
                            NGO/Panchayat<br />Implementer
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Manage project<br />submissions
                        </p>
                    </div>
                    <div
                        onClick={() => setIsImplementerSelected(false)}
                        className={`p-4 border-2 rounded-xl cursor-pointer text-center transition-all ${!isImplementerSelected
                            ? "border-blue-600 ring-2 ring-blue-200 bg-blue-50"
                            : "border-gray-300 hover:border-blue-300"
                            }`}
                    >
                        <h3 className="text-sm font-semibold text-gray-800">Admin Authority</h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Review and certify<br />projects
                        </p>
                    </div>
                </div>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="john.doe@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <div className="absolute top-3 left-3 font-zinc-500">
                                <PanelBottomDashed size={16}/>
                            </div>
                            
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <div
                                className="absolute top-2 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <Eye /> : <EyeClosed />}
                            </div>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out disabled:opacity-50"
                    >
                        {isLoggingIn ? "Logging in..." : "Login"}
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                       Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;