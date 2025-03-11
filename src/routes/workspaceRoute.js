import express from "express";
import WorkspaceController from "../controllers/workspaceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/workspaces", authMiddleware, WorkspaceController.createWorkspace);
router.get(
  "/workspaces/:id",
  authMiddleware,
  WorkspaceController.getWorkspaceById
);
router.get(
  "/users/:userId/workspaces",
  authMiddleware,
  WorkspaceController.getUserWorkspaces
);
router.put(
  "/workspaces/:id",
  authMiddleware,
  WorkspaceController.updateWorkspace
);
router.delete(
  "/workspaces/:id",
  authMiddleware,
  WorkspaceController.deleteWorkspace
);

export default router;
