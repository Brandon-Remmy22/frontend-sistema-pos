import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AlertContext } from "../../contexts/AlertContext";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { useAuth } from "../../hooks/useAuth";
import AnimatedPage from "../../components/framer/AnimatedPage";


const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { authLogin } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { showAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      authLogin(formData);

      showAlert('Inicio de sesion correctamente', 'success');
    } catch (error) {
      showAlert('Error al inciar sesion', 'error');
    }

    if (!formData.email || !formData.password) {

    }
  };


  return (
    <AnimatedPage>
      <div className="bg-custom-bg bg-cover bg-center h-screen">

        <div className="min-h-screen  flex items-center justify-center p-4">

          <div className="bg-blue-100 p-8 bg-sidebar-bg bg-cover bg-center rounded-xl shadow-2xl w-auto lg:w-[450px]">
            <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-secondary-50 mb-8">
              RESTABLECE TU  <span className="text-primary">CONTRASEÑA</span>
            </h1>
            {/* Mostrar el error del backend si está presente */}
            {errorMessage && <div className=" mt-0 text-red-300 mb-2 ">{errorMessage}</div>}


            <form onSubmit={handleSubmit} className="mb-8">
              <div className="relative ">
                <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="py-3 px-8 bg-secondary-50 w-full outline-none rounded-lg"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                />
              </div>
              {/* Mostrar el error del correo si está presente */}
              {emailError && <div className="text-red-300 ">{emailError}</div>}

              <div className="relative  mt-4">
                <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="py-3 px-8 bg-secondary-50 w-full outline-none rounded-lg"
                  placeholder="Repite tu contraseña"
                  autoComplete="current-password"
                />
                {showPassword ? (
                  <RiEyeOffLine
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  />
                ) : (
                  <RiEyeLine
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  />
                )}
              </div>
              {/* Mostrar el error de la contraseña si está presente */}
              {passwordError && <div className="text-red-300">{passwordError}</div>}
              <div>
                <button
                  type="submit"
                  className="bg-blue-50 text-black shadow-md uppercase font-bold text-sm w-full mt-5 py-3 px-4 rounded-lg"
                >
                  Cambiar
                </button>
              </div>
            </form>
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/forgot-password"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>

  );
};

export default ChangePassword;
