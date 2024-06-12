import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "../custom/InfoDataGrid";
import useSales from "../hooks/useSales";
import useDte from "../hooks/useDte";
import moment from "moment";
import InfoIcon from '@mui/icons-material/Info';
import { Dialog } from "@mui/material";
import SaleDetailCard from "../cards/SaleDetailCard";


export default function SalesGrid(props) {
  const { salesList } = props;
  const sales = useSales();
    const dte = useDte();

    const [openInfoDialog, setOpenInfoDialog] = useState(false);
    const [rowData, setRowData] = useState({
        id: 0,
        nulled: false,

    });

  // {
  //     "id": 1001,
  //     "description": "Venta directa: ",
  //     "type": 1,
  //     "discount": 0,
  //     "utility": -2235,
  //     "net": 2185,
  //     "tax": 412,
  //     "total": 2600,
  //     "user_id": 1001,
  //     "customer_id": 1002,
  //     "document_type": 1,
  //     "document_id": null,
  //     "createdAt": "2024-05-06T09:34:08.000Z",
  //     "updatedAt": "2024-05-06T09:34:08.000Z"
  // }

  const columns = [
    { field: "id", headerName: "Id", flex: 0.8 },
    { field: "description", headerName: "Descripcións", flex: 1, hide: true },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      hide: true,
      valueFormatter: (params) => sales.saleType(params.value),
    },
    {
      field: "discount",
      headerName: "Descuentos",
      flex: 1.2,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "utility",
      headerName: "Utilidad",
      flex: 1,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "net",
      headerName: "Neto",
      flex: 0.9,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "tax",
      headerName: "Impuestos",
      flex: 1.1,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    { field: "userName", headerName: "Usuario", flex: 1, hide: true},
    { field: "customerName", headerName: "Cliente", flex: 1 },
    { field: "document_type", headerName: "Documento", flex: 1.1, 
        valueFormatter: (params) => dte.documentType(params.value)
     },
    { field: "document_id", headerName: "Referencia", flex: 1 },
    { field: "createdAt", headerName: "Fecha", flex: 1, 
        valueFormatter: (params) => moment(params.value).format("DD-MM-YYYY HH:mm")
     
     },
     {
        field: "actions",
        headerName: "",
        headerClassName: "data-grid-last-column-header",
        type: "actions",
        flex: 0.2,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<InfoIcon />}
            label={"info"}
            onClick={() => {
                setRowData({
                id: params.row.id,
                nulled: params.row.nulled,
                });
   
                setOpenInfoDialog(true);
            }}
            />,
        ],
     }

  ];

  return (
    <>
      <InfoDataGrid columns={columns} rows={salesList} title="Ventas" />
        <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)}>
            <SaleDetailCard saleId={rowData.id} minimal = {false}/>
        </Dialog>
      
    </>
  );
}
