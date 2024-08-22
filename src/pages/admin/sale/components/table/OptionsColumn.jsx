import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import ModalForm from '../../../../../components/ui/ModalForm';
import DialogDelete from '../../../../../components/ui/DialogDelete';
import { AlertContext } from '../../../../../contexts/AlertContext';
import { deleteClient, updateClient } from '../../../../../services/client/clientService';
import DetailSale from './DetailsSale';

import {
  RiMore2Fill,
  RiUserLine,
  RiEdit2Line,
  RiDeleteBin6Line,
  RiUserUnfollowLine,
  RiImageAddFill,
  RiInformation2Line,
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
        showAlert('venta eliminado correctamente', 'success');
        updateClients();
        setDialogDelete(false);
      } catch (error) {
        showAlert('Error al eliminar la venta', 'error');
      }
    },
    editar: async (formData) => {
      try {
        // Obtener los datos del formulario
        const { nombre, id } = formData;
        await updateClient(formData, id);
        updateClients();
        showAlert('venta actualizada correctamente', 'success');
        setFormErrors({});
        setIsOpenModal(false);
      } catch (error) {
        showAlert('Error al actualizar venta', 'error');
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
    actionFunctions.editar(formData);
  };

  const handleConfirm = async (client) => {
    await actionFunctions.eliminar(client);
  };

  const handleActionClick = (actionType) => {
    setDialogDelete(true);
    // setAction(actionType);
  };
  return (
    <>
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

              Ver detalles

            </button>
          </MenuItem>
          {/* <MenuItem>
            <button onClick={() => handleActionClick('eliminar')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">

              Eliminar

            </button>
          </MenuItem> */}
          <MenuItem>
            <button onClick={() => handleActionClick('eliminar')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">

              Descargar reporte

            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />


        </MenuItems>
      </Menu>
      <DialogDelete
        user={client}
        isOpen={isOpenDialogEdit}
        setIsOpen={setDialogDelete}
        title="Eliminar venta"
        description={
          `¿Está seguro que desea eliminar el venta ${client.nombre}? Esta acción es permanente y no se podrá deshacer. Todos los datos se eliminarán.`
        }
        confirmButtonText={`Sí, eliminar venta`}
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
        title="Información de venta"
        icon={<RiInformation2Line className="w-6 h-6 flex items-center justify-center rounded-full text-gray-50" />}
      >
        <DetailSale
          products={client.productos}
        />
      </ModalForm>

    </>
  );
};

export default OptionsColumn;
