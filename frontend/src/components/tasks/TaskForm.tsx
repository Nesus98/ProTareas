// Importar tipos de FieldErrors y UseFormRegister de react-hook-form
import { FieldErrors, UseFormRegister } from "react-hook-form";
// Importar el tipo de datos TaskFormData desde los tipos definidos en el proyecto
import { TaskFormData } from "@/types/index";
// Importar el componente ErrorMessage para mostrar mensajes de error
import ErrorMessage from "../ErrorMessage";

// Definir los tipos de propiedades que el componente TaskForm acepta
type TaskFormProps = {
  errors: FieldErrors<TaskFormData>; // Errores del formulario
  register: UseFormRegister<TaskFormData>; // Función para registrar los campos del formulario
};

// Componente funcional TaskForm que recibe errores y la función de registro como propiedades
export default function TaskForm({ errors, register }: TaskFormProps) {
  return (
    <>
      {/* Contenedor para el campo de nombre de la tarea */}
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="name">
          Nombre de la tarea
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre de la tarea"
          className="w-full p-3 border-gray-300 border"
          // Registrar el campo de nombre con validaciones
          {...register("name", {
            required: "El nombre de la tarea es obligatorio",
          })}
        />
        {/* Mostrar mensaje de error si existe un error en el campo de nombre */}
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Contenedor para el campo de descripción de la tarea */}
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="description">
          Descripción de la tarea
        </label>
        <textarea
          id="description"
          placeholder="Descripción de la tarea"
          className="w-full p-3 border-gray-300 border"
          // Registrar el campo de descripción con validaciones
          {...register("description", {
            required: "La descripción de la tarea es obligatoria",
          })}
        />
        {/* Mostrar mensaje de error si existe un error en el campo de descripción */}
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
