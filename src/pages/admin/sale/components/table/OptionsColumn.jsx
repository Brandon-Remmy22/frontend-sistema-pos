import React, { useState, useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import ModalForm from '../../../../../components/ui/ModalForm';
import DialogDelete from '../../../../../components/ui/DialogDelete';
import { AlertContext } from '../../../../../contexts/AlertContext';
import { deleteClient, updateClient } from '../../../../../services/client/clientService';
import { deleteSale } from '../../../../../services/sale/saleService';
import DetailSale from './DetailsSale';

import {
  RiMore2Fill,
  RiUserLine,
  RiEdit2Line,
  RiDeleteBin6Line,
  RiUserUnfollowLine,
  RiImageAddFill,
  RiInformation2Line,
  RiForwardEndMiniFill,
  RiCloseLine,
} from 'react-icons/ri';

import { pdf } from '@react-pdf/renderer'
import DetailsSalePdf from '../reports/DetailsSalePdf';

const OptionsColumn = ({ client, updateClients }) => {


  const dispatch = useDispatch();
  const referencia = useRef(null);

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
        await deleteSale(client.id);
        showAlert('venta anulado correctamente', 'success');
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

  const openPDFInNewWindow = async () => {
    console.log(client);
    const blob = await pdf(<DetailsSalePdf client={client} />).toBlob();
    const url = URL.createObjectURL(blob);

    // Abre el PDF en una nueva ventana o pestaña
    window.open(url);
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
          <MenuItem>
            <button onClick={openPDFInNewWindow} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Descargar PDF
            </button>
          </MenuItem>

          <MenuItem>
            <button onClick={handleActionClick} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Anular Venta
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <DialogDelete
        user={client}
        isOpen={isOpenDialogEdit}
        setIsOpen={setDialogDelete}
        title="Anular venta"
        description={
          `¿Está seguro que desea anular la venta? Esta acción es permanente y no se podrá deshacer.`
        }
        confirmButtonText={`Sí, anular venta`}
        cancelButtonText="Cancelar"
        onConfirm={() => handleConfirm(client)}
        onCancel={handleCancel}
        confirmButtonColor={'bg-yellow-700'}
        cancelButtonColor="border-gray-400"
        icon={
          <RiCloseLine className="w-10 h-10 flex items-center justify-center rounded-full text-red-500" />
        }
      />
      <ModalForm
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title="Información de la venta"
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
