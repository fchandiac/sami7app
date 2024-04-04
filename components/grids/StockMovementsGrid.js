import React, { useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useStocks from "../hooks/useStocks";
import moment from "moment";

export default function StockMovementsGrid(props) {
  const { movementsList } = props;
  const stocks = useStocks();
  const [gridApiRef, setGridApiRef] = useState(null);

  // id: movement.id,
  // add: movement.add,
  // decrement: movement.decrement,
  // balance: movement.balance,
  // referece: movement.reference,
  // type: movement.type,
  // created_at: movement.created_at,
  // stock_id: movement.stock_id,

  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "add", headerName: "Incremento", flex: 1 },
    { field: "decrement", headerName: "Descuento", flex: 1 },
    { field: "balance", headerName: "Balance", flex: 1 },
    { field: "reference", headerName: "Referencia", flex: 1 },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      valueFormatter: (params) => {
        return stocks.movementType(params.value)
      },
    },
    {
      field: "created_at",
      headerName: "Fecha",
      flex: 1,
      type: "date",
      valueFormatter: (params) => {
        return moment(params.value).format("DD-MM-YYYY HH:mm");
      },
    },
    { field: "stock_id", headerName: "Stock", flex: 1,},
  ];

  return (
    <>
      <InfoDataGrid
        title={"Movimientos de stock"}
        rows={movementsList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />
    </>
  );
}
