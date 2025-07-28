import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { RiAccountCircleFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, userId, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-8 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="">
              <div className="flex sm:space-x-4">
                <button
                  onClick={() => handleScroll("home")}
                  className="text-gray-300 text-sm sm:text-base hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 font-medium"
                >
                  Inicio
                </button>
                <button
                  onClick={() => handleScroll("aboutProject")}
                  className="text-gray-300 text-sm sm:text-base hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 font-medium"
                >
                  Sobre el proyecto
                </button>
                <button
                  onClick={() => handleScroll("maintenance")}
                  className="text-gray-300 text-sm sm:text-base hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 font-medium"
                >
                  Mantenimiento
                </button>
              </div>
            </div>
          </div>
          <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <RiAccountCircleFill className="h-8 w-8 rounded-full text-white" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                {isAuthenticated ? (
                  <>
                    <MenuItem>
                      <Link
                        to={`/user_profile/${userId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Tu perfil
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to={`/data/${userId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Chaleco Inteligente
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Cerrar sesión
                      </button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Registrarse
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Iniciar sesión
                      </Link>
                    </MenuItem>
                  </>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
