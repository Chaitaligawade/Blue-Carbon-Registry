import React from "react";
import { Search, Bell, Sun, HelpCircle, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left Logo + Breadcrumb */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Orbis Logo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-semibold text-blue-700 italic">Orbis</span>
        <span className="ml text-sm text-gray-500">Dashboard / My Submissions</span>
      </div>

      <div className="hidden md:flex w-[350px] lg:w-[450px] relative">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      {/* Right Utilities */}
      <div className="flex items-center space-x-4">

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Theme Toggle */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Sun className="h-5 w-5 text-gray-600" />
        </button>

        {/* Help */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </nav>
  );
}
