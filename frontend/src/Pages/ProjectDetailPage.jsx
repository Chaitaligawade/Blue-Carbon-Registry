import React from "react";
import { useParams } from "react-router-dom";
import { FileText, Image, Calendar, MapPin, Building2, Trees } from "lucide-react";

const projectData = {
    projectName: "Mangrove Restoration Project",
    implementingOrganization: "Blue Carbon Foundation",
    projectDescription:
        "This project focuses on restoring degraded mangroves along the coastline, engaging local communities, and ensuring biodiversity conservation.",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    locUrl: "https://maps.google.com/?q=12.9716,77.5946",
    state: "Maharashtra",
    city: "Mumbai",
    area: "50 hectares",
    expectedCarbon: 1200,
    supportingDocuments: {
        EIA_Report_Final: "/docs/eia_report.pdf",
        Community_Agreement: "/docs/community_agreement.pdf",
        Feasibility_Study: "/docs/feasibility_study.pdf",
    },
    visualEvidence: {
        Site_Before_Mangrove: "/images/before.jpg",
        Planting_Day_Volunteer: "/images/planting.jpg",
        Site_After_Mangrove: "/images/after.jpg",
    },
    status: "Approved",
    rejectionReason: null,
    creditsIssued: 500,
};

export default function ProjectDetailsPage() {
    const { projectId } = useParams();

    return (
        <div className="bg-gray-100 p-6 mx-auto space-y-6">
            <div className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center">
                <div><h1 className="text-2xl font-bold text-gray-800">{projectData.projectName}</h1><p className="text-gray-500">{projectData.implementingOrganization}</p></div>
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${projectData.status === "Approved" ? "bg-green-100 text-green-600" : projectData.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>{projectData.status}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-3"><div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Building2 className="h-5 w-5" /></div><h2 className="text-lg font-semibold">Project Info</h2></div>
                    <p className="text-gray-700 mb-4">{projectData.projectDescription}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-lg"><Calendar className="h-4 w-4 text-gray-500" /><span>{projectData.startDate} → {projectData.endDate}</span></div>
                        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-lg"><MapPin className="h-4 w-4 text-gray-500" /><span>{projectData.city}, {projectData.state}</span></div>
                        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-lg"><Trees className="h-4 w-4 text-gray-500" /><span>{projectData.area}</span></div>
                        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-lg">🌍 <a href={projectData.locUrl} target="_blank" className="text-blue-600 hover:underline">View Map</a></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6"><div className="flex items-center gap-2"><div className="p-2 bg-green-100 text-green-600 rounded-lg"><Trees className="h-5 w-5" /></div><h2 className="text-lg font-semibold">Carbon & Credits</h2></div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${projectData.status === "Approved" ? "bg-green-100 text-green-700" : projectData.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{projectData.status}</span></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-gray-200 rounded-xl border border-green-200 text-center shadow-sm hover:scale-105 transition-transform"><div className="flex justify-center mb-2"><Trees className="h-6 w-6 text-green-600" /></div><p className="text-sm text-gray-600">Expected Carbon</p><p className="text-3xl font-extrabold text-gray-900">{projectData.expectedCarbon}<span className="text-base font-medium"> tons</span></p></div>
                        {projectData.creditsIssued && <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 text-center shadow-sm hover:scale-105 transition-transform"><div className="flex justify-center mb-2"><span className="p-2 rounded-full bg-blue-200 text-blue-700">💳</span></div><p className="text-sm text-gray-600">Credits Issued</p><p className="text-3xl font-extrabold text-gray-900">{projectData.creditsIssued}</p></div>}
                    </div>
                    {projectData.status === "Rejected" && projectData.rejectionReason && <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium flex items-start gap-2">❌ <span>Reason: {projectData.rejectionReason}</span></div>}
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-4"><h2 className="text-lg font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-indigo-600" /> Supporting Documents</h2><div className="grid md:grid-cols-3 gap-4">{Object.entries(projectData.supportingDocuments).map(([key, url]) => <a key={key} href={url} target="_blank" className="block bg-gray-200 hover:bg-gray-100 p-4 rounded-lg shadow text-center text-blue-600 font-medium">{key.replace(/_/g, " ")}</a>)}</div></div>
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-4"><h2 className="text-lg font-semibold flex items-center gap-2"><Image className="h-5 w-5 text-pink-600" /> Visual Evidence</h2><div className="grid md:grid-cols-3 gap-4">{Object.entries(projectData.visualEvidence).map(([key, url]) => <div key={key} className="rounded-lg overflow-hidden shadow"><img src={url} alt={key} className="w-full h-48 object-cover" /><p className="p-2 text-center text-sm font-medium bg-gray-200">{key.replace(/_/g, " ")}</p></div>)}</div></div>
        </div>
    );
}