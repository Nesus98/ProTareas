import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";

// Crea una instancia de Router
const router = Router();

// Rutas de proyectos
//Crear
router.post(
  "/",
  //Validacion de datos insertados con mensaje
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

//Actualizar por ID
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  //Validacion de datos insertados con mensaje
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
  //Obtiene el proyecto una vez pasada la validacion
  ProjectController.updateProject
);

//Eliminar
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  //Valida la peticion
  handleInputErrors,
  //Obtiene el proyecto una vez pasada la validacion
  ProjectController.deleteProject
);

//Routes for Taks
router.post(
  "/:projectId/tasks",
  validateProjectExist,
  //Validacion de datos insertados con mensaje
  body("name")
    .notEmpty()
    .withMessage("El Nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es obligatoria"),
  //Valida la peticion
  handleInputErrors,
  TaskController.createTask
);

router.get(
  "/:projectId/tasks",
  validateProjectExist,
  TaskController.getProjectTasks
)

router.get(
  "/:projectId/tasks/:taskId",
  validateProjectExist,
  TaskController.getTaskByID
)

// Exporta la instancia de router para que pueda ser utilizada en otros archivos
export default router;
