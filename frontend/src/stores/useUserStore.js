import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useUserStore=create((set)=>({
 isSubmitting:false,
 projects:[],
 createProject:async(data)=>{
  set({isSubmitting:true});
  try{
   const res=await axiosInstance.post("/user/submit-project",data);
   set(state=>({projects:[...state.projects,res.data.project]}));
   toast.success("Project created successfully");
  }catch(error){
   const errMsg=error?.response?.data?.error||error.message||"Project creation failed";
   console.error("Login Error:",errMsg);
   toast.error(errMsg);
  }finally{set({isSubmitting:false});}
 },
 fetchProjects:()=>{
  set({projects:[
   {_id:"1",projectName:"Mangrove Restoration Initiative",projectDescription:"Restoring degraded mangrove forests in coastal regions.",startDate:"2024-02-01",endDate:"2026-12-31"},
   {_id:"2",projectName:"Blue Carbon Seagrass Protection",projectDescription:"Seagrass beds protection to enhance carbon sequestration.",startDate:"2025-01-15",endDate:"2027-01-15"},
   {_id:"3",projectName:"Community-Based Coral Reef Conservation",projectDescription:"Engaging local communities in coral reef protection.",startDate:"2025-03-01",endDate:"2028-02-28"}
  ]});
 }
}));
export default useUserStore;