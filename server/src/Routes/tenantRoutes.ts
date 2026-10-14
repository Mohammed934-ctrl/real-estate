import { Router } from "express";
import { createTenant, getTenant } from "../Controllers/tentantcontroller";

const router = Router();

router.get("/:cognitoId",getTenant);
router.post("/",createTenant)

export default router;
