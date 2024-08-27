import React, { useState, useEffect, useMemo } from "react";
import { RiAddLargeFill, RiMoneyDollarCircleLine, RiUser3Fill } from "react-icons/ri";
import { getReports } from "../../services/sale/saleService";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
const Home = () => {
  const [user, setUser] = useState(localStorage.getItem('userAuth'));
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
    }
  }

  useEffect(() => {
    actionFuctions.getReports();
  }, []);


  if (!reports) {
    console.log("es nulo");
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
    </CardHeader>
  );
};

export default Home;
