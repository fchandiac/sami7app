import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useProducts from "../hooks/useProducts";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Dialog, Grid } from "@mui/material";
import ProductForm from "../forms/ProductForm";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import PurchasePriceForm from "../forms/PurchasePriceForm";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductsGrid() {
  const products = useProducts();
  const [productsList, setProductsList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPriceChangeDialog, setOpenPriceChangeDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowData, setRowData] = useState({
    id: 0,
    name: "",
    code: "",
    description: "",
    stock_control: false,
    iva_subject: false,
    favorite: false,
    purchase_price_id: null,
    selling_price_id: 0,
    subcategory: { id: 0, key: 0, name: "" },
    purchaseGross: 0,
  });

  useEffect(() => {
    const fecth = async () => {
      const data = await products.findAllToGrid();

      console.log(data);
      setProductsList(data);
    };
    fecth();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.6 },
    { field: "code", headerName: "Código", flex: 1 },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "description", headerName: "Descripción", flex: 1, hide: true},
    { field: "subcategoryName", headerName: "Subcategoría", flex: 1 },
    {
      field: "stockControl",
      headerName: "Control de stock",
      flex: 0.8,
      type: "boolean",
    },
    {
      field: "ivaSubject",
      headerName: "Afecto IVA",
      flex: 0.5,
      type: "boolean",
    },
    { field: "favorite", headerName: "Favorito", flex: 0.5, type: "boolean" },
    {
      field: "purchaseGross",
      headerName: "Precio de compra",
      flex: 1,
  
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
          label={"Ver"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              code: params.row.code,
              name: params.row.name,
              description: params.row.description,
              stockControl: params.row.stockControl,
              ivaSubject: params.row.ivaSubject,
              favorite: params.row.favorite,
              subcategory: {
                id: params.row.subcategory.id,
                key: params.row.subcategory.id,
                name: params.row.subcategory.name,
                category:{
                  id: params.row.subcategory.Category.id,
                  key: params.row.subcategory.Category.id,
                  name: params.row.subcategory.Category.name
                }
              },
            });
            setOpenEditDialog(true);
          }}
        />,
        <GridActionsCellItem
          icon={<PriceChangeIcon />}
          label={"Cambiar precio"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              code: params.row.code,
              name: params.row.name,
              description: params.row.description,
              stockControl: params.row.stockControl,
              ivaSubject: params.row.ivaSubject,
              favorite: params.row.favorite,
              purchase_price_id: params.row.purchase_price_id,
              subcategory: {
                id: params.row.subcategory.id,
                key: params.row.subcategory.id,
                name: params.row.subcategory.name,
                category:{
                  id: params.row.subcategory.Category.id,
                  key: params.row.subcategory.Category.id,
                  name: params.row.subcategory.Category.name
                }
              },
            });
            setOpenPriceChangeDialog(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label={"Eliminar"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              code: params.row.code,
              name: params.row.name,
              description: params.row.description,
              stockControl: params.row.stockControl,
              ivaSubject: params.row.ivaSubject,
              favorite: params.row.favorite,
              purchase_price_id: params.row.purchase_price_id,
              subcategory: {
                id: params.row.subcategory.id,
                key: params.row.subcategory.id,
                name: params.row.subcategory.name,
                category:{
                  id: params.row.subcategory.Category.id,
                  key: params.row.subcategory.Category.id,
                  name: params.row.subcategory.Category.name
                }
              },
            });
            setOpenDeleteDialog(true);
          }}
        />,
      ],
    },
  ];

  const afterUpdate = (data) => {
    gridApiRef.current.updateRows([
      {
        id: data.id,
        code: data.code,
        name: data.name,
        description: data.description,
        stockControl: data.stockControl,
        ivaSubject: data.ivaSubject,
        favorite: data.favorite,
        subcategoryName: data.subcategory.name,
      },
    ]);
    setOpenEditDialog(false);
  }

  const afterPriceChange = (gross, productId) => {
    console.log(gross, productId);
    gridApiRef.current.updateRows([
      {
        id: productId, 
       purchaseGross: gross,
      },
    ]);
    setOpenPriceChangeDialog(false);
  }

  return (
    <>
      <InfoDataGrid
        columns={columns}
        rows={productsList}
        title="Products"
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth={"sm"}
      >
        <ProductForm data={rowData} afterSubmit={afterUpdate}/>
      </Dialog>

      <Dialog
        open={openPriceChangeDialog}
        onClose={() => setOpenPriceChangeDialog(false)}
        fullWidth
        maxWidth={"xs"}
      >
        <PurchasePriceForm purchasePriceId={rowData.purchase_price_id} productName={rowData.name} afterSubmit={afterPriceChange} productId={rowData.id}/>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
        maxWidth={"xs"}
      >
        <Grid container spacing={1} p={1}>
          <Grid item xs={12}>
            <Alert severity="error">
              ¿Está seguro que desea eliminar el producto {rowData.name}?
            </Alert>
          </Grid>
          <Grid item xs={6}>
            <button
              onClick={() => {
                products.delete(rowData.id);
                setOpenDeleteDialog(false);
              }}
            >
              Sí
            </button>
          </Grid>
          <Grid item xs={6}>
            <button onClick={() => setOpenDeleteDialog(false)}>No</button>
          </Grid>
        </Grid>

      </Dialog>

    </>
  );
}
