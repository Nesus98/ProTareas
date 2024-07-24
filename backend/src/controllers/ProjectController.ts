import type { Request, Response } from "express";

// Definición de la clase ProjectController
export class ProjectController {
  // Método estático para manejar la solicitud de obtener todos los proyectos
  static getAllProjects = async (req: Request, res: Response) => {
    // Responde con un mensaje que indica que se obtendrán todos los proyectos
    res.send("Todos los proyectos");
  };
}
