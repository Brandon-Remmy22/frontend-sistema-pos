import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiPushpinLine, RiMailLine, RiUser3Fill, RiHome2Line, RiPhoneFindLine, RiIndeterminateCircleLine, RiUser2Line } from 'react-icons/ri';



const DetailSale = ({
    products
}) => {

    const [formData, setFormData] = useState(null);

    return (
        <div className='text-center'>
            <div className="grid grid-cols-4 bg-gray-100 py-4 gap-4">
                <div>ARTICULO</div>
                <div>CANTIDAD</div>
                <div>PRECIO</div>
                <div>IMPORTE</div>
            </div>
            {products.map((product) => (
                <div className="grid grid-cols-4 gap-5 my-4" key={product.precio + Math.random(123)}>
                    <div>{product.nombre_producto}</div>
                    <div>{product.cantidad}</div>
                    <div>Bs {product.precio}</div>
                    <div>Bs {product.importe}</div>
                </div>
            ))}
        </div>
    );
};

export default DetailSale;