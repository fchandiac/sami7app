import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "../custom/InfoDataGrid";
import useCustomerAccountMovements from "../hooks/useCustomerAccountMovements";
import moment from "moment";

export default function CustomerAccountMovementsGrid(props) {
  const { movementsList = [], title = "" } = props;
  const [gridApiRef, setGridApiRef] = useState(null);
  const customerAccountMovements = useCustomerAccountMovements();
  // id: movement.id,
  // description: movement.description,
  // type: customerAccountMovements.customerAccountMovementType(
  //   movement.type
  // ),
  // previous_balance: movement.previous_balance,
  // debit: movement.debit,
  // credit: movement.credit,
  // balance: movement.balance,
  // referenceId: movement.reference_id,
  // customerId: movement.customer_id,
  // userId: movement.user_id,
  // userName: movement.User.name,
  // createdAt: movement.created_at,
  const columns = [
    { field: "id", headerName: "Id", flex: 0.5, hide: true },
    { field: "description", headerName: "Descripción", flex: 1, hide: true },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      valueFormatter: (params) =>
        customerAccountMovements.customerAccountMovementType(params.value),
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
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
        rows={movementsList}
      />
    </>
  );
}
