import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../components/ui/Input';
import { RiPushpinLine, RiMailLine } from 'react-icons/ri';
import { validateName } from '../../../../utils/validations';



// Componente para el formulario de creación y edición de usuarios
const ArticleForm = ({
    sale,               // Usuario a editar
    isEditing,          // Indica si se está editando un usuario
    onSubmit,           // Función para enviar el formulario
    onCancel,           // Función para cancelar la edición
    confirmButtonText = isEditing ? 'Guardar cambios' : 'Crear articulo',  // Texto del botón de confirmación
    cancelButtonText = 'Cancelar',         // Texto del botón de cancelación
    confirmButtonColor = 'bg-yellow-700',    // Color del botón de confirmación
    cancelButtonColor = 'border-gray-400', // Color del botón de cancelación
    formErrors = {}      // Errores del formulario
}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        cantidad: '',
        venta: '',
        precio: '',
        importe: ''
    });
    const [errors, setErrors] = useState({ nombre: '' });

    useEffect(() => {
        if (isEditing && sale) {
            setFormData(sale);
        }
    }, [isEditing, sale]);


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

        if (name == "cantidad") {
            if (value > 0 && value <= parseFloat(sale.stock)) {
                console.log(sale);
                setFormData({ ...formData, [name]: value });
            }
            console.log("vamo a revisar cantidad");
        } else {
            setErrors({ ...errors, [name]: error });
            setFormData({ ...formData, [name]: value });
        }


    };

    const handleSubmit = (e) => {
        // Evitar que el formulario recargue la página
        e.preventDefault();
        const hasErrors = Object.values(errors).some((error) => error !== '');
        if (!hasErrors) {
            if (!nombre) {
                setErrors((prevErrors) => ({ ...prevErrors, nombre: 'El nombre es requerido.' }));
            }
            if ((nombre)) {
                 setFormData({ ...formData, cantidad: parseInt(formData.cantidad) });
                 onSubmit(formData);
            }

        }

    };



    return (
        <form onSubmit={handleSubmit}>
            <div className='mt-2'>
                <Input
                    label="Nombre del articulo"
                    id="nombre"
                    placeholder="Ingresa nombre del articulo"
                    value={formData.nombre}
                    onChange={handleChange}
                    icon={RiPushpinLine}
                    error={errors.nombre}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label="Precio"
                    id="precio"
                    type='number'
                    enable="true"
                    placeholder="Ingresa precio del articulo"
                    value={formData.precio}
                    onChange={handleChange}
                    icon={RiPushpinLine}
                    disabled={true}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label="Nombre del cantidad"
                    id="cantidad"
                    type='number'
                    placeholder="Ingresa cantidad del articulo"
                    value={formData.cantidad}
                    onChange={handleChange}
                    icon={RiPushpinLine}
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

export default ArticleForm;