import react, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { RiGalleryView2, RiPushpinFill, RiListView, RiDeleteBack2Fill, RiEdit2Fill } from "react-icons/ri";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";



import { AlertContext } from '../../../contexts/AlertContext';

import { Link } from 'react-router-dom';



const UserIndex = () => {

    const dispatch = useDispatch();
    const [showList, setShowList] = useState(true);
    const [formErrors, setFormErrors] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { showAlert } = useContext(AlertContext);


    return (
        <>
            <CardHeader floated={false} shadow={false} className="rounded-none mt-0">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="font-semibold">
                            Usuarios
                        </Typography>
                        <Typography color="gray" className="mt-1">
                          Aqui visualisaremos a todos nuestros usuarios
                        </Typography>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                            <Link
                                to="/new-sale"
                                className="flex text-secondary-100 items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-black transition-colors"
                            >
                                <RiPushpinFill className="h-5 w-5" />
                                <span className="font-semibold">Nueva venta</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">


                    </div>
                </div>
            </CardHeader>

        </>
    );
}

export default UserIndex;