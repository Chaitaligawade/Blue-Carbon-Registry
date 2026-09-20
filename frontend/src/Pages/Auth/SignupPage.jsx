import React, { useState } from "react";
import logo from "../../assets/logo.png";
import useAuthStore from "../../stores/useAuthStore.js";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate()

    const { signup, isSigningUp } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "NGO",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Remove confirmPassword + agree from payload before sending
        const { confirmPassword, agree, ...payload } = formData;

        console.log("Payload:", payload);
        signup(payload); // call Zustand signup function
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 ">
            <div className=" w-[500px] bg-white shadow-md rounded-lg p-8 my-10">
                {/* Logo */}
                <div className="flex justify-center items-center mb-3 gap-1">
                    <img src={logo} alt="Orbis Logo" className="w-12  object-contain" />
                    <h1 className="text-3xl font-bold text-blue-600 ">Orbis</h1>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-3">
                    Create Your Account
                </h2>
                <p className="text-center text-md font-medium text-gray-500 mb-6">
                    Join the Blue Carbon Registry to manage and verify environmental
                    projects.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name / Organization
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name or organization"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300  rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300  rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mobile Number (Optional)
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300  rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Your Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300  rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="NGO" >NGO (Non-Governmental Organization)</option>
                            <option value="Verifier">Verifier</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <div
                            className="absolute top-7 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <Eye /> : <EyeClosed />}
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type={confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300  rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div
                            className="absolute top-7 right-3 flex items-center cursor-pointer"
                            onClick={() => setConfirmPassword(!confirmPassword)}
                            aria-label={confirmPassword ? "Hide password" : "Show password"}
                        >
                            {confirmPassword ? <Eye /> : <EyeClosed />}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border border-gray-300 rounded"
                            required
                        />
                        <label className="ml-2 text-sm text-gray-600">
                            I agree to the{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? "Creating Account....." : "Create Account "}
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login in
                    </button>
                </form>

                <p className="text-xs text-center text-gray-500 mt-4">
                    NGO accounts are automatically approved. Verifier and Admin accounts
                    are pending review and approval.
                </p>
            </div>
        </div>
    );
};

export default SignupPage;