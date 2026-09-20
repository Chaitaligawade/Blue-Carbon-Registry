import React, { useEffect, useState } from "react";
import { create } from "zustand";
import { Search } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";

const useUserStore = create((set) => ({
  projects: [],
  fetchProjects: () => set({ projects: [
    {_id:"1",projectName:"Mangrove Restoration Initiative",projectDescription:"Restoring degraded mangrove forests in coastal regions.",startDate:"2024-02-01",endDate:"2026-12-31",status:"Verified"},
    {_id:"2",projectName:"Blue Carbon Seagrass Protection",projectDescription:"Seagrass beds protection to enhance carbon sequestration.",startDate:"2025-01-15",endDate:"2027-01-15",status:"Pending"},
    {_id:"3",projectName:"Community-Based Coral Reef Conservation",projectDescription:"Engaging local communities in coral reef protection.",startDate:"2025-03-01",endDate:"2028-02-28",status:"Rejected"}
  ]}),
  deleteProject: (id) => set(state => ({projects: state.projects.filter(p => p._id !== id)}))
}));

const MySubmissionsPage = () => {
  const {projects, fetchProjects, deleteProject} = useUserStore();
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("All");
  useEffect(()=>{fetchProjects()},[fetchProjects]);
  const filteredProjects=projects.filter(p=>p.projectName.toLowerCase().includes(search.toLowerCase())&&(filter==="All"||p.status===filter));
  return <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">My Projects</h1>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div className="relative w-full md:w-1/3"><Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"/><input type="text" placeholder="Search projects..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/></div>
      <select value={filter} onChange={e=>setFilter(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"><option value="All">All Projects</option><option value="Active">Active</option><option value="Upcoming">Upcoming</option><option value="Completed">Completed</option></select>
    </div>
    {filteredProjects.length===0?<p className="text-gray-500">No projects found.</p>:<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{filteredProjects.map(project=><ProjectCard key={project._id} project={project} onDelete={deleteProject}/>)}</div>}
  </div>;
};
export default MySubmissionsPage;