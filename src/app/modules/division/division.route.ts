import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";

import { DivisionController } from "./division.controller";
import {
    createDivisionSchema,
    updateDivisionSchema,
} from "./division.validation";
import { validateRequest } from "../../middlewares/validationRequest";
import { IRole } from "../user/user.interface";
import { multerUploader } from "../../config/multer.config";

const router = Router()

router.post(
    "/create",
    // checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN),
    multerUploader.single("file"),
    validateRequest(createDivisionSchema),
    DivisionController.createDivision
);
router.get("/", DivisionController.getAllDivisions);
router.get("/:slug", DivisionController.getSingleDivision)
router.patch(
    "/:id",
    checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN),
    validateRequest(updateDivisionSchema),
    DivisionController.updateDivision
);
router.delete("/:id", checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN), DivisionController.deleteDivision);

export const DivisionRoutes = router