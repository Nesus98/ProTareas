import { Router } from "express";
import { body } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";

// Crea una instancia de Router
const router = Router();

// Rutas usando el controlador ProjectController
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),

  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),

  body("description")
    .notEmpty()
    .withMessage("La Descripcion del Proyecto es Obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);

// Exporta la instancia de router para que pueda ser utilizada en otros archivos
export default router;
