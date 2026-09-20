import React, { useState } from "react";
import axios from "../lib/axios";

const SubmitPage = () => {
  const [formData,setFormData]=useState({projectName:"",implementingOrganization:"",projectDescription:"",startDate:"",endDate:"",locUrl:"",area:"",state:"",city:"",expectedCarbon:""});
  const [isSubmitting,setIsSubmitting]=useState(false);
  const handleChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
  const handleSubmit=async e=>{e.preventDefault();setIsSubmitting(true);try{await axios.post("/users/projects",formData);alert("Project submitted successfully");}catch(error){alert(error.response?.data?.error||"Submission failed");}finally{setIsSubmitting(false);}};
  return <div className="p-8 bg-gray-100 min-h-screen"><div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow"><h1 className="text-3xl font-bold mb-6">Submit Blue Carbon Project</h1><form onSubmit={handleSubmit} className="space-y-5">
    {[
      ["projectName","Project Name"],["implementingOrganization","Implementing Organization"],["projectDescription","Project Description"],["startDate","Start Date"],["endDate","End Date"],["locUrl","Location URL"],["area","Area"],["state","State"],["city","City"],["expectedCarbon","Expected Carbon Sequestration"]
    ].map(([name,label])=><div key={name}><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label><input name={name} value={formData[name]} onChange={handleChange} type={name.includes("Date")?"date":name==="expectedCarbon"?"number":"text"} className="w-full px-4 py-2 border border-gray-300 rounded-md" required/></div>)}
    <button disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{isSubmitting?"Submitting....":"Submit Project"}</button>
  </form></div></div>;
};
export default SubmitPage;