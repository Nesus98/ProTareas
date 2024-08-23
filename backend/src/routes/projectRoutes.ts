import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { hasAuthorization, taskBelongsToProject, taskExist } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";

// Crea una instancia de Router
const router = Router();

router.use(authenticate);

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
router.param("projectId", projectExist);
//Crear
router.post(
  "/:projectId/tasks",
  // hasAuthorization,
  //Validacion de datos insertados con mensaje
  body("name").notEmpty().withMessage("El Nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es obligatoria"),
  //Valida la peticion
  handleInputErrors,
  TaskController.createTask
);
//Obtener
router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.param("taskId", taskExist);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no valido"),
  //Valida la peticion
  handleInputErrors,
  TaskController.getTaskByID
);
//Actualizar
router.put(
  "/:projectId/tasks/:taskId",
  // hasAuthorization,
  param("taskId").isMongoId().withMessage("ID no valido"),
  body("name").notEmpty().withMessage("El Nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es obligatoria"),
  //Valida la peticion
  handleInputErrors,
  TaskController.updateTask
);
//Eliminar
router.delete(
  "/:projectId/tasks/:taskId",
  // hasAuthorization,
  param("taskId").isMongoId().withMessage("ID no valido"),
  //Valida la peticion
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("ID no valido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  handleInputErrors,
  TaskController.updateStatus
);

/**Routes for teams */
router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("Email no valido"),
  handleInputErrors,
  TeamMemberController.findMemberByEmail
);

router.get("/:projectId/team",
 TeamMemberController.getProjectTeam
)

router.post("/:projectId/team",
  body('id')
  .isMongoId().withMessage('ID No valido'),
  handleInputErrors,
  TeamMemberController.addMemberById
)
router.delete("/:projectId/team/:userId",
  param('userId')
  .isMongoId().withMessage('ID No valido'),
  handleInputErrors,
  TeamMemberController.removeMemberById
)
// Exporta la instancia de router para que pueda ser utilizada en otros archivos
export default router;
