import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useStorages from "../hooks/useStorages";
import StoreIcon from '@mui/icons-material/Store';
import { Grid, useTheme } from "@mui/material";
import WarehouseIcon from '@mui/icons-material/Warehouse';

export default function SotoragesGrid(props) {
    const { update } = props;
    const storages = useStorages();
    const theme = useTheme();
    const [storagesList, setStoragesList] = useState([]);
    const [gridApiRef, setGridApiRef] = useState(null);
    const [rowData, setRowData] = useState({ id: 0, name: "", description: "", salesRoom: true });

    useEffect(() => {
        const fecth = async () => {
            const data = await storages.findAll();
            setStoragesList(data);
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
            field: "sales_room",
            headerName: "Punto de venta",
            flex: 1,
            type: "boolean",
            renderCell: (params) => {
                return (
                    params.value ? <StoreIcon sx={{color: theme.palette.primary.main}}/> : <WarehouseIcon sx={{color: theme.palette.secondary.main}}/>
                );
            },

           
        }
    ];
  return (
    <>
      <InfoDataGrid
        title={"Almacenes"}
        rows={storagesList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />
    </>
  )
}
