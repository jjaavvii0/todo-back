import { Router } from "express";
const router = Router();

import * as dutyCtrl from "../controllers/duty.controller";

router.get("/", dutyCtrl.getDuties);
router.post("/", dutyCtrl.createDuty);
router.delete("/:id", dutyCtrl.deleteDuty);
router.put("/:id", dutyCtrl.updateDuty);

export default router;
