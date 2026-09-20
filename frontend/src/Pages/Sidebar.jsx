import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, FilePlus2, Folder, LogOut } from "lucide-react";
import useAuthStore from "../stores/useAuthStore";

export default function Sidebar() {
  const {logout}= useAuthStore()

  const linkClass =
    "flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition";
  const activeClass =
    "flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-100  border-l-[10px] border-blue-600 text-gray-900 font-medium";

  return (
    <div className="w-[230px] bg-white shadow-lg flex flex-col  justify-between pl-5 relative">
      {/* Top Navigation */}
      <div>
        <h2 className="px-4 py-4 text-xs font-semibold text-gray-500 tracking-wider mt-3">
          NAVIGATION
        </h2>
        <nav className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            <LayoutGrid className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/new-submission"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            <FilePlus2 className="h-5 w-5" />
            <span>New Submission</span>
          </NavLink>
          <NavLink
            to="/my-submissions"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            <Folder className="h-5 w-5" />
            <span>My Submissions</span>
          </NavLink>
        </nav>
      </div>

      {/* Logout at Bottom */}
      <div className="p-4 border-t absolute bottom-0">
        <button className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-100 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition"
          onClick={()=>logout()}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
