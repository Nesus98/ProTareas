// Importar Fragment de React para agrupar elementos sin agregar nodos extra al DOM
import { Fragment } from "react";
// Importar Dialog y Transition de @headlessui/react para crear y manejar modales y transiciones
import { Dialog, Transition } from "@headlessui/react";
// Importar hooks de react-router-dom para manejar la navegación, ubicación actual y parámetros de la URL
import { useLocation, useNavigate, useParams } from "react-router-dom";
// Importar useForm de react-hook-form para manejar formularios
import { useForm } from "react-hook-form";
// Importar useMutation y useQueryClient de @tanstack/react-query para manejar mutaciones y caché de consultas
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Importar el componente TaskForm
import TaskForm from "./TaskForm";
// Importar tipos necesarios
import { TaskFormData } from "@/types/index";
// Importar la función createTask de la API de tareas
import { createTask } from "@/api/TaskAPI";
// Importar toast de react-toastify para mostrar notificaciones
import { toast } from "react-toastify";

// Componente para agregar un modal de tarea
export default function AddTaskModal() {
  const navigate = useNavigate();

  /** Leer si el modal existe */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get("newTask");
  const show = modalTask ? true : false;

  /** Obtener projectId */
  const params = useParams();
  const projectId = params.projectId!;

  const initialValues: TaskFormData = {
    name: "",
    description: "",
  };

  // Configurar el formulario con valores iniciales y manejo de errores
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // Obtener instancia del cliente de consultas
  const queryClient = useQueryClient();

  // Configurar la mutación para crear una tarea
  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  // Manejar la creación de la tarea
  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };

  return (
    <>
      {/* Transición para mostrar el modal */}
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          {/* Efecto de fondo oscuro */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          {/* Contenedor del modal */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Panel del modal */}
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title as="h3" className="font-black text-4xl my-5">
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  {/* Formulario para crear una tarea */}
                  <form
                    action=""
                    className="mt-10 space-y-3"
                    onSubmit={handleSubmit(handleCreateTask)}
                    noValidate
                  >
                    <TaskForm register={register} errors={errors} />
                    <input
                      type="submit"
                      value="Guardar Tarea"
                      className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
