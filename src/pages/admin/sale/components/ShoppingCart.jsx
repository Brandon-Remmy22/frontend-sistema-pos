import react, { useState, useEffect, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    RiMore2Fill, RiPushpinFill, RiEdit2Line,
    RiDeleteBin6Line, RiListView, RiDeleteBack2Fill, RiEdit2Fill,
    RiDeleteBin2Line
} from "react-icons/ri";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


import { selectSalesShooppingCart, updateSales, removeSale } from '../../../../redux/Sale/SaleSlice';
import { selectClient } from '../../../../redux/Client/ClientSlice';

import { AlertContext } from '../../../../contexts/AlertContext';
import ModalForm from '../../../../components/ui/ModalForm';
import ArticleForm from './ArticleForm';
import { createSale } from '../../../../services/sale/saleService';
const ShooppingCart = () => {

    const dispatch = useDispatch();
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [showList, setShowList] = useState(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userAuth')));
    const [formErrors, setFormErrors] = useState({});
    const [sale, setSale] = useState({});
    const { showAlert } = useContext(AlertContext);
    const sales = useSelector(selectSalesShooppingCart);
    const client = useSelector(selectClient);
    const [formData, setFormData] = useState({
        total: 0,
        tipo: 1,
        motivo: '',
        proveedor: 'PUBLICO GENERAL',
        carrito: []
    });



    const totalSales = useMemo(() => {
        return sales.reduce((total, item) => total + (parseFloat(item.precio) * parseFloat(item.cantidad)), 0);
    }, [sales]);

    const handleEditClick = (item) => {
        setSale(item);
        setIsOpenEditModal(true);
    };

    const handleConfirmEdit = (formData) => {
        dispatch(updateSales(formData));
        setIsOpenEditModal(false);
    }
    const handleCancelEdit = () => {
        setIsOpenEditModal(false);
    }

    const handleDeleteClick = (sale) => {
        dispatch(removeSale(sale));
    }


    const handleSaveClick = async (sales) => {

        const cantidades = sales.map(item => item.cantidad);
        const precios = sales.map(item => parseFloat(item.precio));
        const importes = sales.map(item => item.importe);
        const productos = sales.map(item => item.id);

        const data = {
            total: totalSales,
            descuento: '0',
            igv:'0',
            id_cliente: client? client.value.id : null,
            id_usuario: user.id,
            id_comprobante: 1,
            serie: "93784722",
            num_documento: "0000001",
            subtotal:"5467",
            cantidades,
            precios,
            importes,
            productos
        }
        try {
            await createSale(data);

            showAlert('venta creada correctamente', 'success');
            setIsOpenEditModal(false);
            window.location.reload()

        } catch (error) {
            showAlert('Error al crear venta', 'error');
        }
    }
    return (
        <>


            <div className='p-5 '>
                <div>
                    <div className='p-5 border border-yellow-600 rounded-3xl'>
                        <div className="grid grid-cols-6 bg-gray-100 py-4 px-3 gap-4">
                            <div>ARTICULO</div>
                            <div>CANTIDAD</div>
                            <div>PRECIO</div>
                            <div>IMPORTE</div>
                            <div>Imagen</div>
                            <div>OPCIONES</div>
                        </div>
                        {sales.map((sale) => (
                            <div className="grid grid-cols-6 gap-5 my-4" key={sale.id + Math.random(123)}>
                                <div>{sale.nombre}</div>
                                <div>{sale.cantidad}</div>
                                <div>{sale.precio}</div>
                                <div>{sale.importe}</div>
                                <div><img
                                    src={`http://localhost:8080/uploads/${sale.img}`}
                                    alt={sale.nombre}  // Texto alternativo usando el nombre del artículo
                                    className="w-16 h-16 object-cover rounded"
                                />  </div>
                                <div className='flex'>
                                    <button onClick={() => handleDeleteClick(sale)}><RiDeleteBin2Line color='red' size={20}></RiDeleteBin2Line></button>
                                    <button onClick={() => handleEditClick(sale)}><RiEdit2Fill color='coral' size={20}></RiEdit2Fill></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='text-center text-3xl flex mt-5'>
                        <div>TOTAL: <strong>{totalSales}</strong> (Bs)</div>

                        <div className='mx-5'>
                            <Button onClick={() => handleSaveClick(sales)} size="sm" variant="text" className="flex bg-green-200 text-center ">
                                GUARDAR VENTA
                            </Button>
                        </div>
                    </div>

                </div>

            </div>
            <ModalForm
                isOpen={isOpenEditModal}
                setIsOpen={setIsOpenEditModal}
                title="Editar venta"
                icon={<RiEdit2Line className="w-6 h-6 flex items-center justify-center rounded-full text-blue-500" />}
            >

                <ArticleForm
                    sale={sale}
                    isEditing={true}
                    onSubmit={handleConfirmEdit}
                    onCancel={handleCancelEdit}
                    formErrors={formErrors}
                />
            </ModalForm>
        </>
    );
}

export default ShooppingCart;