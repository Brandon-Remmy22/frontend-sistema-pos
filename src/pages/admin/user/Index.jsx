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
import UserForm from './components/UserForm';


import { selectUsers, getUsersFetch } from '../../../redux/User/userSlice';
import { createUser, createSell } from '../../../services/user/userService';

import { AlertContext } from '../../../contexts/AlertContext';
import UserTable from './components/table/UserTable';
import { Link } from 'react-router-dom';



const UserIndex = () => {

    const dispatch = useDispatch();
    const [showTable, setShowTable] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { showAlert } = useContext(AlertContext);




    const users = useSelector(selectUsers);
    const status = useSelector((state) => state.user.status);

    const actionFunctions = {
        createVendedor: async (formData) => {
            try {
                await createSell(formData);
                showAlert('Vendedor creado correctamente', 'success');
                dispatch(getUsersFetch());
                setIsOpenCreateModal(false);
            } catch (error) {
                showAlert('Error al crear vendedor', 'error');
            }
        },
        createUsuario: async (formData) => {
            try {
                await createUser(formData);
                dispatch(getUsersFetch());
                showAlert('Usuario creado correctamente', 'success');
                setFormErrors({});
                setIsOpenCreateModal(false);
            } catch (error) {
                showAlert('Error al crear usuario', 'error');
            }
        },
    };


    useEffect(() => {
        dispatch(getUsersFetch());
    }, [dispatch]);

    const memoizedUsers = useMemo(() => users, [users]);

    useEffect(() => {
        if (status === 'succeeded') {
            setShowTable(true);
        }
    }, [status, users]);

    const handleOpenCreateModal = () => {
        setIsOpenCreateModal(true);
        setFormErrors({});
    };

    const handleCreateUser = async (formData) => {
        try {
            if(formData.id_rol == 1){
                await actionFunctions.createUsuario(formData);
            }else{
                await actionFunctions.createVendedor(formData);
            }
            console.log(formData);
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
                            Usuarios
                        </Typography>


                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button
                            className="flex items-center gap-3 bg-yellow-800 text-white hover:bg-yellow-900 transition-colors rounded-xl py-2 px-5"
                            size="sm"
                            onClick={handleOpenCreateModal}
                        >
                            <RiAddLargeFill className="h-5 w-5" />
                            <span className="font-semibold">Nuevo usuario</span>
                        </Button>

                    </div>
                </div>
                <div>
                    {showTable ? (
                        <UserTable users={users} />

                    ) : (
                        <div>no existe tabla</div>
                    )}
                </div>
                <ModalForm
                    isOpen={isOpenCreateModal}
                    setIsOpen={setIsOpenCreateModal}
                    title="Crear nuevo usuario"
                    icon={<RiUser3Fill className="w-6 h-6 flex items-center justify-center rounded-full text-gray-50" />}
                    maxWidth='max-w-md'
                >
                    <UserForm
                        isEditing={false}
                        onSubmit={handleCreateUser}
                        onCancel={() => setIsOpenCreateModal(false)}
                        formErrors={formErrors}
                    />
                </ModalForm>
            </CardHeader>

        </>
    );
}

export default UserIndex;