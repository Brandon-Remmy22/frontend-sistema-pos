import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";

//import  { getInventoriesFetch, selectInventories, } from '../../../../redux/Articles/ArticleSlice';
// import { addSale } from '../../../../redux/Sales/SaleSlice';
import { addSale } from '../../../../redux/Sale/SaleSlice';
import { getArticlesFetch, selectArticles } from '../../../../redux/Article/ArticleSlice';
import ArticleTable from './table/ArticleTable';
import DialogInfo from '../../../../components/ui/DialogInfo';
const TABLE_HEAD = ["#", "Nombre", "barra", ""];


const FilterArticle = () => {

    const dispatch = useDispatch();
    const [isOpenDialogInfo, setDialogInfo] = useState(false);
    const articles = useSelector(selectArticles);
    const status = useSelector((state) => state.article.status);
    const error = useSelector((state) => state.article.error);


    const [TABLE_ROWS, setTABLE_ROWS] = useState([]);


    useEffect(() => {
        dispatch(getArticlesFetch());
    }, [dispatch]);

    const memoizedEmployees = useMemo(() => articles, [articles]);

    useEffect(() => {
        if (status === 'succeeded') {
            setTABLE_ROWS(memoizedEmployees);
        }
    }, [status, articles]);


    const addArticleShoppingCart = (article) => {

        if (article.stock == 0) {
            setDialogInfo(true);
        } else {
            dispatch(addSale({ cantidad: 1, importe: 1 * parseFloat(article.precio), ...article }));
        }


    };

    const handleClose = () => {
        setDialogInfo(false);
    }
    return (
        <>
            <div className=" ">


                <ArticleTable articles={TABLE_ROWS} addArticle={addArticleShoppingCart}></ArticleTable>


                <DialogInfo
                    isOpen={isOpenDialogInfo}
                    setIsOpen={setDialogInfo}
                    title={'INVENTARIO VACIO'}
                    description={'TU STOCK ESTA VACIO'}
                    cancelButtonText="CERRAR"
                    onCancel={handleClose}
                />
            </div>
        </>
    );
}

export default FilterArticle;