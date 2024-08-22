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
// import ClientForm from './components/ClientForm';


import { getSalesFetch, selectSales } from '../../../redux/Sale/SaleSlice';
import { createSale } from '../../../services/sale/saleService';
import { AlertContext } from '../../../contexts/AlertContext';
// import ClientTable from './components/table/ClientTable';
import SaleTable from './components/table/SaleTable';
import { Link } from 'react-router-dom';



const SaleIndex = () => {

    const dispatch = useDispatch();
    const [showTable, setShowTable] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { showAlert } = useContext(AlertContext);




    const sales = useSelector(selectSales);
    const status = useSelector((state) => state.sale.status);


    useEffect(() => {
        dispatch(getSalesFetch());
    }, [dispatch]);

    const memoizedClients = useMemo(() => sales, [sales]);

    useEffect(() => {
        if (status === 'succeeded') {
            setShowTable(true);
        }
    }, [status, sales]);

    const handleOpenCreateModal = () => {
        setIsOpenCreateModal(true);
        setFormErrors({});
    };

    const handleCreateClient = async (formData) => {
        try {
            await createSale(formData);
            showAlert('Venta creado correctamente', 'success');
            setIsOpenCreateModal(false);
            setFormErrors({});
            dispatch(getSalesFetch());
        } catch (error) {
            showAlert('Error al crear Venta', 'error');
        }
    }

    return (
        <>
            <CardHeader className="rounded-md mt-0 p-5 shadow-md">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="font-semibold">
                            Ventas
                        </Typography>


                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Link
                            to="/nueva-venta"
                             className="flex items-center gap-3 bg-yellow-800 text-white hover:bg-yellow-900 transition-colors rounded-xl py-2 px-5"
                            size="sm"
                        >
                            <RiPushpinFill className="h-5 w-5" />
                            <span className="font-semibold">Nueva venta</span>
                        </Link>

                    </div>
                </div>
                <div>
                    {showTable ? (
                        <SaleTable sales={sales} />
                    ) : (
                        <div>no existe tabla</div>
                    )}
                </div>
                <ModalForm
                    isOpen={isOpenCreateModal}
                    setIsOpen={setIsOpenCreateModal}
                    title="Crear nuevo Venta"
                    icon={<RiUser3Fill className="w-6 h-6 flex items-center justify-center rounded-full text-gray-50" />}
                    maxWidth='max-w-md'
                >
                    {/* <ClientForm
                        isEditing={false}
                        onSubmit={handleCreateClient}
                        onCancel={() => setIsOpenCreateModal(false)}
                        formErrors={formErrors}
                    /> */} foprmuarios de vetnas
                </ModalForm>
            </CardHeader>

        </>
    );
}

export default SaleIndex;