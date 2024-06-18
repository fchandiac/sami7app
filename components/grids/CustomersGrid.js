import React, { useEffect, useState } from "react";
import useCustomers from "@/components/hooks/useCustomers";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "../custom/InfoDataGrid";

export default function CustomersGrid(props) {
  const { update } = props;
  const [customersList, setCustomersList] = useState([]);
  const customers = useCustomers();
  const [gridApiRef, setGridApiRef] = useState(null);

  useEffect(() => {
    const fecth = async () => {
      const data = await customers.findAll();
      console.log(data);
      setCustomersList(data);
    };
    fecth();
  }, [update]);

  // activity
  // :
  // "VENTA AL POR MAYOR DE COMPUTADORES, EQUIPO PERIFERICO Y PROGRAMAS INFO"
  // address
  // :
  // "Anibal Pinto 405"
  // city
  // :
  // 93
  // createdAt
  // :
  // "2024-04-29T04:09:20.000Z"
  // district
  // :
  // 141
  // id
  // :
  // 1002
  // mail
  // :
  // "felipe.chandia.cast@gmail.com"
  // name
  // :
  // "KARMIKA SPA"
  // phone
  // :
  // "930978304"
  // rut
  // :
  // "77.276.497-9"

  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "rut", headerName: "Rut", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "activity", headerName: "Activity", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "mail", headerName: "Mail", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  return (
    <>
      <InfoDataGrid
        title={"Clientes"}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
        rows={customersList}
      />
    </>
  );
}
