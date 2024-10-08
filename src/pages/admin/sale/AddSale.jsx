import react, { useState, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiGalleryView2, RiPushpinFill, RiListView, RiDeleteBack2Fill, RiEdit2Fill, RiUser3Line } from "react-icons/ri";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";



import { AlertContext } from '../../../contexts/AlertContext';
import ShooppingCart from './components/ShoppingCart';
import FilterArticle from './components/FilterArticle';
import CustomSelect from '../../../components/ui/Select';

import { getClientsFetch, selectClients, selectedClientRedux } from '../../../redux/Client/ClientSlice';


const AddSale = () => {

    const dispatch = useDispatch();
    const [showList, setShowList] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { showAlert } = useContext(AlertContext);
    const [options, setOptions] = useState([]);

    const clients = useSelector(selectClients);
    const status = useSelector((state) => state.client.status);

    const handleClientChange = (option) => {
        
        setSelectedClient(option);
        dispatch(selectedClientRedux(option));
    };

    useEffect(() => {
        dispatch(getClientsFetch());
    }, [dispatch]);

    const memoizedClients = useMemo(() => clients, [clients]);

    useEffect(() => {
        if (status === 'succeeded') {
            setOptions(clients);
        }
    }, [status, clients]);

    return (
        <Card className='min-h-[calc(100vh-12vh)] flex flex-col  rounded-md p-5 shadow-md '>
            <div>
                <CustomSelect
                    label="Elegir cliente"
                    options={options}
                    value={selectedClient}
                    onChange={handleClientChange}
                    placeholder="Selecciona un cliente"
                    // error={errors.employee_id}
                    // isSearchable={true}
                    labelKey='nombre'
                />
                <div className="mb-2 mt-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="font-semibold">
                            Elegir producto
                        </Typography>
                    </div>
                </div>
                {showList ? (
                    <div className="container mx-auto ">
                        <div className="grid grid-cols-1  md:grid-cols-2 sm:grid-cols-1">
                            <div className="col-span-1 ">
                                <FilterArticle></FilterArticle>
                            </div>
                            <div className="col-span-1  ">
                                <h5 className="ms-1 text-center">CARRITO</h5>
                                <ShooppingCart></ShooppingCart>
                            </div>
                        </div>
                    </div>


                ) : (
                    <div>no existe tabla</div>
                )}

            </div>

        </Card>
    );
}

export default AddSale;