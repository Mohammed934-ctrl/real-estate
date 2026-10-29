import { Router } from "express";
import { createTenant, getTenant, updateTenant } from "../Controllers/tentantcontroller";

const router = Router();

router.get("/:cognitoId",getTenant);
router.post("/",createTenant)
router.put("/:cogintoId",updateTenant)

export default router;
