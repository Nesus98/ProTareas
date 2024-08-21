import { Link, Navigate, Outlet } from "react-router-dom"; // Importa componentes para navegación y renderizado de rutas
import Logo from "@/components/Logo"; // Importa el componente Logo
import NavMenu from "@/components/NavMenu"; // Importa el componente NavMenu
import { ToastContainer } from "react-toastify"; // Importa el contenedor para notificaciones
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos para las notificaciones
import { useAuth } from "@/hooks/useAuth";

// Componente principal para el diseño de la aplicación
export default function AppLayout() {

  const { data, isError, isLoading} = useAuth()

  if(isLoading) return 'Cargando...'
  if(isError){
    return <Navigate to={'/auth/login'}></Navigate>
  }
  return (
    <>
      {/* Sección de encabezado */}
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          {/* Contenedor para el logotipo */}
          <div className="w-64">
            <Link to={"/"}> {/* Enlace a la página de inicio */}
              <Logo /> {/* Componente Logo */}
            </Link>
          </div>
          {/* Menú de navegación */}
          <NavMenu />
        </div>
      </header>

      {/* Sección principal donde se renderizan las rutas hijas */}
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet /> {/* Renderiza el componente de la ruta secundaria */}
      </section>

      {/* Sección de pie de página */}
      <footer className="py-5">
        <p className="text-center">
          {" "}
          Todos los derechos reservados {new Date().getFullYear()} {/* Año actual */}
        </p>
      </footer>

      {/* Contenedor para notificaciones */}
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
