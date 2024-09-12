import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import {
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
  RiDashboardLine,
  RiSettings3Line,
  RiArrowDropRightLine,
  RiUser3Line,
  RiCustomerService2Line,
  RiArticleLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}


const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [usuario, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userAuth');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [activeSubmenu, setActiveSubmenu] = useState(3);

  const { logout, userRole, user } = useAuth();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(
    true
  );

  const navigate = useNavigate();

  const toggleSubMenu = (index) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(3);
    } else {
      setActiveSubmenu(index);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    navigate(`/perfil/${user.employee_id}`);
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return; //calendar
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
  }, [sidebarExpanded]);

  useEffect(() => {

    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  return (
    <>
      <aside
        ref={sidebar}
        className={`absolute  bg-sidebar-bg bg-cover bg-center justify-between left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-[#F7F8FC] duration-100 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 z-50' : '-translate-x-full'
          }`}
      >

        <div>

          <div className='flex justify-center items-center text-center w-full h-[100px] mt-10'>
            <img className='h-[120px]' src="logo.png" alt="alternative" />
          </div>
          <h1 className="text-center text-2xl font-bold text-primary text-gray-700 mt-4">
            LEYDIS FASHION
          </h1>
          <ul className='p-3'>
            <li className="group">
              <Link
                to=""
                className="flex text-secondary-100 items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-black transition-colors"
              >
                <RiDashboardLine className="text-primary text-xl group-hover:text-yellow-500" /> Reportes
              </Link>
            </li>
            <li className="group">
              <Link
                to="/ventas"
                className="flex text-secondary-100 items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-black transition-colors"
              >
                <RiMoneyDollarCircleLine className="text-primary text-xl group-hover:text-yellow-500" /> Ventas
              </Link>
            </li>
            <li className="group">
              <Link
                to="/productos"
                className="flex text-secondary-100 items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-black transition-colors"
              >
                <RiArticleLine className="text-primary text-xl group-hover:text-yellow-500" /> Productos
              </Link>
            </li>
            {userRole === '1' && (
              <li className="group">
                <Link
                  to="/usuarios"
                  className="flex text-secondary-100 items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-black transition-colors"
                >
                  <RiUser3Line className="text-primary text-xl group-hover:text-yellow-500" /> Usuarios
                </Link>
              </li>             
            )}

            <li className="group">
              <Link
                to="/clientes"
                className="flex text-secondary-100 items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-black transition-colors"
              >
                <RiCustomerService2Line className="text-primary text-xl group-hover:text-yellow-500" /> Clientes
              </Link>
            </li>
            {userRole === '1' && (
              <li className="group">
                <button
                  onClick={() => toggleSubMenu(3)}
                  className="w-full flex text-secondary-100 items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-black transition-colors"
                >
                  <span className="flex items-center gap-4">
                    <RiSettings3Line className="text-primary text-xl group-hover:text-yellow-500" />{" "}
                    Configuraciones
                  </span>
                  <RiArrowRightSLine
                    className={`mt-1 ${activeSubmenu === 3 && "rotate-90"} transition-all`}
                  />
                </button>
                <ul
                  className={` ${activeSubmenu === 3 ? "h-auto" : "h-0"} overflow-y-hidden transition-all`}
                >
                  {/* <li>
         <Link
           to="#"
           className="flex items-center gap-2 py-1 text-secondary-100 px-4 ml-6  relative hover:text-primary transition-colors"
         >
           <RiArrowDropRightLine className="text-primary text-xl group-hover:text-yellow-500 inline-block" />
           Rol
         </Link>
       </li> */}
                  <li>
                    <Link
                      to="/categorias"
                      className="flex items-center gap-2 py-1 text-secondary-100 px-4 ml-6  relative hover:text-primary transition-colors"
                    >
                      <RiArrowDropRightLine className="text-primary text-xl group-hover:text-yellow-500 inline-block" />
                      Categorias
                    </Link>
                  </li>
                </ul>
              </li>
            )}
    
          </ul>
        </div>
        <nav className="text-center p-5">
          <button onClick={handleLogout} className="flex bg-gray-200 shadow-md  w-full text-secondary-100 items-center text-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-black transition-colors">
            <RiLogoutCircleRLine className="text-primary text-center text-xl group-hover:text-yellow-500" /> Cerrar
            sesión
          </button>
        </nav>
      </aside>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {sidebarOpen ? <RiCloseLine size={30} /> : <RiMenu3Line size={30} />}
      </button>
    </>
  );
};

export default Sidebar;
