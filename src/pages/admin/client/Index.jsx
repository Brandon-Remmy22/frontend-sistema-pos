import react, { useState, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiGalleryView2, RiPushpinFill, RiListView, RiDeleteBack2Fill, RiEdit2Fill, RiAddLargeFill, RiUser3Fill } from "react-icons/ri";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import ModalForm from '../../../components/ui/ModalForm';
import ClientForm from './components/ClientForm';

import { getClientsFetch, selectClients } from '../../../redux/Client/ClientSlice';
import { createClient } from '../../../services/client/clientService';

import { AlertContext } from '../../../contexts/AlertContext';
import ClientTable from './components/table/ClientTable';
import { Link } from 'react-router-dom';



const ClientIndex = () => {

    const dispatch = useDispatch();
    const [showTable, setShowTable] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { showAlert } = useContext(AlertContext);




    const clients = useSelector(selectClients);
    const status = useSelector((state) => state.client.status);


    useEffect(() => {
        dispatch(getClientsFetch());
    }, [dispatch]);

    const memoizedClients = useMemo(() => clients, [clients]);

    useEffect(() => {
        if (status === 'succeeded') {
            setShowTable(true);
        }
    }, [status, clients]);

    const handleOpenCreateModal = () => {
        setIsOpenCreateModal(true);
        setFormErrors({});
    };

    const handleCreateClient = async (formData) => {
        try {
            await createClient(formData);
            showAlert('Cliente creado correctamente', 'success');
            setIsOpenCreateModal(false);
            setFormErrors({});
            dispatch(getClientsFetch());
        } catch (error) {
            showAlert('Error al crear Cliente', 'error');
        }
    }

    return (
        <>
            <CardHeader className="rounded-md mt-0 p-5 shadow-md">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="font-semibold">
                            Clientes
                        </Typography>


                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button
                            className="flex items-center gap-3 bg-yellow-800 text-white hover:bg-yellow-900 transition-colors rounded-xl py-2 px-5"
                            size="sm"
                            onClick={handleOpenCreateModal}
                        >
                            <RiAddLargeFill className="h-5 w-5" />
                            <span className="font-semibold">Nuevo cliente</span>
                        </Button>

                    </div>
                </div>
                <div>
                    {showTable ? (
                        <ClientTable clients={clients} />
                    ) : (
                        <div>no existe tabla</div>
                    )}
                </div>
                <ModalForm
                    isOpen={isOpenCreateModal}
                    setIsOpen={setIsOpenCreateModal}
                    title="Crear nuevo cliente"
                    icon={<RiUser3Fill className="w-6 h-6 flex items-center justify-center rounded-full text-blue-500" />}
                    maxWidth='max-w-md'
                >
                    <ClientForm
                        isEditing={false}
                        onSubmit={handleCreateClient}
                        onCancel={() => setIsOpenCreateModal(false)}
                        formErrors={formErrors}
                    />
                </ModalForm>
            </CardHeader>

        </>
    );
}

export default ClientIndex;