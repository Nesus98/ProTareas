import type { Request, Response } from "express";
import Project from "../models/Project";

// Definición de la clase ProjectController
export class ProjectController {
  // Método estático para crear proyectos
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    console.log(req.user);
    

    try {
      await project.save();
      res.send("Proyecto creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  // Método estático para obtener  proyectos
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  //Metodo para obtener proyecto por id
  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate("tasks");

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }
      res.json(project);
    } catch (error) {
      console.log(error);
    }
  };

  //Metodo para actualizar proyecto por id
  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }
      project.clientName = req.body.clientName;
      project.projectName = req.body.projectName;
      project.description = req.body.description;

      await project.save();
      res.send("Proyecto Actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  //Metodo para actualizar proyecto por id
  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }

      await project.deleteOne();
      res.send("Proyecto eliminado");
    } catch (error) {
      console.log(error);
    }
  };
}
