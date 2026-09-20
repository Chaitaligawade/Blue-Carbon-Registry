import React from "react";
import {Search,Bell,Sun,HelpCircle,ChevronDown} from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar(){
 return <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
  <div className="flex items-center space-x-3"><img src={logo} alt="Orbis Logo" className="w-10 h-10 object-contain"/><span className="text-xl font-semibold text-blue-700 italic">Orbis</span><span className="text-sm text-gray-500">Dashboard / My Submissions</span></div>
  <div className="hidden md:flex w-[350px] lg:w-[450px] relative"><input type="text" placeholder="Search projects..." className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-sm"/><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"/></div>
  <div className="flex items-center space-x-4"><button className="relative p-2"><Bell className="h-5 w-5 text-gray-600"/></button><button className="p-2"><Sun className="h-5 w-5 text-gray-600"/></button><button className="p-2"><HelpCircle className="h-5 w-5 text-gray-600"/></button><div className="flex items-center space-x-1"><img src="https://i.pravatar.cc/40" alt="profile" className="w-8 h-8 rounded-full object-cover"/><ChevronDown className="h-4 w-4 text-gray-500"/></div></div>
 </nav>
}