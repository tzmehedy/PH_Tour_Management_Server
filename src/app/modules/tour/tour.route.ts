import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { TourController } from "./tour.controller";
import {
    createTourTypeZodSchema,
    createTourZodSchema,
    updateTourZodSchema,
} from "./tour.validation";
import { validateRequest } from "../../middlewares/validationRequest";
import { IRole } from "../user/user.interface";

const router = express.Router();

/* ------------------ TOUR TYPE ROUTES -------------------- */
router.get("/tour-types", TourController.getAllTourTypes);

router.post(
  "/create-tour-type",
  checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourController.createTourType
);

router.patch(
  "/tour-types/:id",
  checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourController.updateTourType
);

router.delete(
  "/tour-types/:id",
  checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN),
  TourController.deleteTourType
);

/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", TourController.getAllTours);

router.post(
  "/create",
  checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  TourController.createTour
);

router.patch(
  "/:id",
  checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN),
  validateRequest(updateTourZodSchema),
  TourController.updateTour
);

router.delete(
  "/:id",
  checkAuth(IRole.ADMIN, IRole.SUPER_ADMIN),
  TourController.deleteTour
);




export const TourRoutes = router