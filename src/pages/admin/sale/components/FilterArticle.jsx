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
import { RiAddCircleLine } from 'react-icons/ri';
const TABLE_HEAD = ["#", "Nombre", "barra", ""];


const FilterArticle = () => {

    const dispatch = useDispatch();
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
        dispatch(addSale({cantidad:1, importe : 1*parseFloat(article.precio),...article}));
    };
    return (
        <>
            <div className=" ">


                <ArticleTable articles={TABLE_ROWS} addArticle={addArticleShoppingCart}></ArticleTable>


            </div>
        </>
    );
}

export default FilterArticle;