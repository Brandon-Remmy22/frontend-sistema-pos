import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../components/ui/Input';
import { RiPushpinLine, RiMailLine, RiUser3Fill, RiHome2Line, RiPhoneFindLine, RiIndeterminateCircleLine, RiUser2Line } from 'react-icons/ri';
import { validateName } from '../../../../utils/validations';


// Componente para el formulario de creación y edición de usuarios
const CategoryForm = ({
  category,               // Usuario a editar
  isEditing,          // Indica si se está editando un usuario
  onSubmit,           // Función para enviar el formulario
  onCancel,           // Función para cancelar la edición
  confirmButtonText = isEditing ? 'Guardar cambios' : 'Crear categoria',  // Texto del botón de confirmación
  cancelButtonText = 'Cancelar',         // Texto del botón de cancelación
  confirmButtonColor = 'bg-yellow-700',    // Color del botón de confirmación
  cancelButtonColor = 'border-gray-400', // Color del botón de cancelación
  formErrors = {}      // Errores del formulario
}) => {


  // const status = useSelector((state) => state.category.status);
  const [errors, setErrors] = useState({ nombre: '', descripcion: '' });
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = ''
    // if (name === 'nombre') {
    //   const ciError = validateName(value);
    //   if (ciError) {
    //     error = ciError;
    //   } else {
    //     error = '';
    //   }
    // }
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
      const { nombre, descripcion } = updatedFormData;
      const isCreating = !isEditing; // Determinar si se está creando un nuevo usuario

      if (isCreating) {
        // Validaciones para crear un nuevo usuario
        if (!nombre) {
          setErrors((prevErrors) => ({ ...prevErrors, nombre: 'El nombre es requerido.' }));
        }
        if (!descripcion) {
          setErrors((prevErrors) => ({ ...prevErrors, descripcion: 'La descripcion es requerida.' }));
        }
      }

      if ((nombre && descripcion )) {
        if (isCreating == true) {
          onSubmit(formData);
        } else {
          onSubmit(updatedFormData);
        }
      }
    }
  };

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-2'>
        <Input
          label="Nombre"
          id="nombre"
          placeholder="Nombre de la categoria"
          value={formData.nombre}
          onChange={handleChange}
          icon={RiUser2Line}
          error={errors.nombre}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="descripcion"
          id="descripcion"
          placeholder="Ingresa una descripción (opcional)"
          value={formData.descripcion}
          onChange={handleChange}
          icon={RiHome2Line}
          error={errors.descripcion}
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

export default CategoryForm;