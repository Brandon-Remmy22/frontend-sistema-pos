import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../components/ui/Input';
import { RiPushpinLine, RiMailLine, RiUser3Fill, RiHome2Line, RiPhoneFindLine, RiIndeterminateCircleLine, RiUser2Line } from 'react-icons/ri';
import { Select, Option } from "@material-tailwind/react";
import { validateName, validateNameWithNumbers, validateOnlyNumbers  } from '../../../../utils/validations';
import CustomSelect from '../../../../components/ui/Select';
// Componente para el formulario de creación y edición de usuarios
const UserForm = ({
  user,               // Usuario a editar
  isEditing,          // Indica si se está editando un usuario
  onSubmit,           // Función para enviar el formulario
  onCancel,           // Función para cancelar la edición
  confirmButtonText = isEditing ? 'Guardar cambios' : 'Crear usuario',  // Texto del botón de confirmación
  cancelButtonText = 'Cancelar',         // Texto del botón de cancelación
  confirmButtonColor = 'bg-yellow-700',    // Color del botón de confirmación
  cancelButtonColor = 'border-gray-400', // Color del botón de cancelación
  formErrors = {}      // Errores del formulario
}) => {


  // const status = useSelector((state) => state.category.status);
  const [errors, setErrors] = useState({ nombre: '', primerApellido: '', segundoApellido: '', fechaNacimiento: '', email: '', password: '' });
  const [formData, setFormData] = useState({ nombre: '', primerApellido: '', segundoApellido: '', fechaNacimiento: '', email: '', password: '' });
  const [selectedRol, setSelectedRol] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';
    if (name === 'nombre') {
      const ciError = validateName(value);
      if (ciError) {
        error = ciError;
      } else {
        error = '';
      }
    }
    if (name === 'primerApellido') {
      const ciError = validateName(value);
      if (ciError) {
        error = ciError;
      } else {
        error = '';
      }
    }
    if (name === 'segundoApellido') {
      const ciError = validateName(value);
      if (ciError) {
        error = ciError;
      } else {
        error = '';
      }
    }
    setErrors({ ...errors, [name]: error });
    setFormData({ ...formData, [name]: value });
  };
  // Función para manejar el cambio del campo de estado de usuario





  // Función para enviar el formulario
  const handleSubmit = (e) => {
    // Evitar que el formulario recargue la página
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (!hasErrors) {
      const updatedFormData = { ...formData };
      const { nombre, primerApellido, segundoApellido, fechaNacimiento, email, password } = updatedFormData;
      const isCreating = !isEditing; // Determinar si se está creando un nuevo usuario

      if (isCreating) {
        // Validaciones para crear un nuevo usuario
        if (!nombre) {
          setErrors((prevErrors) => ({ ...prevErrors, nombre: 'El nombre es requerido.' }));
        }
        if (!primerApellido) {
          setErrors((prevErrors) => ({ ...prevErrors, primerApellido: 'La primerApellido es requerida.' }));
        }
        if (!segundoApellido) {
          setErrors((prevErrors) => ({ ...prevErrors, segundoApellido: 'El segundoApellido es requerido.' }));
        }
        if (!fechaNacimiento) {
          setErrors((prevErrors) => ({ ...prevErrors, fechaNacimiento: 'El carnet de indentidad es requerido.' }));
        }
        if (!email) {
          setErrors((prevErrors) => ({ ...prevErrors, email: 'El carnet de indentidad es requerido.' }));
        }
        if (!password) {
          setErrors((prevErrors) => ({ ...prevErrors, password: 'El carnet de indentidad es requerido.' }));
        }
      }

      if ((nombre && primerApellido && segundoApellido && fechaNacimiento && email && password)) {
        if (isCreating == true) {
          onSubmit({ id_rol: selectedRol.value.value, ...formData });
        } else {
          onSubmit({ ...formData, id_rol: selectedRol.value.value });
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      setSelectedRol({
        label: user.rol_nombre, value: { value: parseInt(user.id_rol) }
      });
      setFormData(user);
    }
  }, []);

  const handleUserChange = (option) => {
    setSelectedRol(option);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-2'>
        <Input
          label="Nombre"
          id="nombre"
          placeholder="Nombre del cliente"
          value={formData.nombre}
          onChange={handleChange}
          icon={RiUser2Line}
          error={errors.nombre}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="Primer apellido"
          id="primerApellido"
          placeholder="Ingresa el apellido"
          value={formData.primerApellido}
          onChange={handleChange}
          icon={RiHome2Line}
          error={errors.primerApellido}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="Segundo apellido"
          id="segundoApellido"
          placeholder="Ingresa el segundo apellido"
          value={formData.segundoApellido}
          onChange={handleChange}
          icon={RiPhoneFindLine}
          error={errors.segundoApellido}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="Fecha de Nacimiento"
          id="fechaNacimiento"
          type='date'
          placeholder="Ingresa el carnet de indentidad"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          icon={RiIndeterminateCircleLine}
          error={errors.fechaNacimiento}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="Email"
          id="email"
          type='email'
          disabled={isEditing}
          placeholder="Ingresa el correo electronico"
          value={formData.email}
          onChange={handleChange}
          icon={RiIndeterminateCircleLine}
          error={errors.email}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="Password"
          id="password"
          disabled={isEditing}
          placeholder="Ingresa el carnet de indentidad"
          value={formData.password}
          onChange={handleChange}
          icon={RiIndeterminateCircleLine}
          error={errors.password}
        />
      </div>

      <div className='mt-2'>
        <CustomSelect
          label="Rol"
          options={[{ nombre: 'Administrador', value: 1 },
          { nombre: 'Vendedor', value: 2 },]}
          value={selectedRol}
          onChange={handleUserChange}
          placeholder="Selecciona un rol"
          error={errors.employee_id}
          isSearchable={true}
          labelKey='nombre'
        />
      </div>


      <div className="mt-6 flex items-center gap-x-2">
        <button
          type="submit"
          className={`p-2 px-1 ${confirmButtonColor} rounded-xl text-white w-full outline-none border border-transparent transform transition-all duration-300 hover:scale-105`}
        >
          {confirmButtonText}
        </button>
        <button
          type="button"
          className={`p-2 rounded-xl bg-transparent border border-dashed ${cancelButtonColor} w-full outline-none transform transition-all duration-300 hover:scale-105`}
          onClick={onCancel}
        >
          {cancelButtonText}
        </button>
      </div>
    </form>
  );
};

export default UserForm;