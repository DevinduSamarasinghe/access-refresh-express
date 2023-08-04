import { Express, Request, Response } from "express";
import { createSessionHandler, getSessionHandler, deleteSessionHandler } from "../controllers/session.controller";
import { requiredUser } from "../middleware/requireUser";

function routes(app: Express){

    app.post('api/session', createSessionHandler);
    app.get('api/session', requiredUser, getSessionHandler);
    app.delete('api/session', requiredUser, deleteSessionHandler);
}

export default routes;