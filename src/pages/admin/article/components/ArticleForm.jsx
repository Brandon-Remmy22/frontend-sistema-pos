import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../components/ui/Input';
import { RiPushpinLine, RiMailLine, RiUser3Fill, RiHome2Line, RiPhoneFindLine, RiIndeterminateCircleLine, RiUser2Line, RiFileTextLine, RiFontSize2, RiColorFilterLine, RiPriceTag3Line, RiStockLine, RiParagraph } from 'react-icons/ri';
import { validateName, validateNameWithNumbers, validateOnlyNumbers } from '../../../../utils/validations';
import CustomSelect from '../../../../components/ui/Select';
import { getClientsFetch, selectClients } from '../../../../redux/Client/ClientSlice';
import { getCategories } from '../../../../services/category/categoryService';

import axios from 'axios';

// Componente para el formulario de creación y edición de usuarios
const ArticleForm = ({
  article,               // Usuario a editar
  isEditing,          // Indica si se está editando un usuario
  onSubmit,           // Función para enviar el formulario
  onCancel,           // Función para cancelar la edición
  confirmButtonText = isEditing ? 'Guardar cambios' : 'Crear producto',  // Texto del botón de confirmación
  cancelButtonText = 'Cancelar',         // Texto del botón de cancelación
  confirmButtonColor = 'bg-yellow-700',    // Color del botón de confirmación
  cancelButtonColor = 'border-gray-400', // Color del botón de cancelación
  formErrors = {}      // Errores del formulario
}) => {


  // const status = useSelector((state) => state.category.status);
  const [errors, setErrors] = useState({ nombre: '', descripcion: '', precio: '', talla: '', sexo: '', color: '', stock: '', codigo: '', img: '', categoria: '' });
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: '', talla: '', sexo: '', color: '', stock: '', codigo: '', img: '', categoria: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sexo, setSexo] = useState([
    {
      label: 'VARON', value: { value: 1 }
    },
    {
      label: 'MUJER', value: { value: 2 }
    }
  ]);
  const [selectedSexo, setSelectedSexo] = useState(null);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const clients = useSelector(selectClients);
  const status = useSelector((state) => state.client.status);
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
    if (name === 'descripcion') {
      const ciError = validateNameWithNumbers(value);
      if (ciError) {
        error = ciError;
      } else {
        error = '';
      }
    }
    if (name === 'color') {
      const ciError = validateName(value);
      if (ciError) {
        error = ciError;
      } else {
        error = '';
      }
    }
    if (name === 'talla') {
      const ciError = validateOnlyNumbers(value);
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


  const actionFunctions = {
    getCategories: async () => {
      const response = await getCategories();
      setCategories(response.categorias);
    }
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Función para enviar el formulario
  const handleSubmit = (e) => {
    // Evitar que el formulario recargue la página
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (!hasErrors) {
      const updatedFormData = { ...formData };
      const { nombre, descripcion, precio, stock, talla, color, sexo, categoria } = updatedFormData;
      const isCreating = !isEditing; // Determinar si se está creando un nuevo usuario

      if (isCreating) {
        // Validaciones para crear un nuevo usuario
        if (!nombre) {
          setErrors((prevErrors) => ({ ...prevErrors, nombre: 'El nombre es requerido.' }));
        }
        if (!descripcion) {
          setErrors((prevErrors) => ({ ...prevErrors, descripcion: 'La descripcion es requerida.' }));
        }
        if (!precio) {
          setErrors((prevErrors) => ({ ...prevErrors, precio: 'El precio es requerido.' }));
        }
        if (!talla) {
          setErrors((prevErrors) => ({ ...prevErrors, talla: 'La talla es requerida.' }));
        }
        if (!color) {
          setErrors((prevErrors) => ({ ...prevErrors, color: 'El color es requerido.' }));
        }

        if (!stock) {
          setErrors((prevErrors) => ({ ...prevErrors, stock: 'El carnet de indentidad es requerido.' }));
        }
      }

      if ((nombre && descripcion && precio && stock && talla && color )) {
        if (isCreating == true) {


          console.log({ ...formData, img: selectedFile, id_categoria: selectedCategory.value.id, sexo: selectedSexo.label, codigo: "50" });

          onSubmit({ ...formData, img: selectedFile, id_categoria: selectedCategory.value.id, sexo: selectedSexo.label, codigo: "50" });
        } else {
          onSubmit({ ...updatedFormData, img: selectedFile, id_categoria: selectedCategory.value.id, sexo: selectedSexo.label, codigo: "50"  });
        }
      }
    }
  };

  useEffect(() => {
    if (article) {
      setSelectedCategory({
        label: article.categoria_nombre, value: { value: parseInt(article.id_categoria) }
      });
      setSelectedSexo({
        label: article.sexo 
      });
      setFormData(article);
      setSelectedFile(article.img);
    }
  }, []);

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('img', file);

    axios.post('http://localhost:8080/api/subir-imagen', formData)
      .then(response => {
        setSelectedFile(response.data.img);
      })
      .catch(error => {
        setSelectedFile(null);
      });
  };

  useEffect(() => {
    actionFunctions.getCategories();
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleCategoryChange = (option) => {
    setSelectedCategory(option);

  };

  const handleSexohange = (option) => {
    setSelectedSexo(option);

  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-2'>
        <Input
          label="Nombre"
          id="nombre"
          placeholder="Nombre del producto"
          value={formData.nombre}
          onChange={handleChange}
          icon={RiParagraph}
          error={errors.nombre}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="descripcion"
          id="descripcion"
          placeholder="Ingresa descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          icon={RiFileTextLine}
          error={errors.descripcion}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="talla"
          id="talla"
          type='number'
          placeholder="Ingresa talla"
          value={formData.talla}
          onChange={handleChange}
          icon={RiFontSize2}
          error={errors.talla}
        />
      </div>
      <div className='mt-2'>
        <CustomSelect
          label="Sexo"
          options={sexo}
          id='sexo'
          value={selectedSexo}
          onChange={handleSexohange}
          placeholder="Selecciona una sexo"
          isSearchable={true}
          labelKey='label'
          // error={errors.sexo}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="color"
          id="color"
          placeholder="Ingresa color"
          value={formData.color}
          onChange={handleChange}
          icon={RiColorFilterLine}
          error={errors.color}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="precio"
          id="precio"
          type='number'
          placeholder="Ingresa precio del articulo"
          value={formData.precio}
          onChange={handleChange}
          icon={RiPriceTag3Line}
          error={errors.precio}
        />
      </div>
      <div className='mt-2'>
        <Input
          label="stock"
          id="stock"
          type='number'
          placeholder="Ingresa el stock"
          value={formData.stock}
          onChange={handleChange}
          icon={RiStockLine}
          error={errors.stock}
        />
      </div>
      {/* <div className='mt-2'>
        <Input
          label="codigo de identidad"
          id="codigo"
          placeholder="Ingresa el codigo de indentidad"
          value={formData.codigo}
          onChange={handleChange}
          icon={RiIndeterminateCircleLine}
          error={errors.codigo}
        />
      </div> */}
      <div className='mt-2'>
        <CustomSelect
          label="Categoria"
          options={categories}
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Selecciona una categoria"
          isSearchable={true}
          labelKey='nombre'
        />
      </div>
      <div className='mt-2'>
        <div
          id="FileUpload"
          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          onDrop={handleDrop}
          onDragOver={handleDragOver}

        >
          <input
            type="file" name='file' accept="image/jpeg, image/png"
            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                  fill="#3C50E0"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                  fill="#3C50E0"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                  fill="#3C50E0"
                />
              </svg>
            </span>
            <p className='text-center'>
              <span className="text-primary">Haz Click para subir una imagen o arrastra una imagen</span>
            </p>
            {/* <p className="mt-1.5">Solo formato jpg y png</p>
            <p>(2mb maximo)</p> */}
          </div>
        </div>

        <div className='flex justify-center'>
          {selectedFile ? (
            <img
              src={`http://localhost:8080/uploads/${selectedFile}`}
              alt="img"
              className="w-16 h-16 object-cover rounded"
            />) : (
            <div>sin imagen </div>
          )}
        </div>
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