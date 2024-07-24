import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

// Crea una instancia de Router
const router = Router();

// Define una ruta para obtener todos los proyectos, usando el método getAllProjects del controlador ProjectController
router.get("/", ProjectController.getAllProjects);

// Exporta la instancia de router para que pueda ser utilizada en otros archivos
export default router;
