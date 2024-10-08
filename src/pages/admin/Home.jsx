import React, { useState, useEffect, useMemo } from "react";
import { RiAddLargeFill, RiInformationLine, RiMoneyDollarCircleLine, RiUser3Fill } from "react-icons/ri";
import { getReports } from "../../services/sale/saleService";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { getProductsSalesBetter } from "../../services/sale/saleService";

const datas = [
  { name: "En", weight: 60 },
  { name: 'Feb', weight: 70 },
  { name: 'Mar', weight: 65 },
  { name: 'Abr', weight: 85 },
  { name: 'May', weight: 48 },
  { name: 'Jun', weight: 69 },
  { name: 'Jul', weight: 78 },
  { name: 'Ago', weight: 78 },
  { name: 'Sep', weight: 78 },
  { name: 'Oct', weight: 78 },
  { name: 'Nov', weight: 78 },
  { name: 'Dic', weight: 78 },
]

const Home = () => {
  const [user, setUser] = useState(localStorage.getItem('userAuth'));
  const [data, setData] = useState([]);
  const [reports, setReports] = useState({});
  const [ventasHoy, setVentasHoy] = useState(null);


  // const sdsd = useMemo(() => {

  //   if (ventasHoy.length  > 0) {
  //     console.log("entro a memo");
  //     return ventasHoy.reduce((total, item) => total + parseFloat(item.total_ventas), 0);
  //   }
  //   return []
  // }, [ventasHoy]);

  // useEffect(() => {
  //   if (ventasHoy) {
  //     console.log(ventasHoy[ventasHoy.length - 1].total_ventas);
  //   }
  // }, [ventasHoy]);



  const actionFuctions = {
    getReports: async () => {
      try {
        const response = await getReports();
        setReports(response);
        setVentasHoy(response.ventas_por_dia);

      } catch (error) {
        setReports({});
      }
    },
    getSalesBetter: async () => {
      try {
        const data = await getProductsSalesBetter();
        const ventasAgrupadas = data.ventas.reduce((acc, venta) => {
          const { producto_nombre, cantidad } = venta;

          // Si el nombre del producto ya existe en el acumulador, suma las cantidades
          if (acc[producto_nombre]) {
            acc[producto_nombre].cantidad += parseFloat(cantidad);
          } else {
            // Si no existe, agrega el producto con su cantidad inicial
            acc[producto_nombre] = { ...venta, cantidad: parseFloat(cantidad) };
          }

          return acc;
        }, {});

        // Convierte el objeto acumulado en un array y ordénalo de mayor a menor
        const top5Ventas = Object.values(ventasAgrupadas)
          .sort((a, b) => b.cantidad - a.cantidad) // Ordenar de mayor a menor
          .slice(0, 5); // Tomar los 5 primeros
        setData(top5Ventas);

      } catch (error) {
        setReports({});
      }
    }
  }

  useEffect(() => {
    actionFuctions.getReports();
    actionFuctions.getSalesBetter();
  }, []);


  if (!reports) {
    return null;
  }

  return (
    <CardHeader className="rounded-md mt-0 p-5 shadow-md">
      <div className="mb-2 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Reportes
          </Typography>


        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row items-center text-lg">
          <RiMoneyDollarCircleLine size={37} color="green" />
          <div>TOTAL PAGOS: <strong>{reports.total_ventas}</strong> Bs</div>

        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row items-center text-lg">
          <RiMoneyDollarCircleLine size={37} color="orange" />
          <div>TOTAL VENTAS HOY: <strong>{ventasHoy ? ventasHoy[ventasHoy.length - 1].total_ventas : 0}</strong>  Bs</div>

        </div>
      </div>
      <div className="grid grid-cols-5 ">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center border-b border-stroke dark:border-strokedark">
              {/* <h3 className="font-medium text-black text-lg dark:text-grey-100 mr-3">
                Pagos totales por mes
              </h3> <RiInformationLine data-tooltip-id="toolpi-info" data-tooltip-content="Pagos totales de cada mes, de todas las colonias." color='green'></RiInformationLine> */}

            </div>
            <div className="p-7">
              Productos mas vendidos
              <ResponsiveContainer width="100%" height={350} aspect={2}>
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5
                  }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="producto_nombre" />
                  <YAxis />

                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cantidad" fill="#E5E7EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center  dark:border-strokedark">
              <h3 className="font-medium text-black text-lg dark:text-white mr-3">
                Residentes que deben cancelar este mes
              </h3>
            </div>
            <div className="p-7">
              <div className="text-center"> Total productos en stock</div>
              <div className="text-5xl text-center mt-4">{reports.stock}</div>
            </div>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default Home;
