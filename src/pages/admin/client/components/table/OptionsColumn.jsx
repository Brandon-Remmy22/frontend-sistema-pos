import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import ModalForm from '../../../../../components/ui/ModalForm';
import DialogDelete from '../../../../../components/ui/DialogDelete';
import { AlertContext } from '../../../../../contexts/AlertContext';
import { deleteClient, updateClient } from '../../../../../services/client/clientService';
import ClientForm from '../ClientForm';

import {
  RiMore2Fill,
  RiUserLine,
  RiEdit2Line,
  RiDeleteBin6Line,
  RiUserUnfollowLine,
  RiImageAddFill,
} from 'react-icons/ri';


const OptionsColumn = ({ client, updateClients }) => {


  const dispatch = useDispatch();

  const [isOpenDialogEdit, setDialogDelete] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { showAlert } = useContext(AlertContext);
  const [action, setAction] = useState('');
  // Efecto para limpiar los errores del formulario al cerrar el modal
  const actionFunctions = {
    eliminar: async () => {
      try {
        await deleteClient(client.id);
        showAlert('cliente eliminado correctamente', 'success');
        updateClients();
        setDialogDelete(false);
      } catch (error) {
        showAlert('Error al eliminar la cliente', 'error');
      }
    },
    editar: async (formData) => {
      try {
        // Obtener los datos del formulario
        const { nombre, id } = formData;
        await updateClient(formData, id);
        updateClients();
        showAlert('cliente actualizada correctamente', 'success');
        setFormErrors({});
        setIsOpenModal(false);
      } catch (error) {
        showAlert('Error al actualizar cliente', 'error');
      }
    },
  };

  // Función para eliminar un empleado
  const handleCancelEdit = () => {
    setFormErrors({});
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setDialogDelete(false);
  };

  const handleEditClick = () => {
    setIsOpenModal(true);
  };

  const handleImageClick = () => {
    setIsOpenImageModal(true);
  };

  const handleConfirmEdit = (formData) => {
    // actionFunctions.editar(formData);
  };

  const handleConfirm = async (client) => {
    await actionFunctions.eliminar(client);
    console.log("eliominare",client);
  };

  const handleActionClick = (actionType) => {
    setDialogDelete(true);
    // setAction(actionType);
  };
  return (
    <>
      {/* <Menu
        menuButton={
          <MenuButton className="flex items-center justify-center w-8 h-8 hover:bg-gray-300 rounded-lg transition-colors">
            <RiMore2Fill className="text-gray-400" />
          </MenuButton>
        }
        align="end"
        arrow
        // arrowClassName="bg-gray-300"
        transition
        menuClassName="bg-gray-300 p-1 rounded-lg shadow-lg"
      >
        <div className="scroll-editado h-auto">
          <MenuItem className="p-0 hover:bg-transparent" onClick={handleEditClick}>
            <button className="w-full rounded-lg transition-colors text-base hover:bg-teal-50 flex items-center gap-x-2 p-2">
              <RiEdit2Line className="text-green-500" />
              <span className="truncate">Editar</span>
            </button>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent" onClick={() => handleActionClick('eliminar')}>
            <button className="w-full rounded-lg transition-colors text-base hover:bg-teal-50 flex items-center gap-x-2 p-2" >
              <RiDeleteBin6Line className="text-red-500" />
              <span className="truncate">Eliminar</span>
            </button>
          </MenuItem>
        </div>
      </Menu> */}
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none   data-[focus]:outline-1 data-[focus]:outline-white">
         <RiMore2Fill size={18} className='font-bold text-gray-500' />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 bg-yellow-800 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem className="">
            <button onClick={handleEditClick} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">

              Editar
              
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={() => handleActionClick('eliminar')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">

              Eliminar
              
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />


        </MenuItems>
      </Menu>
      <DialogDelete
        user={client}
        isOpen={isOpenDialogEdit}
        setIsOpen={setDialogDelete}
        title="Eliminar cliente"
        description={
          `¿Está seguro que desea eliminar el cliente ${client.nombre}? Esta acción es permanente y no se podrá deshacer. Todos los datos se eliminarán.`
        }
        confirmButtonText={`Sí, eliminar cliente`}
        cancelButtonText="Cancelar"
        onConfirm={() => handleConfirm(client)}
        onCancel={handleCancel}
        confirmButtonColor={'bg-yellow-700'}
        cancelButtonColor="border-gray-400"
        icon={
          <RiDeleteBin6Line className="w-10 h-10 flex items-center justify-center rounded-full text-red-500" />
        }
      />
      <ModalForm
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title="Editar cliente"
        icon={<RiEdit2Line className="w-6 h-6 flex items-center justify-center rounded-full text-blue-500" />}
      >
        <ClientForm
          user={client}
          isEditing={true}
          onSubmit={handleConfirmEdit}
          onCancel={handleCancelEdit}
          formErrors={formErrors}
        /> 
      </ModalForm>

    </>
  );
};

export default OptionsColumn;
