import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useStorages from "../hooks/useStorages";
import StoreIcon from "@mui/icons-material/Store";
import { Dialog, Grid, useTheme } from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import EditIcon from "@mui/icons-material/Edit";
import StorageForm from "../forms/StorageForm";

export default function SotoragesGrid(props) {
  const { update } = props;
  const storages = useStorages();
  const theme = useTheme();
  const [storagesList, setStoragesList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [rowData, setRowData] = useState({
    id: 0,
    name: "",
    description: "",
    salesRoom: true,
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);

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
      headerName: "Sala de venta",
      flex: 1,
      type: "boolean",
      renderCell: (params) => {
        return params.value ? (
          <StoreIcon sx={{ color: theme.palette.primary.main }} />
        ) : (
          <WarehouseIcon sx={{ color: theme.palette.secondary.main }} />
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      flex: 0.7,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          onClick={() => {
            setRowData({
              id: params.row.id,
              name: params.row.name,
              description: params.row.description,
              salesRoom: params.row.sales_room,
            });
            setOpenEditDialog(true);
          }}
        />,
      ],
    },
  ];


  const afterUpdate = (data) => {
    gridApiRef.current.updateRows([
      {
        id: data.id,
        name: data.name,
        description: data.description,
        sales_room: data.salesRoom,

      },
    ]);
    setOpenEditDialog(false);
  }
  return (
    <>
      <InfoDataGrid
        title={"Almacenes"}
        rows={storagesList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <StorageForm data={rowData} edit={true} afterSubmit={afterUpdate} />
      </Dialog>
    </>
  );
}
