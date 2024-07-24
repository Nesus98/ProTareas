import type { Request, Response } from "express";
import Project from "../models/Project";

// Definición de la clase ProjectController
export class ProjectController {
  // Método estático para crear proyectos
  static createProject = async (req: Request, res: Response) => {
    
    const project = new Project(req.body);

    try {
      await project.save();
      res.send("Proyecto creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
  // Método estático para obtener  proyectos
  static getAllProjects = async (req: Request, res: Response) => {
    // Responde con un mensaje que indica que se obtendrán todos los proyectos
    res.send("Todos los proyectos");
  };
}
