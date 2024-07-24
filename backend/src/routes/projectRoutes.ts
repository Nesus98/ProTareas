import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";

// Crea una instancia de Router
const router = Router();

// Rutas usando el controlador ProjectController
//Crear 
router.post(
  "/",
  //Validacion con mensaje
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),

  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),

  body("description")
    .notEmpty()
    .withMessage("La Descripcion del Proyecto es Obligatoria"),
    //Valida la peticion
    handleInputErrors,
    //Crea el proyecto una vez pasada la validacion
    ProjectController.createProject
);
//Obtener 
router.get("/", ProjectController.getAllProjects);

//Obtener por ID
router.get(
    "/:id",
    param("id").isMongoId().withMessage("ID no valido"),
    //Valida la peticion
    handleInputErrors,
    //Obtiene el proyecto una vez pasada la validacion
  ProjectController.getProjectById
);
// Exporta la instancia de router para que pueda ser utilizada en otros archivos
export default router;
