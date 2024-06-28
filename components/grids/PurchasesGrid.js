import React, { useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import moment from "moment";
import InfoDataGrid from "../custom/InfoDataGrid";
import InfoIcon from "@mui/icons-material/Info";
import { Dialog } from "@mui/material";
import PurchaseDetailCard from "../cards/PurchaseDetailCard";
import PurchaseDetails from "../details/PurchaseDetails";
import PrintContainer from "../prints/PrintContainer";

export default function PurchasesGrid(props) {
  const { purchasesList } = props;
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [rowData, setRowData] = useState({ id: 0 });

  // id: purchase.id,
  // description: purchase.description,
  // documentType: purchase.document_type,
  // documentId: purchase.document_id,
  // net: purchase.net,
  // tax: purchase.tax,
  // total: purchase.total,
  // userName: purchase.User.name,
  // providerName: purchase.Provider.name,
  // createdAt: purchase.createdAt

  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "providerName", headerName: "Proveedor", flex: 1 },
    {
      field: "documentType",
      headerName: "Tipo",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value === 1) {
          return "Factura";
        } else if (params.value === 2) {
          return "Boleta";
        } else {
          return "Otro";
        }
      },
    },
    { field: "documentId", headerName: "Documento", flex: 1 },
    {
      field: "net",
      headerName: "Neto",
      flex: 1,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "tax",
      headerName: "Impuesto",
      flex: 1,
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
    { field: "userName", headerName: "Usuario", flex: 1 },

    {
      field: "createdAt",
      headerName: "Fecha",
      flex: 1,
      valueFormatter: (params) =>
        moment(params.value).format("DD-MM-YYYY HH:mm"),
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
          label={"Ver"}
          onClick={() => {
            setRowData(params.row);
            setOpenDetailDialog(true);
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <InfoDataGrid columns={columns} rows={purchasesList} title={"Compras"} />
      <Dialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
      >
        <PrintContainer>
          <PurchaseDetails purchaseId={rowData.id} />
        </PrintContainer>
      </Dialog>
    </>
  );
}
