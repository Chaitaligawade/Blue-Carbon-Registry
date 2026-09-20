import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { allProject, ApproveProject, createProject, deleteProject, myProject, RejectProject } from "../controllers/user.controller.js";
import { isVerifier } from "../middleware/roleMiddleware.js";

const router = express.Router()

router.post('/submit-project', protectRoute, createProject);
router.delete('/delete-project/:projectId', protectRoute, deleteProject);
router.get('/my-projects', protectRoute, myProject);
router.get('/projects', protectRoute,isVerifier, allProject);
router.post('/Approve-projects/:projectId', protectRoute,isVerifier, ApproveProject);
router.post('/reject-projects/:projectId', protectRoute,isVerifier, RejectProject);
export default router;