import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "../custom/InfoDataGrid";

export default function SalesGrid(props) {
    const { salesList } = props;

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
        { field: "id", headerName: "Id", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "type", headerName: "Type", flex: 1 },
        { field: "discount", headerName: "Discount", flex: 1 },
        { field: "utility", headerName: "Utility", flex: 1 },
        { field: "net", headerName: "Net", flex: 1 },
        { field: "tax", headerName: "Tax", flex: 1 },
        { field: "total", headerName: "Total", flex: 1 },
        { field: "user_id", headerName: "User Id", flex: 1 },
        { field: "customer_id", headerName: "Customer Id", flex: 1 },
        { field: "document_type", headerName: "Document Type", flex: 1 },
        { field: "document_id", headerName: "Document Id", flex: 1 },
        { field: "createdAt", headerName: "Created At", flex: 1 },
        { field: "updatedAt", headerName: "Updated At", flex: 1 },
    ];


  return (
   <>
        <InfoDataGrid
            columns={columns}
            rows={salesList}
            title="Sales"
            
        />
   </>
  )
}
