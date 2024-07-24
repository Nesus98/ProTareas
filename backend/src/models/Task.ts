import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  name: string;
  description: string;
}

// Definición del esquema de Mongoose para el modelo Task
export const TaskSchema: Schema = new Schema({
  // Definición de name con sus validaciones
  name: {
    type: String,
    trim: true,
    required: true,
  },
  // Definición de description con sus validaciones
  description: {
    type: String,
    trim: true,
    required: true,
  },
});

// Creación del modelo de Mongoose llamado 'task' basado en el esquema TaskSchema
const Task = mongoose.model<ITask>("task", TaskSchema);

//Exportar modelo
export default Task;
