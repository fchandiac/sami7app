import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import usePaymentMethods from "../hooks/usePaymentMethods";


export default function PaymentsMethodsGrid(props) {
    const {update} = props;
    const paymentMethods = usePaymentMethods();
    const [paymentMethodsList, setPaymentMethodsList] = useState([]);

    useEffect(() => {
        const fecth = async () => {
            const data = await paymentMethods.findAll();
            console.log(data);
            setPaymentMethodsList(data);
        };
        fecth();
    }, [update]);




    const columns = [
        { field: "id", headerName: "Id", flex: 1 },
        { field: "name", headerName: "Nombre", flex: 1 },
        {
            field: "description",
            headerName: "Descripción",
            flex: 1,
        },
        {
            field: "credit",
            type: "boolean",
            headerName: "Credito",
            flex: 1,
            headerClassName: "data-grid-last-column-header",
        },
    ];


  return (
    <>
      <InfoDataGrid
        title={"Metodos de Pago"}
        rows={paymentMethodsList}
        columns={columns}
        height={"80vh"}
      />
    </>
  )
}
