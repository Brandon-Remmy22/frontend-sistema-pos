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


import ArticleForm from './components/ArticleForm';
import { getArticlesFetch, selectArticles } from '../../../redux/Article/ArticleSlice';
import { createArticle } from '../../../services/article/articleService';

import { AlertContext } from '../../../contexts/AlertContext';
import ArticleTable from './components/table/ArticleTable';
import { useAuth } from '../../../hooks/useAuth';



const ArticleIndex = () => {

    const dispatch = useDispatch();
    const [showTable, setShowTable] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { showAlert } = useContext(AlertContext);
    const { userRole } = useAuth();



    const articles = useSelector(selectArticles);
    const status = useSelector((state) => state.article.status);


    useEffect(() => {
        dispatch(getArticlesFetch());
    }, [dispatch]);

    const memoizedClients = useMemo(() => articles, [articles]);

    useEffect(() => {
        if (status === 'succeeded') {
            setShowTable(true);
        }
    }, [status, articles]);

    const handleOpenCreateModal = () => {
        setIsOpenCreateModal(true);
        setFormErrors({});
    };

    const handleCreateArticle = async (formData) => {
        try {
            await createArticle(formData);
            showAlert('Producto creado correctamente', 'success');
            setIsOpenCreateModal(false);
            setFormErrors({});
            dispatch(getArticlesFetch());
        } catch (error) {
            showAlert('Error al crear Producto', 'error');
        }
    }

    return (
        <>
            <CardHeader className="rounded-md mt-0 p-5 shadow-md">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="font-semibold">
                            Productos
                        </Typography>


                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        {userRole === '1' && (<>                                                <Button
                            className="flex items-center gap-3 bg-yellow-800 text-white hover:bg-yellow-900 transition-colors rounded-xl py-2 px-5"
                            size="sm"
                            onClick={handleOpenCreateModal}
                        >
                            <RiAddLargeFill className="h-5 w-5" />
                            <span className="font-semibold">Nuevo Producto</span>
                        </Button></>)}



                    </div>
                </div>
                <div>
                    {showTable ? (
                        <ArticleTable articles={articles} />
                    ) : (
                        <div>no existe tabla</div>
                    )}
                </div>
                <ModalForm
                    isOpen={isOpenCreateModal}
                    setIsOpen={setIsOpenCreateModal}
                    title="Crear nuevo Producto"
                    icon={<RiUser3Fill className="w-6 h-6 flex items-center justify-center rounded-full text-gray-50" />}
                    maxWidth='max-w-md'
                >
                    <ArticleForm
                        isEditing={false}
                        onSubmit={handleCreateArticle}
                        onCancel={() => setIsOpenCreateModal(false)}
                        formErrors={formErrors}
                    />
                </ModalForm>
            </CardHeader>

        </>
    );
}

export default ArticleIndex;