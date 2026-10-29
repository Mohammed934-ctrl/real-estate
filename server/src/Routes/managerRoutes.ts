import { Router } from "express";
import { createManager, getManager, UpdateManager } from "../Controllers/managerController";

const router = Router()



router.get("/:cognitoId", getManager);
router.post("/",createManager)
router.put("/:cogintoId",UpdateManager)






export default router