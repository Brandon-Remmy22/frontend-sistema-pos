import react, { useState, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiGalleryView2, RiPushpinFill, RiListView, RiDeleteBack2Fill, RiEdit2Fill, RiAddLargeFill, RiUser3Fill, RiFilePdf2Line } from "react-icons/ri";
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


import { getSalesFetch, selectSales, selectSalesReport, updateSalesFilter } from '../../../redux/Sale/SaleSlice';
import { getProductsSalesBetter, getSalesForCategory } from '../../../services/sale/saleService';
import { AlertContext } from '../../../contexts/AlertContext';
// import ClientTable from './components/table/ClientTable';
import SaleTable from './components/table/SaleTable';
import { Link } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import DetailsSaleGeneral from './components/reports/DetailsSaleGeneral';
import DetailsSalesBetter from './components/reports/DetailsSalesBetter';
import { useAuth } from '../../../hooks/useAuth';
import DetailsClientsBetter from './components/reports/DetailsClientsBetter';
import { selectEndDate, selectStartDate } from '../../../redux/Sale/SaleSlice';
import { getArticlesFetch, selectArticles } from '../../../redux/Article/ArticleSlice';
import { getArticles } from '../../../services/article/articleService';
import DetailsIventory from './components/reports/DetailsInventory';
import DetailsSalesNull from './components/reports/DetailsSalesNull';
import DetailsForCategory from './components/reports/DetailsForCategory';
const SaleIndex = () => {

    const dispatch = useDispatch();
    const [showTable, setShowTable] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { showAlert } = useContext(AlertContext);
    const { userRole } = useAuth();

    const articles = useSelector(selectArticles);
    const sales = useSelector(selectSales);
    const filteredSales = useSelector(selectSalesReport);
    const status = useSelector((state) => state.sale.status);

    const start = useSelector(selectStartDate);
    const end = useSelector(selectEndDate);

    useEffect(() => {
        dispatch(getSalesFetch());
    }, [dispatch]);

    const memoizedClients = useMemo(() => sales, [sales]);

    useEffect(() => {
        if (status === 'succeeded') {
            setShowTable(true);
            dispatch(updateSalesFilter(sales));
            // console.log(sales);
        }
    }, [status, sales]);

    const handleOpenCreateModal = () => {
        setIsOpenCreateModal(true);
        setFormErrors({});
    };

    const getProductsSales = async () => {
        try {
            const data = await getProductsSalesBetter();
            const top5Ventas = data.ventas
                .sort((a, b) => parseFloat(b.cantidad) - parseFloat(a.cantidad)) // Ordenar de mayor a menor
                .slice(0, 5);
            const blob = await pdf(<DetailsSalesBetter sales={top5Ventas} />).toBlob();
            const url = URL.createObjectURL(blob);

            window.open(url);

        } catch (error) {
            showAlert('Error al obtenre mejores ventas', 'error');
        }
    }

    const detailsSaleGeneral = async () => {
        const blob = await pdf(<DetailsSaleGeneral sales={filteredSales} start={start} end={end} />).toBlob();
        const url = URL.createObjectURL(blob);
        // Abre el PDF en una nueva ventana o pestaña
        window.open(url);
    };

    const detailsClientsBetter = async () => {

        const blob = await pdf(<DetailsClientsBetter sales={filteredSales} start={start} end={end} />).toBlob();
        const url = URL.createObjectURL(blob);
        // Abre el PDF en una nueva ventana o pestaña
        window.open(url);
    };

    const detailsInventory = async () => {
        const data = await getArticles();
        const blob = await pdf(<DetailsIventory sales={data.productos}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
    };


    
    const detailsSalesNull = async () => {
        const blob = await pdf(<DetailsSalesNull sales={filteredSales} start={start} end={end}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    const detailsSalesForCategory = async () => {
        const data = await getSalesForCategory();
        const blob = await pdf(<DetailsForCategory sales={data}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    const detailsSalesBetter = async () => {
        getProductsSales();
    };

    return (
        <>
            <CardHeader className="rounded-md mt-0 p-5 shadow-md">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="font-semibold">
                            Ventas
                        </Typography>


                    </div>
                    <div className='flex gap-3'>
                        {userRole === '1' && (<>
                            <button onClick={detailsSaleGeneral} className='flex text-sm className="flex items-center gap-3 bg-green-800 text-white hover:bg-green-900 transition-colors rounded-xl py-1 px-2'>
                                <RiFilePdf2Line size={15} /> REPORTE GENERAL
                            </button>
                            <button onClick={detailsSalesBetter} className='flex text-sm className="flex items-center gap-3 bg-green-800 text-white hover:bg-green-900 transition-colors rounded-xl py-1 px-2'>
                                <RiFilePdf2Line size={15} /> MÁS VENDIDOS
                            </button>
                            <button onClick={detailsClientsBetter} className='flex text-sm className="flex items-center gap-3 bg-green-800 text-white hover:bg-green-900 transition-colors rounded-xl py-1 px-2'>
                                <RiFilePdf2Line size={15} /> MEJORES CLIENTES
                            </button>
                            <button onClick={detailsInventory} className='flex text-sm className="flex items-center gap-3 bg-green-800 text-white hover:bg-green-900 transition-colors rounded-xl py-1 px-2'>
                                <RiFilePdf2Line size={15} /> INVENTARIO
                            </button>
                            <button onClick={detailsSalesNull} className='flex text-sm className="flex items-center gap-3 bg-green-800 text-white hover:bg-green-900 transition-colors rounded-xl py-1 px-2'>
                                <RiFilePdf2Line size={15} /> VENTAS ANULADAS
                            </button>
                            <button onClick={detailsSalesForCategory} className='flex text-sm className="flex items-center gap-3 bg-green-800 text-white hover:bg-green-900 transition-colors rounded-xl py-1 px-2'>
                                <RiFilePdf2Line size={15} /> VENTAS POR CATEGORIA
                            </button>
                        </>)}

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