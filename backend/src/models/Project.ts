import mongoose, { Schema, Document } from "mongoose";

// Definición de la interfaz IProject que extiende Document
// Esta interfaz se utilizará para tipar el modelo de Mongoose en TypeScript
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
  };

  // Definición del esquema de Mongoose para el modelo Project
const ProjectSchema: Schema = new Schema({
    //Definir projectName con validaciones
    projectName: {
        type: String,
        required: true,
        //Elimina espacios en blanco al principio y al final
        trim: true
    },
    //Definir clientName con validaciones
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    //Definir description con validaciones
    description: {
        type: String,
        required: true,
        trim: true
    },
})

// Creación del modelo de Mongoose 'Project' basado en el esquema ProjectSchema
const Project = mongoose.model<IProject>('Project', ProjectSchema);

//Exportacion del model para ser utilizado
export default Project