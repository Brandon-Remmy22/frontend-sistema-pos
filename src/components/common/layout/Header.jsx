import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

import {
  RiArrowDownSLine,
  RiSettings3Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userAuth')));
  const navigate = useNavigate();

  const handleLogout = async() => {
    logout();
    navigate('/login');
  };
  return (

    <header className="sticky top-0 z-50 h-[4vh] md:h-[7vh] border-b border-secondary-100 p-8 flex items-center justify-end bg-gray-100">
      <nav className="flex items-center gap-2">
        <div className="font-bold">{user? (user.rol_nombre).toUpperCase():'SIN ROL'}</div>
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-x-2 p-2 rounded-lg transition-colors hover:bg-secondary-100 group">
              <img
                src="https://static.vecteezy.com/system/resources/previews/028/238/588/non_2x/old-man-teacher-face-3d-profession-avatars-free-png.png"
                className="w-6 h-6 object-cover rounded-full"
              />
              <p className="text-gray-500">Menu</p>
              <RiArrowDownSLine className="text-secondary-100 group-hover:text-black" />
            </MenuButton>
          }
          align="end"
          arrow
          // arrowClassName="bg-gray-300"
          transition
          menuClassName="bg-gray-300 p-4"
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/perfil/"
              className="rounded-lg transition-colors  hover:bg-secondary-50  flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/028/238/588/non_2x/old-man-teacher-face-3d-profession-avatars-free-png.png"
                className="w-8 h-8 object-cover rounded-full"
              />
              <p>{user.nombre}</p>

            </Link>
          </MenuItem>
          <hr className="my-4 border-gray-500" />
          {/* <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/perfil/configuracion"
              className="rounded-lg transition-colors  hover:bg-secondary-50 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiSettings3Line /> Configuración
            </Link>
          </MenuItem> */}
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="#"
              className="rounded-lg transition-colors  hover:bg-secondary-50 flex items-center gap-x-4 py-2 px-6 flex-1"
              onClick={handleLogout}
            >
              <RiLogoutCircleRLine /> Cerrar sesión
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
