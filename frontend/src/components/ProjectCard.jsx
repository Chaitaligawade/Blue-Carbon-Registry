import { Calendar, CreditCard, Trash2 } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="h-[80px] bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-2xl p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{project.projectName}</h2>
        <StatusBadge status={project.status} />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{project.projectDescription}</p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>📅 <span className="font-medium">Start:</span>{" "}{new Date(project.startDate).toLocaleDateString()}</p>
          <p>⏳ <span className="font-medium">End:</span>{" "}{new Date(project.endDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="p-4 border-t flex justify-between items-center">
        <a href={\`/projects/\${project._id}\`} className="text-blue-600 font-medium hover:underline">View Details →</a>
        {project.status === "Verified" ? <button onClick={() => navigate(\`/certificate/\${project._id}\`)} className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100"><CreditCard className="w-5 h-5 mr-1" />View Certificate</button> : <button onClick={() => onDelete(project._id)} className="flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>}
      </div>
    </div>
  );
};