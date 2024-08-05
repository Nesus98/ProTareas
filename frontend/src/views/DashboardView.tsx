import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { deleteProject, getProjects } from "@/api/ProjectAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DashboardView() {
  // Configuración del hook useQuery para obtener la lista de proyectos
  const { data, isLoading } = useQuery({
    queryKey: ["projects"], // Clave para la consulta
    queryFn: getProjects, // Función que obtiene los proyectos
  });

  const queryClient = useQueryClient(); // Hook para interactuar con el caché de consultas

  // Configuración del hook useMutation para eliminar un proyecto
  const { mutate } = useMutation({
    mutationFn: deleteProject, // Función para eliminar el proyecto
    onError: (error) => {
      toast.error(error.message); // Muestra un mensaje de error si la eliminación falla
    },
    onSuccess: (data) => {
      toast.success(data); // Muestra un mensaje de éxito si la eliminación es exitosa
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Invalida el caché de proyectos para que se actualice
    },
  });

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (isLoading) return "Cargando...";

  // Muestra un mensaje de error si ocurre un problema al obtener los datos
  if (data === undefined) return <Navigate to="/404" />;

  // Renderiza la vista del dashboard si los datos están disponibles
  return (
    <>
      <h1 className="text-5xl font-black">Mis Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Maneja y administra tus Proyectos
      </p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to="/projects/create"
        >
          Nuevo Projecto
        </Link>
      </nav>

      {data.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
        >
          {data.map((project) => (
            <li
              key={project._id}
              className="flex justify-between gap-x-6 px-5 py-10"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <Link
                    to={`/projects/${project._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >
                    {project.projectName}
                  </Link>
                  <p className="text-sm text-gray-400">
                    Cliente: {project.clientName}
                  </p>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon
                      className="h-9 w-9"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        <Link
                          to={`/projects/${project._id}`}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                        >
                          Ver Proyecto
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          to={`/projects/${project._id}/edit`}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                        >
                          Editar Proyecto
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          type="button"
                          className="block px-3 py-1 text-sm leading-6 text-red-500"
                          onClick={() => mutate(project._id)}
                        >
                          Eliminar Proyecto
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20">
          No hay proyectos aun {""}
          <Link to="/projects/create" className="text-fuchsia-500 font-bold">
            Crear Proyecto
          </Link>
        </p>
      )}
    </>
  );
}
