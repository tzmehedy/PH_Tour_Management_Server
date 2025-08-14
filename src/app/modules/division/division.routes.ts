import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";
import { divisionControllers } from "./division.controller";

const router = Router()

router.post("/create", checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN), divisionControllers.createDivision)


export const divisionRoutes = router