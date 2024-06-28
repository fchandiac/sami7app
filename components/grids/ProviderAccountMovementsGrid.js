

// ProviderId
// : 
// 1001
// UserId
// : 
// null
// balance
// : 
// 0
// createdAt
// : 
// "2024-06-27T02:22:20.000Z"
// credit
// : 
// 0
// debit
// : 
// 0
// description
// : 
// "Compra de produtos"
// id
// : 
// 1001
// previous_balance
// : 
// 0
// provider_id
// : 
// 1001
// reference_id
// : 
// 1036
// type
// : 
// 0
// updatedAt
// : 
// "2024-06-27T02:22:20.000Z"
// user_id
// : 
// null

import React from 'react'
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "../custom/InfoDataGrid";
import moment from 'moment';
import useProviderAccountMovements from '../hooks/useProviderAccountMovements';



export default function ProviderAccountMovementsGrid(props) {
    const { movementsList = [], title = "" } = props;
    const providerAccountMovements = useProviderAccountMovements();


    const columns = [
        { field: "id", headerName: "Id", flex: 0.5, hide: true },
        { field: "description", headerName: "Descripción", flex: 1, hide: true },
        {
          field: "type",
          headerName: "Tipo",
          flex: 1,
          valueFormatter: (params) => providerAccountMovements.accountMovementType(params.value),
            
        },
        {
          field: "previous_balance",
          headerName: "Saldo Anterior",
          flex: 1,
          valueFormatter: (params) =>
            params.value.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            }),
        },
        {
          field: "debit",
          headerName: "Débito",
          flex: 1,
          valueFormatter: (params) =>
            params.value.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            }),
        },
        {
          field: "credit",
          headerName: "Crédito",
          flex: 1,
          valueFormatter: (params) =>
            params.value.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            }),
        },
        {
          field: "balance",
          headerName: "Saldo",
          flex: 1,
          valueFormatter: (params) =>
            params.value.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            }),
        },
        { field: "referenceId", headerName: "Referencia", flex: 1 },
        { field: "customerId", headerName: "Cliente Id", flex: 1, hide: true },
        { field: "userId", headerName: "Usuario Id", flex: 1, hide: true },
        { field: "userName", headerName: "Usuario", flex: 1 },
        {
          field: "createdAt",
          headerName: "Fecha",
          flex: 1,
          valueFormatter: (params) =>
            moment(params.value).format("DD-MM-YYYY HH:mm"),
        },
      ];

  return (
   <>
   <InfoDataGrid 
    title={title}
    rows={movementsList}
    columns={columns}
    height={"80vh"}
    />


   </>
  )
}
