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
import CategoryForm from './components/CategoryForm';

// import { getClientsFetch, selectClients } from '../../../redux/Client/ClientSlice';
import { getCategories, getCategorie, createCategory } from '../../../services/category/categoryService';
// import { createClient } from '../../../services/client/clientService';

import { AlertContext } from '../../../contexts/AlertContext';
import CategoryTable from './components/table/CategoryTable';
import { Link } from 'react-router-dom';



const CategoryIndex = () => {

    const dispatch = useDispatch();
    const [showTable, setShowTable] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { showAlert } = useContext(AlertContext);
    const [categories, setCategories] = useState([]);

    const actionFunctions = {
        getCategories: async () => {
            try {
                const response = await getCategories();
                setCategories(response.categorias);
                setShowTable(true);
            } catch (error) {
                showAlert('Error al eliminar la Categoria', 'error');
            }
        }
    };



    // const status = useSelector((state) => state.client.status);


    useEffect(() => {
        actionFunctions.getCategories();
    }, []);

    // const memoizedClients = useMemo(() => clients, [clients]);

    // useEffect(() => {
    //     if (status === 'succeeded') {
    //         setShowTable(true);
    //     }
    // }, [status, clients]);

    const handleOpenCreateModal = () => {
        setIsOpenCreateModal(true);
        setFormErrors({});
    };

    const handleCreateClient = async (formData) => {
        try {
            console.log(formData);
            await createCategory(formData);
            showAlert('Categoria creado correctamente', 'success');
            setIsOpenCreateModal(false);
            setFormErrors({});
            actionFunctions.getCategories();
        } catch (error) {
            showAlert('Error al crear Categoria', 'error');
        }
    }

    return (
        <>
            <CardHeader className="rounded-md mt-0 p-5 shadow-md">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="font-semibold">
                            Categorias
                        </Typography>


                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button
                            className="flex items-center gap-3 bg-yellow-800 text-white hover:bg-yellow-900 transition-colors rounded-xl py-2 px-5"
                            size="sm"
                            onClick={handleOpenCreateModal}
                        >
                            <RiAddLargeFill className="h-5 w-5" />
                            <span className="font-semibold">Nueva Categoria</span>
                        </Button>

                    </div>
                </div>
                <div>
                    {showTable ? (
                        <CategoryTable categories={categories} />
                    ) : (
                        <div>no existe tabla</div>
                    )}
                </div>
                <ModalForm
                    isOpen={isOpenCreateModal}
                    setIsOpen={setIsOpenCreateModal}
                    title="Crear nueva Categoria"
                    icon={<RiUser3Fill className="w-6 h-6 flex items-center justify-center rounded-full text-gray-50" />}
                    maxWidth='max-w-md'
                >
                    <CategoryForm
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

export default CategoryIndex;