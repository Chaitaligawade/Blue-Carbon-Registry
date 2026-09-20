import Project from "../Models/project.model.js";
import User from "../Models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';

export const createProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectName, implementingOrganization, projectDescription, startDate, endDate, locUrl, area, state, city, expectedCarbon, EIA_Report_Final, Community_Agreement, Feasibility_Study, Site_Before_Mangrove, Planting_Day_Volunteer, Site_After_Mangrove } = req.body;
    let missingFields = [];
    if (!projectName) missingFields.push("projectName");
    if (!implementingOrganization) missingFields.push("implementingOrganization");
    if (!projectDescription) missingFields.push("projectDescription");
    if (!startDate) missingFields.push("startDate");
    if (!endDate) missingFields.push("endDate");
    if (!locUrl) missingFields.push("locUrl");
    if (!state) missingFields.push("state");
    if (!city) missingFields.push("city");
    if (!area) missingFields.push("area");
    if (!expectedCarbon) missingFields.push("expectedCarbon");
    if (!EIA_Report_Final) missingFields.push("EIA_Report_Final");
    if (!Community_Agreement) missingFields.push("Community_Agreement");
    if (!Feasibility_Study) missingFields.push("Feasibility_Study");
    if (!Site_Before_Mangrove) missingFields.push("Site_Before_Mangrove");
    if (!Planting_Day_Volunteer) missingFields.push("Planting_Day_Volunteer");
    if (!Site_After_Mangrove) missingFields.push("Site_After_Mangrove");
    if (missingFields.length > 0) return res.status(400).json({ error: `The following fields are required: ${missingFields.join(', ')}` });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    let uploadResponse = await cloudinary.uploader.upload(EIA_Report_Final, { resource_type: "raw", folder: "pdfs", public_id: `EIA_Report_Final_${Date.now()}.pdf` });
    const EIA_URL = uploadResponse.secure_url;
    uploadResponse = await cloudinary.uploader.upload(Community_Agreement, { resource_type: "raw", folder: "pdfs", public_id: `Community_Agreement_${Date.now()}.pdf` });
    const Community_URL = uploadResponse.secure_url;
    uploadResponse = await cloudinary.uploader.upload(Feasibility_Study, { resource_type: "raw", folder: "pdfs", public_id: `Feasibility_Study_${Date.now()}.pdf` });
    const Feasibility_URL = uploadResponse.secure_url;
    uploadResponse = await cloudinary.uploader.upload(Site_Before_Mangrove);
    const Before_URL = uploadResponse.secure_url;
    uploadResponse = await cloudinary.uploader.upload(Planting_Day_Volunteer);
    const Planting_URL = uploadResponse.secure_url;
    uploadResponse = await cloudinary.uploader.upload(Site_After_Mangrove);
    const After_URL = uploadResponse.secure_url;
    const newProject = new Project({
      projectName, implementingOrganization, projectDescription, startDate, endDate, locUrl, state, city, area, expectedCarbon,
      supportingDocuments: { EIA_Report_Final: EIA_URL, Community_Agreement: Community_URL, Feasibility_Study: Feasibility_URL },
      visualEvidence: { Site_Before_Mangrove: Before_URL, Planting_Day_Volunteer: Planting_URL, Site_After_Mangrove: After_URL },
      user: user._id,
    });
    await newProject.save();
    user.projects.push(newProject._id);
    await user.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error in createProject controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);
    if (!project) return res.status(404).json({ error: "Project not found" });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (userId.toString() !== project.user.toString()) return res.status(403).json({ error: "You're not the owner of this project" });
    for (const key in project.supportingDocuments) {
      const url = project.supportingDocuments[key];
      if (typeof url === "string") {
        const lastSlash = url.lastIndexOf('/');
        const lastDot = url.lastIndexOf('.');
        const pdfId = url.substring(lastSlash + 1, lastDot);
        await cloudinary.uploader.destroy(pdfId, { resource_type: "raw" });
      }
    }
    for (const key in project.visualEvidence) {
      const value = project.visualEvidence[key];
      if (typeof value === "string") {
        const lastSlash = value.lastIndexOf('/');
        const lastDot = value.lastIndexOf('.');
        const imgId = value.substring(lastSlash + 1, lastDot);
        await cloudinary.uploader.destroy(imgId);
      } else {
        console.log(`Skipping ${key}, not a string:`, value);
      }
    }
    await Project.findByIdAndDelete(projectId);
    user.projects = user.projects.filter(p => p.toString() !== projectId);
    await user.save();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProject controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const allProject = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects.length) return res.status(404).json({ error: "No projects found." });
    res.status(200).json({ projects });
  } catch (error) {
    console.log("Error in allProject controller: ", error.message);
    res.status(500).json({ error: " Internal server error " })
  }
}

export const myProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) res.status(404).json({ error: "User not found " });
    const projectIds = user.projects;
    const projects = await Project.find({ '_id': { $in: projectIds } });
    res.status(200).json({ projects });
  } catch (error) {
    console.log("Error in allProject controller: ", error.message);
    res.status(500).json({ error: " Internal server error " })
  }
}

export const ApproveProject = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;
  const { creditsIssued } = req.body;
  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);
    if (!project) return res.status(404).json({ error: "Project not found" });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (creditsIssued === undefined || creditsIssued < 0) return res.status(400).json({ error: "Invalid creditsIssued value" });
    if (project.status === "Approved") return res.status(400).json({ error: "Project is already approved" });
    user.creditsIssued += creditsIssued;
    await user.save();
    project.status = "Approved";
    project.creditsIssued = creditsIssued;
    await project.save();
    res.status(200).json({ message: "Project approved successfully", project });
  } catch (error) {
    console.error(`Error in ApproveProject controller at ${req.method} ${req.originalUrl}: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const RejectProject = async (req, res) => {
  const { projectId } = req.params;
  const { rejectionReason } = req.body;
  const userId = req.user._id;
  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);
    if (!project) return res.status(404).json({ error: "Project not found" });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!rejectionReason) return res.status(400).json({ error: "Rejection reason must be given" });
    project.status = "Rejected";
    project.rejectionReason = rejectionReason;
    await project.save();
    res.status(200).json({ message: "Project rejected successfully", project });
  } catch (error) {
    console.error(`Error in RejectProject controller at ${req.method} ${req.originalUrl}: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};