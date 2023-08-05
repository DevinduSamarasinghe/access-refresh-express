import express,{ Express, Request, Response } from "express";
import { createSessionHandler, getSessionHandler, deleteSessionHandler } from "../controllers/session.controller";
import { requiredUser } from "../middleware/requireUser";

const router = express.Router();

router.post('/api/session', createSessionHandler);
router.get('/api/session', requiredUser, getSessionHandler);
router.delete('/api/session', requiredUser, deleteSessionHandler);


export default router;