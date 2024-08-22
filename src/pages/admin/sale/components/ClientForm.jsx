import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../components/ui/Input';
import { RiPushpinLine, RiMailLine, RiUser3Fill, RiHome2Line, RiPhoneFindLine, RiIndeterminateCircleLine, RiUser2Line } from 'react-icons/ri';
import { validateName } from '../../../../utils/validations';


// Componente para el formulario de creación y edición de usuarios
const ClientForm = ({
  client,               // Usuario a editar
  isEditing,          // Indica si se está editando un usuario
  onSubmit,           // Función para enviar el formulario
  onCancel,           // Función para cancelar la edición
  confirmButtonText = isEditing ? 'Guardar cambios' : 'Crear cliente',  // Texto del botón de confirmación
  cancelButtonText = 'Cancelar',         // Texto del botón de cancelación
  confirmButtonColor = 'bg-yellow-700',    // Color del botón de confirmación
  cancelButtonColor = 'border-gray-400', // Color del botón de cancelación
  formErrors = {}      // Errores del formulario
}) => {


  // const status = useSelector((state) => state.category.status);
  const [errors, setErrors] = useState({ nombre: '', direccion: '', telefono: '', numDocumento: '' });
  const [formData, setFormData] = useState({ nombre: '', direccion: '', telefono: '', numDocumento: '' });


  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';
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
      const { nombre, direccion, telefono, numDocumento } = updatedFormData;
      const isCreating = !isEditing; // Determinar si se está creando un nuevo usuario

      if (isCreating) {
        // Validaciones para crear un nuevo usuario
        if (!nombre) {
          setErrors((prevErrors) => ({ ...prevErrors, nombre: 'El nombre es requerido.' }));
        }
        if (!direccion) {
          setErrors((prevErrors) => ({ ...prevErrors, direccion: 'La direccion es requerida.' }));
        }
        if (!telefono) {
          setErrors((prevErrors) => ({ ...prevErrors, telefono: 'El telefono es requerido.' }));
        }
        if (!numDocumento) {
          setErrors((prevErrors) => ({ ...prevErrors, numDocumento: 'El carnet de indentidad es requerido.' }));
        }
      }

      if ((nombre && direccion && telefono && numDocumento)) {
        if (isCreating == true) {
          onSubmit(formData);
        } else {
          onSubmit(updatedFormData);
        }
      }
    }
  };

  useEffect(() => {
    if (client) {
      setFormData(client);
    }
  }, []);

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
          label="Direccion"
          id="direccion"
          placeholder="Ingresa direccion"
          value={formData.direccion}
          onChange={handleChange}
          icon={RiHome2Line}
          error={errors.direccion}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="Telefono"
          id="telefono"
          placeholder="Ingresa telefono del articulo"
          value={formData.telefono}
          onChange={handleChange}
          icon={RiPhoneFindLine}
          error={errors.telefono}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="Carnet de identidad"
          id="numDocumento"
          placeholder="Ingresa el carnet de indentidad"
          value={formData.numDocumento}
          onChange={handleChange}
          icon={RiIndeterminateCircleLine}
          error={errors.numDocumento}
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

export default ClientForm;