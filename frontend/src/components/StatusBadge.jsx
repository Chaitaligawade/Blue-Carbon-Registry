import { Archive, CheckCircle, Clock } from "lucide-react";

export const StatusBadge = ({ status }) => {
  const styles = {
    Verified: "bg-green-100 text-green-700 border-green-300",
    Pending: "bg-blue-100 text-blue-700 border-blue-300",
    Rejected: "bg-red-100 text-red-700 border-gray-300",
  };
  const icons = {
    Verified: <CheckCircle className="w-4 h-4 mr-1" />,
    Pending: <Clock className="w-4 h-4 mr-1" />,
    Rejected: <Archive className="w-4 h-4 mr-1" />,
  };
  return <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>{icons[status]} {status}</span>;
};